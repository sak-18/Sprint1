const axios = require("axios");
const jwtDecode = require("jwt-decode");

// let getToken =(token,callback) => {
//     axios
//         .put('/api/auth/')
//         .then(response => {
//             if (response.status === 200) {
//                 sessionStorage.setItem("token", response.data.token);
//                 callback(null, response.data.token);
//               } else {
//                 callback(true, null);
//               }
//         })
//         .catch(error => {
//             callback(error, null);
//           });
// }


let getToken = (mail,callback) => {
    axios
    .post("/api/auth/" ,{
      email:mail
    })
    .then(response => {
      if (response.status === 200) {
        sessionStorage.setItem("token", response.data.token);
        callback(null, response.data.token);
      } else {
        callback(true, null);
      }
    })
    .catch(error => {
      callback(error, null);
    });
};

let postuserandgetToken = (names,mail,pic,callback) => {
  
  axios
  .post("/api/students/" ,{
    name:names,
    email:mail,
    photo:pic
  })
  .then(response => {
    if (response.status === 200) {
      sessionStorage.setItem("token", response.data.token);
      callback(null, response.data.token);
    } else {
      callback(true, null);
    }
  })
  .catch(error => {
    callback(error, null);
  });
};

let checkToken = () => {
  try {
    let decoded = jwtDecode(sessionStorage.getItem("token"));
    if (decoded.exp * 1000 > +new Date()) return true;
    else return false;
  } catch (e) {
    return false;
  }
};

let getDecodedToken = () => {
  try {
    return jwtDecode(sessionStorage.getItem("token"));
  } catch (e) {
    return null;
  }
};

module.exports = {
  getToken,
  checkToken,
  postuserandgetToken,
  getDecodedToken
};
