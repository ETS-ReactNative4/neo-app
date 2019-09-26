import React, { Component, Fragment } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import { inject, observer } from "mobx-react/custom";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import HelpDetailsBlock from "./Components/HelpDetailsBlock";
import _ from "lodash";
import VisaCompanionInfo from "../VisaScreen/Components/VisaCompanionInfo";
import constants from "../../constants/constants";
import XSensorPlaceholder from "../../CommonComponents/XSensorPlaceholder/XSensorPlaceholder";
import { isIphoneX } from "react-native-iphone-x-helper";
import BlankSpacer from "../../CommonComponents/BlankSpacer/BlankSpacer";

@ErrorBoundary()
@inject("visaStore")
@observer
class VisaHelp extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CommonHeader title={"Help"} navigation={navigation} />
    };
  };

  render() {
    const { getHelpSectionsByVisaId, getVisaDetails } = this.props.visaStore;
    const { navigation } = this.props;
    const visaId = navigation.getParam("visaId", "");
    const visaDetails = getVisaDetails(visaId);
    const helpSections = getHelpSectionsByVisaId(visaId) || [];
    const { accountOwnerDetails = {} } = visaDetails;

    return (
      <Fragment>
        <ScrollView style={styles.visaHelpContainer}>
          {helpSections.map((helpSection, helpSectionIndex) => {
            return (
              <HelpDetailsBlock
                containerStyle={styles.qaWrapper}
                key={helpSectionIndex}
                answer={helpSection.a}
                question={helpSection.q}
              />
            );
          })}
          <BlankSpacer
            height={100 + (isIphoneX() ? constants.xSensorAreaHeight : 0) + 8}
          />
          {/**
           * 100 - approx height of the visa companion bar
           * sensor area padding of iPhone X
           * 8 - additional padding
           */}
        </ScrollView>
        <XSensorPlaceholder containerStyle={constants.sensorAreaContainer} />
        {!_.isEmpty(accountOwnerDetails) ? (
          <VisaCompanionInfo
            containerStyle={styles.companionWrapper}
            profilePic={accountOwnerDetails.image}
            name={accountOwnerDetails.name}
            tag={accountOwnerDetails.tag}
            phoneNumber={accountOwnerDetails.mobileNumber}
          />
        ) : null}
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  visaHelpContainer: {
    backgroundColor: "white"
  },
  qaWrapper: {
    marginHorizontal: 24,
    marginTop: 24
  },
  companionWrapper: {
    position: "absolute",
    backgroundColor: "white",
    bottom: isIphoneX() ? constants.xSensorAreaHeight : 0,
    left: 0
  }
});

export default VisaHelp;
