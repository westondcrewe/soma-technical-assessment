import { NextResponse } from "next/server";

export async function GET() {
  try {
    // TODO: replace with your real graph-building logic
    const graph = {
      nodes: [
        { id: 1, label: "Task A" },
        { id: 2, label: "Task B" },
      ],
      edges: [{ from: 1, to: 2 }],
    };

    return NextResponse.json(graph);
  } catch (err) {
    console.error("Error building graph:", err);
    return NextResponse.json(
      { error: "Failed to build graph" },
      { status: 500 }
    );
  }
}
