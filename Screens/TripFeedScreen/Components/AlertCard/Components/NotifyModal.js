import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import Modal from "react-native-modal";
import PropTypes from "prop-types";
import { responsiveWidth } from "react-native-responsive-dimensions";
import constants from "../../../../../constants/constants";
import SimpleButton from "../../../../../CommonComponents/SimpleButton/SimpleButton";
import Icon from "../../../../../CommonComponents/Icon/Icon";

class NotifyModal extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
  };

  render() {
    const { show, data, onClose } = this.props;

    return (
      <Modal
        isVisible={show}
        onBackdropPress={onClose}
        onBackButtonPress={onClose}
        style={styles.modalContainer}
      >
        <View style={styles.modalView}>
          <View style={styles.header}>
            <Text style={styles.headerText}>{data.title}</Text>
          </View>
          <View style={styles.body}>
            {data.details &&
              data.details.map((item, itemIndex) => {
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
                      <Text style={styles.messageStyle}>{item.text}</Text>
                    </View>
                  </View>
                );
              })}
          </View>
          {data.modalButton ? (
            <View style={styles.footer}>
              <SimpleButton
                hasBorder
                color={"transparent"}
                text={data.modalButton || "Alright"}
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
          ) : null}
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
    borderRadius: 5,
    padding: 24
  },
  header: {},
  headerText: {
    ...constants.fontCustom(constants.primarySemiBold, 20),
    marginVertical: 8,
    textAlign: "center",
    color: constants.black1
  },
  body: {
    paddingBottom: 24
  },
  bodyList: {
    flexDirection: "row",
    marginBottom: 8
  },
  iconWrapper: {
    width: 24,
    paddingTop: 2,
    paddingRight: 8
  },
  messageWrapper: {
    flex: 1
  },
  messageStyle: {
    ...constants.fontCustom(constants.primaryRegular, 15, 18),
    color: constants.black1
  }
});

export default NotifyModal;
