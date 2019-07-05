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

const customEditorStyles = StyleSheet.create({
  bold: {
    fontWeight: "bold",
    ...constants.fontCustom(constants.primarySemiBold, 18, 28),
    color: constants.black1
  },
  italic: {
    fontStyle: "italic"
  },
  underline: {
    textDecorationLine: "underline",
    ...constants.fontCustom(constants.primaryRegular, 15, 26),
    color: constants.black1
  },
  lineThrough: {
    textDecorationLine: "line-through",
    ...constants.fontCustom(constants.primaryRegular, 15, 26),
    color: constants.black1
  },
  heading: {
    ...constants.fontCustom(constants.primarySemiBold, 24, 28),
    color: constants.black1
  },
  body: {
    ...constants.fontCustom(constants.primaryRegular, 15, 26),
    color: constants.black1
  },
  title: {
    ...constants.fontCustom(constants.primarySemiBold, 24, 28),
    color: constants.black1
  },
  ul: {
    ...constants.fontCustom(constants.primaryRegular, 15, 26),
    color: constants.black1
  },
  ol: {
    ...constants.fontCustom(constants.primaryRegular, 15, 26),
    color: constants.black1
  },
  red: {
    color: "#d23431"
  },
  green: {
    color: "#4a924d"
  },
  blue: {
    color: "#0560ab"
  },
  black: {
    color: "#33363d"
  },
  blue_hl: {
    backgroundColor: "#34f3f4"
  },
  green_hl: {
    backgroundColor: "#2df149"
  },
  pink_hl: {
    backgroundColor: "#f53ba7"
  },
  yellow_hl: {
    backgroundColor: "#f6e408"
  },
  orange_hl: {
    backgroundColor: "#f07725"
  },
  purple_hl: {
    backgroundColor: "#c925f2"
  }
});

class TextEditor extends Component {
  state = {
    selectedTag: "body",
    selectedStyles: []
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

  retrieveRichText = () => convertToHtmlString(this.state.value);

  componentDidMount() {
    if (this.props.initialValue) {
      this.setState({
        value: convertToObject(this.props.initialValue)
      });
    } else {
      this.setState({
        value: [getInitialObject()]
      });
      setTimeout(() => {
        this.onStyleKeyPress(constants.textEditorControlBody);
      }, 500);
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
