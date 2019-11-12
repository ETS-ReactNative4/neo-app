import { logError } from "../errorLogger/errorLogger";

/**
 * Used to make a block of code asynchronous
 * by wrapping it inside setTimeout
 * Used to prevent tasks from blocking system UI.
 */
const debouncer = (callback = () => null) => {
  return new Promise((resolve, reject) => {
    try {
      const result = callback();
      return resolve(result);
    } catch (error) {
      logError("Process crashed in the debouncer", { error });
      return reject(error);
    }
  });
};

export default debouncer;
