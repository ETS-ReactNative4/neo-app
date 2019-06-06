import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import constants from "../../constants/constants";
import TitleInput from "./Components/TitleInput";
import SimpleButton from "../../CommonComponents/SimpleButton/SimpleButton";

class JournalStart extends Component {
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

  submitJournalInfo = () => {
    this.props.navigation.navigate("JournalSetup");
  };

  render() {
    return (
      <KeyboardAwareScrollView style={styles.journalStartContainer}>
        <Text
          style={styles.startTitle}
        >{`Greet your readers with a captivating title.`}</Text>

        <View style={styles.inputFieldCard}>
          <TitleInput
            titleLabel={"Title"}
            onEdit={this.editTitle}
            text={this.state.title}
            onInputSubmit={() => null}
            placeholder={"Title..."}
            containerStyle={styles.titleInputContainer}
            inputStyle={styles.titleInput}
          />
          <TitleInput
            titleLabel={"Description"}
            onEdit={this.editDescription}
            text={this.state.description}
            onInputSubmit={() => null}
            maxCharacters={150}
            placeholder={"Description..."}
            inputStyle={styles.descriptionInput}
          />
        </View>

        <SimpleButton
          containerStyle={{
            borderRadius: 2,
            height: 45,
            width: 170,
            marginTop: 32,
            alignSelf: "center"
          }}
          textStyle={{ marginRight: 8 }}
          underlayColor={constants.firstColorAlpha(0.8)}
          action={() => this.submitJournalInfo()}
          text={"Continue"}
          icon={constants.arrowRight}
          iconSize={12}
          rightIcon={true}
          textColor={"white"}
        />
      </KeyboardAwareScrollView>
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
  },
  titleInputContainer: {
    borderBottomColor: constants.shade5,
    borderBottomWidth: 1
  },
  titleInput: {
    minHeight: 64,
    ...constants.fontCustom(constants.primarySemiBold, 18, 24),
    color: constants.black1
  },
  descriptionInput: {
    minHeight: 104,
    ...constants.fontCustom(constants.primaryRegular, 15, 24),
    color: constants.black1
  }
});

export default JournalStart;
