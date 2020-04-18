import React from "react";
import { ScrollView } from "react-native";
import { ItineraryNavType } from "../../Itinerary";
import CampaignSlot from "./Components/CampaignSlot";
import UnbookedItinerary from "../../ItineraryStore/UnbookedItinerary";
import BlankSpacer from "../../../../CommonComponents/BlankSpacer/BlankSpacer";
import TranslucentStatusBar from "../../../../CommonComponents/TranslucentStatusBar/TranslucentStatusBar";
import HighlightText from "../HighlightText";
import BottomButtonBar from "../../../../CommonComponents/BottomButtonBar/BottomButtonBar";
import { ICampaignItinerary } from "../../../../TypeInterfaces/ICampaignItinerary";
import ItineraryView from "../ItineraryView";
import { SCREEN_REQUEST_CALLBACK } from "../../../../NavigatorsV2/ScreenNames";

export interface CampaignItineraryProps extends ItineraryNavType {
  itineraryDetails: UnbookedItinerary;
  campaignItineraryState: ICampaignItinerary;
}

const CampaignItinerary = ({
  itineraryDetails,
  navigation,
  route,
  campaignItineraryState
}: CampaignItineraryProps) => {
  const { campaignDetail, campaignItinerary } = campaignItineraryState;
  const { bannerText, mobileImage, name } = campaignDetail;
  const { itinerary } = campaignItinerary;
  const { days, slots } = itineraryDetails;

  const goBack = () => navigation.goBack();

  const customizeItinerary = () => {
    navigation.push(SCREEN_REQUEST_CALLBACK);
  };

  const updateCost = () => {};

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
        {days.map((day, dayIndex) => {
          /**
           * Campaign itineraries don't have a date, hence day index is being used for dayNum
           */
          return (
            <CampaignSlot
              itinerary={itineraryDetails}
              key={dayIndex}
              dayNum={dayIndex + 1}
              slot={slots[dayIndex]}
              navigation={navigation}
              route={route}
              onItemLayout={() => null}
              spinValue={{}}
            />
          );
        })}
        <BlankSpacer height={166} />
      </ScrollView>
      <BottomButtonBar
        leftButtonName={"Customize"}
        leftButtonAction={customizeItinerary}
        rightButtonName={"Update cost"}
        rightButtonAction={updateCost}
      />
    </ItineraryView>
  );
};

export default CampaignItinerary;
