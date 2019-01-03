import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { PropTypes } from "prop-types";
import ContentSection from "./Components/ContentSection";
import SimpleButton from "../../../../CommonComponents/SimpleButton/SimpleButton";
import constants from "../../../../constants/constants";

class ToolTip extends Component {
  static propTypes = {
    imageFirst: PropTypes.bool,
    title: PropTypes.string.isRequired,
    text: PropTypes.string,
    buttonText: PropTypes.string,
    imageSrc: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    containerStyle: PropTypes.object,
    action: PropTypes.func,
    buttonStyle: PropTypes.object,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        text: PropTypes.string,
        action: PropTypes.func
      })
    )
  };

  render() {
    const {
      imageFirst,
      title,
      text,
      imageSrc,
      containerStyle = {},
      buttonText,
      buttonStyle = {},
      action,
      options
    } = this.props;
    const buttonAction = action ? action : () => {};
    const contentStyleUpdate = {},
      changeLayout = {};
    if (imageFirst) {
      changeLayout.flexDirection = "row-reverse";
    } else {
      contentStyleUpdate.paddingHorizontal = 0;
      contentStyleUpdate.paddingRight = 8;
    }

    return (
      <View style={[styles.container, containerStyle]}>
        <View style={[styles.mainContainer, changeLayout]}>
          <View style={[styles.contentContainer, contentStyleUpdate]}>
            <ContentSection title={title} text={text} />
            {buttonText ? (
              <SimpleButton
                text={buttonText}
                color={"transparent"}
                textColor={constants.firstColor}
                action={buttonAction}
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
          {imageSrc ? (
            <View style={styles.imgContainer}>
              <Image
                source={imageSrc}
                resizeMode={"contain"}
                style={styles.imgStyle}
              />
            </View>
          ) : null}
        </View>
        {options && options.length ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.options}
          >
            {options.map((item, itemIndex) => {
              return (
                <TouchableOpacity
                  key={itemIndex}
                  style={styles.optionsButton}
                  onPress={options.action}
                >
                  <View style={styles.optionsView}>
                    <Text style={styles.optionTitle}>{item.title}</Text>
                    {item.text ? (
                      <Text style={styles.optionText}>{item.text}</Text>
                    ) : null}
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    marginHorizontal: 24
  },
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 4
  },
  imgContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: responsiveWidth(30)
  },
  imgStyle: {
    flex: 1,
    width: responsiveWidth(30)
  },
  optionsButton: {
    borderWidth: 1.2,
    borderRadius: 4,
    borderColor: constants.black2,
    height: 48,
    width: 100,
    padding: 8,
    marginRight: 8
  },
  optionsView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  optionTitle: {
    ...constants.fontCustom(constants.primarySemiBold, 13, 15),
    color: constants.black2,
    textAlign: "center"
  },
  optionText: {
    ...constants.fontCustom(constants.primaryRegular, 11, 13),
    color: constants.shade1,
    textAlign: "center"
  }
});

export default ToolTip;
