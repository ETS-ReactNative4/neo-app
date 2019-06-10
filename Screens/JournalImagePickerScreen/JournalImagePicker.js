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

class JournalImagePicker extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <CommonHeader
          title={"Select Media"}
          navigation={navigation}
          RightButton={
            <SimpleButton
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
          if (!image || !image.node || !image.node.image) return;
          mapAccumulator.set(image.node.image.uri, {
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
            if (!firstImage || !firstImage.node || !firstImage.node.image)
              return;
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
    this.fetchImages();
  }

  selectImage = imageDetails => {
    const selectedImages = [...this.state.selectedImagesList];
    const imageIndex = selectedImages.findIndex(selectedImage => {
      return (
        imageDetails.image.node.image.uri === selectedImage.image.node.image.uri
      );
    });
    if (imageIndex === -1) {
      selectedImages.push(imageDetails);
    } else {
      selectedImages.splice(imageIndex, 1);
    }
    this.setState({ selectedImagesList: selectedImages });
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
      selectionPosition = this.state.selectedImagesList.findIndex(
        selectedImage => {
          return imageUri === selectedImage.image.node.image.uri;
        }
      );
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

  render() {
    const { previewImage, imagesList, selectedFolder } = this.state;

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
        ? imagesList
        : imagesList.filter(image => image.node.group_name === selectedFolder);

    return (
      <View style={styles.journalImagePickerContainer}>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  journalImagePickerContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  photoGrid: {},
  dropDownTextWrapper: {
    flexDirection: "row",
    backgroundColor: "white",
    marginVertical: 4,
    height: 24,
    alignItems: "center"
  },
  dropDownText: {
    ...constants.fontCustom(constants.primaryLight, 14),
    color: constants.black1,
    marginRight: 8
  }
});

export default JournalImagePicker;
