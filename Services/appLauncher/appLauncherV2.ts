import navigationServiceV2 from "../navigationService/navigationServiceV2";
import { logError } from "../errorLogger/errorLogger";
import { NavigationActions, StackActions } from "react-navigation";

const resetToLogin = NavigationActions.navigate({
  routeName: "MainStack",
  // @ts-ignore
  action: StackActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({
        routeName: "AppLogin"
      })
    ]
  })
});

const openLogin = () => {
  // navigationServiceV2.navigate("StoryBook");
  navigationServiceV2.dispatcher(resetToLogin);
};

const appLauncherV2 = () => {
  return new Promise<boolean>((resolve, reject) => {
    try {
      openLogin();
      resolve(true);
    } catch (err) {
      logError("Unable to launch App!", { err });
      reject(err);
    }
  });
};

export default appLauncherV2;
