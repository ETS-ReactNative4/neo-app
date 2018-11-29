import React, { Component } from "react";
import { View, StyleSheet, Text, TextInput, Platform } from "react-native";
import Modal from "react-native-modal";
import PropTypes from "prop-types";
import { responsiveWidth } from "react-native-responsive-dimensions";
import constants from "../../../../../constants/constants";
import SmartImage from "../../../../../CommonComponents/SmartImage/SmartImage";
import FastImage from "react-native-fast-image";
import FeedBackButtons from "./FeedBackButtons";
import SimpleButton from "../../../../../CommonComponents/SimpleButton/SimpleButton";
import Icon from "../../../../../CommonComponents/Icon/Icon";

class FeedBackSwiperModal extends Component {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    isNegative: PropTypes.bool,
    data: PropTypes.object.isRequired,
    submit: PropTypes.func.isRequired
  };

  onEditText = () => {};

  render() {
    const { isVisible, isNegative, data, onClose } = this.props;

    const items = [
      {
        image:
          "http://pickyourtrail-guides-images.imgix.net/country/1820xh/bali.jpg",
        text: `City Sightseeing Barcelona Hop-On Hop-Off Tour longer Barcelona Hop-On Hop-Off Tour longer`,
        score: 0
      },
      {
        image:
          "http://pickyourtrail-guides-images.imgix.net/country/1820xh/bali.jpg",
        text: `City Sightseeing Barcelona Hop-On Hop-Off Tour longer Barcelona Hop-On Hop-Off Tour longer`,
        score: 0
      }
    ];

    const positiveButtons = [
      {
        active: constants.notificationIcon,
        inactive: constants.notificationIcon,
        score: 1,
        onClick: () => null
      },
      {
        active: constants.notificationIcon,
        inactive: constants.notificationIcon,
        score: 2,
        onClick: () => null
      },
      {
        active: constants.notificationIcon,
        inactive: constants.notificationIcon,
        score: 3,
        onClick: () => null
      }
    ];

    const negativeButtons = [
      {
        active: constants.notificationIcon,
        inactive: constants.notificationIcon,
        score: -1,
        onClick: () => null
      },
      {
        active: constants.notificationIcon,
        inactive: constants.notificationIcon,
        score: -2,
        onClick: () => null
      },
      {
        active: constants.notificationIcon,
        inactive: constants.notificationIcon,
        score: -3,
        onClick: () => null
      }
    ];

    return (
      <Modal
        isVisible={isVisible}
        onBackButtonPress={onClose}
        onBackdropPress={onClose}
        style={styles.modalContainer}
      >
        <View style={styles.modalView}>
          <View style={styles.header}>
            <Text style={styles.headerText}>{"Yesterday, May 23"}</Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.bodyHeaderText}>
              {isNegative ? "Oops! What went wrong?" : "Nice! Tell us more..."}
            </Text>
            {items.map((item, itemIndex) => {
              return (
                <View key={itemIndex} style={styles.feedBackRow}>
                  <SmartImage
                    resizeMode={FastImage.resizeMode.cover}
                    uri={item.image}
                    style={styles.imageThumbnail}
                    defaultImageUri={
                      "http://pickyourtrail-guides-images.imgix.net/country/1820xh/bali.jpg"
                    }
                  />
                  <View style={styles.feedBackDescWrapper}>
                    <Text
                      style={styles.feedBackDescText}
                      numberOfLines={2}
                      ellipsizeMode={"tail"}
                    >
                      {item.text}
                    </Text>
                  </View>
                  <FeedBackButtons
                    buttons={isNegative ? negativeButtons : positiveButtons}
                  />
                </View>
              );
            })}
            <View style={styles.textInputWrapper}>
              <TextInput
                style={styles.textInput}
                onChangeText={this.onEditText}
                returnKeyType={"done"}
                underlineColorAndroid={"transparent"}
                onSubmitEditing={() => null}
                placeholder={"Or, type a custom message"}
                placeholderTextColor={"rgba(155,155,155,1)"}
              />
            </View>
            <SimpleButton
              text={"Done"}
              containerStyle={{
                height: 40,
                width: responsiveWidth(100) - 48 - 32,
                marginBottom: 16,
                backgroundColor: "white"
              }}
              action={this.props.submit}
              textColor={constants.black1}
            />
          </View>
          <View style={styles.feedBackIconContainer}>
            <Icon
              name={constants.activityIcon}
              color={constants.firstColor}
              size={22}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

const modalWidth = responsiveWidth(100) - 48;

const styles = StyleSheet.create({
  modalContainer: {
    margin: 0,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  modalView: {
    width: modalWidth,
    backgroundColor: "white",
    borderRadius: 5
  },
  header: {
    height: 64,
    backgroundColor: constants.secondColor,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    alignItems: "center"
  },
  headerText: {
    ...constants.fontCustom(constants.primaryLight, 15, 18),
    color: constants.black1,
    marginTop: 14
  },
  body: {
    backgroundColor: constants.black1,
    alignItems: "center"
  },
  bodyHeaderText: {
    ...constants.fontCustom(constants.primarySemiBold, 15, 18),
    color: "white",
    marginTop: 33
  },
  feedBackRow: {
    height: 40,
    marginTop: 24,
    flexDirection: "row",
    marginHorizontal: 4,
    alignItems: "center",
    justifyContent: "space-between"
  },
  imageThumbnail: {
    height: 32,
    width: 32,
    borderRadius: 16,
    marginLeft: 4
  },
  feedBackDescWrapper: {
    flex: 1,
    marginHorizontal: 8,
    ...Platform.select({
      ios: {
        marginTop: 4
      }
    })
  },
  feedBackDescText: {
    ...constants.fontCustom(constants.primaryLight, 13),
    color: constants.shade4
  },
  textInputWrapper: {
    ...Platform.select({
      android: {
        height: 40
      },
      ios: {
        height: 32
      }
    }),
    width: modalWidth - 16,
    marginVertical: 8,
    borderRadius: 4,
    overflow: "hidden"
  },
  textInput: {
    backgroundColor: "rgba(255,255,255,0.1)",
    flex: 1,
    paddingHorizontal: 8,
    borderRadius: 4,
    ...constants.fontCustom(constants.primaryLight, 13),
    color: "white"
  },
  feedBackIconContainer: {
    height: 48,
    width: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    backgroundColor: "white",
    position: "absolute",
    top: 64 - 24,
    left: modalWidth / 2 - 24
  }
});

export default FeedBackSwiperModal;
