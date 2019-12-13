import { logError } from "../errorLogger/errorLogger";

/**
 * Used to make a block of code asynchronous
 * by wrapping it inside setTimeout
 * Used to prevent tasks from blocking system UI.
 */
const debouncer = (callback = () => null) => {
  setTimeout(() => {
    try {
      return callback();
    } catch (error) {
      logError("Process crashed in the debouncer", { error });
      return false;
    }
  }, 0);
};

export default debouncer;
