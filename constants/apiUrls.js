const apiUrls = {
  verifyMobileNumber: "mobile/user/verify/sendotp",
  verifyOtp: "mobile/login",
  getYourTrips: "mobile/yourtrips",
  getItineraryDetails: "mobile/itineraryDetails",
  getPackingChecklist: "mobile/displayCheckList",
  updatePackingChecklist: "mobile/updateCheckList",
  customCheckListName: "Your list",
  voucherDetails: "mobile/getVouchers",
  getCurrencyRates: "api/live?access_key=6be04caa4f8d20ec8360509d61d03fd0",
  weatherHourlyForecast: (key, lat, long, time) =>
    `forecast/${key}/${lat},${long},${time}?exclude=flags,daily&units=si`
};

export default apiUrls;
