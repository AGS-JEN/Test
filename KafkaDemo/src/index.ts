import { testConsumer } from "./consumerMsg";
import { testConsumer2 } from "./consumerMsg2";
import { testPublishMessage } from "./publishMsg";

console.log("开始测试: ");

//  testPublishMessage().then((result) => {
//     console.log("test complete.");
//  });

testConsumer2().then((result) => {
    console.log("consume complete.");
 })
// console.time('exampleFunction');
// console.timeEnd('exampleFunction');