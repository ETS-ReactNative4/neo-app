import React, { useEffect, useState } from "react";
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
import CampaignItinerary from "./Components/CampaignItinerary/CampaignItinerary";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import { ICity, IItinerary } from "../../TypeInterfaces/IItinerary";
import ItineraryBanner from "./Components/ItineraryBanner";
import HighlightText from "./Components/HighlightText";
import { StyleSheet, LayoutAnimation, View } from "react-native";
import LottieView from "lottie-react-native";
import useCampaignItineraryCosting from "./hooks/useCampaignItineraryCosting";
import { IGCMRequestBody } from "../GCMScreen/hooks/useGCMForm";
import useItineraryCosting from "./hooks/useItineraryCosting";
import useUnbookedItinerary from "./hooks/useUnbookedItinerary";
import { observer } from "mobx-react";
import { CONSTANT_visaSuccessAnimation } from "../../constants/imageAssets";

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
  smallText?: string;
  title?: string;
  itineraryCost?: string;
  mobileImage?: string;
}

const Itinerary = ({ route, navigation }: ItineraryProps) => {
  const { slug = "", itineraryId: preDefinedItineraryId = "" } = route.params;

  const [
    campaignItineraryState,
    setCampaignItineraryState
  ] = useState<ICampaignItinerary | null>(null);

  // PT TODO : Handle null values
  // @ts-ignore
  const itineraryDetails = useUnbookedItinerary(null);

  const [focusedCity, setFocusedCity] = useState<ICity | undefined>(undefined);
  const [bannerDetails, setBannerDetails] = useState<
    IBannerDetails | undefined
  >(undefined);

  const {
    costCampaignItinerary,
    isCosting: isCampaignCosting,
    itineraryId
  } = useCampaignItineraryCosting();

  const {
    isCosting: isItineraryCosting,
    updateItineraryCost: callItineraryCostUpdate
  } = useItineraryCosting();

  const updateCampaignItineraryCost = async (
    campaignItineraryId: string,
    config: IGCMRequestBody
  ) => {
    try {
      await costCampaignItinerary(campaignItineraryId, config);
    } catch (e) {
      toastBottom("Unable to update latest cost");
    }
  };

  const updateItineraryCost = async (
    selectedItineraryId: string,
    config: IGCMRequestBody
  ) => {
    try {
      await callItineraryCostUpdate(selectedItineraryId, config);
      refreshItinerary();
    } catch (e) {
      toastBottom("Unable to update latest cost");
    }
  };

  const updateFocusedCity = (city: ICity) => {
    setFocusedCity(city);
  };

  const updateBannerDetails = (details: IBannerDetails) => {
    setBannerDetails(details);
  };

  const goBack = () => navigation.goBack();

  const refreshItinerary = () => {
    if (itineraryId || preDefinedItineraryId) {
      apiCall(
        CONSTANT_itineraryDetails.replace(
          ":itineraryId",
          itineraryId || preDefinedItineraryId
        ),
        {},
        "GET"
      )
        .then((response: IItineraryServerResponse) => {
          if (response.status === CONSTANT_responseSuccessStatus) {
            itineraryDetails.updateItinerary(response.data);
            setCampaignItineraryState(null);
          } else {
            toastBottom("Unable to retrieve Itinerary info");
            navigation.goBack();
          }
        })
        .catch(() => {
          toastBottom("Unable to retrieve Itinerary info");
          navigation.goBack();
        });
    } else if (slug) {
      // The itinerary is a campaign Itinerary
      apiCall(CONSTANT_packages, {
        key: slug
      })
        .then((response: ICampaignItineraryServerResponse) => {
          if (response.status === CONSTANT_responseSuccessStatus) {
            itineraryDetails.updateItinerary(response.data.campaignItinerary);
            // itineraryDetails.current = new UnbookedItinerary(
            //   response.data.campaignItinerary
            // );
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
  };

  useEffect(() => {
    refreshItinerary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itineraryId]);

  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

  if (!itineraryDetails?.isItineraryLoaded) {
    // Itinerary is loading
    return (
      <View style={styles.loadingIndicatorContainer}>
        <LottieView source={CONSTANT_visaSuccessAnimation()} autoPlay loop />
      </View>
    );
  }

  if (isCampaignCosting || isItineraryCosting) {
    // Itinerary is costing
    return (
      <View style={styles.loadingIndicatorContainer}>
        <LottieView source={CONSTANT_visaSuccessAnimation()} autoPlay loop />
      </View>
    );
  }

  return (
    <>
      <ItineraryBanner
        // @ts-ignore
        bannerImage={
          focusedCity && focusedCity?.cityImages && focusedCity?.cityImages[0]
            ? focusedCity.cityImages[0]
            : bannerDetails
            ? bannerDetails.mobileImage
            : ""
        }
        backAction={goBack}
        smallText={
          bannerDetails && bannerDetails.smallText
            ? bannerDetails.smallText
            : ""
        }
        title={bannerDetails && bannerDetails.title ? bannerDetails.title : ""}
        itineraryCost={
          bannerDetails && bannerDetails.itineraryCost
            ? bannerDetails.itineraryCost
            : ""
        }
      />
      <HighlightText
        containerStyle={styles.highlightText}
        titleText={focusedCity?.cityName ?? ""}
      />
      <CampaignItinerary
        campaignItineraryState={campaignItineraryState}
        itineraryDetails={itineraryDetails}
        navigation={navigation}
        route={route}
        updateFocusedCity={updateFocusedCity}
        updateBannerDetails={updateBannerDetails}
        updateCampaignItineraryCost={updateCampaignItineraryCost}
        updateItineraryCost={updateItineraryCost}
      />
    </>
  );
};

const styles = StyleSheet.create({
  highlightText: {
    marginTop: -24
  },
  loadingIndicatorContainer: {
    flex: 1
  }
});

export default ErrorBoundary()(observer(Itinerary));
