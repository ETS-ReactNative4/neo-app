import { getLocales, findBestAvailableLanguage } from "react-native-localize";

const locales = getLocales();

const languageCodes = locales.map(each => each.languageTag);

export const systemLanguageCode =
  findBestAvailableLanguage(languageCodes)?.languageTag ?? "en-IN";

const getLocaleString = amount => {
  if (typeof amount === "number") {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR"
    }).format(amount);
  } else {
    return `₹ ${amount}`;
  }
};

export const getLocaleStringGlobal = ({
  amount,
  languageCode = systemLanguageCode,
  currency = "INR"
}) => {
  if (typeof amount === "number") {
    return new Intl.NumberFormat(languageCode, {
      style: "currency",
      currency
    }).format(amount);
  } else {
    return amount;
  }
};

export default getLocaleString;
