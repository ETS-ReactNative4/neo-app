import {CommonActions} from '@react-navigation/native';
import {
  SCREEN_PRETRIP_HOME_TABS,
  SCREEN_EXPLORE_TAB,
} from '../../NavigatorsV2/ScreenNames';
import {IExplorePageScreenData} from '../../NavigatorsV2/PreTripHomeTabs';

/**
 * Returns a navigation config that can be dispatched by react navigation.
 * Resets entire navigation stack & Opens PreTrip Home page
 */
const launchPretripHome = (screenData: IExplorePageScreenData = {}) => {
  return CommonActions.reset({
    index: 0,
    routes: [
      {
        name: SCREEN_PRETRIP_HOME_TABS,
        state: {
          routes: [
            {
              name: SCREEN_EXPLORE_TAB,
              params: screenData,
            },
          ],
        },
      },
    ],
  });
};

export default launchPretripHome;

/**
 * Open Pre trip screens
 */
export const launchPretripScreen = (params: {}) => {
  return CommonActions.reset({
    index: 0,
    routes: [
      {
        name: SCREEN_PRETRIP_HOME_TABS,
        params: params,
      },
    ],
  });
};
