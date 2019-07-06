import React from "react";
import { TouchableOpacity, View, StyleSheet, Keyboard } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import constants from "../../../constants/constants";
import Icon from "../../../CommonComponents/Icon/Icon";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";
import PropTypes from "prop-types";

const ControlIcon = ({ isSelected, iconName, action = () => null }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={action}
      style={styles.iconWrapper}
    >
      <Icon
        name={iconName}
        color={isSelected ? constants.firstColor : "white"}
        size={18}
      />
    </TouchableOpacity>
  );
};

ControlIcon.propTypes = forbidExtraProps({
  isSelected: PropTypes.bool.isRequired,
  iconName: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired
});

const TextEditorControls = ({
  selectedTag = "",
  selectedStyles = [],
  onStyleKeyPress = () => null
}) => {
  return (
    <View style={styles.textEditorControlsContainer}>
      <ControlIcon
        iconName={constants.headingIcon}
        isSelected={selectedTag === constants.textEditorControlHeading}
        action={() => onStyleKeyPress(constants.textEditorControlHeading)}
      />
      <ControlIcon
        iconName={constants.textIcon}
        isSelected={selectedTag === constants.textEditorControlBody}
        action={() => onStyleKeyPress(constants.textEditorControlBody)}
      />
      <ControlIcon
        iconName={constants.boldIcon}
        isSelected={
          selectedStyles.indexOf(constants.textEditorControlBold) > -1
        }
        action={() => onStyleKeyPress(constants.textEditorControlBold)}
      />
      {/* <ControlIcon
        iconName={constants.listIcon}
        isSelected={selectedTag === constants.textEditorControlUnordered}
        action={() => onStyleKeyPress(constants.textEditorControlUnordered)}
      /> */}
      <ControlIcon
        iconName={constants.underLineIcon}
        isSelected={
          selectedStyles.indexOf(constants.textEditorControlUnderline) > -1
        }
        action={() => onStyleKeyPress(constants.textEditorControlUnderline)}
      />
      <ControlIcon
        iconName={constants.keyboardDismissIcon}
        isSelected={false}
        action={Keyboard.dismiss}
      />
    </View>
  );
};

TextEditorControls.propTypes = forbidExtraProps({
  selectedTag: PropTypes.string,
  selectedStyles: PropTypes.array.isRequired,
  onStyleKeyPress: PropTypes.func.isRequired
});

const styles = StyleSheet.create({
  textEditorControlsContainer: {
    height: 56,
    width: responsiveWidth(100),
    backgroundColor: constants.black1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  iconWrapper: {
    height: 36,
    width: 36,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center"
  },
  iconSelected: {
    backgroundColor: "white"
  }
});

export default TextEditorControls;

/**
 * Original CN Tool bar. Will be needed for debugging
 */
/*
<CNToolbar
  backgroundColor={"transparent"}
  selectedBackgroundColor={"white"}
  style={styles.toolbarStyle}
  size={28}
  bold={
    <Text style={[styles.toolbarButton, styles.boldButton]}>
      B
    </Text>
  }
  italic={
    <Text style={[styles.toolbarButton, styles.italicButton]}>
      I
    </Text>
  }
  underline={
    <Text
      style={[styles.toolbarButton, styles.underlineButton]}
    >
      U
    </Text>
  }
  lineThrough={
    <Text
      style={[styles.toolbarButton, styles.lineThroughButton]}
    >
      S
    </Text>
  }
  ol={<Text style={styles.toolbarButton}>ol</Text>}
  body={<Text style={styles.toolbarButton}>T</Text>}
  title={<Text style={styles.toolbarButton}>h1</Text>}
  heading={<Text style={styles.toolbarButton}>h3</Text>}
  ul={<Text style={styles.toolbarButton}>ul</Text>}
  selectedTag={this.state.selectedTag}
  selectedStyles={this.state.selectedStyles}
  onStyleKeyPress={this.onStyleKeyPress}
/>
*/
