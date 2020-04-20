import React, { useState, useEffect } from "react";
import {
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  LayoutChangeEvent
} from "react-native";
import { ItineraryNavType, IBannerDetails } from "../../Itinerary";
import CampaignSlot from "./Components/CampaignSlot";
import UnbookedItinerary from "../../ItineraryStore/UnbookedItinerary";
import BlankSpacer from "../../../../CommonComponents/BlankSpacer/BlankSpacer";
import TranslucentStatusBar from "../../../../CommonComponents/TranslucentStatusBar/TranslucentStatusBar";
import BottomButtonBar from "../../../../CommonComponents/BottomButtonBar/BottomButtonBar";
import { ICampaignItinerary } from "../../../../TypeInterfaces/ICampaignItinerary";
import ItineraryView from "../ItineraryView";
import { SCREEN_REQUEST_CALLBACK } from "../../../../NavigatorsV2/ScreenNames";
import { ICity } from "../../../../TypeInterfaces/IItinerary";

export interface CampaignItineraryProps extends ItineraryNavType {
  itineraryDetails: UnbookedItinerary;
  campaignItineraryState: ICampaignItinerary;
  updateFocusedCity: (city: ICity) => any;
  updateBannerDetails: (details: IBannerDetails) => void;
}

const CampaignItinerary = ({
  itineraryDetails,
  navigation,
  route,
  campaignItineraryState,
  updateBannerDetails,
  updateFocusedCity
}: CampaignItineraryProps) => {
  const { campaignDetail, campaignItinerary } = campaignItineraryState;
  const { bannerText, name } = campaignDetail;
  const { itinerary } = campaignItinerary;
  const { days, slots, getCityByDayNum } = itineraryDetails;

  const customizeItinerary = () => {
    navigation.push(SCREEN_REQUEST_CALLBACK);
  };

  const updateCityFocus = (city: ICity) => {
    updateFocusedCity(city);
  };

  const updateCost = () => {};

  const [sectionPositions, setSectionPositions] = useState<object>({});

  const updateSectionPostions = (event: LayoutChangeEvent, dayNum: number) => {
    const { nativeEvent } = event;
    const { layout } = nativeEvent;
    const { y } = layout;

    setSectionPositions({
      ...sectionPositions,
      [dayNum]: y
    });
  };

  const onSelectedDayNum = (dayNum: string) => {
    const cityInFocus = getCityByDayNum(parseInt(dayNum, 10));
    if (cityInFocus) {
      updateCityFocus(cityInFocus);
    }
  };

  const onItemScroll = ({
    nativeEvent: {
      contentOffset: { y }
    }
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    // @ts-ignore
    const sortedPositionsByDayNum: [string, number] = Object.entries(
      sectionPositions
      // @ts-ignore
    ).sort((a, b) => a[0] - b[0]); // array in the form of [dayNum, position] sorted by dayNum
    for (let i = 0; i < sortedPositionsByDayNum.length; i++) {
      // @ts-ignore
      if (y < sortedPositionsByDayNum[i][1]) {
        if (i === 0) {
          // @ts-ignore
          onSelectedDayNum(sortedPositionsByDayNum[0][0]); // select dayNum 1
        } else {
          // @ts-ignore
          onSelectedDayNum(sortedPositionsByDayNum[i - 1][0]); // select specific day
        }
        break;
      }
    }
  };

  useEffect(() => {
    onSelectedDayNum("1");
    updateBannerDetails({
      smallText: name,
      title: bannerText,
      itineraryCost: itinerary.totalCost
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ItineraryView>
      <TranslucentStatusBar />

      <ScrollView
        scrollEventThrottle={1}
        onScroll={onItemScroll}
        showsVerticalScrollIndicator={false}
      >
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
              spinValue={{}}
              updateSectionPostions={updateSectionPostions}
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
