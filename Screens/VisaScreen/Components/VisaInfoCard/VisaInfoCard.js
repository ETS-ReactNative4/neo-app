import React, { Fragment, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ViewPropTypes,
  Text,
  TouchableOpacity,
  LayoutAnimation
} from "react-native";
import PropTypes from "prop-types";
import VisaStageHeader from "./Components/VisaStageHeader";
import constants from "../../../../constants/constants";
import VisaInfoCardHeader from "./Components/VisaInfoCardHeader";
import VisaStageBullets from "./Components/VisaStageBullets";

const VisaInfoCard = ({
  containerStyle = StyleSheet.create({}),
  isCardExpanded = false,
  isCardDisabled = false,
  title = "",
  body = "",
  color = constants.shade3,
  stages = []
}) => {
  const [localExpansionStatus, toggleLocalExpansion] = useState(false);
  const [isMounted, setMountStatus] = useState(false);

  useEffect(() => {
    if (!isMounted) {
      if (localExpansionStatus !== isCardExpanded) {
        toggleLocalExpansion(isCardExpanded);
      }
      setMountStatus(true);
    }
  }, [isCardExpanded, localExpansionStatus, isMounted]);

  const toggleCardExpansion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    toggleLocalExpansion(!localExpansionStatus);
  };

  return (
    <TouchableOpacity
      onPress={isCardDisabled ? () => null : toggleCardExpansion}
      activeOpacity={0.8}
      style={[styles.visaInfoCardContainer, containerStyle]}
    >
      <VisaInfoCardHeader
        title={title}
        body={body}
        isDisabled={isCardDisabled}
        color={isCardDisabled ? constants.shade3 : color}
      />
      {localExpansionStatus ? (
        <Fragment>
          {stages.map((stage, stageIndex) => {
            return (
              <Fragment>
                <VisaStageHeader
                  key={stageIndex}
                  title={stage.title}
                  body={stage.body}
                  color={stage.color}
                  icon={stage.icon}
                  listCheckBox={stage.listCheckBox}
                  notes={stage.stageNotes}
                />
              </Fragment>
            );
          })}
        </Fragment>
      ) : null}
    </TouchableOpacity>
  );
};

VisaInfoCard.propTypes = {
  containerStyle: ViewPropTypes.style,
  isCardExpanded: PropTypes.bool.isRequired,
  isCardDisabled: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string,
  color: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  visaInfoCardContainer: {
    backgroundColor: "white",
    padding: 24
  }
});

export default VisaInfoCard;
