import isValidMobileNumber from '../../../helpers/utils/isValidMobileNumber';
import validateEmail from '../../../Services/validateEmail/validateEmail';
import validateMobileNumber from '../../../Services/validateMobileNumber/validateMobileNumber';
import {emailValidation} from '../../validations';

const validateDate = date => {
  const dateSplit = date.split('/');
  const dateFormat = new Date(
    `${dateSplit[2]}-${dateSplit[1]}-${dateSplit[0]}`,
  );
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const dayDiff = Math.round((new Date() - dateFormat) / oneDay);
  const yearDiff = new Date().getFullYear() - dateSplit[2];
  const isvalidDate =
    dateFormat < new Date() && yearDiff >= 0 && yearDiff <= 100 && dayDiff > 2;

  return isvalidDate;
};

export const isPassengerFormValid = ({formData, ignoreDate = false}) => {
  return formData.map(data => { console.log('data',data)
    const {salutation, firstName, email, mobileNumber = {},countryPhoneCode, birthDay} =
      data || {};
    const isSalutationInvalid = salutation ? false : true;
    const isNameInValid = !(firstName || '').trim().length;
    const isEmailInValid = !validateEmail(email);
    const isNumberInvalid = !validateMobileNumber(
      `${countryPhoneCode}${mobileNumber}`,
    );

    // const isValidBirthDate = birthday ? validateDate(birthday) : false;
    const isBirthDateInvalid = false;

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
