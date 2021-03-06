import React, { Component, Fragment } from "react";
import { View, StyleSheet, TextInput, Platform, Keyboard } from "react-native";
import TextEditor from "./Components/TextEditor";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import SimpleButton from "../../CommonComponents/SimpleButton/SimpleButton";
import constants from "../../constants/constants";
import Carousel from "../../CommonComponents/Carousel/Carousel";
import ImagePreviewThumbnail from "./Components/ImagePreviewThumbnail";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import _ from "lodash";
import { inject, observer } from "mobx-react";
import DebouncedAlert from "../../CommonComponents/DebouncedAlert/DebouncedAlert";
import BackHandlerHoc from "../../CommonComponents/BackHandlerHoc/BackHandlerHoc";
import AddImageThumbnail from "./Components/AddImageThumbnail";
import extractTextFromHtml from "../../Services/extractTextFromHtml/extractTextFromHtml";

let _submitStory = () => null;
let _backHandler = () => null;

/**
 * Set journal publish mode,
 * If journal is already published, the story should also get a publish screen
 */
let _isJournalPublished = false;
let _publishStory = () => null;

@ErrorBoundary()
@BackHandlerHoc(() => _backHandler())
@inject("journalStore")
@observer
class JournalTextEditor extends Component {
  state = {
    title: "",
    isTitleFocused: false,
    isKeyboardVisible: false,
    richText: "",
    plainText: "",
    isRichTextSupported: true,
    preSelectedImages: [],
    selectedImagesList: []
  };
  _titleInputRef = React.createRef();
  _richTextInputRef = React.createRef();
  _textEditorRef = React.createRef();
  _didFocusSubscription;

