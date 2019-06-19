import React, { Component } from "react";
import { View, StyleSheet, Text, ScrollView, Platform } from "react-native";
import CNRichTextEditor, {
  getInitialObject,
  getDefaultStyles,
  convertToHtmlString,
  convertToObject
} from "react-native-cn-richtext-editor";
import constants from "../../../constants/constants";
import { responsiveWidth } from "react-native-responsive-dimensions";
import KeyboardAvoidingActionBar from "../../../CommonComponents/KeyboardAvoidingActionBar/KeyboardAvoidingActionBar";
import TextEditorControls from "./TextEditorControls";

const defaultStyles = getDefaultStyles();

const customEditorStyles = Object.keys(defaultStyles).reduce(
  (accumulator, key) => {
    const currentStyle = { ...defaultStyles[key] };
    currentStyle.fontFamily = constants.primaryRegular;
    currentStyle.color = constants.black1;
    accumulator[key] = currentStyle;
    return accumulator;
  },
  {}
);

class TextEditor extends Component {
  state = {
    selectedTag: "body",
    selectedStyles: [],
    value: [getInitialObject()]
  };

  onStyleKeyPress = toolType => {
    const { richTextInputRef } = this.props;
    richTextInputRef.current && richTextInputRef.current.applyToolbar(toolType);
  };

  onSelectedTagChanged = tag => {
    this.setState({
      selectedTag: tag
    });
  };

  onSelectedStyleChanged = styles => {
    this.setState({
      selectedStyles: styles
    });
  };

  onValueChanged = value => {
    this.setState({
      value: value
    });
  };

  componentDidMount() {
    if (this.props.initialValue) {
      this.setState({
        value: convertToObject(this.props.initialValue)
      });
    }
  }

  render() {
    const {
      onKeyBoardStateChange,
      navigation,
      getRichText,
      isTextEditorActive,
      richTextInputRef
    } = this.props;
    return (
      <View style={styles.textEditorContainer}>
        <View style={styles.textEditorWrapper}>
          <CNRichTextEditor
            ref={richTextInputRef}
            onSelectedTagChanged={this.onSelectedTagChanged}
            onSelectedStyleChanged={this.onSelectedStyleChanged}
            value={this.state.value}
            style={{ backgroundColor: "#fff", margin: 0, padding: 0 }}
            styleList={customEditorStyles}
            onValueChanged={this.onValueChanged}
            placeholder={"Write a captivating story..."}
          />
        </View>
        <KeyboardAvoidingActionBar
          onKeyBoardStateChange={keyboardVisibility => {
            if (keyboardVisibility === "hidden") {
              getRichText(convertToHtmlString(this.state.value));
            }
            onKeyBoardStateChange(keyboardVisibility);
          }}
          xSensorPlaceholderColor={
            isTextEditorActive ? constants.black1 : "transparent"
          }
          navigation={navigation}
        >
          {isTextEditorActive ? (
            <View style={styles.toolbarContainer}>
              <View style={styles.toolbarSection}>
                <View style={styles.toolBarWrapper}>
                  <TextEditorControls
                    selectedTag={this.state.selectedTag}
                    selectedStyles={this.state.selectedStyles}
                    onStyleKeyPress={this.onStyleKeyPress}
                  />
                </View>
              </View>
            </View>
          ) : null}
        </KeyboardAvoidingActionBar>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textEditorContainer: {
    flex: 1
  },
  textEditorWrapper: {
    flex: 1,
    alignItems: "stretch",
    marginHorizontal: 24
  },
  toolbarContainer: {
    minHeight: 36,
    width: responsiveWidth(100),
    backgroundColor: constants.black1,
    flexDirection: "row"
  },
  toolbarSection: {
    minHeight: 36,
    width: responsiveWidth(100) - 72
  },
  buttonSection: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    height: 36,
    width: 72
  },
  toolBarWrapper: {
    width: responsiveWidth(100)
  },
  toolbarStyle: {
    borderWidth: 0,
    backgroundColor: "transparent"
  },
  toolbarButton: {
    fontSize: 20,
    width: 28,
    height: 28,
    textAlign: "center",
    backgroundColor: "transparent"
  },
  italicButton: {
    fontStyle: "italic"
  },
  boldButton: {
    fontWeight: "bold"
  },
  underlineButton: {
    textDecorationLine: "underline"
  },
  lineThroughButton: {
    textDecorationLine: "line-through"
  }
});

export default TextEditor;
