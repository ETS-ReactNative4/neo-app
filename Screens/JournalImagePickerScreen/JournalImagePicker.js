import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  AppState
} from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import SimpleButton from "../../CommonComponents/SimpleButton/SimpleButton";
import constants from "../../constants/constants";
import { Dropdown } from "react-native-material-dropdown";
import Icon from "../../CommonComponents/Icon/Icon";
import CameraRoll from "@react-native-community/cameraroll";
import { logError } from "../../Services/errorLogger/errorLogger";
import ImageTile from "./Components/ImageTile";
import _ from "lodash";
import NativeImagePicker from "react-native-image-crop-picker";
import ImagePreviewCard from "./Components/ImagePreviewCard";
import Carousel from "../../CommonComponents/Carousel/Carousel";
import getReadFilePermissionAndroid from "../../Services/getReadFilePermissionAndroid/getReadFilePermissionAndroid";
import getWriteFilePermissionAndroid from "../../Services/getWriteFilePermissionAndroid/getWriteFilePermissionAndroid";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import { inject, observer } from "mobx-react";
import { observable, toJS } from "mobx";
import DebouncedAlert from "../../CommonComponents/DebouncedAlert/DebouncedAlert";
import { toastBottom } from "../../Services/toast/toast";
import ImagePermissionDenied from "./Components/ImagePermissionsDenied";
import openAppSettings from "../../Services/openAppSettings/openAppSettings";
import BackHandlerHoc from "../../CommonComponents/BackHandlerHoc/BackHandlerHoc";

let _headerData = observable({
  selectedImagesCount: 0
});
let _confirmSelection = () => null;
let _backHandler = () => null;

const HeaderRightButton = observer(({ headerData }) => {
  return (
    <SimpleButton
      action={() => _confirmSelection()}
      text={headerData.selectedImagesCount ? "Next" : "Skip"}
      textColor={
        headerData.selectedImagesCount
          ? constants.firstColor
          : constants.thirdColor
      }
      color={"transparent"}
      containerStyle={{
        height: 24,
        width: 62,
        marginRight: 16
      }}
    />
  );
});

