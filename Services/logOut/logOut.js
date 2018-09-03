import store from "../../mobx/Store";
import * as Keychain from "react-native-keychain";
import {
  StackActions,
  NavigationActions,
  DrawerActions
} from "react-navigation";
import { setUserContext } from "../errorLogger/errorLogger";
import navigationService from "../navigationService/navigationService";

const resetToSplash = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "Splash" })],
  key: null
});

const closeDrawer = DrawerActions.closeDrawer();

const logOut = () => {
  const { navigation } = navigationService;

  navigation.dispatch(closeDrawer);
  Keychain.resetGenericPassword().then(() => {
    navigation.dispatch(resetToSplash);

    setTimeout(() => {
      store.itineraries.reset();
      store.appState.reset();
      store.yourBookingsStore.reset();
      store.voucherStore.reset();
      store.packingChecklistStore.reset();
      store.phrasesStore.reset();
    }, 100);
  });
  /**
   * TODO: Clear sentry user context
   * setUserContext();
   */
};

export default logOut;
