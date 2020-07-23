import storeService from "../storeService/storeService";

const getLocaleString = amount => {
  if (typeof amount === "number") {
    // eslint-disable-next-line no-undef
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
  languageCode = storeService?.deviceLocaleStore?.deviceLocaleCode ?? "en-IN",
  currency = "INR"
}) => {
  if (typeof amount === "number") {
    // eslint-disable-next-line no-undef
    return new Intl.NumberFormat(languageCode, {
      style: "currency",
      currency
    }).format(amount);
  } else {
    return amount;
  }
};

export default getLocaleString;
