export function PostData(type, userData) {
  let BaseURL = "https://isf341.herokuapp.com";
  //let BaseURL = 'http://localhost';

  return new Promise((resolve, reject) => {
    fetch(BaseURL + type, {
      method: "POST",
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
