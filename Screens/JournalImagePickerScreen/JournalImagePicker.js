import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Platform,
  PermissionsAndroid
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
import { inject, observer } from "mobx-react/custom";

@ErrorBoundary()
@inject("journalStore")
@observer
class JournalImagePicker extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <CommonHeader
          title={"Select Media"}
          navigation={navigation}
          RightButton={
            <SimpleButton
              action={() => navigation.navigate("JournalTextEditor")}
              text={"Skip"}
              textColor={constants.thirdColor}
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

  _previewCarouselRef = React.createRef();

  state = {
    previewImage: {},
    previewObject: {},
    imagesList: [],
    imageMap: new Map(),
    selectedImagesList: [],
    hasNextPage: false,
    selectedFolder: "all"
  };

  previewImage = uri => {
    const previewImage = this.state.imageMap.get(uri);
    this.setState({
      previewImage
    });
  };

  fetchImages = () => {
    const galleryConfig = {
      first: 1000,
      assetType: "Photos"
    };
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
            imageMap,
            imagesList: images,
            hasNextPage: imageData.page_info.has_next_page
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
        logError(err);
      });
  };

  onChangeFolder = () => {};

  componentDidMount() {
    if (Platform.OS === constants.platformAndroid) {
      getReadFilePermissionAndroid(
        () => this.fetchImages(),
        () => null,
        () => null
      );
    } else {
      this.fetchImages();
    }
  }

  cropImage = (selectedImageIndex, uri) => {
    const startCropping = () => {
      NativeImagePicker.openCropper({
        path: uri,
        width: constants.journalImagePicker.selectedImageWidth,
        height: constants.journalImagePicker.selectedImageHeight
      })
        .then(croppedImage => {
          console.log(JSON.stringify(croppedImage));
          const selectedImagesList = [...this.state.selectedImagesList];
          selectedImagesList[selectedImageIndex].croppedImage = croppedImage;
          selectedImagesList[selectedImageIndex].isContain = false;
          this.setState({ selectedImagesList }, () => {
            // NativeImagePicker.clean()
            //   .then(() => {
            //     console.log("removed all tmp images from tmp directory");
            //   })
            //   .catch(e => {
            //     alert(e);
            //   });
          });
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
      setTimeout(() => {
        if (imageIndex === -1) {
          this._previewCarouselRef.current &&
            this._previewCarouselRef.current.scrollToEnd();
        }
      }, 300);
    });
  };

  _onPressImage = imageId => {
    this.setState(state => {
      const imageMap = new Map(state.imageMap);
      const imageDetails = imageMap.get(imageId);
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
    const { selectedImagesList } = this.state;
    const { navigation } = this.props;
    const activeStory = this.props.navigation.getParam("activeStory", "");
    const activePage = this.props.navigation.getParam("activePage", "");
    navigation.navigate("JournalTextEditor", {
      selectedImagesList,
      activeStory,
      activePage
    });
  };

  render() {
    const storyId = this.props.navigation.getParam("activeStory", "");
    const pageId = this.props.navigation.getParam("activePage", "");

    const { selectedImagesList, imagesList, selectedFolder } = this.state;
    const { getImagesById } = this.props.journalStore;
    const preSelectedImages = getImagesById({ storyId, pageId });

    const folders = _.uniq(_.map(imagesList, "node.group_name"));

    const folderDropDownValue = [
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
        />
        {selectedImagesList.length ? (
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
        ) : null}
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
