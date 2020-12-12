function formatSignUpUserObjetc(data, token = "") {
  var data = {
    id: data._id,
    email: data.local.email ? data.local.email : "",
    token: token
  };
  // console.log(data);
  return data;
}

function formatLoginUserObjetc(data, token = "") {
  var data = {
    id: data._id,
    email: data.local.email ? data.local.email : "",
    token: token
  };
  // console.log(data);
  return data;
}

module.exports = {
  formatSignUpUserObjetc,
  formatLoginUserObjetc
};
