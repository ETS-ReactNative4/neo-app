import hydrate from "../../hydrate/hydrate";
import storeService from "../../storeService/storeService";
import { logError } from "../../errorLogger/errorLogger";

/**
 * This promise will check if user has completed the welcome flow
 * before he moves into the post booking flow.
 *
 * Involves hydrating the state from past session hence it is asynchronous
 */
const isPostBookingWelcomePending = (): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    Promise.all([
      hydrate("_seenOPSIntro", storeService.userFlowTransitionStore),
      hydrate("_completedSOFeedback", storeService.userFlowTransitionStore),
      hydrate("_seenPostBookingIntro", storeService.userFlowTransitionStore),
      hydrate("_selectedItinerary", storeService.itineraries)
    ])
      .then(() => {
        const {
          completedSOFeedback,
          seenOPSIntro,
          seenPostBookingIntro
        } = storeService.userFlowTransitionStore;
        if (completedSOFeedback && seenOPSIntro && seenPostBookingIntro) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(error => {
        logError(error);
        reject();
      });
  });
};

export default isPostBookingWelcomePending;
