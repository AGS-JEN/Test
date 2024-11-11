"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialWebSocketServic = InitialWebSocketServic;
const WebSocket = __importStar(require("ws"));
const clients = new Map();
function InitialWebSocketServic(server) {
    const wss = new WebSocket.Server({ server: server });
    wss.on("connection", (ws) => {
        // 为每个客户端生成一个唯一的标识符
        const clientId = generateClientId();
        // 将客户端的标识符和 WebSocket 实例存储在映射中
        clients.set(clientId, ws);
        console.log(`Client connected with ID: ${clientId}`);
        ws.on("message", (message) => {
            console.log(`Received message from client ${clientId}:`, message);
            // 在这里处理接收到的消息
            // 你可以根据 clientId 来做不同的处理
            // 如果需要广播消息给所有客户端，可以这样做：
            clients.forEach((client, id) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
        });
        ws.on("close", () => {
            console.log(`Client disconnected with ID: ${clientId}`);
            // 从映射中移除客户端
            clients.delete(clientId);
        });
    });
}
function generateClientId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
console.log("WebSocket server is running on port 8080");
