import { Text, TouchableHighlight, View, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";
import PropTypes from "prop-types";
import React from "react";
import constants from "../../constants/constants";
import forbidExtraProps from "../../Services/PropTypeValidation/forbidExtraProps";

const Box = ({
  data,
  index = 0,
  size,
  showBar,
  boxStyle = {},
  titleStyle = {},
  helpTextStyle = {},
  gradients = []
}) => {
  let gradientColor,
    len = gradients.length;
  const gradientOptions = {
    locations: [0.25, 0.5, 0.7, 1]
  };
  if (index < len) {
    gradientColor = gradients[index];
  } else {
    gradientColor = gradients[index % len];
  }

  if (size) {
    boxStyle.width = size;
    boxStyle.height = size;
  }

  if (showBar) {
    gradientOptions.colors = [
      constants.darkGradientAlpha(0),
      gradientColor || constants.black1
    ];
    gradientOptions.locations = [0.75, 0.75];
  } else {
    gradientOptions.colors = [
      constants.darkGradientAlpha(0.1),
      gradientColor(0.1),
      gradientColor(0.5),
      gradientColor(0.89)
    ];
  }

  return (
    <View style={[styles.box, boxStyle]}>
      <TouchableHighlight
        onPress={data.action}
        underlayColor={"transparent"}
        style={styles.touchable}
      >
        <FastImage
          style={styles.imageBackground}
          resizeMode={FastImage.resizeMode.cover}
          source={data.image}
        >
          <LinearGradient {...gradientOptions} style={styles.gradientView}>
            {data.helpText ? (
              <Text style={[styles.boxHelpText, helpTextStyle]}>
                {data.helpText}
              </Text>
            ) : null}
            <Text style={[styles.boxTitle, titleStyle]}>{data.title}</Text>
          </LinearGradient>
        </FastImage>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    height: 160,
    width: 160,
    overflow: "hidden",
    borderRadius: 5,
    marginRight: 8
  },
  touchable: {
    flex: 1
  },
  imageBackground: {
    flex: 1
  },
  gradientView: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-end"
  },
  boxTitle: {
    margin: 8,
    marginTop: 0,
    fontWeight: "bold",
    color: "white",
    ...constants.fontCustom(constants.primaryRegular, 20, 24)
  },
  boxHelpText: {
    marginHorizontal: 8,
    fontWeight: "600",
    color: "white",
    ...constants.fontCustom(constants.primaryRegular, 13)
  }
});

Box.propTypes = forbidExtraProps({
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    helpText: PropTypes.string,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
    action: PropTypes.func.isRequired
  }).isRequired,
  index: PropTypes.number,
  size: PropTypes.number,
  showBar: PropTypes.bool,
  boxStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  helpTextStyle: PropTypes.object,
  gradients: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.func])
  ).isRequired
});

export default Box;
