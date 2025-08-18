import { NextResponse } from "next/server";
import {
  listDependencies,
  addDependency,
  removeDependency,
} from "@/lib/dependencies";

export const runtime = "nodejs"; // ensure Prisma runs in Node runtime

// helper function to ensure values are passed as number types, even if initially stored as string
function parseNum(v: unknown): number | null {
  const n = typeof v === "string" ? Number(v) : v; // if string convert to num
  return typeof n === "number" && Number.isFinite(n) ? n : null; // ensure number type
}

// get list of dependencies for task with given ID
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const todoId = parseNum(params.id);
  if (todoId == null) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  try {
    const deps = await listDependencies(todoId);
    return NextResponse.json({ dependencies: deps });
  } catch (e: any) {
    if (e.message === "NOT_FOUND") return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    console.error("GET /dependencies error", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// add dependency to task with given ID
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const todoId = parseNum(params.id);
  if (todoId == null) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const body = await req.json().catch(() => null);
  const dependencyId = parseNum(body?.dependencyId);
  if (dependencyId == null) {
    return NextResponse.json({ error: "dependencyId is required" }, { status: 400 });
  }

  try {
    const deps = await addDependency(todoId, dependencyId);
    return NextResponse.json({ dependencies: deps }, { status: 200 });
  } catch (e: any) {
    if (e.message === "SELF_DEPENDENCY") return NextResponse.json({ error: "Task cannot depend on itself" }, { status: 400 });
    if (e.message === "NOT_FOUND") return NextResponse.json({ error: "Todo or dependency not found" }, { status: 404 });
    if (e.message === "CYCLE") return NextResponse.json({ error: "Circular dependency detected" }, { status: 409 });
    console.error("POST /dependencies error", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// remove dependency with given ID
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const todoId = parseNum(params.id);
  if (todoId == null) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const body = await req.json().catch(() => null);
  const dependencyId = parseNum(body?.dependencyId);
  if (dependencyId == null) {
    return NextResponse.json({ error: "dependencyId is required" }, { status: 400 });
  }

  try {
    const deps = await removeDependency(todoId, dependencyId);
    return NextResponse.json({ dependencies: deps }, { status: 200 });
  } catch (e) {
    console.error("DELETE /dependencies error", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