  constructor(props) {
    super(props);

    _submitStory = this.submitStory;
    _backHandler = this.backHandler;
    _publishStory = this.publishStory;
    this._didFocusSubscription = props.navigation.addListener(
      "didFocus",
      () => {
        this.textEditorRefocused();
      }
    );

    props.navigation.setOptions({
      header: () => (
        <CommonHeader
          title={"Write Story"}
          navigation={props.navigation}
          leftAction={() => _backHandler()}
          RightButton={
            <SimpleButton
              action={() => {
                if (_isJournalPublished) {
                  _publishStory();
                } else {
                  _submitStory();
                }
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
    });
  }

  getRichText = richText => {
    this.setState({
      richText
    });
  };

  onPlainTextChange = plainText => this.setState({ plainText });

  submitTitle = () => {
    /**
     * Timeout needed for the editor controls to load and enable the event listeners
     */
    setTimeout(() => {
      this._richTextInputRef.current && this._richTextInputRef.current.focus();
    }, 500);
  };

  /**
   * If Journal is not already published, this will simply submit the story
   * and return the user to the journal home screen
   */
  submitStory = () => {
    this.blurRichTextEditor();
    if (!this.state.title) {
      DebouncedAlert(
        constants.journalAlertMessages.noTitleForStory.header,
        constants.journalAlertMessages.noTitleForStory.message
      );
    } else {
      /**
       * Will check if rich text editor is supported and will select
       * plain text or the rich text to be displayed
       */
      let richText = "";
      if (this.state.isRichTextSupported) {
        richText =
          this._textEditorRef.current &&
          this._textEditorRef.current.retrieveRichText &&
          this._textEditorRef.current.retrieveRichText();
      } else {
        richText = this.state.plainText;
      }
      const { submitStory, createNewStory } = this.props.journalStore;
      const activeStory = this.props.route.params?.activeStory ?? "";
      const activePage = this.props.route.params?.activePage ?? "";
      if (activeStory) {
        submitStory(activeStory, this.state.title, richText)
          .then(() => {
            this.props.navigation.navigate("JournalHome");
          })
          .catch(() => {
            DebouncedAlert(
              constants.journalFailureMessages.title,
              constants.journalFailureMessages.failedToSubmitJournalStory
            );
          });
      } else {
        createNewStory(activePage)
          .then(storyId => {
            this.props.navigation.setParams({ activeStory: storyId });
            submitStory(storyId, this.state.title, richText)
              .then(() => {
                this.props.navigation.navigate("JournalHome");
              })
              .catch(() => {
                DebouncedAlert(
                  constants.journalFailureMessages.title,
                  constants.journalFailureMessages.failedToSubmitJournalStory
                );
              });
          })
          .catch(() => {
            DebouncedAlert(
              constants.journalFailureMessages.title,
              constants.journalFailureMessages.failedToSubmitJournalStory
            );
          });
      }
    }
  };

  /**
   * Journal is already published. This will submit the story and will
   * display the publish screen for the user in story mode.
   */
  publishStory = () => {
    this.blurRichTextEditor();
    if (!this.state.title) {
      DebouncedAlert(
        constants.journalAlertMessages.noTitleForStory.header,
        constants.journalAlertMessages.noTitleForStory.message
      );
    } else {
      /**
       * Will check if rich text editor is supported and will select
       * plain text or the rich text to be displayed
       */
      let richText = "";
      if (this.state.isRichTextSupported) {
        richText =
          this._textEditorRef.current &&
          this._textEditorRef.current.retrieveRichText &&
          this._textEditorRef.current.retrieveRichText();
      } else {
        richText = this.state.plainText;
      }
      const { submitStory, createNewStory } = this.props.journalStore;
      const activeStory = this.props.route.params?.activeStory ?? "";
      const activePage = this.props.route.params?.activePage ?? "";
      if (activeStory) {
        submitStory(activeStory, this.state.title, richText)
          .then(() => {
            this.props.navigation.navigate("JournalPublish", {
              isStoryMode: true,
              activeStory,
              activePage
            });
          })
          .catch(() => {
            DebouncedAlert(
              constants.journalFailureMessages.title,
              constants.journalFailureMessages.failedToSubmitJournalStory
            );
          });
      } else {
        createNewStory(activePage)
          .then(storyId => {
            this.props.navigation.setParams({ activeStory: storyId });
            submitStory(storyId, this.state.title, richText)
              .then(() => {
                this.props.navigation.navigate("JournalPublish", {
                  isStoryMode: true,
                  activeStory: storyId,
                  activePage
                });
              })
              .catch(() => {
                DebouncedAlert(
                  constants.journalFailureMessages.title,
                  constants.journalFailureMessages.failedToSubmitJournalStory
                );
              });
          })
          .catch(() => {
            DebouncedAlert(
              constants.journalFailureMessages.title,
              constants.journalFailureMessages.failedToSubmitJournalStory
            );
          });
      }
    }
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

    /**
     * Set a default value for the journal Title text input
     */
    const storyId = this.props.route.params?.activeStory ?? "";
    const pageId = this.props.route.params?.activePage ?? "";
    const { getStoryById } = this.props.journalStore;
    const storyDetails = getStoryById({ pageId, storyId });
    this.setState({
      title: storyDetails.title,
      plainText: extractTextFromHtml(storyDetails.richText || "")
    });

    this.initalizeTextEditor();
    this.checkDeviceCompatibility();
  }

  checkDeviceCompatibility = () => {
    if (Platform.OS === constants.platformAndroid) {
      this.setState({ isRichTextSupported: false });
    }
  };

  initalizeTextEditor = () => {
    const storyId = this.props.route.params?.activeStory ?? "";
    const pageId = this.props.route.params?.activePage ?? "";

    const { getImagesById, isJournalPublished } = this.props.journalStore;
    /**
     * Enable flag to define the submit action
     */
    _isJournalPublished = isJournalPublished;

    /**
     * Load image details to display the thumbnails
     */
    const preSelectedImages = getImagesById({ storyId, pageId });
    const selectedImagesList =
      this.props.route.params?.selectedImagesList ?? [];
    this.setState({
      preSelectedImages,
      selectedImagesList
    });
  };

  textEditorRefocused = () => {
    const storyId = this.props.route.params?.activeStory ?? "";
    const pageId = this.props.route.params?.activePage ?? "";
    const { getImagesById } = this.props.journalStore;
    /**
     * Load image details to display the thumbnails
     */
    const preSelectedImages = getImagesById({ storyId, pageId });
    const selectedImagesList =
      this.props.route.params?.selectedImagesList ?? [];
    this.setState({
      preSelectedImages,
      selectedImagesList
    });
  };

  imageThumbnailClick = () => {
    const activeStory = this.props.route.params?.activeStory ?? "";
    const activePage = this.props.route.params?.activePage ?? "";
    this.props.navigation.navigate("JournalImagePicker", {
      activeStory,
      activePage
    });
  };

  blurRichTextEditor = () => {
    this._richTextInputRef.current && this._richTextInputRef.current.blur();
  };

  backHandler = () => {
    if (this.state.isKeyboardVisible) {
      this.blurRichTextEditor();
      Keyboard.dismiss();
    } else {
      DebouncedAlert(
        constants.journalBackConfirmation.textEditor.title,
        constants.journalBackConfirmation.textEditor.message,
        [
          {
            text: constants.journalBackConfirmation.textEditor.negative,
            onPress: () => {
              this.props.navigation.goBack();
            },
            style: "destructive"
          },
          {
            text: constants.journalBackConfirmation.textEditor.positive,
            onPress: () => null
          }
        ],
        {
          cancelable: false
        }
      );
    }
    return true;
  };

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
  }

  render() {
    const isTextEditorActive =
      !this.state.isTitleFocused && this.state.isKeyboardVisible;

    const storyId = this.props.route.params?.activeStory ?? "";
    const pageId = this.props.route.params?.activePage ?? "";

    const { getStoryById } = this.props.journalStore;
    const storyDetails = getStoryById({ pageId, storyId });

    const { preSelectedImages, selectedImagesList } = this.state;

    return (
      <View style={styles.journalTextEditorContainer}>
        {!isTextEditorActive ? (
          <Fragment>
            <Carousel firstMargin={24}>
              {preSelectedImages.length + selectedImagesList.length ? null : (
                <AddImageThumbnail action={this.imageThumbnailClick} />
              )}
              {preSelectedImages.map(
                (preSelectedImage, preSelectedImageIndex) => {
                  return (
                    <ImagePreviewThumbnail
                      action={this.imageThumbnailClick}
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
                    action={this.imageThumbnailClick}
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
          initialValue={storyDetails.richText || ""}
          plainText={this.state.plainText}
          onPlainTextChange={this.onPlainTextChange}
          isRichTextSupported={this.state.isRichTextSupported}
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
        height: 38
      },
      android: {
        height: 46
      }
    }),
    marginHorizontal: 24,
    ...constants.fontCustom(constants.primarySemiBold, 24),
    marginTop: 24,
    marginBottom: 16
  }
});

export default JournalTextEditor;
