import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import { inject, observer } from "mobx-react/custom";
import constants from "../../constants/constants";
import ScrollableTabBar from "../../CommonComponents/ScrollableTabBar/ScrollableTabBar";
import ScrollableTabView from "react-native-scrollable-tab-view";
import VisaTabContainer from "./Components/VisaTabContainer";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import DeepLinkHandler from "../../CommonComponents/DeepLinkHandler/DeepLinkHandler";

@ErrorBoundary()
@DeepLinkHandler
@inject("itineraries")
@inject("visaStore")
@observer
class Visa extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CommonHeader title={"Visa Documents"} navigation={navigation} />
    };
  };

  componentDidMount() {
    const { selectedItineraryId } = this.props.itineraries;
    const {
      getVisaDetailsByItineraryId,
      getVisaDetails
    } = this.props.visaStore;

    const visaDetails = getVisaDetailsByItineraryId(selectedItineraryId);
    if (!visaDetails.length) {
      getVisaDetails(selectedItineraryId);
    }
  }

  render() {
    const { selectedItineraryId } = this.props.itineraries;
    const { getVisaDetailsByItineraryId } = this.props.visaStore;

    const visaDetails = getVisaDetailsByItineraryId(selectedItineraryId);

    const selectedCountry = this.props.navigation.getParam("country", "");
    let activeTabIndex = 0;
    if (selectedCountry) {
      for (let i = 0; i < visaDetails.length; i++) {
        const currentVisa = visaDetails[i];
        if (
          currentVisa.regionName.toUpperCase() === selectedCountry.toUpperCase()
        ) {
          activeTabIndex = i;
          break;
        }
      }
    }

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
          initialPage={activeTabIndex ? activeTabIndex : 0}
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
              visaStatus,
              visaDetailText
            } = visa;
            return (
              <VisaTabContainer
                regionName={regionName}
                processingTime={processingTime}
                applyByDate={applyByDate}
                visaName={visaName}
                onArrival={onArrival}
                schengen={schengen}
                visaDetailText={visaDetailText}
                itineraryId={itineraryId}
                visaStatus={visaStatus}
                tabLabel={visa.regionName.toUpperCase()}
                navigation={this.props.navigation}
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
