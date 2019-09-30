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
import FabButton from "../../CommonComponents/FabButton/FabButton";
import dialer from "../../Services/dialer/dialer";
import SimpleButton from "../../CommonComponents/SimpleButton/SimpleButton";
import CustomScrollView from "../../CommonComponents/CustomScrollView/CustomScrollView";
import VisaRejectedActionBar from "./Component/VisaRejectedActionBar";

@ErrorBoundary()
@inject("itineraries")
@inject("visaStore")
@observer
class VisaStatus extends Component {
  static navigationOptions = ({ navigation }) => {
    const title = navigation.getParam("screenTitle", "");
    const enableRightButton = navigation.getParam("enableRightButton", false);
    const rightButtonAction = navigation.getParam(
      "rightButtonAction",
      () => null
    );
    return {
      header: (
        <CommonHeader
          title={title}
          navigation={navigation}
          RightButton={
            enableRightButton ? (
              <SimpleButton
                text={"Help"}
                textColor={constants.fifteenthColor}
                containerStyle={{ width: 46, marginRight: 24 }}
                iconSize={10}
                icon={constants.arrowRight}
                rightIcon={true}
                color={"transparent"}
                action={rightButtonAction}
              />
            ) : null
          }
        />
      )
    };
  };

  initializeVisa = () => {
    const {
      getVisaDetailsById,
      loadVisaDetails,
      loadVisaChecklistStatus
    } = this.props.visaStore;
    const { navigation } = this.props;
    const visaId = navigation.getParam("visaId", "");
    loadVisaChecklistStatus(visaId);
    loadVisaDetails(visaId)
      .then(visaDetails => {
        debouncer(() => {
          navigation.setParams({
            screenTitle: `${visaDetails.countryStr ||
              ""} - ${visaDetails.visaStr || ""}`
          });
        });
        this.setNavigationHeaders(visaDetails);
      })
      .catch(() => {
        toastBottom(constants.visaScreenText.failedToLoadLatestData);
      });
    const visaDetails = getVisaDetailsById(visaId);
    this.setNavigationHeaders(visaDetails);
    debouncer(() => {
      navigation.setParams({
        screenTitle: `${visaDetails.countryStr || ""} - ${visaDetails.visaStr ||
          ""}`
      });
    });
  };

  componentDidMount() {
    debouncer(() => {
      this.initializeVisa();
    });
  }

  setNavigationHeaders = visaDetails => {
    const { isVisaHelpDataAvailable } = this.props.visaStore;
    debouncer(() => {
      const isVisaWindowNotOpen =
        visaDetails.visaStage === constants.visaWindowNotOpenedStatus ||
        visaDetails.visaType === constants.onArrivalVisaType;

      const openHelp = () => {
        if (isVisaHelpDataAvailable(visaDetails.visaId)) {
          this.props.navigation.navigate("VisaHelp", {
            visaId: visaDetails.visaId
          });
        } else {
          return null;
        }
      };

      if (!isVisaWindowNotOpen) {
        this.props.navigation.setParams({
          enableRightButton: !!isVisaHelpDataAvailable(visaDetails.visaId),
          rightButtonAction: openHelp
        });
      }
    });
  };

  render() {
    const {
      getVisaDetails,
      isVisaDetailsLoading,
      isVisaHelpDataAvailable,
      visaGranted,
      visaRejected
    } = this.props.visaStore;
    const { navigation } = this.props;
    const visaId = navigation.getParam("visaId", "");
    const visaDetails = getVisaDetails(visaId);

    const { accountOwnerDetails = {}, visaInfoFooter = "" } = visaDetails;

    const openHelp = () => {
      if (isVisaHelpDataAvailable(visaId)) {
        navigation.navigate("VisaHelp", { visaId: visaDetails.visaId });
      } else {
        return null;
      }
    };

    const openDocsChecklist = () => {
      navigation.navigate("VisaDocsChecklist", { visaId: visaDetails.visaId });
    };

    const contactAccountOwner = phoneNumber => dialer(phoneNumber);

    const isVisaWindowNotOpen =
      visaDetails.visaStage === constants.visaWindowNotOpenedStatus ||
      visaDetails.visaType === constants.onArrivalVisaType;

    const grantedAction = requestUrl => visaGranted(visaId, requestUrl);

    const rejectedAction = requestUrl => visaRejected(visaId, requestUrl);

    return (
      <Fragment>
        <CustomScrollView
          onRefresh={this.initializeVisa}
          refreshing={isVisaDetailsLoading}
          style={styles.visaStatusContainer}
        >
          {isVisaWindowNotOpen ? (
            <VisaWindowNotOpen
              openDocsChecklist={openDocsChecklist}
              visaDetails={visaDetails}
              openHelp={openHelp}
              isHelpDataAvailable={isVisaHelpDataAvailable(visaId)}
            />
          ) : (
            <VisaWindowOpen
              openDocsChecklist={openDocsChecklist}
              visaDetails={visaDetails}
              grantedAction={grantedAction}
              rejectedAction={rejectedAction}
            />
          )}
        </CustomScrollView>
        <XSensorPlaceholder containerStyle={constants.sensorAreaContainer} />
        {!_.isEmpty(accountOwnerDetails) ? (
          isVisaWindowNotOpen ? (
            <VisaCompanionInfo
              containerStyle={styles.companionWrapper}
              profilePic={accountOwnerDetails.image}
              name={accountOwnerDetails.name}
              tag={accountOwnerDetails.tag}
              phoneNumber={accountOwnerDetails.mobileNumber}
            />
          ) : visaInfoFooter ? (
            <VisaRejectedActionBar
              action={() => dialer(accountOwnerDetails.mobileNumber)}
              title={visaInfoFooter}
            />
          ) : (
            <FabButton
              action={() =>
                contactAccountOwner(accountOwnerDetails.mobileNumber)
              }
              iconSize={20}
              radius={32}
              containerStyle={styles.fabButton}
              icon={constants.callIcon}
            />
          )
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
  },
  fabButton: {
    position: "absolute",
    bottom: 24 + (isIphoneX() ? constants.xSensorAreaHeight : 0),
    right: 24
  }
});

export default VisaStatus;
