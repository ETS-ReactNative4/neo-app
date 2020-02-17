import { useState } from "react";

export interface IFormFields {
  phoneNumber: string;
  countryCode: string;
  countryFlag: string;
  code: string;
  name: string;
  email: string;
}

export type fieldUpdater = (value: string) => void;

export interface IFormUpdate {
  updatePhoneNumber: fieldUpdater;
  updateCountryCode: fieldUpdater;
  updateCountryFlag: fieldUpdater;
  updateCode: fieldUpdater;
  updateName: fieldUpdater;
  updateEmail: fieldUpdater;
}

const useLoginForm = (): [IFormFields, IFormUpdate] => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("+91");
  const [countryFlag, setCountryFlag] = useState<string>("🇮🇳");
  const [code, setCode] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const updatePhoneNumber: fieldUpdater = newNumber =>
    setPhoneNumber(newNumber);
  const updateCountryCode: fieldUpdater = ccode => setCountryCode(ccode);
  const updateCountryFlag: fieldUpdater = newFlag => setCountryFlag(newFlag);
  const updateCode: fieldUpdater = newCode => setCode(newCode);
  const updateName: fieldUpdater = newName => setName(newName);
  const updateEmail: fieldUpdater = newEmail => setEmail(newEmail);

  return [
    { phoneNumber, countryCode, countryFlag, code, name, email },
    {
      updatePhoneNumber,
      updateCountryCode,
      updateCountryFlag,
      updateCode,
      updateName,
      updateEmail
    }
  ];
};

export default useLoginForm;
