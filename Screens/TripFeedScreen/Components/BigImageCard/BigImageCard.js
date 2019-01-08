import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../../Services/PropTypeValidation/forbidExtraProps";
import constants from "../../../../constants/constants";
import Icon from "../../../../CommonComponents/Icon/Icon";
import { responsiveWidth } from "react-native-responsive-dimensions";
import changeColorAlpha from "../../../../Services/changeColorAlpha/changeColorAlpha";
import resolveLinks from "../../../../Services/resolveLinks/resolveLinks";

const BigImageCard = ({
  title,
  type,
  image,
  link,
  containerStyle = {},
  titleStyle = {},
  typeStyle = {},
  icon,
  iconText,
  gradient = constants.darkGradientAlpha
}) => {
  let gradientColor;
  gradientColor = gradient;

  const gradientOptions = {
    locations: [0.25, 0.5, 0.7, 1]
  };

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

  const action = () => resolveLinks(link);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={action}
      style={[styles.box, containerStyle]}
    >
      <FastImage
        style={styles.imageBackground}
        resizeMode={FastImage.resizeMode.cover}
        source={image}
      >
        <LinearGradient {...gradientOptions} style={styles.gradientView}>
          {type ? (
            <Text style={[styles.boxHelpText, typeStyle]}>{type}</Text>
          ) : null}
          <View style={styles.header}>
            <View style={styles.titleWrapper}>
              <Text style={[styles.boxTitle, titleStyle]} numberOfLines={2}>
                {title}
              </Text>
            </View>
            {icon ? (
              <View style={styles.iconWrapper}>
                <Icon name={icon} color={constants.thirdColor} size={26} />
                {iconText ? (
                  <Text style={styles.iconText}>{iconText}</Text>
                ) : null}
              </View>
            ) : null}
          </View>
        </LinearGradient>
      </FastImage>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    overflow: "hidden",
    borderRadius: 5,
    marginRight: 8,
    height: 320,
    marginHorizontal: 24,
    marginVertical: 16,
    width: responsiveWidth(100) - 48
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
    color: "white"
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

BigImageCard.propTypes = forbidExtraProps({
  title: PropTypes.string.isRequired,
  type: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
  link: PropTypes.string.isRequired,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  titleStyle: PropTypes.object,
  typeStyle: PropTypes.object,
  icon: PropTypes.string,
  iconText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  gradient: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
});

export default BigImageCard;
