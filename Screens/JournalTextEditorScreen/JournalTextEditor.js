import React, { Component } from "react";
import { View } from "react-native";
import TextEditor from "./Components/TextEditor";

class JournalTextEditor extends Component {
  getRichText = text => {
    console.log(text);
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <TextEditor
          getRichText={this.getRichText}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

export default JournalTextEditor;
