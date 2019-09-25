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
import VisaInfoCardFooter from "./Components/VisaInfoCardFooter";
import _ from "lodash";

const VisaInfoCard = ({
  containerStyle = StyleSheet.create({}),
  isCardExpanded = false,
  isCardDisabled = false,
  title = "",
  body = "",
  color = constants.shade3,
  stages = [],
  footer = {}
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
    <Fragment>
      <TouchableOpacity
        onPress={isCardDisabled ? () => null : toggleCardExpansion}
        activeOpacity={0.8}
        style={[
          styles.visaInfoCardContainer,
          localExpansionStatus ? styles.expandedInfoCard : {},
          containerStyle
        ]}
      >
        <VisaInfoCardHeader
          title={title}
          body={body}
          isDisabled={isCardDisabled}
          localExpansionStatus={localExpansionStatus}
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
                    color={stage.color || color}
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
      {localExpansionStatus && !_.isEmpty(footer) && !isCardDisabled ? (
        <VisaInfoCardFooter
          containerStyle={!localExpansionStatus ? styles.compressedFooter : {}}
          icon={footer.icon}
          text={footer.text}
          color={footer.color}
        />
      ) : null}
    </Fragment>
  );
};

VisaInfoCard.propTypes = {
  containerStyle: ViewPropTypes.style,
  isCardExpanded: PropTypes.bool.isRequired,
  isCardDisabled: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string,
  color: PropTypes.string.isRequired,
  stages: PropTypes.array,
  footer: PropTypes.object
};

const styles = StyleSheet.create({
  visaInfoCardContainer: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 4
  },
  expandedInfoCard: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  compressedFooter: {
    height: 0
  }
});

export default VisaInfoCard;
