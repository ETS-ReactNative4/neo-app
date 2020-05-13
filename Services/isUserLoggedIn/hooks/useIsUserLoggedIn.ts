import isUserLoggedIn from "../isUserLoggedIn";
import { logError } from "../../errorLogger/errorLogger";
import { useState, useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";

const useIsUserLoggedIn = () => {
  const [isLoggedInUser, setIsLoggedInUser] = useState(true);

  const checkLoginStatus = () => {
    isUserLoggedIn()
      .then(result => {
        setIsLoggedInUser(result);
      })
      .catch(logError);
  };

  useFocusEffect(
    useCallback(() => {
      checkLoginStatus();
    }, [])
  );

  useEffect(
    useCallback(() => {
      checkLoginStatus();
    }, []),
    []
  );

  return isLoggedInUser;
};

export default useIsUserLoggedIn;
