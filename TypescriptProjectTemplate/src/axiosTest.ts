import axios from "axios";
export async function testAxios() {
  try {
   await axios
      .get("https://jsonplaceholder.test.com/posts")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("inner error: ", error);
      });
  } catch (error) {
    console.log("out error:", error);
  }
}
