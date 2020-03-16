import React, { useState, useEffect } from "react";
import { StyleSheet, SectionList, SafeAreaView, Text } from "react-native";
import {
  SCREEN_NOTIFICATION_TAB,
  SCREEN_PRETRIP_HOME_TABS
} from "../../NavigatorsV2/ScreenNames";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppNavigatorParamsType } from "../../NavigatorsV2/AppNavigator";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { PreTripHomeTabsType } from "../../NavigatorsV2/PreTripHomeTabs";
import useSavedItinerariesApi from "./hooks/useSavedItinerariesApi";
import { ICityWithNights } from "../../TypeInterfaces/IBookedItinerary";
import useDeepCompareEffect from "use-deep-compare-effect";
import SavedItineraryCard from "../../CommonComponents/SavedItineraryCard/SavedItineraryCard";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold
} from "../../constants/fonts";
import { CONSTANT_shade1, CONSTANT_white1 } from "../../constants/colorPallete";
import getImgIXUrl from "../../Services/getImgIXUrl/getImgIXUrl";

export type NotificationsScreenNavigationType = CompositeNavigationProp<
  StackNavigationProp<AppNavigatorParamsType, typeof SCREEN_PRETRIP_HOME_TABS>,
  BottomTabNavigationProp<PreTripHomeTabsType, typeof SCREEN_NOTIFICATION_TAB>
>;

export type NotificationsScreenRouteProp = RouteProp<
  PreTripHomeTabsType,
  typeof SCREEN_NOTIFICATION_TAB
>;

export interface NotificationsScreenProps {
  navigation: NotificationsScreenNavigationType;
  route: NotificationsScreenRouteProp;
}

export interface IItineraryNotification {
  itineraryId: string;
  image: string;
  costed: boolean;
  departureCity: string;
  cities: string;
  citiesArr?: ICityWithNights[];
  departureDateMillis: number;
  nights: number;
  days: number;
  lastEdited: string;
  lastCosted?: number;
  url: string;
  title: string;
  lastEditedFormatted: boolean;
  timeStampMillis: number;
  noOfAdults: number;
  noOfChildren: number;
  noOfInfants: number;
  itineraryType: string;
  costedDateMillis: number;
  bookedDateMillis: number;
  version?: string;
  regionCode: string;
  totalCost?: number;
  activityImages?: string[];
  unreadMsgCount: number;
  travelConsultantNumber: string;
  staleCost: boolean;
}

export interface ISectionData {
  title: "New" | "Earlier";
  data: IItineraryNotification[];
}

const Notifications = ({}: NotificationsScreenProps) => {
  const [sectionData, setSectionData] = useState<ISectionData[]>([]);

  const [savedItineraryApiDetails, loadItineraries] = useSavedItinerariesApi();

  useEffect(() => {
    loadItineraries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { successResponseData } = savedItineraryApiDetails;
  const { data: savedItineraries = [] } = successResponseData || {};

  useDeepCompareEffect(() => {
    const newSectionData: ISectionData[] = savedItineraries.reduce(
      (accumulator, itinerary) => {
        if (itinerary.unreadMsgCount) {
          accumulator[0].data.push(itinerary);
        } else {
          accumulator[1].data.push(itinerary);
        }
        return accumulator;
      },
      [
        {
          title: "New",
          data: []
        },
        {
          title: "Earlier",
          data: []
        }
      ] as ISectionData[]
    );
    setSectionData(newSectionData);
  }, [savedItineraries]);

  return (
    <SafeAreaView style={styles.notificationContainer}>
      <SectionList
        sections={sectionData}
        keyExtractor={(item: IItineraryNotification) => item.itineraryId}
        renderItem={({ item }: { item: IItineraryNotification }) => (
          <SavedItineraryCard
            isUnread={!!item.unreadMsgCount}
            action={() => null}
            image={getImgIXUrl({ src: item.image })}
            cities={item.citiesArr || []}
            lastEdited={item.lastEdited}
            title={item.title}
            moreOptions
            moreOptionsAction={() => null}
          />
        )}
        renderSectionHeader={({ section: { title, data } }) =>
          data.length ? <Text style={styles.textStyle}>{title}</Text> : null
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    flex: 1,
    backgroundColor: CONSTANT_white1
  },
  textStyle: {
    flex: 1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 12),
    color: CONSTANT_shade1,
    textAlign: "left",
    paddingHorizontal: 16,
    paddingVertical: 16,
    textTransform: "uppercase",
    backgroundColor: CONSTANT_white1
  }
});

export default Notifications;
