import * as path from 'path';

export function testPath(){
// 文件路径
// const filePath = 'src\\azureBlob\\test.txt';
const filePath = 'src/azureBlob/test.txt';

// 提取文件名（包括扩展名）
const fileName = path.basename(filePath);

console.log(`File name with extension: ${fileName}`); // 输出: file.txt
}
