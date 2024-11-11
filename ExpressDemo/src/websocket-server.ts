import * as WebSocket from "ws";
import * as http from "http";
const clients = new Map<string, WebSocket>();

export function InitialWebSocketServic(server: http.Server) {
  const wss = new WebSocket.Server({ server: server });

  wss.on("connection", (ws: WebSocket) => {
    const clientId = generateClientId();
    clients.set(clientId, ws);
    console.log(`Client connected with ID: ${clientId}`);
    ws.on("message", (message: string) => {
      console.log(`Received message from client ${clientId}:`, message);   
      clients.forEach((client, id) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });

    ws.on("close", () => {
      console.log(`Client disconnected with ID: ${clientId}`);      
      clients.delete(clientId);
    });
  });
}

function generateClientId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
console.log("WebSocket server is running on port 8080");
