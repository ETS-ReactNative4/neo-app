import navigationService from "../navigationService/navigationService";
import openCustomTab from "../openCustomTab/openCustomTab";

const resolveLinks = (link, screenProps) => {
  if (link) {
    if (link.includes("http://") || link.includes("https://")) {
      openCustomTab(link);
    } else {
      navigationService.navigation._navigation.navigate(link);
    }
  }
};

export default resolveLinks;
