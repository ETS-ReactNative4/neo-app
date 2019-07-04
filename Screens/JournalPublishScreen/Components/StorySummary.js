import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import JournalCardGradientWrapper from "./JournalCardGradientWrapper";
import JournalShareIconContainer from "./JournalShareIconContainer";
import constants from "../../../constants/constants";
import Carousel from "../../../CommonComponents/Carousel/Carousel";
import ImagePreviewThumbnail from "../../JournalTextEditorScreen/Components/ImagePreviewThumbnail";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";

const StorySummary = ({
  isPublished,
  dayString,
  day,
  title,
  description,
  shareAction = () => null,
  facebookAction = () => null,
  twitterAction = () => null,
  imagesList = []
}) => {
  return (
    <View style={styles.storySummaryContainer}>
      <JournalCardGradientWrapper
        noGradient={true}
        enableGradient={isPublished}
      >
        <View style={styles.storyInfoRow}>
          <View style={styles.dateSection}>
            <Text
              numberOfLines={1}
              ellipsizeMode={"tail"}
              style={styles.titleString}
            >
              {dayString}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode={"tail"}
              style={styles.infoString}
            >
              {day}
            </Text>
          </View>

          <View style={styles.contentSection}>
            <Text
              numberOfLines={1}
              ellipsizeMode={"tail"}
              style={styles.titleString}
            >
              {title}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode={"tail"}
              style={styles.infoString}
            >
              {description}
            </Text>
          </View>
        </View>
        <Carousel firstMargin={24}>
          {imagesList.map((image, imageIndex) => {
            return (
              <ImagePreviewThumbnail
                key={imageIndex}
                imageSource={{ uri: image.imageUrl }}
                imageStyle={styles.imageThumbnail}
              />
            );
          })}
        </Carousel>
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
    </View>
  );
};

StorySummary.propTypes = forbidExtraProps({
  isPublished: PropTypes.bool.isRequired,
  dayString: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  shareAction: PropTypes.func.isRequired,
  facebookAction: PropTypes.func.isRequired,
  twitterAction: PropTypes.func.isRequired,
  imagesList: PropTypes.array.isRequired
});

const styles = StyleSheet.create({
  storySummaryContainer: {
    flex: 1
  },
  storyInfoRow: {
    marginTop: 24,
    marginHorizontal: 24,
    flexDirection: "row"
  },
  storyTitle: {
    marginHorizontal: 24,
    ...constants.fontCustom(constants.primarySemiBold, 24, 28),
    color: "white",
    marginTop: 24
  },
  dateSection: {
    width: 72
  },
  contentSection: {
    flex: 1,
    marginLeft: 8
  },
  titleString: {
    ...constants.fontCustom(constants.primaryRegular, 16, 32),
    color: constants.black1,
    height: 32
  },
  infoString: {
    ...constants.fontCustom(constants.primarySemiBold, 12, 32),
    color: constants.shade1,
    height: 32
  },
  imageThumbnail: { height: 64, width: 64, marginRight: 8, borderRadius: 2 }
});

export default StorySummary;
