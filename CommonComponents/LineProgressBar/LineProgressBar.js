import React from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import forbidExtraProps from "../../Services/PropTypeValidation/forbidExtraProps";
import { responsiveWidth } from "react-native-responsive-dimensions";
import ProgressBar from "react-native-progress/Bar";
import constants from "../../constants/constants";

const LineProgressBar = ({ isVisible, containerStyle = {}, height = 2 }) => {
  return (
    <View style={[styles.lineContainerStyle, containerStyle]}>
      {isVisible ? (
        [
          <View style={{ transform: [{ rotate: "180deg" }] }}>
            <ProgressBar
              indeterminate={true}
              width={responsiveWidth(50)}
              height={height}
              borderWidth={0}
              borderRadius={0}
              color={constants.firstColor}
              useNativeDriver={true}
              animationConfig={{ bounciness: 5 }}
            />
          </View>,
          <ProgressBar
            indeterminate={true}
            width={responsiveWidth(50)}
            height={height}
            borderWidth={0}
            borderRadius={0}
            color={constants.firstColor}
            useNativeDriver={true}
            animationConfig={{ bounciness: 5 }}
          />
        ]
      ) : (
        <View style={[styles.lineContainerPlaceholder, { height }]} />
      )}
    </View>
  );
};

LineProgressBar.propTypes = forbidExtraProps({
  isVisible: PropTypes.bool.isRequired,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  height: PropTypes.number
});

export default LineProgressBar;

const styles = StyleSheet.create({
  lineContainerStyle: {
    flexDirection: "row",
    justifyContent: "center",
    width: responsiveWidth(100)
  },
  lineContainerPlaceholder: {
    width: responsiveWidth(100)
  }
});
