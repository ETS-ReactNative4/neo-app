import store from "../../mobx/Store";
import * as Keychain from "react-native-keychain";
import { StackActions, NavigationActions } from "react-navigation";

const resetToSplash = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "Splash" })]
});

const logOut = navigation => {
  Keychain.resetGenericPassword().then(() => {
    navigation.dispatch(resetToSplash);
  });
  store.itineraries.reset();
  store.appState.reset();
  store.yourBookingsStore.reset();
};

export default logOut;
