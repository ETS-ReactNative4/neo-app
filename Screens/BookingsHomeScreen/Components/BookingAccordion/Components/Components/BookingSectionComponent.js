import React from "react";
import CircleThumbnail from "../../../../../../CommonComponents/CircleThumbnail/CircleThumbnail";
import constants from "../../../../../../constants/constants";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Animated
} from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import PropTypes from "prop-types";
import Icon from "../../../../../../CommonComponents/Icon/Icon";
import SmartImage from "../../../../../../CommonComponents/SmartImage/SmartImage";
import FastImage from "react-native-fast-image";
import _ from "lodash";

const BookingSectionComponent = ({
  onClick,
  containerStyle = {},
  sectionImage,
  isImageContain,
  defaultImageUri,
  title,
  content,
  titleNumberOfLines = 1,
  contentNumberOfLines = 1,
  isProcessing,
  hideTitle,
  spinValue
}) => {
  let processingSpin = null;

  if (isProcessing) {
    processingSpin = spinValue
      ? spinValue.interpolate({
          inputRange: [0, 1],
          outputRange: ["360deg", "0deg"]
        })
      : null;
  }

  return (
    <TouchableOpacity
      onPress={onClick}
      activeOpacity={0.6}
      style={[styles.contentContainer, containerStyle]}
    >
      <View style={styles.iconWrapper}>
        <View style={styles.contentIcon}>
          {sectionImage.uri ? (
            <SmartImage
              resizeMode={
                isImageContain
                  ? FastImage.resizeMode.contain
                  : FastImage.resizeMode.cover
              }
              uri={sectionImage.uri}
              style={styles.contentIcon}
              defaultImageUri={defaultImageUri}
            />
          ) : (
            <Image
              resizeMode={isImageContain ? "contain" : "cover"}
              source={sectionImage}
              style={styles.contentIcon}
            />
          )}
        </View>
        {isProcessing ? (
          <Animated.View
            style={[
              styles.bookingProcessIconWrapper,
              processingSpin ? { transform: [{ rotate: processingSpin }] } : {}
            ]}
          >
            <Icon
              name={constants.bookingProcessingIcon}
              key={1}
              size={24}
              color={"white"}
            />
          </Animated.View>
        ) : null}
      </View>
      <View style={styles.contentTextContainer}>
        {!hideTitle ? (
          <Text
            style={styles.contentHeader}
            numberOfLines={titleNumberOfLines}
            ellipsizeMode={"tail"}
          >
            {_.toUpper(title)}
          </Text>
        ) : null}
        <View style={styles.contentTextWrapper}>
          <Text
            style={styles.contentText}
            numberOfLines={contentNumberOfLines}
            ellipsizeMode={"tail"}
          >
            {content}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

BookingSectionComponent.propTypes = {
  onClick: PropTypes.func.isRequired,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  sectionImage: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
    .isRequired,
  isImageContain: PropTypes.bool.isRequired,
  defaultImageUri: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  titleNumberOfLines: PropTypes.number,
  contentNumberOfLines: PropTypes.number,
  isProcessing: PropTypes.bool.isRequired,
  hideTitle: PropTypes.bool
};

const maxTextAreaWidth = responsiveWidth(100) - 48 - 8 - 40 - 16;

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 16,
    flexDirection: "row",
    alignItems: "center"
  },
  iconWrapper: {
    overflow: "hidden",
    height: 48,
    width: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: constants.shade2
  },
  bookingProcessIconWrapper: {
    height: 48,
    width: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(1,1,1,0.4)",
    position: "absolute",
    top: 0,
    left: 0
  },
  contentIcon: {
    height: 48,
    width: 48,
    borderRadius: 24
  },
  contentTextContainer: {
    minHeight: 48,
    marginLeft: 8,
    justifyContent: "center"
  },
  contentHeader: {
    fontFamily: constants.primaryRegular,
    fontSize: 11,
    lineHeight: 14,
    color: constants.shade2,
    maxWidth: maxTextAreaWidth
  },
  contentTextWrapper: {
    width: maxTextAreaWidth
  },
  contentText: {
    marginTop: 4,
    fontFamily: constants.primaryLight,
    fontSize: 17,
    lineHeight: 20,
    color: constants.black2,
    ...constants.kern1,
    maxWidth: maxTextAreaWidth
  }
});

export default BookingSectionComponent;
