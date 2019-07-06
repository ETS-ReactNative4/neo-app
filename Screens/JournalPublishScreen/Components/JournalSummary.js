import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import constants from "../../../constants/constants";
import JournalShareIconContainer from "./JournalShareIconContainer";
import JournalCardGradientWrapper from "./JournalCardGradientWrapper";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";
import PropTypes from "prop-types";
import FastImage from "react-native-fast-image";

const JournalSummary = ({
  isPublished,
  title,
  shareAction = () => null,
  facebookAction = () => null,
  twitterAction = () => null,
  image
}) => {
  return (
    <FastImage source={image} style={styles.journalSummaryContainer}>
      <JournalCardGradientWrapper enableGradient={isPublished}>
        <Text
          numberOfLines={2}
          ellipsizeMode={"tail"}
          style={styles.journalTitle}
        >
          {title}
        </Text>
        {isPublished ? (
          <JournalShareIconContainer
            facebookAction={facebookAction}
            shareAction={shareAction}
            twitterAction={twitterAction}
          />
        ) : (
          <View />
        )}
      </JournalCardGradientWrapper>
    </FastImage>
  );
};

JournalSummary.propTypes = forbidExtraProps({
  isPublished: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  shareAction: PropTypes.func.isRequired,
  facebookAction: PropTypes.func.isRequired,
  twitterAction: PropTypes.func.isRequired,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired
});

const styles = StyleSheet.create({
  journalSummaryContainer: {
    flex: 1
  },
  journalTitle: {
    marginHorizontal: 24,
    ...constants.fontCustom(constants.primarySemiBold, 24, 28),
    color: "white",
    marginTop: 24
  }
});

export default JournalSummary;
