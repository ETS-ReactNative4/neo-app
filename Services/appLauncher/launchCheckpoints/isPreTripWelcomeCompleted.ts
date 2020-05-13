import hydrate from "../../hydrate/hydrate";
import storeService from "../../storeService/storeService";

const isPreTripWelcomeCompleted = () => {
  return new Promise<boolean>((resolve, reject) => {
    Promise.all([hydrate("_welcomeState", storeService.welcomeStateStore)])
      .then(() => {
        if (storeService.welcomeStateStore.skippedAt) {
          resolve(true);
        } else {
          resolve(
            storeService.welcomeStateStore.seenMaritalStatus &&
              storeService.welcomeStateStore.seenTravelCountryPicker &&
              storeService.welcomeStateStore.seenTravelCountryPicker
          );
        }
      })
      .catch(reject);
  });
};

export default isPreTripWelcomeCompleted;
