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
import PropTypes from "prop-types";
import ContentSection from "./Components/ContentSection";
import MultilineButton from "./Components/MultilineButton";
import forbidExtraProps from "../../../../Services/PropTypeValidation/forbidExtraProps";
import resolveLinks from "../../../../Services/resolveLinks/resolveLinks";
import { recordEvent } from "../../../../Services/analytics/analyticsService";

class ToolTip extends Component {
  static propTypes = forbidExtraProps({
    imageFirst: PropTypes.bool,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    containerStyle: PropTypes.object,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        text: PropTypes.string,
        link: PropTypes.string.isRequired,
        deepLink: PropTypes.object,
        modalData: PropTypes.object
      })
    ),
    widgetName: PropTypes.string
  });

  render() {
    const {
      imageFirst,
      title,
      text,
      image,
      containerStyle = {},
      options,
      widgetName
    } = this.props;
    const contentStyleUpdate = {},
      changeLayout = {};
    let titleStyle = {},
      textStyle = {},
      buttonAlignment = { alignSelf: "flex-start" };
    if (imageFirst && image) {
      changeLayout.flexDirection = "row-reverse";
      titleStyle = { textAlign: "right" };
      textStyle = { textAlign: "right" };
      buttonAlignment = { alignSelf: "flex-end" };
    } else {
      contentStyleUpdate.paddingHorizontal = 0;
      contentStyleUpdate.paddingRight = 8;
    }

    let button;
    if (options && options.length === 1) {
      button = options[0];
    }

    return (
      <View style={[styles.container, containerStyle]}>
        <View style={[styles.mainContainer, changeLayout]}>
          <View style={[styles.contentContainer, contentStyleUpdate]}>
            <ContentSection
              title={title}
              text={text}
              textStyle={textStyle}
              titleStyle={titleStyle}
            />
            {button ? (
              <MultilineButton
                color={button.color}
                containerStyle={{ ...buttonAlignment }}
                title={button.title}
                text={button.text}
                action={() => {
                  if (widgetName) recordEvent(widgetName);
                  resolveLinks(button.link, button.modalData, button.deepLink);
                }}
              />
            ) : null}
          </View>
          {image ? (
            <View style={styles.imgContainer}>
              <Image
                source={image}
                resizeMode={"contain"}
                style={styles.imgStyle}
              />
            </View>
          ) : null}
        </View>
        {options && options.length > 1 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.options}
          >
            {options.map((item, itemIndex) => {
              return (
                <MultilineButton
                  color={item.color}
                  title={item.title}
                  action={() =>
                    resolveLinks(item.link, item.modalData, item.deepLink)
                  }
                  text={item.text}
                  key={itemIndex}
                />
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
    height: responsiveWidth(30),
    width: responsiveWidth(30)
  },
  imgStyle: {
    height: responsiveWidth(30),
    width: responsiveWidth(30)
  }
});

export default ToolTip;
