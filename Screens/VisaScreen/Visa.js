import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import { inject, observer } from "mobx-react/custom";
import constants from "../../constants/constants";
import ScrollableTabBar from "../../CommonComponents/ScrollableTabBar/ScrollableTabBar";
import ScrollableTabView from "react-native-scrollable-tab-view";
import VisaTabContainer from "./Components/VisaTabContainer";

@inject("itineraries")
@inject("visaStore")
@observer
class Visa extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CommonHeader title={"Visa Documents"} navigation={navigation} />
    };
  };
  render() {
    const { selectedItineraryId } = this.props.itineraries;
    const { getVisaDetailsByItineraryId } = this.props.visaStore;

    const visaDetails = getVisaDetailsByItineraryId(selectedItineraryId);

    return (
      <View style={styles.visaContainer}>
        <ScrollableTabView
          tabBarActiveTextColor={constants.black2}
          tabBarInactiveTextColor={constants.firstColor}
          tabBarUnderlineStyle={{
            height: 2,
            backgroundColor: constants.black2
          }}
          tabBarTextStyle={{ ...constants.font13(constants.primarySemiBold) }}
          initialPage={0}
          prerenderingSiblingsNumber={Infinity}
          renderTabBar={() => <ScrollableTabBar />}
        >
          {visaDetails.map((visa, visaIndex) => {
            const {
              regionName,
              processingTime,
              applyByDate,
              visaName,
              onArrival,
              schengen,
              itineraryId,
              visaStatus
            } = visa;
            return (
              <VisaTabContainer
                regionName={regionName}
                processingTime={processingTime}
                applyByDate={applyByDate}
                visaName={visaName}
                onArrival={onArrival}
                schengen={schengen}
                itineraryId={itineraryId}
                visaStatus={visaStatus}
                tabLabel={visa.regionName.toUpperCase()}
                key={visaIndex}
              />
            );
          })}
        </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  visaContainer: {
    flex: 1,
    backgroundColor: "white"
  }
});

export default Visa;
