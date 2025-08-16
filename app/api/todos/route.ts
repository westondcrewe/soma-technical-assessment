import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: [ // sort by duedate then createdAt for ties
      { dueDate: {sort: 'asc', nulls: 'last'}},
      { createdAt: 'desc' },
    ]});
    return NextResponse.json(todos);
  } catch (error) {
    console.error('GET error:', error)
    return NextResponse.json({ error: 'Error fetching todos' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // add dueDate to POST method along with title input
    const { title, dueDate } = await request.json();
    if (!title || title.trim() === '') {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }
    const todo = await prisma.todo.create({
      data: {
        title,
        dueDate: typeof dueDate === 'string' && dueDate.trim() !== '' ? new Date(dueDate) : null // dueDate is an optional field
      },
    });
    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating todo' }, { status: 500 });
  }
}