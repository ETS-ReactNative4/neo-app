import React, { Component, Fragment } from "react";
import { View, StyleSheet, TextInput, Platform } from "react-native";
import TextEditor from "./Components/TextEditor";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import SimpleButton from "../../CommonComponents/SimpleButton/SimpleButton";
import constants from "../../constants/constants";
import Carousel from "../../CommonComponents/Carousel/Carousel";
import ImagePreviewThumbnail from "./Components/ImagePreviewThumbnail";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import { inject, observer } from "mobx-react/custom";

let _submitStory = false;

@ErrorBoundary()
@inject("journalStore")
@observer
class JournalTextEditor extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <CommonHeader
          title={"Write Story"}
          navigation={navigation}
          RightButton={
            <SimpleButton
              action={_submitStory}
              text={"Done"}
              textColor={constants.firstColor}
              color={"transparent"}
              containerStyle={{
                height: 24,
                width: 62,
                marginRight: 16
              }}
            />
          }
        />
      )
    };
  };

  state = {
    title: "",
    isTitleFocused: false,
    isKeyboardVisible: false,
    richText: ""
  };
  _titleInputRef = React.createRef();
  _richTextInputRef = React.createRef();

  constructor(props) {
    super(props);

    _submitStory = this.submitStory;
  }

  getRichText = richText => {
    this.setState({
      richText
    });
  };

  submitTitle = () => {
    /**
     * Timeout needed for the editor controls to load and enable the event listeners
     */
    setTimeout(() => {
      this._richTextInputRef.current && this._richTextInputRef.current.focus();
    }, 500);
  };

  submitStory = () => {
    const { addImagesToQueue } = this.props.journalStore;
    const activeStory = this.props.navigation.getParam("activeStory", "");
    const selectedImagesList = this.props.navigation.getParam(
      "selectedImagesList",
      []
    );
    addImagesToQueue(activeStory, selectedImagesList);
  };

  editTitle = title => this.setState({ title });

  titleFocused = () => this.setState({ isTitleFocused: true });

  titleBlurred = () => this.setState({ isTitleFocused: false });

  onKeyBoardStateChange = keyboardVisibility => {
    if (keyboardVisibility === "visible") {
      this.setState({ isKeyboardVisible: true });
    } else {
      this.setState({ isKeyboardVisible: false });
    }
  };

  componentDidMount() {
    /**
     * Timeout needed for preventing keyboard from appearing during transitions
     */
    setTimeout(() => {
      this._titleInputRef.current && this._titleInputRef.current.focus();
    }, 500);
  }

  render() {
    const selectedImagesList = this.props.navigation.getParam(
      "selectedImagesList",
      []
    );
    const isTextEditorActive =
      !this.state.isTitleFocused && this.state.isKeyboardVisible;

    return (
      <View style={styles.journalTextEditorContainer}>
        {!isTextEditorActive ? (
          <Fragment>
            <Carousel firstMargin={24}>
              {selectedImagesList.map((selectedImage, imageIndex) => {
                return (
                  <ImagePreviewThumbnail
                    key={imageIndex}
                    imageStyle={styles.thumbnailImage}
                    imageSource={{
                      uri:
                        selectedImage.croppedImage.path ||
                        selectedImage.image.node.image.uri
                    }}
                  />
                );
              })}
            </Carousel>
            <TextInput
              ref={this._titleInputRef}
              style={styles.inputStyle}
              onChangeText={this.editTitle}
              value={this.state.title}
              returnKeyType={"next"}
              onFocus={this.titleFocused}
              onBlur={this.titleBlurred}
              onSubmitEditing={this.submitTitle}
              underlineColorAndroid={"transparent"}
              placeholder={"Give your post a heading..."}
              placeholderTextColor={constants.shade3}
              textAlignVertical={"center"}
            />
          </Fragment>
        ) : null}
        <TextEditor
          isTextEditorActive={isTextEditorActive}
          getRichText={this.getRichText}
          onKeyBoardStateChange={this.onKeyBoardStateChange}
          navigation={this.props.navigation}
          richTextInputRef={this._richTextInputRef}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  journalTextEditorContainer: { flex: 1, backgroundColor: "white" },
  thumbnailImage: {
    height: 60,
    width: 60,
    marginRight: 8,
    borderRadius: 2
  },
  inputStyle: {
    ...Platform.select({
      ios: {
        height: 32
      },
      android: {
        height: 40
      }
    }),
    marginHorizontal: 24,
    ...constants.fontCustom(constants.primarySemiBold, 18),
    marginTop: 24,
    marginBottom: 16
  }
});

export default JournalTextEditor;
