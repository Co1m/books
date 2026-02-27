import { useEffect, useState } from "react";

interface Book {
  标题: string;
  作者: string;
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // 使用绝对路径加载 books.json
        const response = await fetch('/books/books.json');
        if (!response.ok) {
          throw new Error('Failed to load books');
        }
        const data = await response.json();
        setBooks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">加载中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-red-600">错误: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">我的书单</h1>
        <p className="text-gray-600 mb-8">共 {books.length} 本书</p>

        <div className="space-y-4">
          {books.map((book, index) => (
            <div
              key={index}
              className="border-b border-gray-200 pb-4 hover:bg-gray-50 px-4 py-2 transition-colors"
            >
              <h2 className="text-lg font-semibold text-gray-900">
                {book.标题}
              </h2>
              <p className="text-gray-600 text-sm mt-1">{book.作者}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
