import constants from "../../../constants/constants";

const CrispSDK = `
var callFallback = function () {
  setTimeout(function() {
    var sessionId = $crisp.get("session:identifier");
    var email = $crisp.get("user:email");
    var request = new XMLHttpRequest();
    var url = "${constants.platoServerUrl}Postapi/CrispSetEmailFallBack";
    if(email) {
      if (request.withCredentials !== undefined) {
        request.open("POST", url, true);
        request.setRequestHeader("Access-Control-Allow-Origin", "*");
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.send(JSON.stringify({ "session_id": sessionId, email: email}));
      } else {
        request.open("GET", url + "?session_id="+sessionId+"&email="+email, true);
        request.send();
      }
    } else {
      callFallback();
    }
  }, 10000);
};
callFallback();
`;

// request.setRequestHeader('X-PINGOTHER', 'pingpong');

export default CrispSDK;
