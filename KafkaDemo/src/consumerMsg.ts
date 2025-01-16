import { Kafka } from "kafkajs";

export async function testConsumer() {
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

  const consumer = kafka.consumer({
    groupId: "localTest",
  });
  await consumer.connect();
  await consumer.subscribe({
    topic: 'test',
    fromBeginning: true,
  });
  console.time("exampleFunction");
  let count = 0;
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      count++;
      consumer.pause([{ topic, partitions: [partition] }]);
      try {
        console.log("开始处理消息:", {
          partition: partition,
          offset: message.offset,
        });
        const messageJsonStr = message.value?.toString();
        if (!messageJsonStr || messageJsonStr === "") {
          throw Error("received invalid message.");
        }
      } catch (error) {
        console.error(
          `异常信息 ${partition}:${message.offset}, send to dead letter, error details: `,
          error
        );
      } finally {


        await consumer.commitOffsets([
          {
            topic,
            partition,
            offset: (parseInt(message.offset, 10) + 1).toString(),
          },
        ]);
        console.log("消息处理完成:", {
          partition: partition,
          offset: message.offset,
        });
        consumer.resume([{ topic, partitions: [partition] }]);

        if(count==100){
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            console.log("处理完成100个消息, 总共耗时:");            
            console.timeEnd('exampleFunction');
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        }
      }
    },
    autoCommit: false,
  });
}
