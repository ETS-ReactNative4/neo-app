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

  render() {
    return (
      <View>
        <Text>{"Test"}</Text>
      </View>
    );
  }
}

export default JournalImagePicker;
