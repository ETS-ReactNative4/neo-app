import React, { useEffect, useState, useRef } from "react";
import { AppNavigatorProps } from "../../NavigatorsV2/AppNavigator";
import { SCREEN_ITINERARY } from "../../NavigatorsV2/ScreenNames";
import apiCall from "../../Services/networkRequests/apiCall";
import {
  CONSTANT_packages,
  CONSTANT_itineraryDetails
} from "../../constants/apiUrls";
import { ICampaignItinerary } from "../../TypeInterfaces/ICampaignItinerary";
import { IMobileServerResponse } from "../../TypeInterfaces/INetworkResponse";
import { CONSTANT_responseSuccessStatus } from "../../constants/stringConstants";
import { toastBottom } from "../../Services/toast/toast";
import UnbookedItinerary from "./ItineraryStore/UnbookedItinerary";
import CampaignItinerary from "./Components/CampaignItinerary/CampaignItinerary";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import { ICity, IItinerary } from "../../TypeInterfaces/IItinerary";
import ItineraryBanner from "./Components/ItineraryBanner";
import HighlightText from "./Components/HighlightText";
import { StyleSheet, LayoutAnimation } from "react-native";
import useCampaignItineraryCosting from "./hooks/useCampaignItineraryCosting";
import { IGCMRequestBody } from "../GCMScreen/hooks/useGCMForm";

export type ItineraryNavType = AppNavigatorProps<typeof SCREEN_ITINERARY>;

export interface ICampaignItineraryServerResponse
  extends IMobileServerResponse {
  data: ICampaignItinerary;
}

export interface IItineraryServerResponse extends IMobileServerResponse {
  data: IItinerary;
}

export interface ItineraryProps extends ItineraryNavType {}

export interface IBannerDetails {
  smallText: string;
  title: string;
  itineraryCost: string;
}

const Itinerary = ({ route, navigation }: ItineraryProps) => {
  const { slug = "", itineraryId: preDefinedItineraryId = "" } = route.params;

  const [
    campaignItineraryState,
    setCampaignItineraryState
  ] = useState<ICampaignItinerary | null>(null);

  const itineraryDetails = useRef<UnbookedItinerary | null>(null);

  const [focusedCity, setFocusedCity] = useState<ICity | undefined>(undefined);
  const [bannerDetails, setBannerDetails] = useState<
    IBannerDetails | undefined
  >(undefined);

  const { costCampaignItinerary, isCosting } = useCampaignItineraryCosting();

  const costItinerary = (
    campaignItineraryId: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    config: IGCMRequestBody
  ) => {
    costCampaignItinerary(campaignItineraryId, {
      costingConfig: {
        hotelGuestRoomConfigurations: [
          {
            adultCount: 1,
            childAges: []
          }
        ],
        departureAirport: "MAA",
        arrivalAirport: "MAA",
        departureDate: "12/Jan/2021",
        travelType: "SOLO"
      },
      flightsBookedByUserAlready: false,
      itineraryId: "",
      costingType: "RECOST",
      name: "",
      leadSource: {
        url: "https://uat.longweekend.co.in/",
        deviceType: "Mobile",
        keyword: "",
        campaign: "",
        cpid: null,
        landingPage: "https://uat.longweekend.co.in/",
        lastRoute:
          "/packages/a-9-night-itinerary-for-a-feel-good-vietnam-vacation-at-low-cost",
        prodType: "PACKAGES"
      }
    });
  };

  const updateFocusedCity = (city: ICity) => {
    setFocusedCity(city);
  };

  const updateBannerDetails = (details: IBannerDetails) => {
    setBannerDetails(details);
  };

  const goBack = () => navigation.goBack();

  useEffect(() => {
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
    } else if (preDefinedItineraryId) {
      apiCall(
        CONSTANT_itineraryDetails.replace(
          ":itineraryId",
          preDefinedItineraryId
        ),
        {},
        "GET"
      )
        .then((response: IItineraryServerResponse) => {
          if (response.status === CONSTANT_responseSuccessStatus) {
            itineraryDetails.current = new UnbookedItinerary(response.data);
            // @ts-ignore
            setCampaignItineraryState({});
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

  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

  if (!itineraryDetails.current || !campaignItineraryState) {
    return null;
  }

  if (isCosting) {
    return null;
  }

  return (
    <>
      <ItineraryBanner
        bannerImage={
          focusedCity && focusedCity?.cityImages[0]
            ? focusedCity?.cityImages[0]
            : ""
        }
        backAction={goBack}
        smallText={bannerDetails ? bannerDetails.smallText : ""}
        title={bannerDetails ? bannerDetails.title : ""}
        itineraryCost={bannerDetails ? bannerDetails.itineraryCost : ""}
      />
      <HighlightText
        containerStyle={styles.highlightText}
        titleText={focusedCity?.cityName ?? ""}
      />
      <CampaignItinerary
        campaignItineraryState={campaignItineraryState}
        itineraryDetails={itineraryDetails.current}
        navigation={navigation}
        route={route}
        updateFocusedCity={updateFocusedCity}
        updateBannerDetails={updateBannerDetails}
        costItinerary={costItinerary}
      />
    </>
  );
};

const styles = StyleSheet.create({
  highlightText: {
    marginTop: -24
  }
});

export default ErrorBoundary()(Itinerary);
