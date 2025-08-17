import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fetchPexelsImageFromAPI } from "@/lib/pexels";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const todoId = parseInt(params.id);
    const todo = await prisma.todo.findUnique({ where: { id: todoId } });

    if (!todo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    // Return cached URL if exists
    if (todo.imageURL) {
      return NextResponse.json({ imageURL: todo.imageURL });
    }

    // Fetch from Pexels
    const url = await fetchPexelsImageFromAPI(todo.title);

    if (url) {
      await prisma.todo.update({
        where: { id: todoId },
        data: { imageURL: url },
      });
    }

    return NextResponse.json({ imageURL: url ?? null });
  } catch (err) {
    console.error("Error in /api/todos/[id]/image:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
