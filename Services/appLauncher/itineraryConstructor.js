import storeService from "../storeService/storeService";

/**
 * Must be called every-time user selects an itineraries
 * - Will fetch voucher data and user data for trip chat
 * - Will generate all the required data for the tools
 */
const itineraryConstructor = ({ itineraryId, cities }) => {
  storeService.voucherStore.selectVoucher(itineraryId);
  storeService.emergencyContactsStore.getEmergencyContacts(cities);
  storeService.passportDetailsStore.updatePassportDetails(itineraryId);
  storeService.visaStore.getVisaHomeScreenDetails();
  storeService.supportStore.loadFaqDetails();
  storeService.tripFeedStore.generateTripFeed();
  storeService.weatherStore.reset();
  storeService.chatDetailsStore.getUserDetails();
};

export default itineraryConstructor;
