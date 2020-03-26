import hydrate from "../../hydrate/hydrate";
import storeService from "../../storeService/storeService";

const isPreTripWelcomePending = (): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    Promise.all([hydrate("_welcomeState", storeService.welcomeStateStore)])
      .then(() => {
        resolve(
          storeService.welcomeStateStore.seenMaritalStatus &&
            storeService.welcomeStateStore.seenTravelCountryPicker &&
            storeService.welcomeStateStore.seenTravelCountryPicker
        );
      })
      .catch(reject);
  });
};

export default isPreTripWelcomePending;
