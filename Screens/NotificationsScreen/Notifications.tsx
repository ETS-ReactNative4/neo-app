import React, { useState } from "react";

import { View, StyleSheet } from "react-native";
import {
  SCREEN_NOTIFICATION_TAB,
  SCREEN_PRETRIP_HOME_TABS
} from "../../NavigatorsV2/ScreenNames";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppNavigatorParamsType } from "../../NavigatorsV2/AppNavigator";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { PreTripHomeTabsType } from "../../NavigatorsV2/PreTripHomeTabs";

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
  departureDateMillis: number;
  nights: number;
  days: number;
  lastEdited: string;
  url: string;
  title: string;
  timeStampMillis: number;
  noOfAdults: number;
  noOfChildren: number;
  noOfInfants: number;
  itineraryType: string;
  costedDateMillis: number;
  bookedDateMillis: number;
  version: string;
  regionCode: string;
}

const Notifications = ({}: NotificationsScreenProps) => {
  const [] = useState([]);

  return <View style={styles.notificationContainer} />;
};

const styles = StyleSheet.create({
  notificationContainer: {
    flex: 1
  }
});

export default Notifications;
