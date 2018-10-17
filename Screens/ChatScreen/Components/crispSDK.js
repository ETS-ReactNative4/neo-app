const crispSDK = (email, itineraryId, deviceToken = "device_token") => `
  setTimeout(function () {
    $crisp.push(["set", "user:email", "${email}"]);
    $crisp.push(["set", "session:data", [[["itineraryId", "${itineraryId}"], ["deviceToken", "${deviceToken}"]]]]);
  }, 10000)
`;

export default crispSDK;
