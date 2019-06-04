import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import constants from "../../constants/constants";
import TitleInput from "./Components/TitleInput";

class JournalSetup extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CommonHeader title={"Journal Start"} navigation={navigation} />
    };
  };

  state = {
    title: "",
    description: ""
  };

  editTitle = title => this.setState({ title });

  editDescription = description => this.setState({ description });

  render() {
    return (
      <View style={styles.journalStartContainer}>
        <Text
          style={styles.startTitle}
        >{`Greet your readers with a captivating title.`}</Text>

        <View style={styles.inputFieldCard}>
          <TitleInput
            titleLabel={"Title"}
            onEdit={this.editTitle}
            text={this.state.title}
            onInputSubmit={() => null}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  journalStartContainer: {
    flex: 1,
    backgroundColor: constants.white1
  },
  startTitle: {
    ...constants.font24(constants.primarySemiBold),
    color: constants.black1,
    textAlign: "center",
    marginVertical: 32
  },
  inputFieldCard: {
    marginHorizontal: 24,
    backgroundColor: "white",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "transparent",
    ...constants.elevationFive
  }
});

export default JournalSetup;
