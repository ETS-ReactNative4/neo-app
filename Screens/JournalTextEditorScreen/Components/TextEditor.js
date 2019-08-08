import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import constants from "../../../constants/constants";
import { responsiveWidth } from "react-native-responsive-dimensions";
import KeyboardAvoidingActionBar from "../../../CommonComponents/KeyboardAvoidingActionBar/KeyboardAvoidingActionBar";
import TextEditorControls from "./TextEditorControls";
import RNDraftView from "react-native-draftjs-editor";

const styleSheet = `
  h2 {
    font-family: ${constants.primarySemiBold};
    font-size: 18px;
    line-height: 28px;
    color: ${constants.black1};
  }
  li > div > span > span {
    font-family: ${constants.primaryRegular};
    font-size: 15px;
    line-height: 32px;
    color: ${constants.black1};
  }
  span {
    font-family: ${constants.primaryRegular};
    font-size: 15px;
    line-height: 26px;
    color: ${constants.black1};
  }
`;

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
      initialValue
    } = this.props;
    return (
      <View style={styles.textEditorContainer}>
        <View style={styles.textEditorWrapper}>
          <RNDraftView
            ref={richTextInputRef}
            defaultValue={initialValue}
            placeholder={"Write a captivating story..."}
            style={{ backgroundColor: "#fff", margin: 0, padding: 0 }}
            onStyleChanged={this.onSelectedStyleChanged}
            onBlockTypeChanged={this.onSelectedTagChanged}
            styleSheet={styleSheet}
          />
        </View>
        <KeyboardAvoidingActionBar
          onKeyBoardStateChange={keyboardVisibility => {
            if (keyboardVisibility === "hidden") {
              getRichText(
                richTextInputRef.current &&
                  richTextInputRef.current.getEditorState()
              );
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
  }
});

export default TextEditor;
