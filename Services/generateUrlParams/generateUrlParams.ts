import { logError } from "../errorLogger/errorLogger";

const generateUrlParams = (requestObject: { [key: string]: any }): string => {
  try {
    return (
      "?" +
      Object.keys(requestObject)
        .map((key: string) => key + "=" + requestObject[key])
        .join("&")
    );
  } catch (e) {
    logError(e);
    return "";
  }
};

export default generateUrlParams;
