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
exports.testPublishMessage = testPublishMessage;
const kafkajs_1 = require("kafkajs");
function testPublishMessage() {
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
        // 创建生产者
        const producer = kafka.producer();
        const sendMessage = (i) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield producer.connect();
                console.log("Producer has connected");
                console.time('exampleFunction');
                for (let i = 1100; i < 1200; i++) {
                    const result = yield producer.send({
                        topic: "test", // 你的topic名称
                        messages: [
                            { value: "test " + i.toString() }, // 发送的消息内容
                        ],
                    });
                    console.log("Message sent:", result);
                }
                console.timeEnd('exampleFunction');
            }
            catch (error) {
                console.error("Error sending message:", error);
            }
            finally {
                // 断开生产者连接
                yield producer.disconnect();
            }
        });
        // for (let i = 1000; i < 1100; i++) {
        //   console.time('exampleFunction');
        //  await sendMessage(i);
        //  console.timeEnd('exampleFunction');
        // }
        sendMessage(1);
    });
}
