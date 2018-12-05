import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import moment from "moment";
import { responsiveWidth } from "react-native-responsive-dimensions";
import constants from "../../../../../constants/constants";
import PropTypes from "prop-types";
import CircleThumbnail from "../../../../../CommonComponents/CircleThumbnail/CircleThumbnail";
import _ from "lodash";
import storeService from "../../../../../Services/storeService/storeService";
import SectionRightPlaceHolder from "./Components/SectionRightPlaceHolder";
import { recordEvent } from "../../../../../Services/analytics/analyticsService";
import getTitleCase from "../../../../../Services/getTitleCase/getTitleCase";
import { CustomTabs } from "react-native-custom-tabs";
import { logError } from "../../../../../Services/errorLogger/errorLogger";

const ActivitiesSection = ({ section, navigation }) => {
  return (
    <View>
      {section.items.map((activity, index) => {
        let isLast = index === section.items.length - 1;

        return (
          <Activities
            key={index}
            navigation={navigation}
            activity={activity}
            isLast={isLast}
          />
        );
      })}
    </View>
  );
};

ActivitiesSection.propTypes = {
  section: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired
};

const Activities = ({ activity, isLast, navigation }) => {
  let customStyle = {};
  if (isLast) {
    customStyle = {
      borderBottomWidth: StyleSheet.hairlineWidth,
      paddingBottom: 16
    };
  }

  const openVoucher = () => {
    if (activity.voucher && activity.voucher.voucherUrl) {
      /**
       * TODO: Track this click event
       */
      CustomTabs.openURL(activity.voucher ? activity.voucher.voucherUrl : "", {
        showPageTitle: true
      })
        .then(launched => {
          if (!launched) {
            logError("Unable to launch custom tab for viator voucher!", {});
          }
          return null;
        })
        .catch(err => {
          logError(err);
        });
    } else if (activity.voucher.booked || activity.voucher.free) {
      recordEvent(constants.bookingsHomeAccordionActivitiesVoucherClick);
      navigation.navigate("ActivityVoucher", { activity });
    } else {
      storeService.infoStore.setInfo(
        constants.bookingProcessText.title,
        constants.bookingProcessText.message,
        constants.bookingProcessingIcon,
        constants.bookingProcessText.actionText
      );
    }
  };

  return (
    <TouchableOpacity
      onPress={openVoucher}
      style={[styles.contentContainer, customStyle]}
    >
      <View style={styles.iconWrapper}>
        <CircleThumbnail
          image={{ uri: activity.mainPhoto }}
          containerStyle={styles.contentIcon}
          isContain={false}
          defaultImageUri={_.sample([
            constants.activitySmallPlaceHolder,
            constants.activity2SmallPlaceHolder,
            constants.activity3SmallPlaceHolder
          ])}
        />
      </View>
      <View style={styles.contentTextContainer}>
        <View style={styles.contentHeaderWrapper}>
          <Text style={styles.contentHeader}>{`${
            activity.costing.dateMillis
              ? moment(activity.costing.dateMillis).format("MMM DD")
              : moment(
                  `${activity.costing.day}/${activity.costing.mon}/${
                    constants.currentYear
                  }`,
                  "DD/MMM/YYYY"
                ).format("MMM DD")
          }`}</Text>
        </View>
        <View style={styles.contentTextWrapper}>
          <Text style={styles.contentText} numberOfLines={1}>
            {getTitleCase(activity.title)}
          </Text>
        </View>
      </View>
      <SectionRightPlaceHolder
        isProcessing={!(activity.voucher.booked || activity.voucher.free)}
      />
    </TouchableOpacity>
  );
};

Activities.propTypes = {
  activity: PropTypes.object.isRequired,
  isLast: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired
};

/**
 * TODO: Fix Line Height for the header and content
 */
const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 16,
    borderBottomColor: constants.shade4,
    flexDirection: "row",
    alignItems: "center"
  },
  iconWrapper: {
    overflow: "hidden",
    height: 40,
    width: 40,
    borderRadius: 20
  },
  contentIcon: {
    height: 40,
    width: 40,
    borderRadius: 20
  },
  contentTextContainer: {
    height: 40,
    marginLeft: 16
  },
  contentHeaderWrapper: {
    height: 16,
    justifyContent: "center"
  },
  contentHeader: {
    fontFamily: constants.primaryLight,
    fontSize: 14,
    lineHeight: 14,
    color: constants.shade2
  },
  contentTextWrapper: {
    height: 24,
    maxWidth: responsiveWidth(60),
    justifyContent: "center"
  },
  contentText: {
    fontFamily: constants.primaryLight,
    fontSize: 17,
    maxWidth: responsiveWidth(60)
  }
});

export default ActivitiesSection;
