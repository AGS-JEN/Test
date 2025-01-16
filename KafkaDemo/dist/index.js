"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consumerMsg2_1 = require("./consumerMsg2");
console.log("开始测试: ");
//  testPublishMessage().then((result) => {
//     console.log("test complete.");
//  });
(0, consumerMsg2_1.testConsumer2)().then((result) => {
    console.log("consume complete.");
});
// console.time('exampleFunction');
// console.timeEnd('exampleFunction');
