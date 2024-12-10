import * as WebSocket from 'ws';
import { Server } from 'http';

export function TestWebSocket(){
// 创建WebSocket服务器
const wss = new WebSocket.Server({ noServer: true });
wss.on('connection', (ws, req) => {
    console.log("new connection received...", req);
});
// 设置定时器，每隔5分钟发送数据
setInterval(() => {
  const colValue = Math.floor(Math.random() * 101) + 900; // 生成900到1000之间的随机数
  const data = JSON.stringify([{ id: "66b3fb9e34c177e2a1eed8f1", data:{holdsToBillCount: colValue }}]);
//   console.log("server pushing message:", data);
  
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}, 5000); // 300000毫秒等于5分钟

// 处理跨域请求
const server: Server = new Server((req, res) => {
  // 可以在这里添加更多的HTTP请求处理逻辑
});

// 将WebSocket服务器绑定到HTTP服务器上
server.on('upgrade', (request, socket, head) => {
  const { origin } = request.headers;
  if (origin) {
    // 允许跨域连接
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  }
});

// 启动服务器
server.listen(8765, () => {
  console.log('Server started on port 8765');
});

return wss;
}