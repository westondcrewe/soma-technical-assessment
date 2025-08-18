import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Todo App",
  description: "Task management with dependency graph",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Todo App</h1>
          <nav className="space-x-4">
            <Link href="/" className="text-blue-600 hover:underline">
              Home
            </Link>
            <Link href="/graph" className="text-blue-600 hover:underline">
              Graph
            </Link>
            <Link href="/scheduler" className="text-blue-600 hover:underline">
              Scheduler
            </Link>
          </nav>
        </header>

        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
