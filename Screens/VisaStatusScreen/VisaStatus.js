import React, { Component, Fragment } from "react";
import { View, StyleSheet, ViewPropTypes, ScrollView } from "react-native";
import PropTypes from "prop-types";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import { inject, observer } from "mobx-react/custom";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import VisaCompanionInfo from "../VisaScreen/Components/VisaCompanionInfo";
import { isIphoneX } from "react-native-iphone-x-helper";
import constants from "../../constants/constants";
import XSensorPlaceholder from "../../CommonComponents/XSensorPlaceholder/XSensorPlaceholder";
import VisaWindowNotOpen from "./Component/VisaWindowNotOpen";
import VisaWindowOpen from "./Component/VisaWindowOpen";

@ErrorBoundary()
@inject("itineraries")
@inject("visaStore")
@observer
class VisaStatus extends Component {
  static navigationOptions = ({ navigation }) => {
    const title = navigation.getParam("screenTitle", "");
    return {
      header: <CommonHeader title={title} navigation={navigation} />
    };
  };

  componentDidMount() {
    const { getVisaDetailsById, loadVisaDetails } = this.props.visaStore;
    const { navigation } = this.props;
    const visaId = navigation.getParam("visaId", "");
    loadVisaDetails(visaId);
    const visaDetails = getVisaDetailsById(visaId);
    navigation.setParams({
      screenTitle: `${visaDetails.countryStr || ""} - ${visaDetails.visaStr ||
        ""}`
    });
  }

  render() {
    const { getVisaDetails } = this.props.visaStore;
    const { navigation } = this.props;
    const visaId = navigation.getParam("visaId", "");
    const visaDetails = getVisaDetails(visaId);

    const { accountOwnerDetails = {} } = visaDetails;

    console.log(visaDetails);

    return (
      <Fragment>
        <ScrollView style={styles.visaStatusContainer}>
          {visaDetails.visaStage === "WINDOW_NOT_OPENED" ? (
            <VisaWindowNotOpen visaDetails={visaDetails} />
          ) : (
            <VisaWindowOpen visaDetails={visaDetails} />
          )}
        </ScrollView>
        <XSensorPlaceholder containerStyle={constants.sensorAreaContainer} />
        <VisaCompanionInfo
          containerStyle={styles.companionWrapper}
          profilePic={accountOwnerDetails.image}
          name={accountOwnerDetails.name}
          tag={accountOwnerDetails.tag}
          phoneNumber={accountOwnerDetails.mobileNumber}
        />
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  visaStatusContainer: {
    backgroundColor: constants.white1
  },
  companionWrapper: {
    position: "absolute",
    backgroundColor: "white",
    bottom: isIphoneX() ? constants.xSensorAreaHeight : 0,
    left: 0
  },
  sensorAreaContainer: {
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    left: 0
  }
});

export default VisaStatus;
