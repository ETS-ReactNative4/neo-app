import React from "react";
import { View, StyleSheet, ViewPropTypes, Text } from "react-native";
import PropTypes from "prop-types";
import constants from "../../../constants/constants";
import { responsiveWidth } from "react-native-responsive-dimensions";
import SimpleButton from "../../../CommonComponents/SimpleButton/SimpleButton";

const VisaInfoCard = ({
  containerStyle = StyleSheet.create({}),
  label = "",
  visaType = "",
  shortText = "",
  action = () => null
}) => {
  return (
    <View style={[styles.visaInfoCardContainer, containerStyle]}>
      <View style={styles.labelWrapper}>
        <Text style={styles.labelText}>{label}</Text>
      </View>
      <View style={styles.visaTypeWrapper}>
        <Text style={styles.visaTypeText}>{visaType}</Text>
      </View>
      <View style={styles.shortTextWrapper}>
        <Text style={styles.shortText} numberOfLines={3} ellipsizeMode={"tail"}>
          {shortText}
        </Text>
      </View>
      <SimpleButton
        text={"Read More"}
        action={action}
        textColor={constants.firstColor}
        color={"transparent"}
        containerStyle={{
          marginTop: 16,
          borderRadius: 4,
          height: 36,
          width: 96
        }}
        textStyle={{
          ...constants.fontCustom(constants.primarySemiBold, 16)
        }}
        hasBorder={true}
      />
    </View>
  );
};

VisaInfoCard.propTypes = {
  containerStyle: ViewPropTypes.style,
  label: PropTypes.string.isRequired,
  visaType: PropTypes.string.isRequired,
  shortText: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  visaInfoCardContainer: {
    padding: 24,
    backgroundColor: "white",
    borderRadius: 4
  },
  labelWrapper: {},
  labelText: {
    ...constants.fontCustom(constants.primarySemiBold, 14),
    color: constants.shade1
  },
  visaTypeWrapper: {
    marginTop: 8
  },
  visaTypeText: {
    ...constants.fontCustom(constants.primarySemiBold, 16),
    color: constants.black1
  },
  shortTextWrapper: {
    marginTop: 16
  },
  shortText: {
    width: responsiveWidth(80),
    ...constants.fontCustom(constants.primaryRegular, 16),
    color: constants.black2
  }
});

export default VisaInfoCard;
