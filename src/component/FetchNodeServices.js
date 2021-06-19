var axios = require("axios");
var ServerURL = "http://localhost:8008";
// http://localhost:8008
// http://203.190.153.19:8008

const postDataAndImage = async (url, formData, config) => {
  try {
    var response = await axios.post(`${ServerURL}/${url}`, formData, config);
    const result = response.data.RESULT;
    return result;
  } catch (e) {
    return e;
  }
};

const getData = async (url) => {
  try {
    const response = await axios.get(`${ServerURL}/${url}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("TOKEN"),
      },
    });
    return response;
  } catch (e) {
    return e;
  }
};

const postData = async (url, body) => {
  try {
    const res = await axios.post(`${ServerURL}/${url}`, body, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("TOKEN"),
      },
    });
    // console.log("res: ", res);
    return res.data;
  } catch (err) {
    console.log("err: ", err);
    return err;
  }
};

const patchData = async (url, body) => {
  try {
    const res = await axios.patch(`${ServerURL}/${url}`, body, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("TOKEN"),
      },
    });
    // console.log("res: ", res);
    return res.data;
  } catch (err) {
    console.log("err: ", err);
    return err;
  }
};

export { postDataAndImage, ServerURL, getData, postData, patchData };
