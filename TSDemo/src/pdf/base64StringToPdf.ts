

export function GeneratePdf(){
    const base64string ="";
    base64ToPDF(base64string);
}


import fs from 'fs';
export function base64ToPDF(base64String: string) {
    // 将Base64字符串转换为Buffer
    const pdfBuffer = Buffer.from(base64String, 'base64');
  
    // 将Buffer写入文件系统
    fs.writeFile("result.pdf", pdfBuffer, (err: any) => {
      if (err) {
        console.error('Error writing PDF file:', err);
      } else {
        console.log('PDF file has been saved.');
      }
    });
  }