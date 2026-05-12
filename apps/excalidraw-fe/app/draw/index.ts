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

export async function drawInit(
  canvas: HTMLCanvasElement,
  roomId: string,
  socket: WebSocket,
  selectedTool: Tool
) {
  currentTool = selectedTool;

  const ctx = canvas.getContext("2d");

  let existingShapes: Shape[] = await getExistingShapes(roomId);
  if (!ctx) {
    return;
  }

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);

    if (message.type == "chat") {
      const parsedShape = JSON.parse(message.messages);
      existingShapes.push(parsedShape);
      clearCanvas(ctx, existingShapes, canvas);
    }
  };

  clearCanvas(ctx, existingShapes, canvas);
  let clicked = false;
  let startX = 0;
  let startY = 0;
  let currentPencilPoints: { x: number; y: number }[] = [];

  // Remove old listeners by cloning the canvas
  const newCanvas = canvas.cloneNode(true) as HTMLCanvasElement;
  canvas.parentNode?.replaceChild(newCanvas, canvas);
  const newCtx = newCanvas.getContext("2d");
  if (!newCtx) return;
  clearCanvas(newCtx, existingShapes, newCanvas);

  newCanvas.addEventListener("mousedown", (e) => {
    clicked = true;
    startX = e.clientX;
    startY = e.clientY;

    if (currentTool === "pencil") {
      currentPencilPoints = [{ x: e.clientX, y: e.clientY }];
    }
  });

  newCanvas.addEventListener("mouseup", (e) => {
    if (!clicked) return;
    clicked = false;

    let shape: Shape;

    if (currentTool === "rect") {
      const width = e.clientX - startX;
      const height = e.clientY - startY;
      shape = {
        type: "rect",
        x: startX,
        y: startY,
        height,
        width,
      };
    } else if (currentTool === "circle") {
      const radius = Math.sqrt(
        Math.pow(e.clientX - startX, 2) + Math.pow(e.clientY - startY, 2)
      );
      shape = {
        type: "circle",
        centreX: startX,
        centreY: startY,
        radius,
      };
    } else {
      // pencil
      currentPencilPoints.push({ x: e.clientX, y: e.clientY });
      shape = {
        type: "pencil",
        points: [...currentPencilPoints],
      };
      currentPencilPoints = [];
    }

    existingShapes.push(shape);

    socket.send(
      JSON.stringify({
        type: "chat",
        message: JSON.stringify(shape),
        roomId,
      })
    );
  });

  newCanvas.addEventListener("mousemove", (e) => {
    if (clicked) {
      if (currentTool === "rect") {
        const width = e.clientX - startX;
        const height = e.clientY - startY;
        clearCanvas(newCtx, existingShapes, newCanvas);
        newCtx.strokeStyle = "rgba(255,255,255,0.8)";
        newCtx.lineWidth = 2;
        newCtx.setLineDash([5, 5]);
        newCtx.strokeRect(startX, startY, width, height);
        newCtx.setLineDash([]);
      } else if (currentTool === "circle") {
        const radius = Math.sqrt(
          Math.pow(e.clientX - startX, 2) + Math.pow(e.clientY - startY, 2)
        );
        clearCanvas(newCtx, existingShapes, newCanvas);
        newCtx.strokeStyle = "rgba(255,255,255,0.8)";
        newCtx.lineWidth = 2;
        newCtx.setLineDash([5, 5]);
        newCtx.beginPath();
        newCtx.arc(startX, startY, radius, 0, Math.PI * 2);
        newCtx.stroke();
        newCtx.setLineDash([]);
      } else if (currentTool === "pencil") {
        currentPencilPoints.push({ x: e.clientX, y: e.clientY });
        clearCanvas(newCtx, existingShapes, newCanvas);
        // Draw the in-progress pencil stroke
        if (currentPencilPoints.length > 1) {
          newCtx.strokeStyle = "rgba(255,255,255,0.8)";
          newCtx.lineWidth = 2;
          newCtx.lineCap = "round";
          newCtx.lineJoin = "round";
          newCtx.beginPath();
          newCtx.moveTo(currentPencilPoints[0].x, currentPencilPoints[0].y);
          for (let i = 1; i < currentPencilPoints.length; i++) {
            newCtx.lineTo(currentPencilPoints[i].x, currentPencilPoints[i].y);
          }
          newCtx.stroke();
        }
      }
    }
  });
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
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    } else if (shape.type === "circle") {
      ctx.beginPath();
      ctx.arc(shape.centreX, shape.centreY, shape.radius, 0, Math.PI * 2);
      ctx.stroke();
    } else if (shape.type === "pencil") {
      if (shape.points.length > 1) {
        ctx.beginPath();
        ctx.moveTo(shape.points[0].x, shape.points[0].y);
        for (let i = 1; i < shape.points.length; i++) {
          ctx.lineTo(shape.points[i].x, shape.points[i].y);
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
