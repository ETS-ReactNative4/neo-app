import React from "react";
import { View, StyleSheet, ViewPropTypes, Image, Text } from "react-native";
import PropTypes from "prop-types";
import SimpleButton from "../../../CommonComponents/SimpleButton/SimpleButton";
import constants from "../../../constants/constants";
import dialer from "../../../Services/dialer/dialer";

const VisaCompanionInfo = ({
  containerStyle = StyleSheet.create({}),
  profilePic = {},
  title = "Your Visa Companion",
  name = "",
  tag = "",
  phoneNumber = ""
}) => {
  const callSupport = () => dialer(phoneNumber);

  return (
    <View style={[styles.visaCompanionInfoContainer, containerStyle]}>
      <View style={styles.imageSection}>
        <Image style={styles.profilePic} source={profilePic} />
      </View>
      <View style={styles.textSection}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.nameText}>{name}</Text>
        <View style={styles.tagWrapper}>
          <Text style={styles.tagText}>{tag}</Text>
        </View>
      </View>
      <View style={styles.ctaSection}>
        <SimpleButton
          action={callSupport}
          text={"Call now"}
          textColor={"white"}
          containerStyle={{ width: 94, height: 36 }}
          underlayColor={constants.firstColorAlpha(0.2)}
        />
      </View>
    </View>
  );
};

VisaCompanionInfo.propTypes = {
  containerStyle: ViewPropTypes.style,
  profilePic: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
    .isRequired,
  title: PropTypes.string,
  name: PropTypes.string,
  tag: PropTypes.string,
  phoneNumber: PropTypes.string
};

const styles = StyleSheet.create({
  visaCompanionInfoContainer: {
    flexDirection: "row",
    padding: 24,
    justifyContent: "center",
    borderTopWidth: 1,
    borderTopColor: constants.shade5
  },
  imageSection: {
    alignItems: "center",
    justifyContent: "center"
  },
  profilePic: {
    height: 66,
    width: 66,
    backgroundColor: constants.shade5
  },
  textSection: {
    flex: 1,
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  titleText: {
    ...constants.fontCustom(constants.primaryRegular, 14),
    color: constants.black2
  },
  nameText: {
    marginTop: 4,
    ...constants.fontCustom(constants.primarySemiBold, 18),
    color: constants.black1
  },
  tagWrapper: {
    marginTop: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 40,
    backgroundColor: constants.sixteenthColor,
    alignItems: "center",
    justifyContent: "center"
  },
  tagText: {
    ...constants.fontCustom(constants.primarySemiBold, 9),
    color: "white",
    marginTop: 2
  },
  ctaSection: {
    alignItems: "center",
    justifyContent: "center"
  }
});

export default VisaCompanionInfo;
