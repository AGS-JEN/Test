import { Kafka } from "kafkajs";

  export async function testPublishMessage() {
    const kafka = new Kafka({
      clientId: "nimbus-backend-server",
      brokers: ["pkc-6vz38.westus2.azure.confluent.cloud:9092"],
      ssl: true,
      sasl: {
        mechanism: "plain",
        username: "ZZSACQGXOFAU6QPD",
        password:
          "hJDhJF03ecksDONWOjRh1RwoyTbCKylNc+Jin8FbfK53TtHB+hLWi/pOifWSLNXJ",
      },
    });
    // 创建生产者
    const producer = kafka.producer();
  
    const sendMessage = async (i: Number) => {
      try {
        await producer.connect();
        console.log("Producer has connected");
        console.time('exampleFunction');
        for (let i = 1100; i < 1200; i++) {
          const result = await producer.send({
            topic: "test", // 你的topic名称
            messages: [
              { value: "test " + i.toString() }, // 发送的消息内容
            ],
          });
          console.log("Message sent:", result);
        }
        console.timeEnd('exampleFunction');
      } catch (error) {
        console.error("Error sending message:", error);
      } finally {
        // 断开生产者连接
        await producer.disconnect();
      }
    };
    // for (let i = 1000; i < 1100; i++) {
    //   console.time('exampleFunction');
    //  await sendMessage(i);
    //  console.timeEnd('exampleFunction');
    // }


    sendMessage(1);
  }

