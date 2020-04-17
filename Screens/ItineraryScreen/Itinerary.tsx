import React, { useEffect, useState, useRef } from "react";
import { AppNavigatorProps } from "../../NavigatorsV2/AppNavigator";
import { SCREEN_ITINERARY } from "../../NavigatorsV2/ScreenNames";
import apiCall from "../../Services/networkRequests/apiCall";
import { CONSTANT_packages } from "../../constants/apiUrls";
import { ICampaignItinerary } from "../../TypeInterfaces/ICampaignItinerary";
import { IMobileServerResponse } from "../../TypeInterfaces/INetworkResponse";
import { CONSTANT_responseSuccessStatus } from "../../constants/stringConstants";
import { toastBottom } from "../../Services/toast/toast";
import UnbookedItinerary from "./ItineraryStore/UnbookedItinerary";
import CampaignItinerary from "./Components/CampaignItinerary/CampaignItinerary";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";

export type ItineraryNavType = AppNavigatorProps<typeof SCREEN_ITINERARY>;

export interface ICampaignItineraryServerResponse
  extends IMobileServerResponse {
  data: ICampaignItinerary;
}

export interface ItineraryProps extends ItineraryNavType {}

const Itinerary = ({ route, navigation }: ItineraryProps) => {
  const [
    campaignItineraryState,
    setCampaignItineraryState
  ] = useState<ICampaignItinerary | null>(null);

  const itineraryDetails = useRef<UnbookedItinerary | null>(null);

  useEffect(() => {
    const { slug = "" } = route.params;
    if (slug) {
      // The itinerary is a campaign Itinerary
      apiCall(CONSTANT_packages, {
        key: slug
      })
        .then((response: ICampaignItineraryServerResponse) => {
          if (response.status === CONSTANT_responseSuccessStatus) {
            itineraryDetails.current = new UnbookedItinerary(
              response.data.campaignItinerary
            );
            setCampaignItineraryState(response.data);
          } else {
            toastBottom("Unable to retrieve Itinerary info");
            navigation.goBack();
          }
        })
        .catch(() => {
          toastBottom("Unable to retrieve Itinerary info");
          navigation.goBack();
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!itineraryDetails.current || !campaignItineraryState) {
    return null;
  }

  return (
    <CampaignItinerary
      campaignItineraryState={campaignItineraryState}
      itineraryDetails={itineraryDetails.current}
      navigation={navigation}
      route={route}
    />
  );
};

export default ErrorBoundary()(Itinerary);
