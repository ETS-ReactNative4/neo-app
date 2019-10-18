import { Text, TouchableHighlight, View, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import PropTypes from "prop-types";
import React from "react";
import constants from "../../constants/constants";
import forbidExtraProps from "../../Services/PropTypeValidation/forbidExtraProps";
import changeColorAlpha from "../../Services/changeColorAlpha/changeColorAlpha";
import SmartImageV2 from "../SmartImage/SmartImageV2";

const Box = ({
  data,
  index = 0,
  size,
  boxStyle = {},
  titleStyle = {},
  helpTextStyle = {},
  gradientColor
}) => {
  const gradientOptions = {
    locations: [0.25, 0.5, 0.7, 1]
  };

  if (size) {
    boxStyle.width = size;
    boxStyle.height = size;
  }

  if (typeof gradientColor === "function") {
    gradientOptions.colors = [
      constants.darkGradientAlpha(0.1),
      gradientColor(0.1),
      gradientColor(0.5),
      gradientColor(0.89)
    ];
  } else {
    gradientOptions.colors = [
      constants.darkGradientAlpha(0.1),
      changeColorAlpha(gradientColor, 0.1),
      changeColorAlpha(gradientColor, 0.5),
      changeColorAlpha(gradientColor, 0.89)
    ];
  }

  return (
    <View style={[styles.box, boxStyle]}>
      <TouchableHighlight
        onPress={data.action}
        underlayColor={"transparent"}
        style={styles.touchable}
      >
        <SmartImageV2
          style={styles.imageBackground}
          resizeMode={"cover"}
          source={data.image}
          useFastImage={true}
        >
          <LinearGradient {...gradientOptions} style={styles.gradientView}>
            {data.helpText ? (
              <Text style={[styles.boxHelpText, helpTextStyle]}>
                {data.helpText}
              </Text>
            ) : null}
            <Text style={[styles.boxTitle, titleStyle]}>{data.title}</Text>
          </LinearGradient>
        </SmartImageV2>
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
  boxStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  helpTextStyle: PropTypes.object,
  gradientColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
    .isRequired
});

export default Box;
