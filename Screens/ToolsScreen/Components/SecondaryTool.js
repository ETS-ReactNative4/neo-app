import React from "react";
import {
  TouchableHighlight,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from "react-native";
import constants from "../../../constants/constants";
import PropTypes from "prop-types";
import { responsiveWidth } from "react-native-responsive-dimensions";

const SecondaryTool = ({
  icon,
  action,
  text,
  containerStyle,
  isComingSoon
}) => {
  const Container = isComingSoon ? View : TouchableOpacity;
  return (
    <Container
      style={[
        styles.secondaryContainer,
        isComingSoon
          ? { borderColor: constants.shade5 }
          : { ...constants.elevationTwo },
        containerStyle || {}
      ]}
      onPress={action}
      underlayColor={"transparent"}
    >
      <Image
        resizeMode={"contain"}
        source={icon}
        style={styles.icon}
        opacity={isComingSoon ? 0.5 : 1}
      />
      <Text
        numberOfLines={2}
        ellipsizeMode={"tail"}
        style={[styles.text, isComingSoon ? { color: constants.shade2 } : {}]}
      >
        {text}
      </Text>
      {isComingSoon ? (
        <Image
          source={constants.comingSoonShape}
          style={{
            height: 30,
            width: 30,
            position: "absolute",
            top: 10,
            right: 0
          }}
        />
      ) : null}
    </Container>
  );
};

SecondaryTool.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
  action: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  isComingSoon: PropTypes.bool
};

const maxWidth = responsiveWidth(100) - 48;
const containerWidth = maxWidth / 3 - 8;
const styles = StyleSheet.create({
  secondaryContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    width: responsiveWidth(100) - 48,
    marginVertical: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "flex-start",
    borderColor: constants.shade4,
    padding: 16
  },
  icon: {
    height: 32,
    width: 32
  },
  text: {
    fontFamily: constants.primaryLight,
    marginLeft: 16,
    fontSize: 15,
    color: constants.black2,
    marginRight: 16
  }
});

export default SecondaryTool;
