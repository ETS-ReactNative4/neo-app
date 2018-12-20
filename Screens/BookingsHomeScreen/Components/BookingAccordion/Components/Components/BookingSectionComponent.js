import React from "react";
import CircleThumbnail from "../../../../../../CommonComponents/CircleThumbnail/CircleThumbnail";
import constants from "../../../../../../constants/constants";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import PropTypes from "prop-types";
import Icon from "../../../../../../CommonComponents/Icon/Icon";

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
  hideTitle
}) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={[styles.contentContainer, containerStyle]}
    >
      <View style={styles.iconWrapper}>
        {isProcessing ? (
          <Icon
            name={constants.bookingProcessingIcon}
            size={30}
            color={constants.eighthColor}
          />
        ) : (
          <CircleThumbnail
            image={sectionImage}
            containerStyle={styles.contentIcon}
            isContain={isImageContain}
            defaultImageUri={defaultImageUri}
          />
        )}
      </View>
      <View style={styles.contentTextContainer}>
        {!hideTitle ? (
          <View style={styles.contentHeaderWrapper}>
            <Text
              style={styles.contentHeader}
              numberOfLines={titleNumberOfLines}
              ellipsizeMode={"tail"}
            >
              {title}
            </Text>
          </View>
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

const maxTextAreaWidth = responsiveWidth(100) - 48 - 40 - 16;

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
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  contentIcon: {
    height: 40,
    width: 40,
    borderRadius: 20
  },
  contentTextContainer: {
    minHeight: 40,
    marginLeft: 16,
    justifyContent: "center"
  },
  contentHeaderWrapper: {
    minHeight: 16,
    justifyContent: "center",
    maxWidth: maxTextAreaWidth
  },
  contentHeader: {
    fontFamily: constants.primaryLight,
    fontSize: 14,
    lineHeight: 16,
    color: constants.shade2,
    maxWidth: maxTextAreaWidth
  },
  contentTextWrapper: {
    minHeight: 24,
    maxWidth: maxTextAreaWidth,
    justifyContent: "center"
  },
  contentText: {
    fontFamily: constants.primaryLight,
    fontSize: 17,
    maxWidth: maxTextAreaWidth
  }
});

export default BookingSectionComponent;
