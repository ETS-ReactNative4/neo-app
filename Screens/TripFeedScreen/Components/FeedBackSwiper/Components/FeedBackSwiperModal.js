import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Platform,
  Keyboard,
  KeyboardAvoidingView
} from "react-native";
import Modal from "react-native-modal";
import PropTypes from "prop-types";
import { responsiveWidth } from "react-native-responsive-dimensions";
import constants from "../../../../../constants/constants";
import SimpleButton from "../../../../../CommonComponents/SimpleButton/SimpleButton";
import Icon from "../../../../../CommonComponents/Icon/Icon";
import * as Animatable from "react-native-animatable";
import { toastBottom } from "../../../../../Services/toast/toast";

class FeedBackSwiperModal extends Component {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    isNegative: PropTypes.bool,
    data: PropTypes.object.isRequired,
    submit: PropTypes.func.isRequired,
    emitterComponent: PropTypes.object.isRequired,
    title: PropTypes.string,
    setFeedBackInputFieldWrapperRef: PropTypes.func.isRequired,
    isFeedbackSubmitAttempted: PropTypes.bool.isRequired
  };

  state = {
    isKeyboardVisible: false
  };
  keyboardDidShowListener;
  keyboardDidHideListener;

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    this.setState({
      isKeyboardVisible: true
    });
  };

  _keyboardDidHide = () => {
    this.setState({
      isKeyboardVisible: false
    });
  };

  positiveSubmit = () => {
    this.props.submit();
  };

  negativeSubmit = () => {
    this.props.submit();
  };

  render() {
    const {
      isVisible,
      isNegative,
      data,
      submit,
      title,
      setFeedBackInputFieldWrapperRef,
      isFeedbackSubmitAttempted
    } = this.props;
    const { isKeyboardVisible } = this.state;

    // const items = [
    //   {
    //     image:
    //       "http://pickyourtrail-guides-images.imgix.net/country/1820xh/bali.jpg",
    //     text: `City Sightseeing Barcelona Hop-On Hop-Off Tour longer Barcelona Hop-On Hop-Off Tour longer`,
    //     score: 0
    //   },
    //   {
    //     image:
    //       "http://pickyourtrail-guides-images.imgix.net/country/1820xh/bali.jpg",
    //     text: `City Sightseeing Barcelona Hop-On Hop-Off Tour longer Barcelona Hop-On Hop-Off Tour longer`,
    //     score: 0
    //   }
    // ];

    // const positiveButtons = [
    //   {
    //     active: constants.notificationIcon,
    //     inactive: constants.notificationIcon,
    //     score: 1,
    //     onClick: () => null
    //   },
    //   {
    //     active: constants.notificationIcon,
    //     inactive: constants.notificationIcon,
    //     score: 2,
    //     onClick: () => null
    //   },
    //   {
    //     active: constants.notificationIcon,
    //     inactive: constants.notificationIcon,
    //     score: 3,
    //     onClick: () => null
    //   }
    // ];

    // const negativeButtons = [
    //   {
    //     active: constants.notificationIcon,
    //     inactive: constants.notificationIcon,
    //     score: -1,
    //     onClick: () => null
    //   },
    //   {
    //     active: constants.notificationIcon,
    //     inactive: constants.notificationIcon,
    //     score: -2,
    //     onClick: () => null
    //   },
    //   {
    //     active: constants.notificationIcon,
    //     inactive: constants.notificationIcon,
    //     score: -3,
    //     onClick: () => null
    //   }
    // ];

    return (
      <Modal
        animationInTiming={600}
        animationIn={"zoomIn"}
        animationOutTiming={600}
        animationOut={"zoomOut"}
        useNativeDriver={true}
        isVisible={isVisible}
        onBackButtonPress={() => {
          toastBottom(constants.feedBackCollectionToastText.message);
        }}
        onBackdropPress={() => {
          Keyboard.dismiss();
          toastBottom(constants.feedBackCollectionToastText.message);
        }}
        style={styles.modalContainer}
      >
        <KeyboardAvoidingView
          style={styles.modalView}
          behavior="padding"
          enabled
        >
          <View style={styles.header}>
            <Text style={styles.headerText}>{title}</Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.bodyHeaderText}>
              {isNegative ? "Oops! What went wrong?" : "Nice! Tell us more..."}
            </Text>
            {/*items.map((item, itemIndex) => {
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
            })*/}
            <Animatable.View
              ref={setFeedBackInputFieldWrapperRef}
              style={styles.textInputWrapper}
            >
              <TextInput
                style={[
                  styles.textInput,
                  isFeedbackSubmitAttempted && !this.props.review
                    ? styles.textInputError
                    : {}
                ]}
                onChangeText={this.props.onEditText}
                returnKeyType={"next"}
                underlineColorAndroid={"transparent"}
                multiline={true}
                value={this.props.review}
                numberOfLines={5}
                textAlignVertical={"top"}
                placeholder={
                  isNegative
                    ? "Had issues with..."
                    : "The day was a blast because..."
                }
                placeholderTextColor={"rgba(155,155,155,1)"}
              />
            </Animatable.View>
            <SimpleButton
              text={"Done"}
              containerStyle={{
                height: 40,
                width: responsiveWidth(100) - 48 - 32,
                marginBottom: 16,
                backgroundColor: "white"
              }}
              action={() => {
                if (!this.props.isFeedbackApiLoading) {
                  this.props.submit();
                }
              }}
              textColor={constants.black1}
            />
          </View>
          <View style={styles.feedBackIconContainer}>
            <Icon
              name={
                isNegative ? constants.thumbsDownIcon : constants.thumbsUpIcon
              }
              color={isNegative ? "rgba(255,87,109,1)" : constants.firstColor}
              size={22}
            />
          </View>
        </KeyboardAvoidingView>
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
    height: 70,
    width: modalWidth - 16,
    marginVertical: 8,
    borderRadius: 4,
    overflow: "hidden"
  },
  textInput: {
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 8,
    borderRadius: 4,
    height: 70,
    ...constants.fontCustom(constants.primaryLight, 13),
    color: "white"
  },
  textInputError: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: constants.fourthColor
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
