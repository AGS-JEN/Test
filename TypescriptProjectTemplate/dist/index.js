"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axiosTest_1 = require("./axiosTest");
// import { testMongoose } from "./mongoose";
console.log("hello, world");
// testMongoose("system.admin@nimbusgroup.us")
(0, axiosTest_1.testAxios)().then((res) => console.log("top res:", res));
