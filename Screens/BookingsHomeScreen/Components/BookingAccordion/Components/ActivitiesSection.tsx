import React from "react";
import { View } from "react-native";
import _ from "lodash";
import moment from "moment";
import constants from "../../../../../constants/constants";
import { recordEvent } from "../../../../../Services/analytics/analyticsService";
import getTitleCase from "../../../../../Services/getTitleCase/getTitleCase";
import BookingSectionComponent from "../../../../../CommonComponents/BookingSectionComponent/BookingSectionComponent";
import resolveLinks from "../../../../../Services/resolveLinks/resolveLinks";
import { IActivityCombinedInfo } from "../../../../../mobx/Itineraries";
import { NavigationStackProp } from "react-navigation-stack";

export interface ActivitiesSectionProps {
  section: { items: IActivityCombinedInfo[] };
  navigation: NavigationStackProp;
  spinValue: object;
}

export interface IActivitySectionProps {
  activity: IActivityCombinedInfo;
  isLast: boolean;
  navigation: NavigationStackProp;
  spinValue: object;
}

const ActivitiesSection = ({
  section,
  navigation,
  spinValue
}: ActivitiesSectionProps) => {
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
            spinValue={spinValue}
          />
        );
      })}
    </View>
  );
};

const Activities = ({ activity, isLast, spinValue }: IActivitySectionProps) => {
  let customStyle = {};
  if (isLast) {
    customStyle = {
      // borderBottomWidth: StyleSheet.hairlineWidth,
      paddingBottom: 16
    };
  }

  const openVoucher = () => {
    recordEvent(constants.Bookings.event, {
      click: constants.Bookings.click.accordionVoucher,
      type: constants.Bookings.type.activities
    });
    // @ts-ignore
    resolveLinks(false, false, {
      voucherType: constants.activityVoucherType,
      costingIdentifier: activity.costing.configKey
    });
  };

  return (
    <BookingSectionComponent
      spinValue={spinValue}
      containerStyle={customStyle}
      sectionImage={{
        uri: activity.mainPhoto
      }}
      isProcessing={!(activity.voucher.booked || activity.free)}
      onClick={openVoucher}
      content={getTitleCase(activity.title)}
      title={`${
        activity.voucher.activityTime && activity.voucher.activityTime > 1
          ? moment(activity.voucher.activityTime).format(
              constants.commonDateFormat
            )
          : activity.costing.dateMillis
          ? moment(activity.costing.dateMillis).format(
              constants.commonDateFormat
            )
          : moment(
              `${activity.costing.day}/${activity.costing.mon}/${constants.currentYear}`,
              "DD/MMM/YYYY"
            ).format(constants.commonDateFormat)
      }`}
      isImageContain={false}
      defaultSource={constants.activityThumbPlaceholderIllus}
      isDataSkipped={_.get(activity, "voucher.skipVoucher")}
      voucherTitle={_.get(activity, "voucher.title")}
    />
  );
};

export default ActivitiesSection;
