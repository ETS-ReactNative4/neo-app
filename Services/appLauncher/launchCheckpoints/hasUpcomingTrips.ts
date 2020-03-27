/**
 * Checks if the user has upcoming trips
 *
 * The data should be available offline otherwise it will go to state saver flow
 */
import hydrate from "../../hydrate/hydrate";
import storeService from "../../storeService/storeService";

const hasUpcomingTrips = (): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    hydrate("_upcomingItineraries", storeService.yourBookingsStore)
      .then(() => {
        resolve(storeService.yourBookingsStore.hasUpcomingItineraries);
      })
      .catch(reject);
  });
};

export default hasUpcomingTrips;
