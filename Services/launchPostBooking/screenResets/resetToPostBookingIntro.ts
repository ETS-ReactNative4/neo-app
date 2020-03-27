import { IPostBookingIntroData } from "../../../Screens/PostBookingIntroScreen/PostBookingIntro";
import { logError } from "../../errorLogger/errorLogger";
import { CONSTANT_awsJsonServer } from "../../../constants/serverUrls";
import { CONSTANT_postBookingIntroData } from "../../../constants/apiUrls";
import storeService from "../../storeService/storeService";
import moment from "moment";
import { navigationDispatcher } from "../../navigationService/navigationServiceV2";
import { CommonActions } from "@react-navigation/native";
import { SCREEN_POST_BOOKING_INTRO } from "../../../NavigatorsV2/ScreenNames";

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

    /**
     * Prevent showing 1,0 or negative numbers to the users.
     * Useful if the user state transition fails.
     */
    const description = item.description.includes(":pendingDays")
      ? dateDiff < 2
        ? "Welcome to the best holiday ever!"
        : item.description.replace(":pendingDays", `${dateDiff}`)
      : item.description;

    return {
      title: item.title.replace(":pendingDays", `${dateDiff}`),
      description,
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
const resetToPostBookingIntro = () => {
  const resettingScreen = (introData: IPostBookingIntroData[]) => {
    navigationDispatcher(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: SCREEN_POST_BOOKING_INTRO,
            params: { introData: setDynamicValuesToString(introData) }
          }
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
    });
};

export default resetToPostBookingIntro;
