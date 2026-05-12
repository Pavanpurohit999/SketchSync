"use client";
import { drawInit } from "@/app/draw";
import React, { useRef, useEffect, useState } from "react";
import { IconButton } from "./IconButton";
import { Circle, Pencil, RectangleHorizontal, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export type Tool = "rect" | "circle" | "pencil";

function Canvas({ roomId, socket }: { roomId: string; socket: WebSocket }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedTool, setSelectedTool] = useState<Tool>("rect");
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const router = useRouter();

  // Track window dimensions on client side only
  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (canvasRef.current && dimensions.width > 0) {
      drawInit(canvasRef.current, roomId, socket, selectedTool);
    }
  }, [canvasRef, dimensions, roomId, socket, selectedTool]);

  if (dimensions.width === 0) return null;

  return (
    <div className="max-w-screen max-h-screen overflow-hidden bg-[#121212]">
      <Topbar
        selectedTool={selectedTool}
        setSelectedTool={setSelectedTool}
        onBack={() => router.push("/dashboard")}
        roomId={roomId}
      />
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
      />
    </div>
  );
}

function Topbar({
  selectedTool,
  setSelectedTool,
  onBack,
  roomId,
}: {
  selectedTool: Tool;
  setSelectedTool: (tool: Tool) => void;
  onBack: () => void;
  roomId: string;
}) {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="p-2.5 bg-[#1e1e1e]/90 backdrop-blur-md border border-white/10 rounded-xl text-gray-400 hover:text-white hover:border-white/20 transition-all"
        title="Back to Dashboard"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      {/* Tool Palette */}
      <div className="flex gap-1 p-1.5 bg-[#1e1e1e]/90 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl">
        <IconButton
          icon={<RectangleHorizontal className="w-5 h-5" />}
          onClick={() => setSelectedTool("rect")}
          isActive={selectedTool === "rect"}
          tooltip="Rectangle"
        />
        <IconButton
          icon={<Circle className="w-5 h-5" />}
          onClick={() => setSelectedTool("circle")}
          isActive={selectedTool === "circle"}
          tooltip="Circle"
        />
        <IconButton
          icon={<Pencil className="w-5 h-5" />}
          onClick={() => setSelectedTool("pencil")}
          isActive={selectedTool === "pencil"}
          tooltip="Pencil"
        />
      </div>

      {/* Room Info */}
      <div className="px-3 py-2 bg-[#1e1e1e]/90 backdrop-blur-md border border-white/10 rounded-xl">
        <span className="text-xs text-gray-500">Room</span>
        <span className="text-xs text-gray-300 ml-1.5 font-mono">{`#${roomId}`}</span>
      </div>
    </div>
  );
}

export default Canvas;
