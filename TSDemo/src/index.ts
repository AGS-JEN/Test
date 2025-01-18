import { testAzureBlobDownload } from "./azureBlob/AzureBlobDownload";
import { uploadFileToBlob } from "./azureBlob/azureBlobTest";
import { testRecord } from "./basic/TestRecord";
import { startExpressServer } from "./express/app";
import { testMongoose } from "./mongoose";
import { testPath } from "./Path/test";
import { GeneratePdf } from "./pdf/base64StringToPdf";
import { TestWebSocket } from "./websocket/websocket";
import { testWebSocketClient } from "./websocket/websocketClient";

console.log("hello, world");
// testMongoose("system.admin@nimbusgroup.us")
// uploadFileToBlob();

// testPath();

// startExpressServer();

// testWebSocketClient();
testAzureBlobDownload().then(() => {
    console.log("complete");}
);