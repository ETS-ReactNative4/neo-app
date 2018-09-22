import { Sentry as sentry } from "react-native-sentry";
import PackageInfo from "../../package.json";

if (!__DEV__) {
  sentry
    .config("https://af21f52962874bf49a888d1826e5a827@sentry.io/1216774")
    .install();
}

sentry.setTagsContext({
  environment: PackageInfo.environment
});

export const logError = (error, extraInfo = {}) =>
  sentry.captureException(error, { extra: extraInfo });

export const logBreadCrumb = ({ message, category, data }) =>
  sentry.captureBreadcrumb({ message, category, data });

export const setUserContext = ({ email, userID }) => {
  if (!email || !userID) {
    /**
     * TODO: Logout user from sentry
     * sentry.setUserContext({ email: "", userID: "" });
     */
  } else {
    sentry.setUserContext({ email, userID });
  }
};
