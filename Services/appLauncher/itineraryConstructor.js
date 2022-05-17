import storeService from "../storeService/storeService";
import debouncer from "../debouncer/debouncer";

/**
 * Must be called every-time user selects an itineraries
 * - Will fetch voucher data and user data for trip chat
 * - Will generate all the required data for the tools
 */
const itineraryConstructor = ({ itineraryId, cities }) => {
  return new Promise((resolve, reject) => {
    storeService.voucherStore
      .selectVoucher(itineraryId)
      .then(() => {
        /**
         * Following tasks are asynchronous & optional
         * They don't disturb itinerary constructor if they fail
         */
        debouncer(() => {
          // storeService.emergencyContactsStore.getEmergencyContacts(cities);
          storeService.passportDetailsStore.updatePassportDetails(itineraryId);
          storeService.visaStore.getVisaHomeScreenDetails();
          storeService.supportStore.loadFaqDetails();
          storeService.tripFeedStore.generateTripFeed();
          storeService.weatherStore.reset();
          storeService.chatDetailsStore.getUserDetails();
          storeService.soFeedbackStore.loadSODetails(itineraryId);
        });
        resolve();
      })
      .catch(error => {
        reject(error);
      });
  });
};

export default itineraryConstructor;
