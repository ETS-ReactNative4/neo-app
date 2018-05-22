import currencyRates from "./currencyRates";

const currencyConverter = (amount, from, to, quotes = currencyRates.quotes) => {
  amount = parseInt(amount);

  function toUS(actualAmount) {
    const quote = quotes[from];
    return actualAmount / quote;
  }

  function toNative(usAmount) {
    const quote = quotes[to];
    return usAmount * quote;
  }

  const firstConversion = toUS(amount);
  const result = toNative(firstConversion);

  return result.toFixed(2);
};

export default currencyConverter;
