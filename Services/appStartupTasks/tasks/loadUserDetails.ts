import isUserLoggedIn from "../../isUserLoggedIn/isUserLoggedIn";
import storeService from "../../storeService/storeService";

const loadUserDetails = () => {
  isUserLoggedIn()
    .then(result => {
      if (result) {
        storeService.userStore.getUserDisplayDetails();
      }
    })
    .catch(() => null);
};

export default loadUserDetails;
