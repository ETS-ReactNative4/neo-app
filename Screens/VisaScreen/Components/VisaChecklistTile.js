import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ViewPropTypes,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  LayoutAnimation
} from "react-native";
import PropTypes from "prop-types";
import Icon from "../../../CommonComponents/Icon/Icon";
import constants from "../../../constants/constants";
import SimpleButton from "../../../CommonComponents/SimpleButton/SimpleButton";
import CheckBox from "../../../CommonComponents/CheckBox/CheckBox";
import openCustomTab from "../../../Services/openCustomTab/openCustomTab";
import CustomHtmlView from "../../../CommonComponents/CustomHtmlView/CustomHtmlView";

const VisaChecklistTile = ({
  containerStyle = StyleSheet.create({}),
  title = "",
  isChecked = false,
  isExpanded = false,
  onToggleSelection = () => null,
  onToggleExpand = () => null,
  desc = "",
  ctaText = "",
  downloadUrl = ""
}) => {
  const [iconContainer, setIconContainer] = useState({
    transform: [{ rotate: isExpanded ? "180deg" : "0deg" }]
  });
  const [isTileExpanded, toggleTileStatus] = useState(false);

  useEffect(() => {
    if (isTileExpanded !== isExpanded) {
      let spin;
      const spinValue = new Animated.Value(0);
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 300,
        easing: Easing.linear
      }).start();
      if (isExpanded) {
        spin = spinValue.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "180deg"]
        });
        setIconContainer({ transform: [{ rotate: spin }] });
      } else {
        spin = spinValue.interpolate({
          inputRange: [0, 1],
          outputRange: ["180deg", "0deg"]
        });
        setIconContainer({ transform: [{ rotate: spin }] });
      }
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      toggleTileStatus(isExpanded);
    }
  }, [iconContainer, isExpanded, isTileExpanded]);

  const downloadAction = () => openCustomTab(downloadUrl);
  const ChecklistWrapper = desc ? TouchableOpacity : View;
  const checklistProps = desc
    ? { activeOpacity: 0.8, onPress: onToggleExpand }
    : {};
  return (
    <ChecklistWrapper
      style={[styles.visaChecklistTileContainer, containerStyle]}
      {...checklistProps}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onToggleExpand}
        style={styles.headerContainer}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onToggleSelection}
          style={styles.checkBoxWrapper}
        >
          <CheckBox isChecked={isChecked} action={onToggleSelection} />
        </TouchableOpacity>
        <View style={styles.titleWrapper}>
          <Text style={styles.titleText} onPress={onToggleSelection}>
            {title}
          </Text>
        </View>
        {desc ? (
          <Animated.View style={[styles.arrowIconWrapper, iconContainer]}>
            <Icon
              name={constants.arrowDown}
              size={16}
              color={constants.shade3}
            />
          </Animated.View>
        ) : null}
      </TouchableOpacity>
      {desc ? (
        <View
          style={[
            styles.bodyContainer,
            !isTileExpanded ? styles.foldedBody : null
          ]}
        >
          <View>
            <CustomHtmlView html={desc} />
            {/* In-case plain text is needed in the future... */}
            {/*<Text style={styles.descText}>{desc}</Text>*/}
          </View>
          <View style={styles.buttonWrapper}>
            {ctaText ? (
              <SimpleButton
                text={ctaText}
                textStyle={{
                  ...constants.fontCustom(constants.primarySemiBold, 14)
                }}
                textColor={constants.fifteenthColor}
                color={"transparent"}
                action={downloadAction}
                iconSize={16}
                containerStyle={{ width: null }}
                underlayColor={"transparent"}
                icon={constants.downloadIcon}
              />
            ) : null}
          </View>
        </View>
      ) : null}
    </ChecklistWrapper>
  );
};

VisaChecklistTile.propTypes = {
  containerStyle: ViewPropTypes.style,
  title: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  onToggleSelection: PropTypes.func.isRequired,
  onToggleExpand: PropTypes.func.isRequired,
  desc: PropTypes.string,
  ctaText: PropTypes.string,
  downloadUrl: PropTypes.string
};

const styles = StyleSheet.create({
  /**
   * Usually containes have padding around them
   * but the padding here is given to child elements
   * to increase the clickable area around them
   */
  visaChecklistTileContainer: {
    paddingBottom: 24,
    paddingRight: 24,
    backgroundColor: "white"
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  checkBoxWrapper: {
    paddingRight: 8,
    paddingLeft: 24,
    paddingTop: 24
  },
  titleWrapper: {
    flex: 1,
    alignItems: "flex-start"
  },
  titleText: {
    ...constants.fontCustom(constants.primarySemiBold, 16),
    color: constants.black1,
    marginTop: 2,
    paddingTop: 24
  },
  arrowIconWrapper: {
    marginTop: 24
  },
  descText: {
    ...constants.fontCustom(constants.primaryRegular, 15, 22),
    color: constants.black2
  },
  bodyContainer: {
    marginTop: 16,
    paddingLeft: 24 + 24 // one for checkbox, one for the container
  },
  foldedBody: {
    marginTop: 0,
    height: 0,
    opacity: 0
  },
  buttonWrapper: {
    alignItems: "flex-start",
    overflow: "hidden"
  }
});

export default VisaChecklistTile;
