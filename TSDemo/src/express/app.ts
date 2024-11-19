import express from "express";
import axios from "axios";

const app = express();
const port = 3002;
async function fetchAndPrintData() {
  try {
    console.log("start requesting...");
    // 发送 GET 请求
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    // 打印返回的 JSON 数据
    console.log("Response Data:", response.data);
  } catch (error) {
    // 处理请求错误
    console.error("Error fetching data:", error);
  }
}

export function startExpressServer() {
  // 定义一个简单的路由
  app.get("/", (req, res) => {
    fetchAndPrintData();
    res.send("Hello, World!");
  });

  // 启动服务器
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}
