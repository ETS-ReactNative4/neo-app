import React, { MutableRefObject } from "react";
import {
  responsiveHeight
  // @ts-ignore
} from "react-native-responsive-dimensions";

import ActionSheet from "../../../CommonComponents/ActionSheet/ActionSheet";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "../../../CommonComponents/Icon/Icon";
import {
  CONSTANT_callStartIcon,
  CONSTANT_detailIcon,
  CONSTANT_infoIcon
} from "../../../constants/imageAssets";
import {
  CONSTANT_shade4,
  CONSTANT_black1,
  CONSTANT_shade5
} from "../../../constants/colorPallete";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold
} from "../../../constants/fonts";
import {
  IItineraryNotification,
  NotificationsScreenProps
} from "../Notifications";
import dialer from "../../../Services/dialer/dialer";
import {
  SCREEN_ITINERARY,
  SCREEN_NOTIFICATION_FAQ,
  SCREEN_NOTIFICATION_DETAILS
} from "../../../NavigatorsV2/ScreenNames";

export interface INotificationsActionSheet extends NotificationsScreenProps {
  actionSheetRef: MutableRefObject<any>;
  selectedNotification?: IItineraryNotification;
}

const NotificationsActionSheet = ({
  actionSheetRef,
  selectedNotification,
  navigation
}: INotificationsActionSheet) => {
  /**
   * PT TODO: fill up these functions
   */
  const openFaq = () => {
    if (selectedNotification) {
      navigation.navigate(SCREEN_NOTIFICATION_FAQ, {
        itineraryId: selectedNotification.itineraryId,
        isDomestic: !!selectedNotification.citiesArr?.find(
          city => city.countryName === "India"
        )
      });
    }
  };

  const openDialer = () => {
    if (selectedNotification) {
      dialer(selectedNotification.travelConsultantNumber);
    }
  };

  const openDetails = () => {
    if (selectedNotification) {
      navigation.navigate(SCREEN_ITINERARY, {
        itineraryId: selectedNotification.itineraryId,
        itinerarySource: SCREEN_NOTIFICATION_DETAILS
      });
    }
  };

  return (
    <ActionSheet
      interactableRef={actionSheetRef}
      panelStartingPosition={responsiveHeight(100)}
      panelViewablePosition={responsiveHeight(50)}
    >
      <View style={styles.actionSheetContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={openFaq}
          style={styles.actionSheetList}
        >
          <View>
            <Icon name={CONSTANT_infoIcon} size={24} color={CONSTANT_shade4} />
          </View>
          <Text style={styles.textStyle}>FAQs</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={openDialer}
          style={styles.actionSheetList}
        >
          <View>
            <Icon
              name={CONSTANT_callStartIcon}
              size={24}
              color={CONSTANT_shade4}
            />
          </View>
          <Text style={styles.textStyle}>Call us</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={openDetails}
          style={styles.actionSheetList}
        >
          <View>
            <Icon
              name={CONSTANT_detailIcon}
              size={24}
              color={CONSTANT_shade4}
            />
          </View>
          <Text style={styles.textStyle}>View itinerary</Text>
        </TouchableOpacity>
      </View>
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  actionSheetContainer: {
    flex: 1,
    padding: 16
  },
  actionSheetList: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: CONSTANT_shade5
  },
  textStyle: {
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 15, 19),
    color: CONSTANT_black1,
    paddingLeft: 8
  }
});

export default NotificationsActionSheet;
