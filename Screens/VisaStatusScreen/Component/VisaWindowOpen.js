import React, { Fragment } from "react";
import { View, StyleSheet, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import VisaInfoCard from "../../VisaScreen/Components/VisaInfoCard/VisaInfoCard";
import Dash from "react-native-dash";
import constants from "../../../constants/constants";
import _ from "lodash";
import StickyActionBar from "./StickyActionBar";
import BlankSpacer from "../../../CommonComponents/BlankSpacer/BlankSpacer";
import { isIphoneX } from "react-native-iphone-x-helper";

const VisaWindowOpen = ({
  containerStyle = StyleSheet.create({}),
  openDocsChecklist = () => null,
  visaDetails
}) => {
  const { visaStageDetails = [], visaDocsMetaDetails = {} } = visaDetails;

  return (
    <View style={[containerStyle]}>
      {!_.isEmpty(visaDocsMetaDetails) ? (
        <StickyActionBar
          action={openDocsChecklist}
          title={visaDocsMetaDetails.title}
          icon={constants.documentIcon}
        />
      ) : null}
      {visaStageDetails.map((stage, stageIndex) => {
        let isCardDisabled = false;
        if (stage.stage === "NOT_STARTED") {
          isCardDisabled = true;
        }
        return (
          <View>
            {stageIndex ? (
              <Dash
                style={styles.dashContainer}
                dashColor={constants.shade4}
                dashGap={2}
                dashLength={4}
              />
            ) : null}
            <VisaInfoCard
              key={stageIndex}
              containerStyle={styles.cardWrapper}
              isCardExpanded={stage.active}
              isCardDisabled={isCardDisabled}
              color={stage.color}
              title={stage.title}
              body={stage.body}
              stages={stage.substages}
              footer={stage.footer}
            />
          </View>
        );
      })}
      <BlankSpacer
        height={64 + 24 + (isIphoneX() ? constants.xSensorAreaHeight : 0) + 8}
      />
      {/**
       * 64 - height of the fab button
       * 24 - bottom spacing of the button
       * sensor area padding of iPhone X
       * 8 - additional padding
       */}
    </View>
  );
};

VisaWindowOpen.propTypes = {
  containerStyle: ViewPropTypes.style,
  visaDetails: PropTypes.object,
  openDocsChecklist: PropTypes.func
};

const styles = StyleSheet.create({
  cardWrapper: {
    marginHorizontal: 24,
    marginTop: 24
  },
  dashContainer: {
    overflow: "hidden",
    width: 1,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    position: "absolute",
    top: 0,
    left: 64
  }
});

export default VisaWindowOpen;
