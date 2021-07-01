import React, { Fragment } from "react";
import { View, StyleSheet, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import _ from "lodash";
import VisaWindowStatusWidget from "../../VisaScreen/Components/VisaWindowStatusWidget";
import moment from "moment";
import constants from "../../../constants/constants";
import VisaStagesCard from "../../VisaScreen/Components/VisaStagesCard";
import VisaOnArrivalWidget from "../../VisaScreen/Components/VisaOnArrivalWidget";
import VisaInfoWidget from "../../VisaScreen/Components/VisaInfoWidget";
import VisaClickableTile from "../../VisaScreen/Components/VisaClickableTile";
import BlankSpacer from "../../../CommonComponents/BlankSpacer/BlankSpacer";
import { isIphoneX } from "react-native-iphone-x-helper";
import { recordEvent } from "../../../Services/analytics/analyticsService";

const VisaWindowNotOpen = ({
  containerStyle = StyleSheet.create({}),
  visaDetails = {},
  openHelp = () => null,
  openDocsChecklist = () => null,
  isHelpDataAvailable
}) => {
  const {
    visaWindowDetails = {},
    visaStageDetails = [],
    visaType = "",
    visaStr = "",
    visaIntroStr = "",
    visaDocsMetaDetails = {}
  } = visaDetails;
  const {
    windowOpenTime = 0,
    currentTime = 0,
    convertedTime = 0
  } = visaWindowDetails;
  const windowOpenTimeObject = moment(windowOpenTime);
  const currentTimeObject = moment(currentTime);
  const convertedTimeObject = moment(convertedTime);
  const numberOfDaysToOpen =
    windowOpenTimeObject.diff(currentTimeObject, "days") + 1;
  const numberOfDaysAvailable =
    windowOpenTimeObject.diff(convertedTimeObject, "days") + 1;
  const timePercentage = (numberOfDaysToOpen / numberOfDaysAvailable) * 100;
  const visaStages = visaStageDetails.map(visaStage => {
    return {
      stageText: visaStage.title,
      dateText: visaStage.body
    };
  });

  const isDocsChecklistUnavailable =
    !_.isEmpty(visaDocsMetaDetails) &&
    _.isEmpty(visaDocsMetaDetails.docsCheckList);

  return (
    <View style={[containerStyle]}>
      <Fragment>
        {!_.isEmpty(visaWindowDetails) ? (
          visaType === constants.onArrivalVisaType ? (
            <VisaOnArrivalWidget
              containerStyle={styles.widgetWrapper}
              title={visaWindowDetails.title}
              info={visaWindowDetails.body}
            />
          ) : (
            <VisaWindowStatusWidget
              containerStyle={styles.widgetWrapper}
              countText={"days"}
              dateText={windowOpenTimeObject.format(constants.visaDateFormat)}
              count={numberOfDaysToOpen}
              fillPercentage={timePercentage}
            />
          )
        ) : null}
        {visaStageDetails.length ? (
          <VisaStagesCard
            containerStyle={styles.widgetWrapper}
            stages={visaStages}
          />
        ) : null}
        {!_.isEmpty(visaDocsMetaDetails) ? (
          <VisaClickableTile
            containerStyle={styles.widgetWrapper}
            tileIcon={constants.documentIcon}
            title={visaDocsMetaDetails.title}
            action={() => {
              recordEvent(constants.Visa.event, {
                click: constants.Visa.click.docsChecklistWidget
              });
              if (isDocsChecklistUnavailable) {
                return null;
              } else {
                openDocsChecklist();
              }
            }}
            titleColor={constants.fifteenthColor}
            infoText={visaDocsMetaDetails.body}
            hideAction={isDocsChecklistUnavailable}
          />
        ) : null}
        {isHelpDataAvailable ? (
          <VisaInfoWidget
            containerStyle={styles.widgetWrapper}
            label={"Visa Type"}
            visaType={visaStr}
            shortText={visaIntroStr}
            action={() => {
              recordEvent(constants.Visa.event, {
                click: constants.Visa.click.visaHelpWidget
              });
              openHelp();
            }}
          />
        ) : null}
      </Fragment>
      <BlankSpacer
        height={100 + (isIphoneX() ? constants.xSensorAreaHeight : 0) + 16}
      />
      {/**
       * 100 - approx height of the visa companion bar
       * sensor area padding of iPhone X
       * 16 - additional padding
       */}
    </View>
  );
};

VisaWindowNotOpen.propTypes = {
  containerStyle: ViewPropTypes.style,
  visaDetails: PropTypes.object,
  openHelp: PropTypes.func.isRequired,
  openDocsChecklist: PropTypes.func,
  isHelpDataAvailable: PropTypes.bool.isRequired
};

const styles = StyleSheet.create({
  widgetWrapper: {
    marginTop: 16,
    marginHorizontal: 24
  }
});

export default VisaWindowNotOpen;
