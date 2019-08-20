import React, { Fragment } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";
import { responsiveWidth } from "react-native-responsive-dimensions";
import constants from "../../../constants/constants";
import Icon from "../../../CommonComponents/Icon/Icon";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";
import SimpleButton from "../../../CommonComponents/SimpleButton/SimpleButton";
import * as Progress from "react-native-progress";
import FastImage from "react-native-fast-image";
import { recordEvent } from "../../../Services/analytics/analyticsService";

const JournalDayCard = ({
  image,
  info = "",
  action = () => null,
  isActivated,
  editAction = () => null,
  deleteAction = () => null,
  isJournalPublished,
  shareFacebook = () => null,
  shareTwitter = () => null,
  isImageUploading,
  totalImages,
  pendingImages,
  isImageContained = false
}) => {
  const percentage = (100 - pendingImages / totalImages * 100) / 100;
  const ImageWrapper = isActivated ? FastImage : ImageBackground;
  const imageProps = isActivated
    ? {
        source: image,
        resizeMode: isImageContained
          ? FastImage.resizeMode.contain
          : FastImage.resizeMode.cover,
        style: styles.dayCardImage
      }
    : {
        blurRadius: 5,
        source: image,
        resizeMode: isImageContained
          ? FastImage.resizeMode.contain
          : FastImage.resizeMode.cover,
        style: styles.dayCardImage
      };
  return (
    <TouchableOpacity
      onPress={isImageUploading ? () => null : action}
      activeOpacity={0.8}
      style={styles.journalDayCardContainer}
    >
      {image ? (
        <ImageWrapper {...imageProps}>
          {isActivated ? null : (
            <View style={styles.imageOverlay}>
              <Icon name={constants.addImageIcon} color={"white"} size={24} />
            </View>
          )}
        </ImageWrapper>
      ) : null}
      <Text numberOfLines={2} ellipsizeMode={"tail"} style={styles.infoText}>
        {info}
      </Text>
      {isActivated ? (
        <View style={styles.actionBar}>
          {isImageUploading ? (
            <View style={styles.progressContainer}>
              <Progress.Circle
                progress={percentage}
                color={constants.themeDarkBlue}
                size={20}
              />
              <Text style={styles.progressText}>{`${totalImages -
                pendingImages} of ${totalImages} images uploaded...`}</Text>
            </View>
          ) : (
            <Fragment>
              <View style={styles.actionContainer}>
                <SimpleButton
                  color={"transparent"}
                  iconSize={16}
                  textStyle={{ fontSize: 15 }}
                  text={"Edit"}
                  action={() => {
                    recordEvent(constants.Journal.event, {
                      click: constants.Journal.click.editStory
                    });
                    editAction();
                  }}
                  containerStyle={{ width: null, marginHorizontal: 16 }}
                  textColor={constants.seventhColor}
                  icon={constants.editIcon}
                />
                <SimpleButton
                  color={"transparent"}
                  iconSize={16}
                  textStyle={{ fontSize: 15 }}
                  text={"Delete"}
                  action={() => {
                    recordEvent(constants.Journal.event, {
                      click: constants.Journal.click.deleteStory
                    });
                    deleteAction();
                  }}
                  containerStyle={{ width: null, marginLeft: 8 }}
                  textColor={constants.seventhColor}
                  icon={constants.trashCanIcon}
                />
              </View>
              <View style={styles.actionContainer}>
                {isJournalPublished ? (
                  <Fragment>
                    <TouchableOpacity
                      onPress={() => {
                        recordEvent(constants.Journal.event, {
                          click: constants.Journal.click.shareStory,
                          share: constants.Journal.share.facebook
                        });
                        shareFacebook();
                      }}
                      style={styles.shareContainer}
                    >
                      <Icon
                        color={constants.seventhColor}
                        name={constants.facebookIcon}
                        size={16}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        recordEvent(constants.Journal.event, {
                          click: constants.Journal.click.shareStory,
                          share: constants.Journal.share.twitter
                        });
                        shareTwitter();
                      }}
                      style={[styles.shareContainer, { paddingRight: 16 }]}
                    >
                      <Icon
                        color={constants.seventhColor}
                        name={constants.twitterIcon}
                        size={16}
                      />
                    </TouchableOpacity>
                  </Fragment>
                ) : null}
              </View>
            </Fragment>
          )}
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

JournalDayCard.propTypes = forbidExtraProps({
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  info: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  isActivated: PropTypes.bool,
  editAction: PropTypes.func,
  deleteAction: PropTypes.func,
  isJournalPublished: PropTypes.bool,
  shareFacebook: PropTypes.func,
  shareTwitter: PropTypes.func,
  isImageUploading: PropTypes.bool,
  totalImages: PropTypes.number,
  pendingImages: PropTypes.number,
  isImageContained: PropTypes.bool
});

const styles = StyleSheet.create({
  journalDayCardContainer: {
    width: responsiveWidth(100) - 48,
    marginHorizontal: 24,
    backgroundColor: "white",
    marginVertical: 16,
    borderRadius: 2,
    overflow: "hidden",
    ...constants.elevationTwo
  },
  dayCardImage: {
    backgroundColor: constants.shade5,
    height: 164
  },
  imageOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.15)"
  },
  infoText: {
    padding: 16,
    ...constants.fontCustom(constants.primaryRegular, 14, 20),
    color: constants.black1
  },
  actionBar: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  actionContainer: {
    flexDirection: "row"
  },
  progressContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
    flexDirection: "row"
  },
  progressText: {
    color: constants.themeDarkBlue,
    ...constants.fontCustom(constants.primarySemiBold, 15, 24),
    marginLeft: 8,
    marginTop: -3
  },
  shareContainer: {
    alignSelf: "center",
    paddingHorizontal: 8
  }
});

export default JournalDayCard;
