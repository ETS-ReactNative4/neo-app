import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import constants from "../../../constants/constants";
import Icon from "../../../CommonComponents/Icon/Icon";

const ControlIcon = ({ isSelected, iconName, action = () => null }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={action}
      style={[styles.iconWrapper, isSelected ? styles.iconSelected : {}]}
    >
      <Icon
        name={iconName}
        color={isSelected ? constants.black1 : "white"}
        size={20}
      />
    </TouchableOpacity>
  );
};

const TextEditorControls = () => {
  return (
    <View style={styles.textEditorControlsContainer}>
      <ControlIcon
        iconName={constants.closeIcon}
        isSelected={false}
        action={() => null}
      />
      <ControlIcon iconName={constants.telephoneIcon} isSelected={true} />
      <ControlIcon iconName={constants.callIcon} isSelected={false} />
      <ControlIcon iconName={constants.checkIcon} isSelected={true} />
      <ControlIcon iconName={constants.downloadIcon} isSelected={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  textEditorControlsContainer: {
    height: 58,
    width: responsiveWidth(100),
    backgroundColor: constants.black1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  iconWrapper: {
    height: 36,
    width: 36,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center"
  },
  iconSelected: {
    backgroundColor: "white"
  }
});

export default TextEditorControls;
