// const WebSocket = require('ws');
import {WebSocket}  from 'ws';

// 假设这是从安全存储中获取的真实token
const token = 'your_token_here';
export function testWebSocketClient (){
// 创建一个新的 WebSocket 客户端实例
const ws = new WebSocket('ws://localhost:3000', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  ws.on('open', function open() {
    console.log('Connected to WebSocket server');
  });
  
  ws.on('message', function incoming(message: any) {
    console.log('Received from server:', message);
  });
  
  ws.on('close', function close() {
    console.log('Disconnected from WebSocket server');
  });
  
  ws.on('error', function error(err: any) {
    console.error('WebSocket error:', err);
  });
}
