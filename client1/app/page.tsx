"use client"
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-bg-gradient-one p-8">
      <h1 className="text-3xl md:text-5xl font-extrabold text-white text-center mb-12 drop-shadow-lg">
        Bridging the Gap: REST, GraphQL, and WebSockets in Modern Web Development
      </h1>
      <div className="flex flex-col md:flex-row gap-6">
        <button
          onClick={() => handleNavigate("/websocket")}
          className="w-48 py-3 text-lg font-medium text-white bg-blue-700 hover:bg-blue-600 active:bg-blue-500 rounded-lg shadow-md transition-all duration-200"
          aria-label="Navigate to Web Sockets"
        >
          Web Sockets
        </button>
        <button
          onClick={() => handleNavigate("/graphql")}
          className="w-48 py-3 text-lg font-medium text-white bg-indigo-700 hover:bg-indigo-600 active:bg-indigo-500 rounded-lg shadow-md transition-all duration-200"
          aria-label="Navigate to GraphQL"
        >
          GraphQL
        </button>
        <button
          onClick={() => handleNavigate("/rest")}
          className="w-48 py-3 text-lg font-medium text-white bg-green-700 hover:bg-green-600 active:bg-green-500 rounded-lg shadow-md transition-all duration-200"
          aria-label="Navigate to REST"
        >
          REST
        </button>
      </div>
    </div>
  );
}
