import { logError } from "../errorLogger/errorLogger";

/**
 * Used to make a block of code asynchronous
 * by wrapping it inside setTimeout
 * Used to prevent tasks from blocking system UI.
 */
const debouncer = (callback: () => any = () => null) => {
  setTimeout(() => {
    try {
      return callback();
    } catch (error) {
      logError(error, { type: "Process crashed in the debouncer" });
      return false;
    }
  }, 0);
};

export default debouncer;
