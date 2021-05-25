const axios = require("axios");

function fetchHome() {
  axios
    .get("http://localhost:3001/api")
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
}

export default fetchHome;
