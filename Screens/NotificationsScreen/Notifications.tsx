import React, { useState, useRef, useCallback } from "react";
import { StyleSheet, SectionList, SafeAreaView, Text } from "react-native";
import {
  SCREEN_NOTIFICATION_TAB,
  SCREEN_PRETRIP_HOME_TABS,
  SCREEN_NOTIFICATION_DETAILS
} from "../../NavigatorsV2/ScreenNames";
import {
  CompositeNavigationProp,
  RouteProp,
  useFocusEffect
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppNavigatorParamsType } from "../../NavigatorsV2/AppNavigator";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { PreTripHomeTabsType } from "../../NavigatorsV2/PreTripHomeTabs";
import useSavedItinerariesApi from "./hooks/useSavedItinerariesApi";
import { ICityWithNights } from "../../TypeInterfaces/IBookedItinerary";
import useDeepCompareEffect from "use-deep-compare-effect";
import SavedItineraryCard, {
  SAVED_ITINERARY_IMAGE_HEIGHT,
  SAVED_ITINERARY_IMAGE_WIDTH
} from "../../CommonComponents/SavedItineraryCard/SavedItineraryCard";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold
} from "../../constants/fonts";
import { CONSTANT_shade1, CONSTANT_white1 } from "../../constants/colorPallete";
import getImgIXUrl from "../../Services/getImgIXUrl/getImgIXUrl";
import NotificationsActionSheet from "./Components/NotificationsActionSheet";
import EmptyListPlaceholder from "../../CommonComponents/EmptyListPlaceholder/EmptyListPlaceholder";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import useIsUserLoggedIn from "../../Services/isUserLoggedIn/hooks/useIsUserLoggedIn";
import LoginIndent from "../../CommonComponents/LoginIndent/LoginIndent";

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

const Notifications = ({ navigation, route }: NotificationsScreenProps) => {
  const [sectionData, setSectionData] = useState<ISectionData[]>([]);
  const [selectedNotification, setSelectedNotification] = useState<
    IItineraryNotification | undefined
  >();

  const actionSheetRef = useRef<any>(null);

  const [savedItineraryApiDetails, loadItineraries] = useSavedItinerariesApi();

  const { successResponseData, isLoading } = savedItineraryApiDetails;
  const { data: savedItineraries = [] } = successResponseData || {};

  useFocusEffect(
    useCallback(() => {
      loadItineraries();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  );

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

  const selectNotification = (item: IItineraryNotification) => {
    setSelectedNotification(item);
    openActionSheet();
  };

  const openActionSheet = () => {
    actionSheetRef.current && actionSheetRef.current.snapTo({ index: 1 });
  };

  const openNotificationDetails = (item: IItineraryNotification) => {
    setSelectedNotification(item);
    navigation.navigate(SCREEN_NOTIFICATION_DETAILS, {
      notification: item
    });
  };

  const isEmpty =
    !isLoading &&
    sectionData[0] &&
    sectionData[0].data.length + sectionData[1].data.length < 1;

  const isUserLoggedIn = useIsUserLoggedIn();

  if (!isUserLoggedIn) {
    return <LoginIndent message={"Please login to see your notifications"} />;
  }

  return (
    <SafeAreaView style={styles.notificationContainer}>
      {isEmpty ? (
        <EmptyListPlaceholder text={"You don't have any new notifications"} />
      ) : (
        <SectionList
          sections={sectionData}
          keyExtractor={(item: IItineraryNotification) => item.itineraryId}
          renderItem={({ item }: { item: IItineraryNotification }) => {
            const onMoreOptionClick = () => selectNotification(item);
            const onNotificationClick = () => openNotificationDetails(item);

            return (
              <SavedItineraryCard
                isUnread={!!item.unreadMsgCount}
                action={onNotificationClick}
                thumbnail={getImgIXUrl({
                  src: item.image,
                  DPR: 0.02,
                  imgFactor: `h=${SAVED_ITINERARY_IMAGE_HEIGHT}&w=${SAVED_ITINERARY_IMAGE_WIDTH}&crop=fit`
                })}
                image={getImgIXUrl({
                  src: item.image,
                  imgFactor: `h=${SAVED_ITINERARY_IMAGE_HEIGHT}&w=${SAVED_ITINERARY_IMAGE_WIDTH}&crop=fit`
                })}
                cities={item.citiesArr || []}
                lastEdited={item.lastEdited}
                title={item.title}
                moreOptions
                moreOptionsAction={onMoreOptionClick}
              />
            );
          }}
          renderSectionHeader={({ section: { title, data } }) =>
            data.length ? <Text style={styles.textStyle}>{title}</Text> : null
          }
        />
      )}

      <NotificationsActionSheet
        selectedNotification={selectedNotification}
        actionSheetRef={actionSheetRef}
        navigation={navigation}
        route={route}
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

export default ErrorBoundary({ isRoot: true })(Notifications);
