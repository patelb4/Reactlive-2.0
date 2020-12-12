function makeResponse(data, message, type, code, req) {
  var response = data;
  response = {
    Exceptions: "",
    Status: code,
    ResultType: type,
    Message: message,
    Data: data ? data : []
  };

  return response;
}

function getResponse(data, message, type, code, device) {
  var response = data;
  response = {
    Exceptions: "",
    Status: code,
    ResultType: type,
    Message: message,
    Data: data ? data : []
  };

  return response;
}

module.exports = {
  makeResponse,
  getResponse
};
