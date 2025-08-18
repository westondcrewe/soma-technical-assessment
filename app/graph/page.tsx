"use client";

import { useEffect, useState } from "react";

export default function GraphPage() {
  const [graph, setGraph] = useState<any>(null);

  useEffect(() => {
    async function fetchGraph() {
      const res = await fetch("/api/todos/graph");
      const data = await res.json();
      setGraph(data);
    }
    fetchGraph();
  }, []);

  return (
    <div className="bg-gray-900">
      <h1 className="text-2xl font-bold mb-4">Task Dependency Graph</h1>
      {graph ? (
        <pre className="bg-gray-900 p-4 rounded">
          {JSON.stringify(graph, null, 2)}
        </pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
