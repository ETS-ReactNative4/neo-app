import getLocaleString from "../../../Services/getLocaleString/getLocaleString";
import { getLocales, findBestAvailableLanguage } from "react-native-localize";

const locales = getLocales();

const languageCodes = locales.map(each => each.languageCode);

const systemLanguageCode =
  findBestAvailableLanguage(languageCodes)?.languageTag ?? "en-IN";

// PT TODO: Better way to display the money...
const getPriceWithoutSymbol = (price: number) => {
  const amount = getLocaleString(price);
  const amountWithoutRupeeSymbol = amount.substr(2);
  const amountWithoutFixedDecimals = amount.includes(".")
    ? amountWithoutRupeeSymbol.slice(0, -3)
    : amountWithoutRupeeSymbol;
  return amountWithoutFixedDecimals;
};

// Based on https://stackoverflow.com/a/58653059/5597641

function getCurrencySymbol(locale: string, currency: string) {
  return (0)
    .toLocaleString(locale, {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    .replace(/\d/g, "")
    .trim();
}

export const getGlobalPriceWithoutSymbol = ({
  amount,
  languageCode = systemLanguageCode,
  currency = "INR"
}: {
  amount: number;
  languageCode?: string;
  currency?: string;
}) => {
  const amountFormatter = new Intl.NumberFormat(languageCode, {
    style: "currency",
    currency,
    currencyDisplay: "symbol"
  });
  const localCurrencySymbol = getCurrencySymbol(languageCode, currency);
  let amountString = amountFormatter.format(amount);
  amountString = amountString.replace(localCurrencySymbol, "");
  return amountString;
};

export default getPriceWithoutSymbol;
