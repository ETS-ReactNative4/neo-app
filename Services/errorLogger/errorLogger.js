import { Sentry as sentry } from "react-native-sentry";

sentry
  .config(
    "https://af21f52962874bf49a888d1826e5a827:dbbf31a3751e420d8d579f33139558fc@sentry.io/1216774",
    {
      captureUnhandledRejections: true
    }
  )
  .install();

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
