import { setUserAttributes } from "../analytics/analyticsService";
import Moment from "moment";
import { extendMoment } from "moment-range";
import storeService from "../storeService/storeService";
import { logError, setUserContext } from "../errorLogger/errorLogger";

const moment = extendMoment(Moment);

const userTypes = {
  guest: "guest",
  booked: "booked",
  pastBooked: "past-booked"
};

/**
 * This should only execute 5 seconds after the app launch
 * so that user has all the data loaded from cache and ready to be categorized.
 *
 * The `setTimeout` is essential.
 */
const setUserSegment = () => {
  setTimeout(() => {
    try {
      /**
       * Check if user has selected any itineraries
       */
      if (storeService.itineraries.selectedItineraryId) {
        /**
         * Fetch the user details and set the context in sentry
         */
        const userDetails = storeService.userStore.userDetails;
        const { mob_num: id = "", name = "", email = "" } = userDetails;
        setUserContext({ email, id, name });

        /**
         * Set the region on which the user's itinerary is present
         */
        setUserAttributes("region", storeService.itineraries.regionName);

        /**
         * Set the cities and countries the user will be visiting
         */
        const countryList = storeService.itineraries.countries;
        const cityList = storeService.itineraries.cities;
        const countries = countryList.map(countryObject => countryObject.name);
        const cities = cityList.map(cityObject => cityObject.city);
        setUserAttributes("countries", countries);
        setUserAttributes("cities", cities);

        /**
         * Check if user has booked a trip with us or not
         */
        const upcomingTrips =
          storeService.yourBookingsStore.upcomingItineraries;
        const completedTrips =
          storeService.yourBookingsStore.completedItineraries;
        if (upcomingTrips.length) {
          setUserAttributes("userType", userTypes.booked);
        } else if (completedTrips.length) {
          setUserAttributes("userType", userTypes.pastBooked);
        } else {
          setUserAttributes("userType", userTypes.guest);
        }

        /**
         * Check if user has applied for visa with us
         */
        const isVisaPurchased = !!storeService.itineraries.visa.length;
        if (isVisaPurchased) {
          setUserAttributes("visaSupport", true);
        } else {
          setUserAttributes("visaSupport", false);
        }

        /**
         * Calculate whether the user is on trip or not
         */
        const tripDays = storeService.itineraries.days;
        const startDay = tripDays[0];
        const endDay = tripDays[tripDays.length - 1];
        const today = moment().toDate();
        const range = moment.range(startDay, endDay);
        const isUserInTrip = range.contains(today);
        if (isUserInTrip) {
          setUserAttributes("onTrip", true);
        } else {
          setUserAttributes("onTrip", false);
        }
      } else {
        /**
         * User hasn't selected any itineraries hence
         * he is in guest state
         */
        setUserAttributes("userType", userTypes.guest);
      }
    } catch (e) {
      logError("Error while trying to set user segment", { e });
    }
  }, 5000);
};

export default setUserSegment;
