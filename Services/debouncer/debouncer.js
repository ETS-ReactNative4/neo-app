import { logError } from "../errorLogger/errorLogger";

/**
 * Used to make a block of code asynchronous
 * by wrapping it inside setTimeout
 * Used to prevent tasks from blocking system UI.
 */
const debouncer = (callback = () => null) => {
  setTimeout(() => {
    try {
      callback();
    } catch (error) {
      logError("Process crashed in the debouncer", { error });
    }
  }, 0);
};

export default debouncer;
