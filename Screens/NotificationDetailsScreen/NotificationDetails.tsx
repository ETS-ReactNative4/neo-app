import React, { useEffect } from "react";
import { View, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { AppNavigatorProps } from "../../NavigatorsV2/AppNavigator";
import { SCREEN_NOTIFICATION_DETAILS } from "../../NavigatorsV2/ScreenNames";
import {
  CONSTANT_firstColor,
  CONSTANT_white
} from "../../constants/colorPallete";
import ItineraryTimeline from "../NotificationsScreen/Components/ItineraryTimeline/ItineraryTimeline";
import ParallaxScrollView from "../../CommonComponents/ParallaxScrollView/ParallaxScrollView";
import ItineraryDetail from "../NotificationsScreen/Components/ItineraryDetail/ItineraryDetail";
import BlankSpacer from "../../CommonComponents/BlankSpacer/BlankSpacer";
import { CONSTANT_callStartIcon } from "../../constants/imageAssets";
import BottomButtonBar from "../../CommonComponents/BottomButtonBar/BottomButtonBar";
import Icon from "../../CommonComponents/Icon/Icon";
import TranslucentStatusBar from "../../CommonComponents/TranslucentStatusBar/TranslucentStatusBar";
import useNotificationDetailsApi from "./hooks/useNotificationDetailsApi";

type NotificationDetailsNavTypes = AppNavigatorProps<
  typeof SCREEN_NOTIFICATION_DETAILS
>;

export interface NotificationDetailsProps extends NotificationDetailsNavTypes {}

const NotificationDetails = ({
  route,
  navigation
}: NotificationDetailsProps) => {
  const { notification } = route.params;
  const [
    notificationDetailsApi,
    getNotificationDetails
  ] = useNotificationDetailsApi();

  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    getNotificationDetails(notification.itineraryId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.tripDetailsContainer}>
      <TranslucentStatusBar />
      <ParallaxScrollView
        bannerImage={notification.image}
        backAction={goBack}
        smallText={notification.lastEdited}
        titleText={"4 nights to Kuta and Ubud"}
      >
        <View style={styles.detailsContainer}>
          <ItineraryDetail
            departingFrom={notification.departureCity}
            departureDate={notification.departureDateMillis.toString()}
            adults={notification.noOfAdults}
            children={notification.noOfChildren}
            numOfRooms={0}
            costedDate={notification.costedDateMillis.toString()}
            costedTime={notification.costedDateMillis.toString()}
            totalCost={notification.totalCost || NaN}
            travellingAs={""}
          />
          {notificationDetailsApi.isSuccess ? (
            <ItineraryTimeline
              notifData={notificationDetailsApi.successResponseData?.data || []}
            />
          ) : null}
          <BlankSpacer height={76} />
        </View>
      </ParallaxScrollView>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => Alert.alert("Click phone icon")}
        style={styles.phoneIcon}
      >
        <Icon name={CONSTANT_callStartIcon} size={32} color={CONSTANT_white} />
      </TouchableOpacity>

      <BottomButtonBar
        leftButtonName={"Support"}
        leftButtonAction={() => Alert.alert("Click Support")}
        rightButtonName={"View itinerary"}
        rightButtonAction={() => Alert.alert("View itinerary")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tripDetailsContainer: {
    flex: 1
  },
  detailsContainer: {
    padding: 24
  },
  phoneIcon: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 16,
    bottom: 84,
    width: 62,
    height: 62,
    borderRadius: 50,
    backgroundColor: CONSTANT_firstColor
  }
});

export default NotificationDetails;
