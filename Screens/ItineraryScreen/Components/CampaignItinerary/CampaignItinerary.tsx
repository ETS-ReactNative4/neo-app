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
import {
  SCREEN_REQUEST_CALLBACK,
  SCREEN_GCM
} from "../../../../NavigatorsV2/ScreenNames";
import { ICity } from "../../../../TypeInterfaces/IItinerary";
import { IGCMRequestBody } from "../../../GCMScreen/hooks/useGCMForm";
import HighlightText from "../HighlightText";
import deepLink from "../../../../Services/deepLink/deepLink";
import { CONSTANT_retrievePDF } from "../../../../constants/apiUrls";
import { CONSTANT_apiServerUrl } from "../../../../constants/serverUrls";

export interface CampaignItineraryProps extends ItineraryNavType {
  itineraryDetails: UnbookedItinerary;
  campaignItineraryState: ICampaignItinerary | null;
  updateFocusedCity: (city: ICity) => any;
  updateBannerDetails: (details: IBannerDetails) => void;
  costItinerary: (campaignItineraryId: string, config: IGCMRequestBody) => any;
}

const CampaignItinerary = ({
  itineraryDetails,
  navigation,
  route,
  campaignItineraryState,
  updateBannerDetails,
  updateFocusedCity
}: CampaignItineraryProps) => {
  let campaignItineraryId: string = "",
    bannerText: string = "",
    name: string = "",
    mobileImage: string = "",
    totalCost: string = "",
    staleCost: boolean = true,
    itineraryId: string = "";

  const isCampaignItinerary: boolean = !!campaignItineraryState;

  const {
    days,
    slots,
    getCityByDayNum,
    costingConfig,
    itineraryMeta
  } = itineraryDetails;

  if (isCampaignItinerary) {
    const {
      campaignDetail,
      campaignItinerary,
      campaignItineraryId: cmpgItineraryId
    } = campaignItineraryState as ICampaignItinerary;
    const { itinerary } = campaignItinerary;

    bannerText = campaignDetail.bannerText;
    name = campaignDetail.name;
    mobileImage = campaignDetail.mobileImage;
    totalCost = itinerary.totalCost;
    campaignItineraryId = cmpgItineraryId;
  } else if (itineraryMeta) {
    bannerText = itineraryMeta.title;
    name = itineraryMeta.regionName;
    totalCost =
      (itineraryMeta.discountedPrice
        ? itineraryMeta.discountedPrice.toString()
        : "") || itineraryMeta.totalCost;
    itineraryId = itineraryMeta.itineraryId;
    staleCost = itineraryMeta.staleCost;
  }

  const customizeItinerary = () => {
    navigation.push(SCREEN_REQUEST_CALLBACK, {
      campaignItineraryId
    });
  };

  const updateCityFocus = (city: ICity) => {
    updateFocusedCity(city);
  };

  const loadCost = () => {
    navigation.navigate(SCREEN_GCM, {
      bannerImage: mobileImage,
      title: bannerText,
      campaignItineraryId,
      costingConfig,
      onSubmit: () => {
        return null;
      }
    });
  };

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
      itineraryCost: totalCost,
      mobileImage
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCampaignItinerary]);

  const openItineraryPDF = () => {
    deepLink({
      link: `${CONSTANT_apiServerUrl}${CONSTANT_retrievePDF.replace(
        ":itineraryId",
        itineraryId
      )}`
    });
  };

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

      {!staleCost ? (
        <HighlightText
          titleText={`₹ ${totalCost}`}
          infoText={"See what's included in your trip"}
          afterCost={true}
          afterCostAction={openItineraryPDF}
        />
      ) : null}

      <BottomButtonBar
        leftButtonName={"Customize"}
        leftButtonAction={customizeItinerary}
        rightButtonName={"Update cost"}
        rightButtonAction={loadCost}
      />
    </ItineraryView>
  );
};

export default CampaignItinerary;
