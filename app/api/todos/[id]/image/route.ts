import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fetchPexelsImageFromAPI } from "@/lib/pexels";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const todoId = parseInt(params.id);
  const todo = await prisma.todo.findUnique({ where: { id: todoId } });

  if (!todo) return NextResponse.json({ error: "Todo not found" }, { status: 404 });

  if (todo.imageURL) return NextResponse.json({ imageURL: todo.imageURL });

  const url = await fetchPexelsImageFromAPI(todo.title);

  if (url) {
    await prisma.todo.update({ where: { id: todoId }, data: { imageURL: url } });
  }

  return NextResponse.json({ imageURL: url });
}
