import { useState } from "react";

export type contactHoursType = 1 | 2 | 3 | 4 | 5;

export const contactHoursMap = {
  1: "9am to 11am (Peak hours)",
  2: "11am to 1pm (Lean period)",
  3: "1pm to 5pm (Lean period)",
  4: "5pm to 7pm (Peak hours)",
  5: "Call me anytime"
};

export interface IRequestCallbackFormFields {
  name: string;
  countryCode: string;
  mobileNumber: string;
  email: string;
  contactHours: contactHoursType;
}

export interface IRequestCallbackUpdateMethods {
  updateName: (text: string) => void;
  updateCountryCode: (text: string) => void;
  updateMobileNumber: (text: string) => void;
  updateEmail: (text: string) => void;
  updateContactHours: (option: contactHoursType) => void;
}

const useRequestCallbackForm = (): [
  IRequestCallbackFormFields,
  IRequestCallbackUpdateMethods
] => {
  const [name, setName] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("+91");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [contactHours, setContactHours] = useState<contactHoursType>(1);

  const updateName = (text: string) => setName(text);
  const updateMobileNumber = (text: string) => setMobileNumber(text);
  const updateEmail = (text: string) => setEmail(text);
  const updateContactHours = (option: contactHoursType) =>
    setContactHours(option);
  const updateCountryCode = (text: string) => setCountryCode(text);

  return [
    {
      name,
      countryCode,
      mobileNumber,
      email,
      contactHours
    },
    {
      updateName,
      updateCountryCode,
      updateMobileNumber,
      updateEmail,
      updateContactHours
    }
  ];
};

export default useRequestCallbackForm;
