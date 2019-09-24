import React, { Component, Fragment } from "react";
import { StyleSheet, ScrollView } from "react-native";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import { inject, observer } from "mobx-react/custom";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import VisaCompanionInfo from "../VisaScreen/Components/VisaCompanionInfo";
import { isIphoneX } from "react-native-iphone-x-helper";
import constants from "../../constants/constants";
import XSensorPlaceholder from "../../CommonComponents/XSensorPlaceholder/XSensorPlaceholder";
import VisaWindowNotOpen from "./Component/VisaWindowNotOpen";
import VisaWindowOpen from "./Component/VisaWindowOpen";
import _ from "lodash";
import BlankSpacer from "../../CommonComponents/BlankSpacer/BlankSpacer";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { toastBottom } from "../../Services/toast/toast";
import debouncer from "../../Services/debouncer/debouncer";

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
    loadVisaDetails(visaId)
      .then(visaDetails => {
        debouncer(() => {
          navigation.setParams({
            screenTitle: `${visaDetails.countryStr ||
              ""} - ${visaDetails.visaStr || ""}`
          });
        });
      })
      .catch(() => {
        toastBottom(constants.visaScreenText.failedToLoadLatestData);
      });
    const visaDetails = getVisaDetailsById(visaId);
    debouncer(() => {
      navigation.setParams({
        screenTitle: `${visaDetails.countryStr || ""} - ${visaDetails.visaStr ||
          ""}`
      });
    });
  }

  render() {
    const { getVisaDetails } = this.props.visaStore;
    const { navigation } = this.props;
    const visaId = navigation.getParam("visaId", "");
    const visaDetails = getVisaDetails(visaId);

    const { accountOwnerDetails = {} } = visaDetails;

    const openHelp = () => {
      navigation.navigate("VisaHelp", { visaId: visaDetails.visaId });
    };

    const openDocsChecklist = () => {
      navigation.navigate("VisaDocsChecklist", { visaId: visaDetails.visaId });
    };

    return (
      <Fragment>
        <ScrollView style={styles.visaStatusContainer}>
          {visaDetails.visaStage === constants.visaWindowNotOpenedStatus ||
          visaDetails.visaType === constants.onArrivalVisaType ? (
            <VisaWindowNotOpen
              openDocsChecklist={openDocsChecklist}
              visaDetails={visaDetails}
              openHelp={openHelp}
            />
          ) : (
            <VisaWindowOpen visaDetails={visaDetails} />
          )}
          <BlankSpacer height={responsiveHeight(30)} />
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
