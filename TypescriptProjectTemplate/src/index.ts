import { testAxios } from "./axiosTest";
// import { testMongoose } from "./mongoose";

console.log("hello, world");
// testMongoose("system.admin@nimbusgroup.us")
testAxios().then((res) => console.log("top res:", res));