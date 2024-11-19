import { uploadFileToBlob } from "./azureBlob/azureBlobTest";
import { testRecord } from "./basic/TestRecord";
import { startExpressServer } from "./express/app";
import { testMongoose } from "./mongoose";
import { testPath } from "./Path/test";
import { GeneratePdf } from "./pdf/base64StringToPdf";

console.log("hello, world");
// testMongoose("system.admin@nimbusgroup.us")
// uploadFileToBlob();

// testPath();

// startExpressServer();

testRecord();