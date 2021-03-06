import React, { Component, Fragment } from "react";
import { StyleSheet, ScrollView } from "react-native";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import VisaCompanionInfo from "../VisaScreen/Components/VisaCompanionInfo";
import { isIphoneX } from "react-native-iphone-x-helper";
import constants from "../../constants/constants";
import XSensorPlaceholder from "../../CommonComponents/XSensorPlaceholder/XSensorPlaceholder";
import VisaWindowNotOpen from "./Component/VisaWindowNotOpen";
import VisaWindowOpen from "./Component/VisaWindowOpen";
import _ from "lodash";
import { toastBottom } from "../../Services/toast/toast";
import debouncer from "../../Services/debouncer/debouncer";
import FabButton from "../../CommonComponents/FabButton/FabButton";
import dialer from "../../Services/dialer/dialer";
import SimpleButton from "../../CommonComponents/SimpleButton/SimpleButton";
import CustomScrollView from "../../CommonComponents/CustomScrollView/CustomScrollView";
import VisaRejectedActionBar from "./Component/VisaRejectedActionBar";
import { recordEvent } from "../../Services/analytics/analyticsService";
import { CONSTANT_mailIcon } from "../../constants/imageAssets";

@ErrorBoundary()
@inject("itineraries")
@inject("visaStore")
@observer
class VisaStatus extends Component {

  setHeader = () => {
    const title = this.props.route.params?.screenTitle ?? "";
    const enableRightButton = this.props.route.params?.enableRightButton ?? false;
    const rightButtonAction =
    this.props.route.params?.rightButtonAction ?? (() => null);

    this.props.navigation.setOptions({
      header: () => (
        <CommonHeader
          title={title}
          navigation={this.props.navigation}
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
    });
  };

  constructor(props) {
    super(props);

    this.setHeader();
  }

  initializeVisa = () => {
    const {
      getVisaDetailsById,
      loadVisaDetails,
      loadVisaChecklistStatus
    } = this.props.visaStore;
    const { navigation, route } = this.props;
    const visaId = route.params?.visaId ?? "";
    loadVisaChecklistStatus(visaId);
    loadVisaDetails(visaId)
      .then(visaDetails => {
        debouncer(() => {
          navigation.setParams({
            screenTitle: `${visaDetails.countryStr ||
              ""} - ${visaDetails.visaStr || ""}`
          });
          this.setHeader();
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
      this.setHeader();
    });
  };

  componentDidMount() {
    debouncer(() => {
      this.initializeVisa();
      const { _visaDetails, _visaList } = this.props.visaStore;
      // TODO: wrap up the visa work here.
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
      this.setHeader();
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
    const { navigation, route } = this.props;
    const visaId = route.params?.visaId ?? "";
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

    const openHelpDesk = () => navigation.navigate("SupportCenter");

    const isVisaWindowNotOpen =
      visaDetails.visaStage === constants.visaWindowNotOpenedStatus ||
      visaDetails.visaType === constants.onArrivalVisaType;

    const grantedAction = requestUrl => {
      recordEvent(constants.Visa.event, {
        click: constants.Visa.click.visaGranted
      });
      visaGranted(visaId, requestUrl);
    };

    const rejectedAction = requestUrl => {
      recordEvent(constants.Visa.event, {
        click: constants.Visa.click.visaRejected
      });
      visaRejected(visaId, requestUrl);
    };

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
              action={() => {
                recordEvent(constants.Visa.event, {
                  click: constants.Visa.click.callAccountOwnerRejectedBar
                });
                contactAccountOwner(accountOwnerDetails.mobileNumber);
              }}
              title={visaInfoFooter}
            />
          ) : (
            <FabButton
              action={() => {
                recordEvent(constants.Visa.event, {
                  click: constants.Visa.click.callAccountOwnerFab
                });
                openHelpDesk();
              }}
              iconSize={30}
              radius={32}
              containerStyle={styles.fabButton}
              icon={CONSTANT_mailIcon}
            />
          )
        ) : null}
        <XSensorPlaceholder containerStyle={constants.sensorAreaContainer} />
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
