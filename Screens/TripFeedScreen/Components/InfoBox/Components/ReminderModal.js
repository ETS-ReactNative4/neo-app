import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import Modal from "react-native-modal";
import PropTypes from "prop-types";
import { responsiveWidth } from "react-native-responsive-dimensions";
import constants from "../../../../../constants/constants";
import SimpleButton from "../../../../../CommonComponents/SimpleButton/SimpleButton";
import FastImage from "react-native-fast-image";

class ReminderModal extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    modalButton: PropTypes.string
  };

  render() {
    const { show, data, onClose, modalButton } = this.props;

    return (
      <Modal
        isVisible={show}
        onBackButtonPress={onClose}
        onBackdropPress={onClose}
        style={styles.modalContainer}
      >
        <View style={styles.modalView}>
          {data.image ? (
            <FastImage
              style={styles.imageBackground}
              resizeMode={FastImage.resizeMode.cover}
              source={{ uri: data.image }}
            />
          ) : (
            <View style={{ height: 40 }} />
          )}
          <View style={styles.contentView}>
            <View style={styles.header}>
              <Text style={styles.boxTitle} numberOfLines={2}>
                {data.title}
              </Text>
            </View>
            <View style={styles.body}>
              <Text style={styles.bodyText}>{data.content}</Text>
            </View>
            {modalButton ? (
              <SimpleButton
                hasBorder
                color={"transparent"}
                text={modalButton || "Alright"}
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
            ) : null}
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
  }
});

export default ReminderModal;
