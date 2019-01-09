import navigationService from "../navigationService/navigationService";
import openCustomTab from "../openCustomTab/openCustomTab";
import storeService from "../storeService/storeService";
import PropTypes from "prop-types";

const resolveLinks = (link, screenProps) => {
  if (link) {
    if (link.includes("http://") || link.includes("https://")) {
      openCustomTab(link);
    } else if (link === "InfoCardModal") {
      navigationService.navigation._navigation.navigate("TripFeed");
      storeService.tripFeedStore.openInfoCardModal(screenProps);
    } else {
      navigationService.navigation._navigation.navigate(link);
    }
  }
};

export default resolveLinks;
