import React, { Component } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import constants from "../../../constants/constants";
import { responsiveWidth } from "react-native-responsive-dimensions";
import KeyboardAvoidingActionBar from "../../../CommonComponents/KeyboardAvoidingActionBar/KeyboardAvoidingActionBar";
import TextEditorControls from "./TextEditorControls";
import RNDraftView from "react-native-draftjs-editor";

const styleSheet = `
  @import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600&display=swap);
  h2 > div > span > span {
    font-family: "Source Sans Pro", sans-serif;
    font-weight: 600;
    font-size: 18px;
    line-height: 28px;
    color: ${constants.black1};
  }
  li > div > span > span {
    font-family: "Source Sans Pro", sans-serif;
    font-size: 15px;
    line-height: 32px;
    color: ${constants.black1};
  }
  span {
    font-family: "Source Sans Pro", sans-serif;
    font-size: 15px;
    line-height: 26px;
    color: ${constants.black1};
  }
`;

/**
 * Component for the Rich Text editor
 * Will display normal text editor when rich text editor is not supported
 */
class TextEditor extends Component {
  state = {
    selectedTag: "",
    selectedStyles: []
  };

  onStyleKeyPress = toolType => {
    const { richTextInputRef } = this.props;
    richTextInputRef.current && richTextInputRef.current.setStyle(toolType);
  };

  onTagKeyPress = toolType => {
    const { richTextInputRef } = this.props;
    richTextInputRef.current && richTextInputRef.current.setBlockType(toolType);
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

  retrieveRichText = () =>
    this.props.richTextInputRef.current &&
    this.props.richTextInputRef.current.getEditorState();

  componentDidMount() {}

  render() {
    const {
      onKeyBoardStateChange,
      navigation,
      getRichText,
      isTextEditorActive,
      richTextInputRef,
      initialValue,
      isRichTextSupported,
      plainText,
      onPlainTextChange
    } = this.props;
    return (
      <View style={styles.textEditorContainer}>
        <View style={styles.textEditorWrapper}>
          {isRichTextSupported ? (
            <RNDraftView
              ref={richTextInputRef}
              defaultValue={initialValue}
              placeholder={"Write a captivating story..."}
              style={{ backgroundColor: "#fff", margin: 0, padding: 0 }}
              onStyleChanged={this.onSelectedStyleChanged}
              onBlockTypeChanged={this.onSelectedTagChanged}
              styleSheet={styleSheet.replace(/(\r\n|\n|\r)/gm, "")}
            />
          ) : (
            <TextInput
              ref={richTextInputRef}
              multiline={true}
              style={[
                styles.textInput,
                !plainText ? styles.placeholderStyle : null
              ]}
              onChangeText={onPlainTextChange}
              value={plainText}
              underlineColorAndroid={"transparent"}
              placeholder={"Write a captivating story..."}
              placeholderTextColor={constants.shade2}
              textAlignVertical={"top"}
            />
          )}
        </View>
        <KeyboardAvoidingActionBar
          onKeyBoardStateChange={keyboardVisibility => {
            if (keyboardVisibility === "hidden") {
              if (
                isRichTextSupported &&
                richTextInputRef.current &&
                richTextInputRef.current.getEditorState
              ) {
                getRichText(richTextInputRef.current.getEditorState());
              }
            }
            onKeyBoardStateChange(keyboardVisibility);
          }}
          xSensorPlaceholderColor={
            isTextEditorActive ? constants.black1 : "transparent"
          }
          navigation={navigation}
        >
          {isRichTextSupported && isTextEditorActive ? (
            <View style={styles.toolbarContainer}>
              <View style={styles.toolbarSection}>
                <View style={styles.toolBarWrapper}>
                  <TextEditorControls
                    selectedTag={this.state.selectedTag}
                    selectedStyles={this.state.selectedStyles}
                    onStyleKeyPress={this.onStyleKeyPress}
                    onTagKeyPress={this.onTagKeyPress}
                    richTextInputRef={richTextInputRef}
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
  },
  textInput: {
    ...constants.fontCustom(constants.primaryRegular, 16, 20),
    color: constants.black1
  },
  placeholderStyle: {
    fontFamily: constants.primarySemiBold
  }
});

export default TextEditor;
