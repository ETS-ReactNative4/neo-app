import { logError } from "../errorLogger/errorLogger";

const matchQueryWithText = (query: string, text: string): boolean => {
  try {
    const normalizedQString = query.replace(/ /g, "").toUpperCase();
    const normalizedTextString = text.replace(/ /g, "").toUpperCase();
    return normalizedTextString.includes(normalizedQString);
  } catch (e) {
    logError(e);
    return false;
  }
};

export default matchQueryWithText;
