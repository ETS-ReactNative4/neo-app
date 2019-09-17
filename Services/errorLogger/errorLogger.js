import * as sentry from "@sentry/react-native";
import { getEnvironmentName } from "../getEnvironmentDetails/getEnvironmentDetails";

if (!__DEV__) {
  sentry.init({
    dsn: "https://af21f52962874bf49a888d1826e5a827@sentry.io/1216774",
    environment: getEnvironmentName(),
    beforeSend(event, hint) {
      return eventFilter(event, hint);
    }
  });
}

export const logError = (error, extraInfo = {}) => {
  if (__DEV__) {
    console.error(error);
    console.log(extraInfo);
  } else {
    sentry.captureException(error, { extra: extraInfo });
  }
};

export const logBreadCrumb = ({ message, category, data, level }) =>
  sentry.addBreadcrumb({ message, category, data, level });

export const setUserContext = ({ email, id, name } = {}) => {
  if (!email || !id) {
    /**
     * TODO: Do we need to Logout user from sentry?
     * sentry.setUserContext({ email: "", userID: "" });
     */
  } else {
    sentry.setUser({ email, id, name });
  }
};

const eventFilter = (event, hint) => {
  const error = hint.originalException;

  if (error) {
    /**
     * Filter out the no internet cases
     */
    if (error.message === "Network request failed") {
      return null;
    }
  }

  return event;
};
