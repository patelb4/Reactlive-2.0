import axios from "axios";
export function PostData(type, userData) {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/auth/" + type, userData)
      .then(response => response.data)
      .then(responseJson => {
        resolve(responseJson);
      })
      .catch(error => {
        reject(error);
      });
  });
}
