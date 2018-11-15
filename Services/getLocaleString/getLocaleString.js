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

export default getLocaleString;
