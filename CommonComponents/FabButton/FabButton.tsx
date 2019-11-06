import React from "react";
import { StyleSheet, ViewStyle, TouchableOpacity } from "react-native";
import constants from "../../constants/constants";
import Icon from "../Icon/Icon";

export interface FabButtonProps {
  containerStyle: ViewStyle;
  radius: number;
  backgroundColor: string;
  iconColor: string;
  action: () => void;
  icon: string;
  iconSize: string;
}

const FabButton = ({
  containerStyle = StyleSheet.create({}),
  radius,
  backgroundColor = constants.firstColor,
  iconColor = "white",
  action = () => null,
  icon,
  iconSize
}: FabButtonProps): React.ReactNode => {
  const buttonContainer = {
    height: radius * 2,
    width: radius * 2,
    borderRadius: radius,
    backgroundColor
  };
  return (
    <TouchableOpacity
      onPress={action}
      style={[styles.fabButtonContainer, buttonContainer, containerStyle]}
    >
      <Icon name={icon} color={iconColor} size={iconSize} />
    </TouchableOpacity>
  );
};

export interface FabButtonStyles {
  fabButtonContainer: ViewStyle;
}

const styles = StyleSheet.create<FabButtonStyles>({
  fabButtonContainer: {
    alignItems: "center",
    justifyContent: "center"
  }
});

export default FabButton;
