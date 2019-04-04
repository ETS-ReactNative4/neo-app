import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native";
import Modal from "react-native-modal";
import PropTypes from "prop-types";
import {
  responsiveWidth,
  responsiveHeight
} from "react-native-responsive-dimensions";
import constants from "../../../../constants/constants";
import SimpleButton from "../../../../CommonComponents/SimpleButton/SimpleButton";
import FastImage from "react-native-fast-image";
import forbidExtraProps from "../../../../Services/PropTypeValidation/forbidExtraProps";
import Icon from "../../../../CommonComponents/Icon/Icon";
import resolveLinks from "../../../../Services/resolveLinks/resolveLinks";

const singleButtonWidth = responsiveWidth(100) - 48 - 48;

class InfoCardModal extends Component {
  static propTypes = forbidExtraProps({
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    bulletedList: PropTypes.arrayOf(PropTypes.string),
    cta: PropTypes.string,
    isVisible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    actions: PropTypes.array,
    modalLink: PropTypes.object
  });

  render() {
    const {
      image,
      title,
      content,
      bulletedList,
      cta,
      isVisible,
      onClose,
      actions,
      modalLink
    } = this.props;
    return (
      <Modal
        style={styles.modalContainer}
        isVisible={isVisible}
        animationInTiming={600}
        animationIn={"zoomIn"}
        animationOutTiming={600}
        animationOut={"zoomOut"}
        onBackButtonPress={onClose}
        useNativeDriver={true}
      >
        <View style={styles.modalView}>
          {image ? (
            <FastImage
              style={styles.imageBackground}
              resizeMode={FastImage.resizeMode.cover}
              source={image}
            />
          ) : null}
          <View style={styles.contentView}>
            <View style={styles.header}>
              <Text style={styles.boxTitle}>{title}</Text>
            </View>
            <View style={styles.body}>
              <Text style={styles.bodyText}>{content}</Text>
              {bulletedList && bulletedList.length
                ? bulletedList.map((item, itemIndex) => {
                    return (
                      <View key={itemIndex} style={styles.bodyList}>
                        <View style={styles.iconWrapper}>
                          <Icon
                            name={constants.infoIcon}
                            size={12}
                            color={constants.shade2}
                          />
                        </View>
                        <View style={styles.messageWrapper}>
                          <Text style={styles.messageStyle}>{item}</Text>
                        </View>
                      </View>
                    );
                  })
                : null}
              {modalLink && modalLink.text ? (
                <TouchableOpacity
                  onPress={() => {
                    onClose();
                    if (modalLink.link) {
                      resolveLinks(
                        modalLink.link,
                        modalLink.screenProps ? modalLink.screenProps : {}
                      );
                    } else {
                      if (modalLink.deepLink) {
                        resolveLinks(false, false, modalLink.deepLink);
                      }
                    }
                  }}
                >
                  <Text style={[styles.messageStyle, styles.textLink]}>
                    {modalLink.text}
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
            {cta || !actions || actions.length === 0 ? ( // display cta if no actions are present in the modal
              <SimpleButton
                hasBorder
                color={"transparent"}
                text={cta || "Okay!"}
                action={onClose}
                textColor={constants.firstColor}
                textStyle={{
                  marginLeft: 0,
                  marginTop: 0
                }}
                containerStyle={{
                  width: singleButtonWidth
                }}
              />
            ) : null}
            <View style={styles.actionBar}>
              {actions && actions.length
                ? actions.map((action, actionIndex) => {
                    return (
                      <SimpleButton
                        key={actionIndex}
                        hasBorder
                        color={"white"}
                        text={action.text}
                        icon={action.icon}
                        iconSize={16}
                        action={() => {
                          onClose();
                          if (action.link) {
                            resolveLinks(
                              action.link,
                              action.screenProps ? action.screenProps : {}
                            );
                          } else {
                            if (action.deepLink) {
                              resolveLinks(false, false, action.deepLink);
                            }
                          }
                        }}
                        textColor={constants.firstColor}
                        textStyle={{
                          marginLeft: 0,
                          marginTop: 0
                        }}
                        containerStyle={{
                          width:
                            actions.length > 1
                              ? singleButtonWidth / 2 - 16
                              : responsiveWidth(100) - 48 - 48,
                          ...(actions.length > 1 ? { marginHorizontal: 4 } : {})
                        }}
                      />
                    );
                  })
                : null}
            </View>
          </View>
          <TouchableOpacity
            onPress={onClose}
            activeOpacity={0.8}
            style={styles.closeIconTouchable}
          >
            <View style={styles.closeIconContainer}>
              <Icon name={constants.closeIcon} color={"white"} size={16} />
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    margin: 0,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  modalView: {
    width: responsiveWidth(100) - 48,
    backgroundColor: "white",
    borderRadius: 5
  },
  imageBackground: {
    height: 144,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5
  },
  contentView: {
    padding: 24
  },
  header: {},
  body: {
    marginBottom: 24
  },
  bodyText: {
    ...constants.fontCustom(constants.primaryLight, 15, 18),
    color: constants.black1
  },
  boxTitle: {
    marginVertical: 8,
    marginTop: 0,
    ...constants.fontCustom(constants.primaryRegular, 20, 24),
    color: constants.black1
  },
  bodyList: {
    flexDirection: "row",
    marginBottom: 8
  },
  iconWrapper: {
    height: 18,
    width: 24,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 2,
    paddingRight: 8
  },
  messageWrapper: {
    flex: 1
  },
  messageStyle: {
    ...constants.fontCustom(constants.primaryLight, 15, 18),
    color: constants.black1
  },
  textLink: {
    textDecorationLine: "underline",
    color: constants.firstColor
  },
  closeIconTouchable: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    top: -18,
    right: -18,
    padding: 8
  },
  closeIconContainer: {
    height: 25,
    width: 25,
    borderRadius: 12.5,
    backgroundColor: "rgba(0,0,0,0.8)",
    alignItems: "center",
    justifyContent: "center"
  },
  closeButton: {
    height: 25,
    width: 25
  },
  actionBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  }
});

export default InfoCardModal;
