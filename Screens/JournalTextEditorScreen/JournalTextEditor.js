import React, { Component, Fragment } from "react";
import { View, StyleSheet, TextInput, Platform } from "react-native";
import TextEditor from "./Components/TextEditor";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import SimpleButton from "../../CommonComponents/SimpleButton/SimpleButton";
import constants from "../../constants/constants";
import Carousel from "../../CommonComponents/Carousel/Carousel";
import ImagePreviewThumbnail from "./Components/ImagePreviewThumbnail";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import _ from "lodash";
import { inject, observer } from "mobx-react/custom";
import DebouncedAlert from "../../CommonComponents/DebouncedAlert/DebouncedAlert";

let _submitStory = () => null;

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
              action={() => {
                _submitStory();
              }}
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
    richText: "",
    preSelectedImages: [],
    selectedImagesList: []
  };
  _titleInputRef = React.createRef();
  _richTextInputRef = React.createRef();
  _textEditorRef = React.createRef();

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
    const richText =
      this._textEditorRef.current &&
      this._textEditorRef.current.retrieveRichText();
    const { submitStory } = this.props.journalStore;
    const activeStory = this.props.navigation.getParam("activeStory", "");
    submitStory(activeStory, this.state.title, richText)
      .then(() => {
        this.props.navigation.pop(2);
      })
      .catch(() => {
        DebouncedAlert(
          constants.journalFailureMessages.title,
          constants.journalFailureMessages.failedToSubmitJournalStory
        );
      });
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
    }, 1000);

    const storyId = this.props.navigation.getParam("activeStory", "");
    const pageId = this.props.navigation.getParam("activePage", "");

    const { getStoryById, getImagesById } = this.props.journalStore;
    const storyDetails = getStoryById({ pageId, storyId });
    this.setState({
      title: storyDetails.title
    });
    const preSelectedImages = getImagesById({ storyId, pageId });
    const selectedImagesList = this.props.navigation.getParam(
      "selectedImagesList",
      []
    );
    this.setState({
      preSelectedImages,
      selectedImagesList
    });
  }

  render() {
    const isTextEditorActive =
      !this.state.isTitleFocused && this.state.isKeyboardVisible;

    const storyId = this.props.navigation.getParam("activeStory", "");
    const pageId = this.props.navigation.getParam("activePage", "");

    const { getStoryById } = this.props.journalStore;
    const storyDetails = getStoryById({ pageId, storyId });

    const { preSelectedImages, selectedImagesList } = this.state;

    return (
      <View style={styles.journalTextEditorContainer}>
        {!isTextEditorActive ? (
          <Fragment>
            <Carousel firstMargin={24}>
              {preSelectedImages.map(
                (preSelectedImage, preSelectedImageIndex) => {
                  return (
                    <ImagePreviewThumbnail
                      key={preSelectedImageIndex}
                      imageStyle={styles.thumbnailImage}
                      imageSource={{
                        uri: _.get(preSelectedImage, "imageUrl")
                      }}
                    />
                  );
                }
              )}
              {selectedImagesList.map((selectedImage, imageIndex) => {
                return (
                  <ImagePreviewThumbnail
                    key={imageIndex}
                    imageStyle={styles.thumbnailImage}
                    imageSource={{
                      uri:
                        _.get(selectedImage, "croppedImage.path") ||
                        _.get(selectedImage, "image.node.image.uri")
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
          ref={this._textEditorRef}
          isTextEditorActive={isTextEditorActive}
          getRichText={this.getRichText}
          onKeyBoardStateChange={this.onKeyBoardStateChange}
          navigation={this.props.navigation}
          richTextInputRef={this._richTextInputRef}
          initialValue={storyDetails.storyRichText || ""}
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
