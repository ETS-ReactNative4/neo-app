import { NavigationStackProp } from "react-navigation-stack";
import { NavigationActions, StackActions } from "react-navigation";
import { IPostBookingIntroData } from "../../../Screens/PostBookingIntroScreen/PostBookingIntro";
import DebouncedAlert from "../../../CommonComponents/DebouncedAlert/DebouncedAlert";
import { logError } from "../../errorLogger/errorLogger";
import { CONSTANT_postBookingLoadFailureText } from "../../../constants/appText";
import { CONSTANT_awsJsonServer } from "../../../constants/serverUrls";
import { CONSTANT_postBookingIntroData } from "../../../constants/apiUrls";

const postBookingIntroDefaultData: IPostBookingIntroData[] = [
  {
    title: "Hello Prabu,",
    description:
      "We'll use your preference info to make better and more relevant recommendations.",
    image:
      "https://pyt-voyager.s3.ap-south-1.amazonaws.com/so-feedback/intro-cover-images/1.png"
  },
  {
    title: "Live on-trip support",
    description:
      "We'll use your preference info to make better and more relevant recommendations.",
    image:
      "https://pyt-voyager.s3.ap-south-1.amazonaws.com/so-feedback/intro-cover-images/2.png"
  },
  {
    title: "Visa assistance",
    description:
      "We'll use your preference info to make better and more relevant recommendations.",
    image:
      "https://pyt-voyager.s3.ap-south-1.amazonaws.com/so-feedback/intro-cover-images/3.png"
  },
  {
    title: "Access to travel vouchers",
    description:
      "We'll use your preference info to make better and more relevant recommendations.",
    image:
      "https://pyt-voyager.s3.ap-south-1.amazonaws.com/so-feedback/intro-cover-images/4.png"
  }
];

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
                introData
              }
            })
          })
        ]
      })
    );
  };

  // @ts-ignore
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
