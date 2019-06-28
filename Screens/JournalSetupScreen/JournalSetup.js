import React, { Fragment, Component } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import JournalDaySectionTitle from "./Components/JournalDaySectionTitle";
import JournalSetupTitle from "./Components/JournalSetupTitle";
import JournalDaySelectionCard from "./Components/JournalDaySelectionCard";
import constants from "../../constants/constants";
import JournalTitleDropDown from "./Components/JournalTitleDropDown/JournalTitleDropDown";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import { inject, observer } from "mobx-react/custom";

@ErrorBoundary()
@inject("journalStore")
@observer
class JournalSetup extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CommonHeader title={"Choose a Day"} navigation={navigation} />
    };
  };

  navigateToDaySelector = page => {
    if (page.stories.length) {
      this.props.navigation.navigate("JournalDaySelector", {
        activePage: page.pageId,
        pageTitle: page.pageDateStr,
        title: page.title,
        info: page.info
      });
    } else {
      this.props.navigation.navigate("JournalImagePicker", {
        activePage: page.pageId,
        activeStory: ""
      });
    }
  };

  render() {
    const {
      categorizedPages,
      journalTitle,
      journalDesc,
      journalCoverImage,
      journalOwner,
      journalPublishedTime
    } = this.props.journalStore;

    const editJournal = () =>
      this.props.navigation.navigate("JournalStart", { isEditing: true });

    return (
      <ScrollView style={styles.journalSetupContainer}>
        <JournalTitleDropDown
          editAction={editJournal}
          journalOwner={journalOwner}
          journalPublishedTime={journalPublishedTime}
          coverImage={{ uri: journalCoverImage }}
          title={journalTitle}
          desc={journalDesc}
        />
        <JournalSetupTitle
          title={"An organized journal to enable easy reading."}
        />
        {categorizedPages.completed.length ? (
          <Fragment>
            <JournalDaySectionTitle title={"Days Completed"} />
            <View style={styles.cardContainer}>
              {categorizedPages.completed.map((page, pageIndex) => {
                return (
                  <JournalDaySelectionCard
                    key={pageIndex}
                    description={page.info}
                    title={page.title}
                    day={page.pageDate}
                    dayString={page.pageDateStr}
                    action={() => this.navigateToDaySelector(page)}
                    isLast={pageIndex === categorizedPages.completed.length - 1}
                  />
                );
              })}
            </View>
          </Fragment>
        ) : null}

        {categorizedPages.upcoming.length ? (
          <Fragment>
            <JournalDaySectionTitle title={"Upcoming"} />
            <View style={styles.cardContainer}>
              {categorizedPages.upcoming.map((page, pageIndex) => {
                return (
                  <JournalDaySelectionCard
                    key={pageIndex}
                    description={page.info}
                    title={page.title}
                    day={page.pageDate}
                    dayString={page.pageDateStr}
                    action={() => this.navigateToDaySelector(page)}
                    isLast={pageIndex === categorizedPages.upcoming.length - 1}
                  />
                );
              })}
            </View>
          </Fragment>
        ) : null}

        {/*<JournalDaySectionTitle title={"Upcoming"} />*/}
        {/*<View style={styles.cardContainer}>*/}
        {/*  <JournalDaySelectionCard*/}
        {/*    description={"Transfer to your Hotel in Kuta "}*/}
        {/*    title={"Denpasar Bali"}*/}
        {/*    day={"Apr 1, 2019"}*/}
        {/*    dayString={"Day 1"}*/}
        {/*    action={() =>*/}
        {/*      this.props.navigation.navigate("JournalDaySelector", {*/}
        {/*        title: "Day 1"*/}
        {/*      })*/}
        {/*    }*/}
        {/*  />*/}
        {/*  <JournalDaySelectionCard*/}
        {/*    description={"Transfer to your Hotel in Kuta "}*/}
        {/*    title={"Denpasar Bali"}*/}
        {/*    day={"Apr 1, 2019"}*/}
        {/*    dayString={"Day 1"}*/}
        {/*    isLast={true}*/}
        {/*  />*/}
        {/*</View>*/}
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
