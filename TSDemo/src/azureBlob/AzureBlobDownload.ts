import { BlobServiceClient } from "@azure/storage-blob";
// 替换为你的Azure Storage连接字符串
const AZURE_STORAGE_CONNECTION_STRING = '';

// 容器名称
const containerName = 'development';

// 文件路径
// const filePath = 'src/azureBlob/test.txt';
// Blob名称
const blobName = '66b3fb9e34c177e2a1eed8f1_Manifest-test-pass5.xlsx';

// https://manifestuploadfiles.blob.core.windows.net/development/66b3fb9e34c177e2a1eed8f1_Manifest-test-pass5.xlsx

export async function testAzureBlobDownload() {
    
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const exists = await containerClient.exists();
    if (!exists) {
        await containerClient.create();
        console.log(`Container ${containerName} created.`);
    }
    // 获取Blob客户端
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const downloadResponse = await blockBlobClient.download();
        // 将下载的内容写入本地文件
    const fileStream = require('fs').createWriteStream('test.xlsx');
    downloadResponse.readableStreamBody?.pipe(fileStream);
}