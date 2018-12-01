const CrispSDK = `
  setTimeout(() => {
    var sessionId = $crisp.get("session:identifier");
    var email = $crisp.get("user:email");
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "https://platodev.pickyourtrail.com/Postapi/CrispSetEmailFallBack?session_id="+sessionId+"&email="+email);
    xmlhttp.send();
  }, 10000);
`;

// xmlhttp.setRequestHeader( 'Access-Control-Allow-Origin', '*');
// xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
// xmlhttp.send(JSON.stringify({ "session_id": sessionId, email: email}));

export default CrispSDK;
