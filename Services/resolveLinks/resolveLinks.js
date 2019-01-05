import navigationService from "../navigationService/navigationService";

const resolveLinks = (link, screenProps) => {
  if (link) {
    navigationService.navigation._navigation.navigate(link);
  }
};

export default resolveLinks;
