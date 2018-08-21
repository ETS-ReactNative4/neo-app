const apiUrls = {
  verifyMobileNumber: "mobile/user/verify/sendotp",
  verifyOtp: "mobile/login",
  getYourTrips: "mobile/yourtrips",
  getItineraryDetails: "mobile/itineraryDetails",
  getPackingChecklist: "mobile/displayCheckList",
  getCheckList: "mobile/getCheckList",
  updatePackingChecklist: "mobile/updateCheckList",
  voucherDetails: "mobile/voucher",
  getCurrencyRates: "api/live?access_key=6be04caa4f8d20ec8360509d61d03fd0",
  weatherHourlyForecast: (key, lat, long, time) =>
    `forecast/${key}/${lat},${long},${time}?exclude=flags,daily&units=si`,
  getUserDetails: "mobile/userdetails",

  customCheckListName: "Your list",
  hotelVoucher: "hotel",
  flightVoucher: "flight",
  activityVoucher: "activity",
  transferVoucher: "transfer"
};

export default apiUrls;
