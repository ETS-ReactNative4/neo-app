import validateEmail from '../../../Services/validateEmail/validateEmail';
import validateMobileNumber from '../../../Services/validateMobileNumber/validateMobileNumber';

export const isPassengerFormValid = ({formData, ignoreDate = false}) => {
  return formData.map(data => {
    const {
      salutation,
      firstName,
      email,
      mobileNumber = {},
      countryPhoneCode,
      birthDay,
    } = data || {};
    const isSalutationInvalid = salutation ? false : true;
    const isNameInValid = !(firstName || '').trim().length;
    const isEmailInValid = !validateEmail(email);
    const isNumberInvalid = !validateMobileNumber(
      `${countryPhoneCode}${mobileNumber}`,
    );

    const isBirthDateInvalid = !(birthDay ? true : false);

    const error = {
      firstName: isNameInValid,
      salutation: isSalutationInvalid,
      email: isEmailInValid,
      mobileNumber: isNumberInvalid,
      birthDay: ignoreDate ? false : isBirthDateInvalid,
    };

    return Object.keys(error).reduce((errorData, key) => {
      if (error[key]) {
        errorData[key] = true;
      }
      return errorData;
    }, {});
  });
};
