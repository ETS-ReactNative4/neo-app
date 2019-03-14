import React from "react";
import { isValidNumber } from "libphonenumber-js";
import { parsePhoneNumberFromString } from "libphonenumber-js/mobile";

const validateMobileNumber = mobileNumber => {
  return (
    isValidNumber(mobileNumber) &&
    parsePhoneNumberFromString(mobileNumber).isValid()
  );
};

export default validateMobileNumber;
