import React, { Fragment, useEffect, useState } from "react";
import {
  StyleSheet,
  ViewPropTypes,
  TouchableOpacity,
  LayoutAnimation
} from "react-native";
import PropTypes from "prop-types";
import VisaStageHeader from "./Components/VisaStageHeader";
import constants from "../../../../constants/constants";
import VisaInfoCardHeader from "./Components/VisaInfoCardHeader";
import VisaInfoCardFooter from "./Components/VisaInfoCardFooter";
import _ from "lodash";
import BlankSpacer from "../../../../CommonComponents/BlankSpacer/BlankSpacer";
import { responsiveWidth } from "react-native-responsive-dimensions";

const VisaInfoCard = ({
  containerStyle = StyleSheet.create({}),
  isCardExpanded = false,
  isCardDisabled = false,
  title = "",
  body = "",
  color = constants.shade3,
  stages = [],
  footer = {},
  grantedAction = () => null,
  rejectedAction = () => null
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
          localExpansionStatus
            ? styles.expandedInfoCard
            : styles.compressedInfoCard,
          containerStyle
        ]}
      >
        <VisaInfoCardHeader
          title={title}
          body={body}
          isDisabled={isCardDisabled}
          localExpansionStatus={localExpansionStatus}
          color={isCardDisabled ? constants.shade3 : color}
          containerStyle={styles.cardHeader}
        />
        {localExpansionStatus ? (
          <Fragment>
            {stages.map((stage, stageIndex) => {
              return (
                <Fragment>
                  <VisaStageHeader
                    containerStyle={styles.stageHeader}
                    key={stageIndex}
                    title={stage.title}
                    body={stage.body}
                    color={stage.color || color}
                    icon={stage.icon}
                    listCheckBox={stage.listCheckBox}
                    notes={stage.stageNotes}
                    action={stage.action}
                    email={stage.email}
                    grantedAction={grantedAction}
                    rejectedAction={rejectedAction}
                  />
                </Fragment>
              );
            })}
          </Fragment>
        ) : null}
        {localExpansionStatus && !_.isEmpty(footer) && !isCardDisabled ? (
          <VisaInfoCardFooter
            containerStyle={
              !localExpansionStatus
                ? styles.compressedFooter
                : styles.expandedFooter
            }
            icon={footer.icon}
            text={footer.text}
            color={footer.color}
          />
        ) : localExpansionStatus ? (
          <BlankSpacer containerStyle={styles.footerSpacer} height={24} />
        ) : null}
      </TouchableOpacity>
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
  footer: PropTypes.object,
  grantedAction: PropTypes.func,
  rejectedAction: PropTypes.func,
  expedite: PropTypes.func
};

const styles = StyleSheet.create({
  visaInfoCardContainer: {
    backgroundColor: "white",
    paddingTop: 24,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4
  },
  footerSpacer: {
    backgroundColor: "white",
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    marginHorizontal: 24,
    width: responsiveWidth(100) - 48 - 24 // 48 - card padding, 24 - stage padding
  },
  cardHeader: {
    paddingHorizontal: 24
  },
  stageHeader: {
    paddingHorizontal: 24
  },
  expandedInfoCard: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  compressedInfoCard: {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    paddingBottom: 24
  },
  compressedFooter: {
    height: 0
  },
  expandedFooter: {
    marginTop: 24
  }
});

export default VisaInfoCard;
