import React, { useEffect, useState, useRef } from "react";
import { ScrollView } from "react-native";
import ItineraryView from "./Components/ItineraryView";
import HighlightText from "./Components/HighlightText";
import BlankSpacer from "../../CommonComponents/BlankSpacer/BlankSpacer";
import BottomButtonBar from "../../CommonComponents/BottomButtonBar/BottomButtonBar";
import { AppNavigatorProps } from "../../NavigatorsV2/AppNavigator";
import { SCREEN_ITINERARY } from "../../NavigatorsV2/ScreenNames";
import TranslucentStatusBar from "../../CommonComponents/TranslucentStatusBar/TranslucentStatusBar";
import apiCall from "../../Services/networkRequests/apiCall";
import { CONSTANT_packages } from "../../constants/apiUrls";
import { ICampaignItinerary } from "../../TypeInterfaces/ICampaignItinerary";
import { IMobileServerResponse } from "../../TypeInterfaces/INetworkResponse";
import { CONSTANT_responseSuccessStatus } from "../../constants/stringConstants";
import { toastBottom } from "../../Services/toast/toast";
import UnbookedItinerary from "./ItineraryStore/UnbookedItinerary";
import Slot from "./Components/Slot";

type ItineraryNavType = AppNavigatorProps<typeof SCREEN_ITINERARY>;

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

  const goBack = () => navigation.goBack();

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

  const { days, slots } = itineraryDetails.current;

  const { campaignDetail, campaignItinerary } = campaignItineraryState;
  const { bannerText, mobileImage, name } = campaignDetail;
  const { itinerary } = campaignItinerary;

  console.log(slots);

  return (
    <ItineraryView
      infoText={name}
      bannerImage={mobileImage}
      title={bannerText}
      backAction={goBack}
      cost={itinerary.totalCost}
    >
      <TranslucentStatusBar />
      <HighlightText />

      <ScrollView showsVerticalScrollIndicator={false}>
        {days.map((day, index) => {
          return (
            <Slot
              itinerary={itineraryDetails.current || {}}
              key={index}
              day={day}
              slot={slots[index]}
              navigation={navigation}
              onItemLayout={() => null}
              spinValue={{}}
            />
          );
        })}
        <BlankSpacer height={166} />
      </ScrollView>
      <HighlightText afterCost />
      <BottomButtonBar
        leftButtonName={"Customize"}
        leftButtonAction={() => {}}
        rightButtonName={"Update cost"}
        rightButtonAction={() => {}}
      />
    </ItineraryView>
  );
};

export default Itinerary;
