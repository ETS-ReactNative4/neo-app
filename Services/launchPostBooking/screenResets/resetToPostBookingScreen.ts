import { NavigationStackProp } from "react-navigation-stack";
import { StackActions, NavigationActions } from "react-navigation";

/**
 * Resets the navigation stack to the post booking homepage
 *
 * This will take the user to the tripfeed.
 */
const resetToPostBookingScreen = (navigation: NavigationStackProp<any>) => {
  navigation.dispatch(
    StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: "MainStack",
          action: NavigationActions.navigate({
            routeName: "AppHome",
            action: NavigationActions.navigate({
              routeName: "BookedItineraryTabs"
            })
          })
        })
      ]
    })
  );
};

export default resetToPostBookingScreen;
