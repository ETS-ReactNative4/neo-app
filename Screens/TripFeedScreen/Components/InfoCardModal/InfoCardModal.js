import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
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

class InfoCardModal extends Component {
  static propTypes = forbidExtraProps({
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    bulletedList: PropTypes.arrayOf(PropTypes.string),
    cta: PropTypes.string.isRequired,
    isVisible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  });

  render() {
    const {
      image,
      title,
      content,
      bulletedList,
      cta,
      isVisible,
      onClose
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
            </View>
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
                width: responsiveWidth(100) - 48 - 48
              }}
            />
          </View>
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
  }
});

export default InfoCardModal;
