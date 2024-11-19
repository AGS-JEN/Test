type MyRecord = Record<string, boolean>; // 假设值的类型是 string[]

export function testRecord() {
  const array = ["key1", "key2", "key3"];
  const values = ["value1", "value2", "value3"];

  const record: MyRecord = array.reduce((acc, key, index) => {
    acc[key] = true; // 假设你想要将数组的值作为值数组的第一个元素
    return acc;
  }, {} as MyRecord);

  console.log(record);
  
}
