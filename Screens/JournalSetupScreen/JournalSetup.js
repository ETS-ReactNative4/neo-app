import React, { Component } from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import TitleActionBar from "./Components/TitleActionBar";
import JournalDaySectionTitle from "./Components/JournalDaySectionTitle";
import JournalSetupTitle from "./Components/JournalSetupTitle";
import JournalDaySelectionCard from "./Components/JournalDaySelectionCard";
import constants from "../../constants/constants";

class JournalSetup extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CommonHeader title={"Choose a Day"} navigation={navigation} />
    };
  };

  render() {
    return (
      <ScrollView style={styles.journalSetupContainer}>
        <TitleActionBar title={""} description={""} />
        <JournalSetupTitle
          title={"An organized journal to enable easy reading."}
        />
        <JournalDaySectionTitle title={"Upcoming"} />
        <View style={styles.cardContainer}>
          <JournalDaySelectionCard
            description={"Transfer to your Hotel in Kuta "}
            title={"Denpasar Bali"}
            day={"Apr 1, 2019"}
            dayString={"Day 1"}
            action={() =>
              this.props.navigation.navigate("JournalDaySelector", {
                title: "Day 1"
              })
            }
          />
          <JournalDaySelectionCard
            description={"Transfer to your Hotel in Kuta "}
            title={"Denpasar Bali"}
            day={"Apr 1, 2019"}
            dayString={"Day 1"}
            isLast={true}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  journalSetupContainer: {
    flex: 1,
    backgroundColor: constants.white1
  },
  cardContainer: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "transparent",
    ...constants.elevationFive,
    marginHorizontal: 24,
    marginBottom: 8
  }
});

export default JournalSetup;
