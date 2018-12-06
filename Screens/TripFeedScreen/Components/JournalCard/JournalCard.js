import React from "react";
import { Text, TouchableHighlight, View, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../../Services/PropTypeValidation/forbidExtraProps";
import constants from "../../../../constants/constants";

const JournalCard = ({
  data,
  index = 0,
  size,
  showBar,
  boxStyle = {},
  titleStyle = {},
  typeStyle = {},
  icon,
  iconText,
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
            
            {data.type ? (
            <Text style={[styles.boxHelpText, typeStyle]}>
              {data.type}
            </Text>
            ) : null}
            <View style={styles.header}>
              <View style={styles.titleWrapper}>
                <Text style={[styles.boxTitle, titleStyle]} numberOfLines={2}>{data.title}</Text>
              </View>
              {
                icon ?
                  <View style={styles.iconWrapper}>
                    {icon}
                    <Text style={styles.iconText}>{iconText}</Text>
                  </View> : null
              }
            </View>
          </LinearGradient>
        </FastImage>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
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
  header: {
    flexDirection: "row",
    margin: 8
  },
  titleWrapper: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-end"
  },
  iconWrapper: {
    width: 32,
    alignItems: "center"
  },
  iconText: {
    marginTop: 8,
    ...constants.fontCustom(constants.primaryRegular, 13),
    color: 'white'
  },
  boxTitle: {
    margin: 8,
    marginTop: 0,
    color: "white",
    ...constants.fontCustom(constants.primarySemiBold, 20, 24)
  },
  boxHelpText: {
    marginHorizontal: 16,
    color: constants.shade3,
    ...constants.fontCustom(constants.primarySemiBold, 13)
  }
});

JournalCard.propTypes = forbidExtraProps({
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    type: PropTypes.string,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
    action: PropTypes.func.isRequired
  }).isRequired,
  index: PropTypes.number,
  size: PropTypes.number,
  showBar: PropTypes.bool,
  boxStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  typeStyle: PropTypes.object,
  icon: PropTypes.element,
  iconText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  gradients: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.func])
  ).isRequired
});

export default JournalCard;
