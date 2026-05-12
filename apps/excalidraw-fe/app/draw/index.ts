import axios from "axios";
import { HTTP_BACKEND } from "../config";
import type { Tool } from "@/components/Canvas";

type Shape =
  | {
      type: "rect";
      x: number;
      y: number;
      height: number;
      width: number;
    }
  | {
      type: "circle";
      centreX: number;
      centreY: number;
      radius: number;
    }
  | {
      type: "pencil";
      points: { x: number; y: number }[];
    };

// We store the selected tool in a module-level variable so event listeners can access it
let currentTool: Tool = "rect";
let panOffset = { x: 0, y: 0 };

export async function drawInit(
  canvas: HTMLCanvasElement,
  roomId: string,
  socket: WebSocket,
  selectedTool: Tool
) {
  currentTool = selectedTool;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let existingShapes: Shape[] = await getExistingShapes(roomId);

  // Define the message handler
  const onMessage = (event: MessageEvent) => {
    try {
      const message = JSON.parse(event.data);
      if (message.type === "chat") {
        const parsedShape = JSON.parse(message.messages);
        existingShapes.push(parsedShape);
        clearCanvas(ctx, existingShapes, canvas);
      }
    } catch (e) {
      console.error("Error parsing WS message", e);
    }
  };

  socket.addEventListener("message", onMessage);
  clearCanvas(ctx, existingShapes, canvas);

  let clicked = false;
  let startX = 0;
  let startY = 0;
  let currentPencilPoints: { x: number; y: number }[] = [];

  const getCanvasCoords = (e: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseDown = (e: MouseEvent) => {
    clicked = true;
    const coords = getCanvasCoords(e);
    startX = coords.x;
    startY = coords.y;

    if (currentTool === "pencil") {
      currentPencilPoints = [{ x: coords.x - panOffset.x, y: coords.y - panOffset.y }];
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (!clicked) return;
    clicked = false;
    const coords = getCanvasCoords(e);

    if (currentTool === "hand") return;

    let shape: Shape;

    if (currentTool === "rect") {
      const width = coords.x - startX;
      const height = coords.y - startY;
      shape = { 
        type: "rect", 
        x: startX - panOffset.x, 
        y: startY - panOffset.y, 
        height, 
        width 
      };
    } else if (currentTool === "circle") {
      const radius = Math.sqrt(
        Math.pow(coords.x - startX, 2) + Math.pow(coords.y - startY, 2)
      );
      shape = { 
        type: "circle", 
        centreX: startX - panOffset.x, 
        centreY: startY - panOffset.y, 
        radius 
      };
    } else {
      currentPencilPoints.push({ x: coords.x - panOffset.x, y: coords.y - panOffset.y });
      shape = { type: "pencil", points: [...currentPencilPoints] };
      currentPencilPoints = [];
    }

    existingShapes.push(shape);
    console.log("Saving shape to NeonDB...");
    socket.send(
      JSON.stringify({
        type: "chat",
        message: JSON.stringify(shape),
        roomId,
      })
    );
    clearCanvas(ctx, existingShapes, canvas);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (clicked) {
      const coords = getCanvasCoords(e);
      
      if (currentTool === "hand") {
        panOffset.x += coords.x - startX;
        panOffset.y += coords.y - startY;
        startX = coords.x;
        startY = coords.y;
        clearCanvas(ctx, existingShapes, canvas);
        return;
      }

      if (currentTool === "rect") {
        const width = coords.x - startX;
        const height = coords.y - startY;
        clearCanvas(ctx, existingShapes, canvas);
        ctx.strokeStyle = "rgba(255,255,255,0.8)";
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(startX, startY, width, height);
        ctx.setLineDash([]);
      } else if (currentTool === "circle") {
        const radius = Math.sqrt(
          Math.pow(coords.x - startX, 2) + Math.pow(coords.y - startY, 2)
        );
        clearCanvas(ctx, existingShapes, canvas);
        ctx.strokeStyle = "rgba(255,255,255,0.8)";
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.arc(startX, startY, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      } else if (currentTool === "pencil") {
        currentPencilPoints.push({ x: coords.x - panOffset.x, y: coords.y - panOffset.y });
        clearCanvas(ctx, existingShapes, canvas);
        if (currentPencilPoints.length > 1) {
          ctx.strokeStyle = "rgba(255,255,255,0.8)";
          ctx.beginPath();
          ctx.moveTo(currentPencilPoints[0].x + panOffset.x, currentPencilPoints[0].y + panOffset.y);
          for (let i = 1; i < currentPencilPoints.length; i++) {
            ctx.lineTo(currentPencilPoints[i].x + panOffset.x, currentPencilPoints[i].y + panOffset.y);
          }
          ctx.stroke();
        }
      }
    }
  };

  canvas.addEventListener("mousedown", handleMouseDown);
  canvas.addEventListener("mouseup", handleMouseUp);
  canvas.addEventListener("mousemove", handleMouseMove);

  return () => {
    socket.removeEventListener("message", onMessage);
    canvas.removeEventListener("mousedown", handleMouseDown);
    canvas.removeEventListener("mouseup", handleMouseUp);
    canvas.removeEventListener("mousemove", handleMouseMove);
  };
}

function clearCanvas(
  ctx: CanvasRenderingContext2D,
  existingShapes: Shape[],
  canvas: HTMLCanvasElement
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#121212";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  existingShapes.forEach((shape) => {
    ctx.strokeStyle = "rgba(255,255,255,0.9)";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (shape.type === "rect") {
      ctx.strokeRect(shape.x + panOffset.x, shape.y + panOffset.y, shape.width, shape.height);
    } else if (shape.type === "circle") {
      ctx.beginPath();
      ctx.arc(shape.centreX + panOffset.x, shape.centreY + panOffset.y, shape.radius, 0, Math.PI * 2);
      ctx.stroke();
    } else if (shape.type === "pencil") {
      if (shape.points.length > 1) {
        ctx.beginPath();
        ctx.moveTo(shape.points[0].x + panOffset.x, shape.points[0].y + panOffset.y);
        for (let i = 1; i < shape.points.length; i++) {
          ctx.lineTo(shape.points[i].x + panOffset.x, shape.points[i].y + panOffset.y);
        }
        ctx.stroke();
      }
    }
  });
}

async function getExistingShapes(roomId: string) {
  const res = await axios.get(`${HTTP_BACKEND}/rooms/chats/${roomId}`);
  const messages = res.data.data;

  const shapes = messages.map((x: { messages: string }) => {
    const messageData = JSON.parse(x.messages);
    return messageData;
  });

  return shapes;
}
