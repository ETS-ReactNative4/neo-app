import React, { Component } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import CNRichTextEditor, {
  CNToolbar,
  getInitialObject,
  getDefaultStyles,
  convertToHtmlString
} from "react-native-cn-richtext-editor";
import constants from "../../../constants/constants";
import { responsiveWidth } from "react-native-responsive-dimensions";
import SimpleButton from "../../../CommonComponents/SimpleButton/SimpleButton";
import KeyboardAvoidingActionBar from "../../../CommonComponents/KeyboardAvoidingActionBar/KeyboardAvoidingActionBar";

const defaultStyles = getDefaultStyles();

class TextEditor extends Component {
  state = {
    selectedTag: "body",
    selectedStyles: [],
    value: [getInitialObject()]
  };

  onStyleKeyPress = toolType => {
    this.editor.applyToolbar(toolType);
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

  render() {
    return (
      <View style={{ flex: 1, alignItems: "stretch" }}>
        <CNRichTextEditor
          ref={input => (this.editor = input)}
          onSelectedTagChanged={this.onSelectedTagChanged}
          onSelectedStyleChanged={this.onSelectedStyleChanged}
          value={this.state.value}
          style={{ backgroundColor: "#fff" }}
          styleList={defaultStyles}
          onValueChanged={this.onValueChanged}
        />
        <KeyboardAvoidingActionBar
          xSensorPlaceholderColor={constants.firstColorBackground}
          navigation={this.props.navigation}
        >
          <View style={styles.toolbarContainer}>
            <View style={styles.toolbarSection}>
              <ScrollView
                horizontal={true}
                keyboardShouldPersistTaps={"always"}
              >
                <View style={styles.toolBarWrapper}>
                  <CNToolbar
                    backgroundColor={"transparent"}
                    selectedBackgroundColor={constants.firstColorAlpha(0.6)}
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
                    // lineThrough={
                    //   <Text
                    //     style={[styles.toolbarButton, styles.lineThroughButton]}
                    //   >
                    //     S
                    //   </Text>
                    // }
                    ol={<Text style={styles.toolbarButton}>ol</Text>}
                    body={<Text style={styles.toolbarButton}>T</Text>}
                    // title={<Text style={styles.toolbarButton}>h1</Text>}
                    // heading={<Text style={styles.toolbarButton}>h3</Text>}
                    // ul={<Text style={styles.toolbarButton}>ul</Text>}
                    selectedTag={this.state.selectedTag}
                    selectedStyles={this.state.selectedStyles}
                    onStyleKeyPress={this.onStyleKeyPress}
                  />
                </View>
              </ScrollView>
            </View>
            <View style={styles.buttonSection}>
              <SimpleButton
                action={() => {
                  this.props.getRichText(convertToHtmlString(this.state.value));
                }}
                text={"Done"}
                textColor={"white"}
                containerStyle={{ width: 51, height: 24 }}
              />
            </View>
          </View>
        </KeyboardAvoidingActionBar>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  toolbarContainer: {
    height: 36,
    width: responsiveWidth(100),
    backgroundColor: constants.firstColorBackground,
    flexDirection: "row"
  },
  toolbarSection: {
    height: 36,
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
