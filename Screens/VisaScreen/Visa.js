import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import { inject, observer } from "mobx-react";
import constants from "../../constants/constants";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import VisaWelcomeMessage from "./Components/VisaWelcomeMessage";
import {
  responsiveHeight,
  responsiveWidth
} from "react-native-responsive-dimensions";
import SimpleButton from "../../CommonComponents/SimpleButton/SimpleButton";
import { toastBottom } from "../../Services/toast/toast";
import { recordEvent } from "../../Services/analytics/analyticsService";
import PrimaryHeader from "../../NavigatorsV2/Components/PrimaryHeader";

@ErrorBoundary()
@inject("itineraries")
@inject("visaStore")
@observer
class Visa extends Component {
  constructor(props) {
    super(props);

    props.navigation.setOptions({
      header: () =>
        PrimaryHeader({
          leftAction: () => props.navigation.goBack(),
          headerText: "Visa"
        })
    });
  }

  componentDidMount() {
    const { getVisaHomeScreenDetails } = this.props.visaStore;

    getVisaHomeScreenDetails();
  }

  startVisa = () => {
    const { initiateVisa, isVisaAvailable } = this.props.visaStore;
    if (!isVisaAvailable) {
      this.props.navigation.navigate("SupportCenter");
    } else {
      initiateVisa()
        .then(visaList => {
          if (visaList && visaList.length) {
            if (visaList.length === 1) {
              const firstVisa = visaList[0];
              this.props.navigation.replace("VisaStatus", {
                visaId: firstVisa.visaId
              });
            } else {
              this.props.navigation.replace("VisaSelector");
            }
          } else {
            toastBottom(constants.visaScreenText.failedToLoadVisaData);
          }
        })
        .catch(() => {
          toastBottom(constants.visaScreenText.failedToLoadVisaData);
        });
    }
  };

  render() {
    const { selectedItineraryId } = this.props.itineraries;
    const {
      getVisaDetailsByItineraryId,
      homeScreenDetails,
      isVisaAvailable
    } = this.props.visaStore;

    const visaDetails = getVisaDetailsByItineraryId(selectedItineraryId);

    const selectedCountry = this.props.route.params?.country ?? "";
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
        <Image
          source={homeScreenDetails.coverImage}
          style={styles.visaWelcomeIllustration}
        />
        <VisaWelcomeMessage
          containerStyle={styles.welcomeMessageContainer}
          date={homeScreenDetails.departureDate}
          message={homeScreenDetails.body}
          name={homeScreenDetails.title}
          numOfPax={homeScreenDetails.totalPax}
        />
        <SimpleButton
          text={isVisaAvailable ? "Let's get started" : "Visit Help Desk"}
          textColor={"white"}
          underlayColor={constants.firstColorAlpha(0.8)}
          containerStyle={{
            marginTop: 40,
            height: 56,
            width: 200,
            alignSelf: "center",
            borderRadius: 4
          }}
          action={() => {
            recordEvent(constants.Visa.event, {
              click: constants.Visa.click.initializeVisa
            });
            this.startVisa();
          }}
          textStyle={{
            fontSize: 16
          }}
        />
      </View>
    );

    /*
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
    */
  }
}

const styles = StyleSheet.create({
  visaContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  welcomeMessageContainer: {
    marginTop: 48
  },
  visaWelcomeIllustration: {
    position: "absolute",
    height: responsiveHeight(50),
    width: responsiveWidth(100),
    bottom: 0,
    left: 0
  }
});

export default Visa;
