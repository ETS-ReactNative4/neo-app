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

class ContentImageSection extends Component {
  static propTypes = {
    imageFirst: PropTypes.bool,
    title: PropTypes.string,
    text: PropTypes.string,
    buttonText: PropTypes.string,
    imageSrc: Image.propTypes.source,
    containerStyle: PropTypes.object,
    action: PropTypes.func,
    buttonStyle: PropTypes.object,
    buttonAction: PropTypes.func,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        text: PropTypes.string
      })
    )
  };

  selected = (option, index) => {
    this.setState(
      {
        selectedOption: index
      },
      () => {
        this.props.optionsCB && this.props.optionsCB(option);
      }
    );
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
                  onPress={() => this.selected(item, itemIndex)}
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
    flex: 1,
    marginVertical: 16
  },
  mainContainer: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 16
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
  },
  options: {
    flex: 1
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

export default ContentImageSection;
