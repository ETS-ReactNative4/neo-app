import { Sentry as sentry } from "react-native-sentry";
import PackageInfo from "../../package.json";

sentry
  .config(
    "https://af21f52962874bf49a888d1826e5a827:dbbf31a3751e420d8d579f33139558fc@sentry.io/1216774"
  )
  .install();

sentry.setTagsContext({
  environment: PackageInfo.environment
});

export const logError = (error, extraInfo = {}) =>
  sentry.captureException(error, { extra: extraInfo });

export const logBreadCrumb = ({ message, category, data }) =>
  sentry.captureBreadcrumb({ message, category, data });

export const setUserContext = ({ email, id }) => {
  if (!email || !id) {
    sentry.setUserContext();
  } else {
    sentry.setUserContext({ email, id });
  }
};
