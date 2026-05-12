"use client";
import { WS_URL } from "@/app/config";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Canvas from "./Canvas";

function RoomCanvas({ roomId }: { roomId: string }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    let isCurrent = true;
    setError(""); 

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/signin");
      return;
    }

    const ws = new WebSocket(`${WS_URL}?token=${token}`);

    ws.onopen = () => {
      if (!isCurrent) return;
      setSocket(ws);
      ws.send(JSON.stringify({ type: "join_room", roomId }));
    };

    ws.onerror = () => {
      if (!isCurrent) return;
      setError("Failed to connect. Your session may have expired.");
    };

    ws.onclose = () => {
      if (!isCurrent) return;
      setSocket(null);
    };

    return () => {
      isCurrent = false;
      if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
        ws.close();
      }
    };
  }, [roomId, router]);

  if (error) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
        <div className="bg-[#1e1e1e] border border-white/10 rounded-2xl p-8 max-w-md text-center">
          <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold mb-2">Connection Failed</h3>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => router.push("/signin")}
            className="px-6 py-2.5 bg-[#6965db] hover:bg-[#5b57d1] text-white font-semibold rounded-xl transition-all"
          >
            Sign In Again
          </button>
        </div>
      </div>
    );
  }

  if (!socket) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
        <div className="flex items-center gap-3">
          <svg className="animate-spin h-6 w-6 text-[#6965db]" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-gray-400 text-lg">Connecting to room...</span>
        </div>
      </div>
    );
  }

  return <Canvas roomId={roomId} socket={socket} />;
}

export default RoomCanvas;
