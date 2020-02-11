import { NavigationStackProp } from "react-navigation-stack";
import { NavigationActions, StackActions } from "react-navigation";
import { IPostBookingIntroData } from "../../../Screens/PostBookingIntroScreen/PostBookingIntro";
import DebouncedAlert from "../../../CommonComponents/DebouncedAlert/DebouncedAlert";
import { logError } from "../../errorLogger/errorLogger";
import { CONSTANT_postBookingLoadFailureText } from "../../../constants/appText";
import { CONSTANT_awsJsonServer } from "../../../constants/serverUrls";
import { CONSTANT_postBookingIntroData } from "../../../constants/apiUrls";
import storeService from "../../storeService/storeService";
import moment from "moment";

const postBookingIntroDefaultData: IPostBookingIntroData[] = [
  {
    title: "It’s vacay time! Let the fun begin!",
    description: "You are :pendingDays days away from the best holiday ever!",
    image:
      "https://pyt-voyager.s3.ap-south-1.amazonaws.com/so-feedback/intro-cover-images/1.png"
  },
  {
    title: "Live on-trip support",
    description: "Your trip is important to us. We’ll stay on the line :)",
    image:
      "https://pyt-voyager.s3.ap-south-1.amazonaws.com/so-feedback/intro-cover-images/2.png"
  },
  {
    title: "Visa assistance",
    description:
      "You do the travelling. We’ll take care of the paperwork—visa assistance every step of the way!",
    image:
      "https://pyt-voyager.s3.ap-south-1.amazonaws.com/so-feedback/intro-cover-images/3.png"
  },
  {
    title: "Easy access to everything travel",
    description:
      "You’ve got all your bookings in one place—flights, hotels, activities—you tap it and it’s here!",
    image:
      "https://pyt-voyager.s3.ap-south-1.amazonaws.com/so-feedback/intro-cover-images/4.png"
  }
];

const setDynamicValuesToString = (
  data: IPostBookingIntroData[]
): IPostBookingIntroData[] => {
  return data.map((item: IPostBookingIntroData) => {
    const { startDate } = storeService.itineraries.startEndDates;
    const today = moment();
    const dateDiff = -today.diff(startDate, "days");

    return {
      title: item.title.replace(":pendingDays", `${dateDiff}`),
      description: item.description.replace(":pendingDays", `${dateDiff}`),
      image: item.image
    };
  });
};

/**
 * Resets the application stack to post booking intro
 *
 * While resetting, it will make the following api call
 * - Fetching static text content stored as JSON in AWS
 *
 * The data fetching part is moved out of the component to ensure animations
 * are seamless for the user...
 */
const resetToPostBookingIntro = (navigation: NavigationStackProp<any>) => {
  const resettingScreen = (introData: IPostBookingIntroData[]) => {
    navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: "MainStack",
            action: NavigationActions.navigate({
              routeName: "PostBookingIntro",
              params: {
                introData: setDynamicValuesToString(introData)
              }
            })
          })
        ]
      })
    );
  };

  fetch(`${CONSTANT_awsJsonServer}${CONSTANT_postBookingIntroData}`)
    .then(response => response.json())
    .then((appIntroData: IPostBookingIntroData[]) => {
      resettingScreen(appIntroData);
    })
    .catch(error => {
      resettingScreen(postBookingIntroDefaultData);
      logError(error);
      DebouncedAlert(
        CONSTANT_postBookingLoadFailureText.header,
        CONSTANT_postBookingLoadFailureText.message
      );
    });
};

export default resetToPostBookingIntro;