@ErrorBoundary()
@BackHandlerHoc(() => _backHandler())
@inject("journalStore")
@observer
class JournalImagePicker extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <CommonHeader
          title={"Select Media"}
          navigation={navigation}
          leftAction={() => _backHandler()}
          RightButton={<HeaderRightButton headerData={_headerData} />}
        />
      )
    };
  };

  _previewCarouselRef = React.createRef();

  state = {
    previewImage: {},
    previewObject: {},
    imagesList: [],
    imageMap: new Map(),
    selectedImagesList: [],
    lastCursor: null,
    noMorePhotos: false,
    areImagesLoading: false,
    hasNextPage: false,
    selectedFolder: "all",
    preSelectedImages: [],
    isPermissionDenied: false,
    appState: AppState.currentState
  };

  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      if (this.state.isPermissionDenied) {
        this.props.navigation.goBack();
      }
    }
    this.setState({ appState: nextAppState });
  };

  constructor(props) {
    super(props);

    _confirmSelection = this.confirmSelection;
    _backHandler = this.backHandler;
  }

  previewImage = uri => {
    const previewImage = this.state.imageMap.get(uri);
    this.setState({
      previewImage
    });
  };

  listEndReached = () => {
    if (!this.state.noMorePhotos) {
      if (!this.state.areImagesLoading) {
        this.setState({ areImagesLoading: true }, () => this.fetchImages());
      }
    }
  };

  fetchImages = () => {
    const galleryConfig = {
      first: 100,
      assetType: "Photos"
    };
    if (this.state.lastCursor) {
      galleryConfig.after = this.state.lastCursor;
    }
    if (Platform.OS === constants.platformIos) galleryConfig.groupTypes = "All";
    CameraRoll.getPhotos(galleryConfig)
      .then(imageData => {
        const images = imageData.edges;
        const imageMap = images.reduce((mapAccumulator, image) => {
          const key = _.get(image, "node.image.uri");
          if (key)
            mapAccumulator.set(key, {
              isSelected: false,
              isContain: false,
              croppedImage: "",
              image
            });
          return mapAccumulator;
        }, new Map());
        this.setState(
          {
            imageMap: new Map([...this.state.imageMap, ...imageMap]),
            imagesList: [...this.state.imagesList, ...images],
            lastCursor: imageData.page_info.end_cursor,
            areImagesLoading: false,
            noMorePhotos: !imageData.page_info.has_next_page
          },
          () => {
            const firstImage = this.state.imagesList[0];
            if (!_.get(firstImage, "node.image")) return;
            this.setState({
              previewImage: firstImage
            });
          }
        );
      })
      .catch(err => {
        this.setState({
          isPermissionDenied: true
        });
        if (
          err.message !== "Access to photo library was denied" &&
          !err.message.includes("READ_EXTERNAL_STORAGE")
        ) {
          logError(err);
        }
      });
  };

  onChangeFolder = selectedFolder => this.setState({ selectedFolder });

  componentDidMount() {
    /**
     * Timeout needed to let the screen complete it's transition
     */
    setTimeout(() => {
      AppState.addEventListener("change", this._handleAppStateChange);
      if (Platform.OS === constants.platformAndroid) {
        getReadFilePermissionAndroid(
          () => this.fetchImages(),
          () => {
            this.setState({
              isPermissionDenied: true
            });
          },
          () => null
        );
      } else {
        this.fetchImages();
      }
      const storyId = this.props.navigation.getParam("activeStory", "");
      const pageId = this.props.navigation.getParam("activePage", "");

      const { getImagesById } = this.props.journalStore;
      const preSelectedImages = getImagesById({ storyId, pageId });
      this.setState({
        preSelectedImages
      });
    }, 600);
  }

  cropImage = (selectedImageIndex, uri) => {
    const startCropping = () => {
      NativeImagePicker.openCropper({
        path: uri,
        width: constants.journalImagePicker.selectedImageWidth,
        height: constants.journalImagePicker.selectedImageHeight,
        hideBottomControls: true
      })
        .then(croppedImage => {
          const selectedImagesList = [...this.state.selectedImagesList];
          selectedImagesList[selectedImageIndex].croppedImage = croppedImage;
          selectedImagesList[selectedImageIndex].isContain = false;
          this.setState({ selectedImagesList });
          /**
           * Used to update the original image map if needed
           * This code is not needed in the current selection implementation
           */
          // this.setState(state => {
          //   const imageMap = new Map(state.imageMap);
          //   const imageDetails = imageMap.get(uri);
          //   imageDetails.isContain = false;
          //   imageDetails.croppedImage = croppedImage.path;
          //   imageMap.set(uri, imageDetails);
          //   return { imageMap };
          // });
        })
        .catch(error => {
          logError(error);
        });
    };

    if (Platform.OS === constants.platformAndroid) {
      getWriteFilePermissionAndroid(
        () => startCropping(),
        () => null,
        () => null
      );
    } else {
      startCropping();
    }
  };

  selectImage = imageDetails => {
    const selectedImages = [...this.state.selectedImagesList];
    const imageIndex = selectedImages.findIndex(selectedImage => {
      return (
        _.get(imageDetails, "image.node.image.uri") ===
        _.get(selectedImage, "image.node.image.uri")
      );
    });
    if (imageIndex === -1) {
      selectedImages.push({ ...imageDetails });
    } else {
      selectedImages.splice(imageIndex, 1);
    }
    this.setState({ selectedImagesList: selectedImages }, () => {
      _headerData.selectedImagesCount = this.state.selectedImagesList.length;
      setTimeout(() => {
        if (imageIndex === -1) {
          this._previewCarouselRef.current &&
            this._previewCarouselRef.current.scrollToEnd();
        }
      }, 300);
    });
  };

  deleteImage = imageIndex => {
    const storyId = this.props.navigation.getParam("activeStory", "");
    const pageId = this.props.navigation.getParam("activePage", "");
    const { deleteImage, getImagesById } = this.props.journalStore;
    const preSelectedImages = getImagesById({ storyId, pageId });
    const requiredImage = preSelectedImages[imageIndex];
    DebouncedAlert(
      constants.journalAlertMessages.removeImage.header,
      constants.journalAlertMessages.removeImage.message,
      [
        {
          text: constants.journalAlertMessages.removeImage.confirm,
          onPress: () => {
            deleteImage(storyId, requiredImage.imageId)
              .then(() => {
                const preSelectedImages = getImagesById({ storyId, pageId });
                this.setState({
                  preSelectedImages
                });
              })
              .catch(() => {
                DebouncedAlert(
                  constants.journalFailureMessages.title,
                  constants.journalFailureMessages.failedToDeleteImage
                );
              });
          },
          style: "destructive"
        },
        {
          text: constants.journalAlertMessages.removeImage.cancel,
          onPress: () => {
            return null;
          }
        }
      ],
      { cancelable: false }
    );
  };

  clearSelection = () => {
    const selectedImages = [...this.state.selectedImagesList];
    this.setState(
      state => {
        const imageMap = new Map(state.imageMap);
        for (let i = 0; i < selectedImages.length; i++) {
          const selectedImage = selectedImages[i];
          const key = _.get(selectedImage, "image.node.image.uri");
          const imageDetails = imageMap.get(key);
          imageDetails.isSelected = false;
          imageDetails.isContain = false;
          imageMap.set(key, imageDetails);
        }
        return { imageMap };
      },
      () => {
        this.setState({ selectedImagesList: [] }, () => {
          _headerData.selectedImagesCount = 0;
        });
      }
    );
  };

  componentWillUnmount() {
    _headerData.selectedImagesCount = 0;
    AppState.removeEventListener("change", this._handleAppStateChange);
    NativeImagePicker.clean()
      .then(() => {})
      .catch(e => {
        logError(e);
      });
  }

  _onPressImage = imageId => {
    this.setState(state => {
      const imageMap = new Map(state.imageMap);
      const imageDetails = imageMap.get(imageId);
      if (!imageDetails.isSelected) {
        const selectedImages = [...this.state.selectedImagesList];
        const storyId = this.props.navigation.getParam("activeStory", "");
        const pageId = this.props.navigation.getParam("activePage", "");
        const { getImagesById } = this.props.journalStore;
        const preSelectedImages = getImagesById({ storyId, pageId });
        if (preSelectedImages.length + selectedImages.length >= 10) {
          toastBottom("You can only select upto 10 images");
          return { imageMap };
        }
      }
      if (imageDetails.isSelected) {
        imageDetails.croppedImage = "";
      }
      imageDetails.isSelected = !imageDetails.isSelected;
      imageMap.set(imageId, imageDetails);
      this.selectImage(imageDetails);
      return { imageMap };
    });
  };

  _renderGrid = ({ item }) => {
    const imageUri = item.node.image.uri;
    const imageDetails = this.state.imageMap.get(imageUri);
    let selectionPosition = 0;
    if (imageDetails.isSelected) {
      selectionPosition =
        item.preSelectedLength +
        this.state.selectedImagesList.findIndex(selectedImage => {
          return imageUri === _.get(selectedImage, "image.node.image.uri");
        });
    }
    return (
      <ImageTile
        id={item.node.image.uri}
        onPressItem={this._onPressImage}
        previewImage={this.previewImage}
        selected={imageDetails.isSelected}
        title={item.node.timestamp}
        selectionPosition={selectionPosition}
        item={item}
      />
    );
  };

  toggleImageContain = selectedImageIndex => {
    const selectedImagesList = [...this.state.selectedImagesList];
    if (selectedImagesList[selectedImageIndex].isContain) {
      selectedImagesList[selectedImageIndex].isContain = false;
    } else {
      selectedImagesList[selectedImageIndex].isContain = true;
    }
    this.setState({ selectedImagesList });
  };

  _keyExtractor = (item, index) => index;

  confirmSelection = () => {
    const activeStory = this.props.navigation.getParam("activeStory", "");
    const activePage = this.props.navigation.getParam("activePage", "");
    const { selectedImagesList } = this.state;
    const { navigation } = this.props;
    const { addImagesToQueue, createNewStory } = this.props.journalStore;
    if (activeStory) {
      addImagesToQueue(activeStory, selectedImagesList);
      navigation.navigate("JournalTextEditor", {
        selectedImagesList,
        activeStory,
        activePage
      });
    } else if (!activeStory && !selectedImagesList.length) {
      navigation.navigate("JournalTextEditor", {
        selectedImagesList,
        activePage
      });
    } else {
      createNewStory(activePage)
        .then(storyId => {
          addImagesToQueue(storyId, selectedImagesList);
          this.props.navigation.setParams({ activeStory: storyId });
          navigation.navigate("JournalTextEditor", {
            selectedImagesList,
            activeStory: storyId,
            activePage
          });
        })
        .catch(() => {
          DebouncedAlert(
            constants.journalFailureMessages.title,
            constants.journalFailureMessages.failedToCreateNewStory
          );
        });
    }
    /**
     * Clearing selection immediately causes the user to see the skip button
     * Hence a timeout is added here,
     */
    setTimeout(() => {
      /**
       * For handling failures if the component un mounts before clearing selection
       */
      this && this.clearSelection && this.clearSelection();
    }, 1000);
  };

  openAppSettings = () => {
    openAppSettings();
  };

  backHandler = () => {
    if (!this.state.selectedImagesList.length) {
      this.props.navigation.goBack();
      return true;
    }
    DebouncedAlert(
      constants.journalBackConfirmation.imagePicker.title,
      constants.journalBackConfirmation.imagePicker.message,
      [
        {
          text: constants.journalBackConfirmation.imagePicker.negative,
          onPress: () => {
            this.props.navigation.goBack();
          },
          style: "destructive"
        },
        {
          text: constants.journalBackConfirmation.imagePicker.positive,
          onPress: () => null
        }
      ],
      {
        cancelable: false
      }
    );
    return true;
  };

  render() {
    if (this.state.isPermissionDenied) {
      return <ImagePermissionDenied action={this.openAppSettings} />;
    }

    const {
      selectedImagesList,
      imagesList,
      selectedFolder,
      preSelectedImages
    } = this.state;
    const folders = _.uniq(_.map(imagesList, "node.group_name"));

    /**
     * iOS does not have folders for photos hence it
     * only has one option
     */
    const folderDropDownValue =
      Platform.OS === constants.platformAndroid
        ? [
            {
              label: "All Photos",
              value: "all"
            },
            ...folders.map(folder => {
              return {
                label: folder,
                value: folder
              };
            })
          ]
        : [
            {
              label: "All Photos",
              value: "all"
            }
          ];

    const imagesToDisplay =
      selectedFolder === "all"
        ? imagesList.map(image => {
            image.preSelectedLength = preSelectedImages.length;
            return image;
          })
        : _.compact(
            imagesList.map(image => {
              if (_.get(image, "node.group_name") === selectedFolder) {
                image.preSelectedLength = preSelectedImages.length;
                return image;
              }
              return null;
            })
          );

    return (
      <View style={styles.journalImagePickerContainer}>
        {selectedImagesList.length + preSelectedImages.length ? (
          <Carousel
            scrollRef={this._previewCarouselRef}
            firstMargin={16}
            containerStyle={styles.previewCarousel}
          >
            {preSelectedImages.map(
              (preSelectedImage, preSelectedImageIndex) => {
                return (
                  <ImagePreviewCard
                    key={preSelectedImageIndex}
                    imageUri={_.get(preSelectedImage, "imageUrl")}
                    previewImage={{
                      uri: _.get(preSelectedImage, "imageUrl")
                    }}
                    index={preSelectedImageIndex}
                    isContain={preSelectedImage.contained}
                    isPreselected={true}
                    removeImage={this.deleteImage}
                  />
                );
              }
            )}
            {selectedImagesList.map((selectedImage, imageIndex) => {
              return (
                <ImagePreviewCard
                  key={imageIndex}
                  imageUri={_.get(selectedImage, "image.node.image.uri")}
                  previewImage={{
                    uri:
                      _.get(selectedImage, "croppedImage.path") ||
                      _.get(selectedImage, "image.node.image.uri")
                  }}
                  index={preSelectedImages.length + imageIndex}
                  actionIndex={imageIndex}
                  isContain={!!selectedImage.isContain}
                  cropImage={this.cropImage}
                  toggleImageContain={this.toggleImageContain}
                />
              );
            })}
          </Carousel>
        ) : null}
        <Dropdown
          onChangeText={this.onChangeFolder}
          label="Images to display"
          data={folderDropDownValue}
          value={selectedFolder}
          itemCount={6}
          dropdownPosition={0}
          rippleOpacity={0}
          renderBase={props => {
            return (
              <View style={styles.dropDownTextWrapper}>
                <Text style={styles.dropDownText}>{props.title}</Text>
                <Icon
                  name={constants.dropDownArrowIcon}
                  color={constants.black1}
                  size={8}
                />
              </View>
            );
          }}
        />
        <FlatList
          contentContainerStyle={styles.photoGrid}
          data={imagesToDisplay}
          renderItem={this._renderGrid}
          numColumns={4}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          onEndReached={this.listEndReached}
          // initialNumToRender={5}
          // maxToRenderPerBatch={10}
          removeClippedSubviews={Platform.OS !== constants.platformIos}
        />
        {/*
          selectedImagesList.length ? (
            <SimpleButton
              containerStyle={{
                position: "absolute",
                right: 40,
                bottom: 40,
                borderRadius: 2,
                height: 45,
                width: 170,
                marginTop: 32
              }}
              textStyle={{ marginRight: 8 }}
              icon={constants.arrowRight}
              iconSize={12}
              rightIcon={true}
              underlayColor={constants.firstColorAlpha(0.8)}
              action={this.confirmSelection}
              text={"Continue"}
              textColor={"white"}
            />
          ) : null
        */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  journalImagePickerContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  photoGrid: {
    marginHorizontal: 24
  },
  previewCarousel: {
    height: constants.journalImagePicker.selectedImageHeight + 32,
    justifyContent: "flex-start"
  },
  dropDownTextWrapper: {
    flexDirection: "row",
    backgroundColor: "white",
    marginVertical: 4,
    marginLeft: 24,
    height: 24,
    alignItems: "center"
  },
  dropDownText: {
    ...constants.fontCustom(constants.primaryRegular, 16),
    color: constants.black1,
    marginRight: 8
  }
});

export default JournalImagePicker;
