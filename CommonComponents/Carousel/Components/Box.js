import constants from "../../../constants/constants";
import { Text, TouchableHighlight, View, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import PropTypes from "prop-types";
import React from "react";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";
import SmartImageV2 from "../../SmartImage/SmartImageV2";

const Box = ({ data, index }) => {
  const gradients = [
    constants.secondGradientAlpha,
    constants.thirdGradientAlpha,
    constants.fourthGradientAlpha,
    constants.fifthGradientAlpha,
    constants.sixthGradientAlpha,
    constants.seventhGradientAlpha
  ];

  let gradientColor;
  if (index < 6) {
    gradientColor = gradients[index];
  } else {
    gradientColor = gradients[index % 6];
  }

  return (
    <View style={styles.box}>
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
          <LinearGradient
            locations={[0.25, 0.5, 0.7, 1]}
            colors={[
              "rgba(0,0,0,0.1)",
              gradientColor(0.1),
              gradientColor(0.5),
              gradientColor(0.89)
            ]}
            style={styles.gradientView}
          >
            <Text style={styles.boxTitle}>{data.title}</Text>
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
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
    lineHeight: 24
  }
});

Box.propTypes = forbidExtraProps({
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
    action: PropTypes.func.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired
});

export default Box;
