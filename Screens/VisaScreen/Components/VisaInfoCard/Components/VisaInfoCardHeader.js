import React from "react";
import { View, Text, StyleSheet, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import InfoDot from "../../../../../CommonComponents/InfoDot/InfoDot";
import constants from "../../../../../constants/constants";

const VisaInfoCardHeader = ({
  containerStyle = StyleSheet.create({}),
  title = "",
  body = "",
  color = "",
  isDisabled = false
}) => {
  return (
    <View style={[styles.visaInfoCardHeaderContainer, containerStyle]}>
      <View style={styles.visaStageTitleWrapper}>
        <View style={styles.infoDotWrapper}>
          <InfoDot
            dotRadius={7}
            color={color}
            containerStyle={styles.infoDot}
          />
        </View>
        <Text
          style={[
            styles.titleText,
            isDisabled ? { color: constants.shade3 } : {}
          ]}
        >
          {title}
        </Text>
      </View>
      <View style={styles.bodyTextWrapper}>
        <Text
          style={[
            styles.bodyText,
            isDisabled ? { color: constants.shade3 } : {}
          ]}
        >
          {body}
        </Text>
      </View>
    </View>
  );
};

VisaInfoCardHeader.propTypes = {
  containerStyle: ViewPropTypes.style,
  title: PropTypes.string,
  body: PropTypes.string,
  color: PropTypes.string,
  isDisabled: PropTypes.bool
};

const styles = StyleSheet.create({
  visaInfoCardHeaderContainer: {},
  visaStageTitleWrapper: {
    flexDirection: "row",
    alignItems: "center"
  },
  infoDotWrapper: {
    marginRight: 8
  },
  infoDot: {},
  titleText: {
    ...constants.fontCustom(constants.primarySemiBold, 18),
    color: constants.black1,
    marginTop: 2
  },
  bodyTextWrapper: {
    marginTop: 8
  },
  bodyText: {
    ...constants.fontCustom(constants.primaryRegular, 16),
    color: constants.black1
  }
});

export default VisaInfoCardHeader;
