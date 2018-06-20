const serverUrls = {
  devServer: "https://dev.pickyourtrail.com/",
  localServer: "http://192.168.0.11:8080/",
  cityImageBaseUrl: "https://d3lf10b5gahyby.cloudfront.net/city/960xh/",

  verifyMobileNumber: "mobile/user/verify/sendotp",
  verifyOtp: "mobile/login",
  getYourTrips: "mobile/yourtrips",
  getItineraryDetails: "mobile/itineraryDetails",
  getCurrencyRates: "api/live?access_key=6be04caa4f8d20ec8360509d61d03fd0",

  darkSkyKey: "1f95e4bd24b4377d484d0cfceae84a74",
  darkSkyDomain: "https://api.darksky.net/",
  weatherHourlyForecast: (key, lat, long, time) =>
    `forecast/${key}/${lat},${long},${time}?exclude=flags,daily&units=si`
};

export default serverUrls;
