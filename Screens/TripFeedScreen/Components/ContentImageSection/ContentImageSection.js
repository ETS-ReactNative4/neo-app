import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { PropTypes } from "prop-types";
import ContentSection from "./Components/ContentSection";
import SimpleButton from "../../../../CommonComponents/SimpleButton/SimpleButton";
import constants from "../../../../constants/constants";

const ContentImageSection = ({
  imageFirst,
  title,
  text,
  imageSrc,
  containerStyle = {},
  buttonText,
  buttonStyle = {}
}) => {
  const contentStyleUpdate = {};
  if (imageFirst) {
    containerStyle.flexDirection = "row-reverse";
  } else {
    contentStyleUpdate.paddingHorizontal = 0;
    contentStyleUpdate.paddingRight = 8;
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.contentContainer, contentStyleUpdate]}>
        <ContentSection title={title} text={text} />
        {buttonText ? (
          <SimpleButton
            text={buttonText}
            color={"transparent"}
            textColor={constants.firstColor}
            action={() => {}}
            containerStyle={{
              width: buttonStyle.width || 116,
              height: buttonStyle.height || 32
            }}
            textStyle={{
              fontSize: 13,
              marginLeft: 0,
              marginTop: 0
            }}
            hasBorder
          />
        ) : null}
      </View>
      <View style={styles.imgContainer}>
        {imageSrc ? (
          <Image
            source={imageSrc}
            resizeMode={"contain"}
            style={styles.imgStyle}
          />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 16
  },
  contentContainer: {
    width: responsiveWidth(50) + 24,
    paddingBottom: 8,
    paddingHorizontal: 8
  },
  imgContainer: {
    flex: 1
  },
  imgStyle: {
    width: "100%",
    height: "100%"
  }
});

ContentImageSection.propTypes = {
  imageFirst: PropTypes.bool,
  title: PropTypes.string,
  text: PropTypes.string,
  buttonText: PropTypes.string,
  imageSrc: Image.propTypes.source,
  containerStyle: PropTypes.object,
  buttonStyle: PropTypes.object,
  buttonAction: PropTypes.func
};

export default ContentImageSection;
