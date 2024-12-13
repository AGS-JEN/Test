import { Kafka } from 'kafkajs';
export function testPublishMessage(){
    

// 创建Kafka客户端实例
const kafka = new Kafka({
  brokers: ['pkc-6vz38.westus2.azure.confluent.cloud:9092'], // 你的Kafka broker地址
  clientId: 'test', // 客户端ID
});

// 创建生产者
const producer = kafka.producer();

const sendMessage = async () => {
  try {
    // 连接到Kafka
    await producer.connect();
    console.log('Producer has connected');

    // 发送消息到指定的topic
    const result = await producer.send({
      topic: 'my-topic', // 你的topic名称
      messages: [
        { value: 'Hello KafkaJS!' }, // 发送的消息内容
      ],
    });

    console.log('Message sent:', result);
  } catch (error) {
    console.error('Error sending message:', error);
  } finally {
    // 断开生产者连接
    await producer.disconnect();
  }
};

sendMessage();

}