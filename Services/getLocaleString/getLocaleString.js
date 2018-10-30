const getLocaleString = amount =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(
    amount
  );

export default getLocaleString;
