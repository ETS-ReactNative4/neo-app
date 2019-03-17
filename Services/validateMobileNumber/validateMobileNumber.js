import { isValidNumber } from "libphonenumber-js";
import { parsePhoneNumberFromString } from "libphonenumber-js/mobile";

/**
 * Checks if the mobile can exist in the given country code
 */
const validateMobileNumber = mobileNumber => {
  return (
    isValidNumber(mobileNumber) &&
    parsePhoneNumberFromString(mobileNumber).isValid()
  );
};

/**
 * Only checks the number of valid digits in the mobile number
 */
export const validateLoginMobileNumber = mobileNumber =>
  isValidNumber(mobileNumber);

export default validateMobileNumber;
