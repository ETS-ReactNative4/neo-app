import getLocaleString from "../../../Services/getLocaleString/getLocaleString";

// PT TODO: Better way to display the money...
const getPriceWithoutSymbol = (price: number) => {
  const amount = getLocaleString(price);
  const amountWithoutRupeeSymbol = amount.substr(2);
  const amountWithoutFixedDecimals = amount.includes(".")
    ? amountWithoutRupeeSymbol.slice(0, -3)
    : amountWithoutRupeeSymbol;
  return amountWithoutFixedDecimals;
};

export default getPriceWithoutSymbol;
