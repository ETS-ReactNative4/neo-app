import React, { Fragment } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import constants from "../../../constants/constants";
import LinearGradient from "react-native-linear-gradient";
import Icon from "../../../CommonComponents/Icon/Icon";
import JournalShareIconContainer from "./JournalShareIconContainer";
import JournalCardGradientWrapper from "./JournalCardGradientWrapper";

const JournalSummary = ({
  isPublished,
  title,
  shareAction = () => null,
  facebookAction = () => null,
  twitterAction = () => null,
  image
}) => {
  return (
    <ImageBackground source={image} style={styles.journalSummaryContainer}>
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
    </ImageBackground>
  );
};

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
