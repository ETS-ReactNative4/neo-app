import React from "react";
import Modal from "react-native-modal";
import { View, Text, StyleSheet, Image } from "react-native";
import PropTypes from "prop-types";
import forbidExtraProps from "../../Services/PropTypeValidation/forbidExtraProps";
import { responsiveWidth } from "react-native-responsive-dimensions";
import SimpleButton from "../SimpleButton/SimpleButton";
import constants from "../../constants/constants";
import Icon from "../Icon/Icon";

const DialogBox = ({
  icon,
  title,
  message,
  isVisible,
  onClose,
  actionText,
  action
}) => {
  return (
    <Modal
      isVisible={isVisible}
      animationInTiming={300}
      animationOutTiming={300}
      onBackButtonPress={onClose}
      useNativeDriver={true}
    >
      <View style={styles.dialogBoxContainer}>
        {icon ? (
          typeof icon === "string" ? (
            <View style={styles.iconContainer}>
              <Icon name={icon} size={64} />
            </View>
          ) : (
            <Image source={icon} style={styles.icon} resizeMode={"contain"} />
          )
        ) : null}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        {isVisible ? (
          <SimpleButton
            text={actionText || "Okay!"}
            containerStyle={{ width: null, height: 40, marginBottom: 16 }}
            action={onClose}
            textColor={"white"}
            textStyle={{ marginHorizontal: 8 }}
            hasBorder={true}
            color={constants.firstColor}
          />
        ) : null}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  dialogBoxContainer: {
    alignSelf: "center",
    width: responsiveWidth(80),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 8
  },
  icon: {
    height: 64,
    width: 64,
    margin: 8,
    marginTop: 24
  },
  iconContainer: {
    margin: 8,
    marginTop: 24
  },
  title: {
    ...constants.fontCustom(constants.primarySemiBold, 17),
    margin: 16,
    color: constants.black1,
    textAlign: "center"
  },
  message: {
    ...constants.fontCustom(constants.primaryLight, 14),
    marginHorizontal: 16,
    marginBottom: 24,
    color: constants.black2,
    textAlign: "center"
  }
});

DialogBox.propTypes = forbidExtraProps({
  icon: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  actionText: PropTypes.string.isRequired,
  action: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
});

export default DialogBox;
