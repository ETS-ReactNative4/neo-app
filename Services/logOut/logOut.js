import store from "../../mobx/Store";
import * as Keychain from "react-native-keychain";
import {
  StackActions,
  NavigationActions,
  DrawerActions
} from "react-navigation";

const resetToSplash = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "Splash" })]
});

const closeDrawer = DrawerActions.closeDrawer();

const logOut = navigation => {
  navigation.dispatch(closeDrawer);
  Keychain.resetGenericPassword().then(() => {
    navigation.dispatch(resetToSplash);
  });
  store.itineraries.reset();
  store.appState.reset();
  store.yourBookingsStore.reset();
};

export default logOut;
