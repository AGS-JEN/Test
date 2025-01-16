"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testConsumer2 = testConsumer2;
const kafkajs_1 = require("kafkajs");
function testConsumer2() {
    return __awaiter(this, void 0, void 0, function* () {
        const kafka = new kafkajs_1.Kafka({
            clientId: "nimbus-backend-server",
            brokers: ["pkc-6vz38.westus2.azure.confluent.cloud:9092"],
            ssl: true,
            sasl: {
                mechanism: "plain",
                username: "ZZSACQGXOFAU6QPD",
                password: "hJDhJF03ecksDONWOjRh1RwoyTbCKylNc+Jin8FbfK53TtHB+hLWi/pOifWSLNXJ",
            },
        });
        const consumer = kafka.consumer({
            groupId: "localTest",
        });
        yield consumer.connect();
        yield consumer.subscribe({
            topic: 'test',
            fromBeginning: true,
        });
        console.time("exampleFunction");
        let count = 0;
        yield consumer.run({
            eachBatchAutoResolve: true,
            eachBatch: (_a) => __awaiter(this, [_a], void 0, function* ({ batch, resolveOffset, heartbeat, isRunning, isStale }) {
                console.log("开始处理batch size is:", batch.messages.length);
                for (let message of batch.messages) {
                    count++;
                    if (!isRunning() || isStale())
                        break;
                    //await processMessage(message);
                    console.log("开始处理消息:", { offset: message.offset, partition: batch.partition });
                    resolveOffset(message.offset);
                    yield heartbeat();
                }
                if (count > 100) {
                    console.log("处理了100以上条消息,", count);
                    console.timeEnd("exampleFunction");
                }
            })
        });
        // await consumer.run({
        //   eachMessage: async ({ topic, partition, message }) => {
        //     count++;
        //     // consumer.pause([{ topic, partitions: [partition] }]);
        //     try {
        //       console.log("开始处理消息:", {
        //         partition: partition,
        //         offset: message.offset,
        //       });
        //       const messageJsonStr = message.value?.toString();
        //       if (!messageJsonStr || messageJsonStr === "") {
        //         throw Error("received invalid message.");
        //       }
        //     } catch (error) {
        //       console.error(
        //         `异常信息 ${partition}:${message.offset}, send to dead letter, error details: `,
        //         error
        //       );
        //     } finally {
        //       await consumer.commitOffsets([
        //         {
        //           topic,
        //           partition,
        //           offset: (parseInt(message.offset, 10) + 1).toString(),
        //         },
        //       ]);
        //       console.log("消息处理完成:", {
        //         partition: partition,
        //         offset: message.offset,
        //       });
        //       // consumer.resume([{ topic, partitions: [partition] }]);
        //       if(count==100){
        //           console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        //           console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        //           console.log("处理完成100个消息, 总共耗时:");            
        //           console.timeEnd('exampleFunction');
        //           console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        //           console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        //       }
        //     }
        //   },
        //   autoCommit: false,
        // });
    });
}
