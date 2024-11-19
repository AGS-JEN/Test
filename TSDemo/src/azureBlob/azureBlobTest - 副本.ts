const { BlobServiceClient } = require('@azure/storage-blob');
const fs = require('fs');

// 替换为你的Azure Storage连接字符串
const AZURE_STORAGE_CONNECTION_STRING = 'test';

// 容器名称
const containerName = 'dev';

// 文件路径
const filePath = 'src/azureBlob/test.txt';

// Blob名称
const blobName = 'test.txt';

export async function uploadFileToBlob() {
    // 创建Blob服务客户端
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    // 获取容器客户端
    const containerClient = blobServiceClient.getContainerClient(containerName);
    // 检查容器是否存在，如果不存在则创建
    const exists = await containerClient.exists();
    if (!exists) {
        await containerClient.create();
        console.log(`Container ${containerName} created.`);
    }
    // 获取Blob客户端
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    // 读取文件内容
    const data = fs.readFileSync(filePath);
    // 上传文件到Blob
    const uploadResponse = await blockBlobClient.upload(data, data.length);
    console.log(`Upload block blob ${blobName} successfully`, uploadResponse.requestId);
}

uploadFileToBlob().catch((err) => {
    console.error('Error uploading file:', err);
});