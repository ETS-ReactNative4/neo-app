import React, { Component } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import { inject, observer } from "mobx-react";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import constants from "../../constants/constants";
import VisaClickableTile from "../VisaScreen/Components/VisaClickableTile";
import { recordEvent } from "../../Services/analytics/analyticsService";

@ErrorBoundary()
@inject("itineraries")
@inject("visaStore")
@observer
class VisaSelector extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CommonHeader title={"Choose Visa"} navigation={navigation} />
    };
  };

  componentDidMount() {
    const { getVisaHomeScreenDetails } = this.props.visaStore;
    getVisaHomeScreenDetails();
  }

  render() {
    const { navigation } = this.props;
    const { visaList } = this.props.visaStore;
    return (
      <ScrollView style={styles.visaSelectorContainer}>
        {visaList.map((visaInfo, visaIndex) => {
          return (
            <VisaClickableTile
              containerStyle={[
                styles.tileContainer,
                visaIndex === 0 ? styles.firstContainer : {}
              ]}
              title={visaInfo.title}
              infoText={visaInfo.body}
              action={() => {
                recordEvent(constants.Visa.event, {
                  click: constants.Visa.click.visaSelectorList
                });
                navigation.navigate("VisaStatus", {
                  visaId: visaInfo.visaId
                });
              }}
              titleColor={constants.firstColor}
              hasUnread={visaInfo.updatesAvailable}
              infoTextStyle={styles.infoTextStyle}
              key={visaIndex}
            />
          );
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  visaSelectorContainer: {
    backgroundColor: constants.white1
  },
  tileContainer: {
    marginHorizontal: 24,
    marginVertical: 4,
    paddingVertical: 21
  },
  firstContainer: {
    marginTop: 24
  },
  infoTextStyle: {
    color: constants.shade2
  }
});

export default VisaSelector;
