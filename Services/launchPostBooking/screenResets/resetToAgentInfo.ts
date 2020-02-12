import { NavigationStackProp } from "react-navigation-stack";
import {
  CONSTANT_feedbackInfo,
  CONSTANT_pocCardData
} from "../../../constants/apiUrls";
import apiCall from "../../networkRequests/apiCall";
import { ISOInfoResponse, openPostBookingHome } from "../launchPostBooking";
import { CONSTANT_responseSuccessStatus } from "../../../constants/stringConstants";
import { StackActions, NavigationActions } from "react-navigation";
import DebouncedAlert from "../../../CommonComponents/DebouncedAlert/DebouncedAlert";
import { IPocCardPropsData } from "../../../Screens/AgentInfoScreen/Components/AgentPocCard";
import {
  CONSTANT_passIcon,
  CONSTANT_visaRelatedFaqIcon,
  CONSTANT_paymentIcon
} from "../../../constants/imageAssets";
import { CONSTANT_openOPSIntroLoadFailureText } from "../../../constants/appText";
import { logError } from "../../errorLogger/errorLogger";
import { CONSTANT_awsJsonServer } from "../../../constants/serverUrls";

const pocCardDefaultData: IPocCardPropsData[] = [
  {
    title: "Vouchers",
    description: "All the travel documents you’ll need for your trip",
    iconName: CONSTANT_passIcon
  },
  {
    title: "Visa assistance",
    description:
      "Step-by-step assistance to ensure your visa application is perfect",
    iconName: CONSTANT_visaRelatedFaqIcon
  },
  {
    title: "Itinerary changes",
    description: "Any last-minute changes you want to make to your itinerary",
    iconName: CONSTANT_paymentIcon
  }
];

/**
 * Resets the application stack to agent info screen
 *
 * While resetting, it will make two api calls
 * - Fetching static text content stored as JSON in AWS
 * - Fetching the agent details from API
 *
 * The data fetching part is moved out of the component to ensure animations
 * are seamless for the user...
 */
const resetToAgentInfo = (
  navigation: NavigationStackProp<any>,
  itineraryId: string
) => {
  const resettingScreen = (pocCardData: IPocCardPropsData[]) => {
    apiCall(
      `${CONSTANT_feedbackInfo}?itineraryId=${itineraryId}&type=ACCOUNT_OWNER`,
      {},
      "GET"
    )
      .then((response: ISOInfoResponse) => {
        if (response.status === CONSTANT_responseSuccessStatus) {
          const { ownerName, imageUrl } = response.data;
          navigation.dispatch(
            StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({
                  routeName: "MainStack",
                  action: NavigationActions.navigate({
                    routeName: "AgentInfo",
                    params: {
                      itineraryId,
                      ownerName,
                      ownerImage: imageUrl,
                      pocCardData
                    }
                  })
                })
              ]
            })
          );
        } else {
          openPostBookingHome(navigation);
          DebouncedAlert(
            CONSTANT_openOPSIntroLoadFailureText.header,
            CONSTANT_openOPSIntroLoadFailureText.message
          );
        }
      })
      .catch(() => {
        openPostBookingHome(navigation);
        DebouncedAlert(
          CONSTANT_openOPSIntroLoadFailureText.header,
          CONSTANT_openOPSIntroLoadFailureText.message
        );
      });
  };

  fetch(`${CONSTANT_awsJsonServer}${CONSTANT_pocCardData}`)
    .then(response => response.json())
    .then((pocCardData: IPocCardPropsData[]) => {
      resettingScreen(pocCardData);
    })
    .catch(error => {
      resettingScreen(pocCardDefaultData);
      logError(error);
      DebouncedAlert(
        CONSTANT_openOPSIntroLoadFailureText.header,
        CONSTANT_openOPSIntroLoadFailureText.message
      );
    });
};

export default resetToAgentInfo;
