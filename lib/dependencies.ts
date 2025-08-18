import { prisma } from "@/lib/prisma";

/** Quick existence check (no throw) */
async function todoExists(id: number): Promise<boolean> {
  const t = await prisma.todo.findUnique({ where: { id }, select: { id: true } });
  return !!t;
}

/** Return dependency ids for a task (only ids for light payload) */
async function dependencyIds(id: number): Promise<number[]> {
  const t = await prisma.todo.findUnique({
    where: { id },
    select: { dependencies: { select: { id: true } } },
  });
  return t?.dependencies.map(d => d.id) ?? [];
}

/**
 * Graph reachability: is there a path from `fromId` to `toId` following dependencies?
 * If yes, connecting `toId` as a dependency of something on that path would create a cycle.
 */
export async function hasPath(fromId: number, toId: number): Promise<boolean> {
  const visited = new Set<number>();
  const stack = [fromId];

  while (stack.length) {
    const cur = stack.pop()!;
    if (cur === toId) return true;
    if (visited.has(cur)) continue;
    visited.add(cur);

    const deps = await dependencyIds(cur); // ids only
    for (const nxt of deps) {
      if (!visited.has(nxt)) stack.push(nxt);
    }
  }
  return false;
}

export async function listDependencies(todoId: number) {
  const todo = await prisma.todo.findUnique({
    where: { id: todoId },
    include: { dependencies: { select: { id: true, title: true } } },
  });
  if (!todo) throw new Error("NOT_FOUND");
  return todo.dependencies;
}

export async function addDependency(todoId: number, dependencyId: number) {
  if (todoId === dependencyId) throw new Error("SELF_DEPENDENCY");

  const [a, b] = await Promise.all([todoExists(todoId), todoExists(dependencyId)]);
  if (!a || !b) throw new Error("NOT_FOUND");

  // If dependency already reaches todo, adding it would close a cycle.
  const cycle = await hasPath(dependencyId, todoId);
  if (cycle) throw new Error("CYCLE");

  const updated = await prisma.todo.update({
    where: { id: todoId },
    data: { dependencies: { connect: { id: dependencyId } } },
    include: { dependencies: { select: { id: true, title: true } } },
  });
  return updated.dependencies;
}

export async function removeDependency(todoId: number, dependencyId: number) {
  // If either side doesn’t exist or the relation isn’t present, Prisma disconnect just no-ops
  const updated = await prisma.todo.update({
    where: { id: todoId },
    data: { dependencies: { disconnect: { id: dependencyId } } },
    include: { dependencies: { select: { id: true, title: true } } },
  });
  return updated.dependencies;
}
