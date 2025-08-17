import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fetchPexelsImageFromAPI } from "@/lib/pexels";

// GET request for image corresponding to Todo item with given ID 
// First checks for stored imageURL in database, return URL if cached
// otherwise requests then returns URL from Pexel API and stores URL in database
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

    // grab from database if stored
    if (todo.imageURL) {
      return NextResponse.json({ imageURL: todo.imageURL });
    }

    // request image URL from Pexel
    const url = await fetchPexelsImageFromAPI(todo.title);

    // store image URL in database
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
