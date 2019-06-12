import React, { Component } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import TextEditor from "./Components/TextEditor";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import SimpleButton from "../../CommonComponents/SimpleButton/SimpleButton";
import constants from "../../constants/constants";
import Carousel from "../../CommonComponents/Carousel/Carousel";
import ImagePreviewThumbnail from "./Components/ImagePreviewThumbnail";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";

@ErrorBoundary()
class JournalTextEditor extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <CommonHeader
          title={"Write Story"}
          navigation={navigation}
          RightButton={
            <SimpleButton
              action={() => navigation.navigate("JournalTextEditor")}
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
    title: ""
  };

  getRichText = text => {
    console.log(text);
  };

  submitTitle = () => {};

  editTitle = title => this.setState({ title });

  render() {
    const selectedImagesList = this.props.navigation.getParam(
      "selectedImagesList",
      []
    );
    return (
      <View style={styles.journalTextEditorContainer}>
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
          maxLength={50}
          multiline={true}
          style={styles.inputStyle}
          onChangeText={this.editTitle}
          value={this.state.title}
          returnKeyType={"next"}
          blurOnSubmit={true}
          onSubmitEditing={this.submitTitle}
          underlineColorAndroid={"transparent"}
          placeholder={"Give your post a heading..."}
          placeholderTextColor={constants.shade3}
          textAlignVertical={"top"}
        />
        <TextEditor
          getRichText={this.getRichText}
          navigation={this.props.navigation}
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
    marginHorizontal: 24,
    ...constants.fontCustom(constants.primarySemiBold, 18),
    height: 32,
    marginTop: 24,
    marginBottom: 16
  }
});

export default JournalTextEditor;
