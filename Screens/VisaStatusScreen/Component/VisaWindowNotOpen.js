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

const VisaWindowNotOpen = ({
  containerStyle = StyleSheet.create({}),
  visaDetails = {},
  openHelp = () => null
}) => {
  const {
    visaWindowDetails = {},
    visaStageDetails = [],
    visaType = "",
    visaStr = "",
    visaIntroStr = ""
  } = visaDetails;
  const {
    windowOpenTime = 0,
    currentTime = 0,
    convertedTime = 0
  } = visaWindowDetails;
  const windowOpenTimeObject = moment(windowOpenTime);
  const currentTimeObject = moment(currentTime);
  const convertedTimeObject = moment(convertedTime);
  const numberOfDaysToOpen = windowOpenTimeObject.diff(
    currentTimeObject,
    "days"
  );
  const numberOfDaysAvailable = windowOpenTimeObject.diff(
    convertedTimeObject,
    "days"
  );
  const timePercentage = (numberOfDaysToOpen / numberOfDaysAvailable) * 100;
  const visaStages = visaStageDetails.map(visaStage => {
    return {
      stageText: visaStage.title,
      dateText: visaStage.body
    };
  });

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
              dateText={windowOpenTimeObject.format(constants.commonDateFormat)}
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
        <VisaInfoWidget
          containerStyle={styles.widgetWrapper}
          label={"Visa Type"}
          visaType={visaStr}
          shortText={visaIntroStr}
          action={openHelp}
        />
      </Fragment>
    </View>
  );
};

VisaWindowNotOpen.propTypes = {
  containerStyle: ViewPropTypes.style,
  visaDetails: PropTypes.object,
  openHelp: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  widgetWrapper: {
    marginTop: 16,
    marginHorizontal: 24
  }
});

export default VisaWindowNotOpen;
