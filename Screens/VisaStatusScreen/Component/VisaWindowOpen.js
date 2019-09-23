import React, { Fragment } from "react";
import { View, StyleSheet, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import VisaInfoCard from "../../VisaScreen/Components/VisaInfoCard/VisaInfoCard";
import Dash from "react-native-dash";
import constants from "../../../constants/constants";

const VisaWindowOpen = ({
  containerStyle = StyleSheet.create({}),
  visaDetails
}) => {
  const { visaStageDetails = [] } = visaDetails;

  return (
    <View style={[containerStyle]}>
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
              isCardExpanded={false}
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
    </View>
  );
};

VisaWindowOpen.propTypes = {
  containerStyle: ViewPropTypes.style,
  visaDetails: PropTypes.object
};

const styles = StyleSheet.create({
  cardWrapper: {
    marginHorizontal: 24,
    marginTop: 24
  },
  dashContainer: {
    width: StyleSheet.hairlineWidth,
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
