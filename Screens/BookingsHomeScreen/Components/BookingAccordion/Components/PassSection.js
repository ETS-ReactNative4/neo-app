import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import moment from "moment";
import { responsiveWidth } from "react-native-responsive-dimensions";
import constants from "../../../../../constants/constants";
import PropTypes from "prop-types";
import CircleThumbnail from "../../../../../CommonComponents/CircleThumbnail/CircleThumbnail";
import storeService from "../../../../../Services/storeService/storeService";
import SectionRightPlaceHolder from "./Components/SectionRightPlaceHolder";
import { recordEvent } from "../../../../../Services/analytics/analyticsService";
import BookingSectionComponent from "./Components/BookingSectionComponent";

const PassSection = ({ section, navigation }) => {
  return (
    <View>
      {section.items.map((pass, index) => {
        let isLast = index === section.items.length - 1;

        return (
          <Pass
            key={index}
            pass={pass}
            isLast={isLast}
            navigation={navigation}
          />
        );
      })}
    </View>
  );
};

PassSection.propTypes = {
  section: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired
};

const Pass = ({ pass, isLast, navigation }) => {
  let customStyle = {};
  if (isLast) {
    customStyle = {
      borderBottomWidth: StyleSheet.hairlineWidth,
      paddingBottom: 16
    };
  }

  const openVoucher = () => {
    recordEvent(constants.bookingsHomeAccordionPassesVoucherClick);
    navigation.navigate("PassVoucher", { pass });
  };

  return (
    <BookingSectionComponent
      containerStyle={customStyle}
      sectionImage={{ uri: pass.image }}
      isProcessing={false}
      onClick={openVoucher}
      content={pass.name}
      title={moment(pass.start, "DD/MMM/YYYY").format(
        constants.commonDateFormat
      )}
      isImageContain={false}
      defaultImageUri={constants.activity3SmallPlaceHolder}
    />
  );

  return (
    <TouchableOpacity
      onPress={openVoucher}
      style={[styles.contentContainer, customStyle]}
    >
      <View style={styles.iconWrapper}>
        <CircleThumbnail
          containerStyle={styles.contentIcon}
          image={{ uri: pass.image }}
          defaultImageUri={constants.activity3SmallPlaceHolder}
        />
      </View>
      <View style={styles.contentTextContainer}>
        <View style={styles.contentHeaderWrapper}>
          <Text style={styles.contentHeader}>
            {moment(pass.start, "DD/MMM/YYYY").format(
              constants.commonDateFormat
            )}
          </Text>
        </View>
        <View style={styles.contentTextWrapper}>
          <Text style={styles.contentText} numberOfLines={1}>
            {pass.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

Pass.propTypes = {
  pass: PropTypes.object.isRequired,
  isLast: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired
};

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

export default PassSection;
