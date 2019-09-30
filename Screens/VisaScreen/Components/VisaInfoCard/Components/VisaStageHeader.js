import React from "react";
import { View, Text, StyleSheet, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import constants from "../../../../../constants/constants";
import Icon from "../../../../../CommonComponents/Icon/Icon";
import VisaStageBullets from "./VisaStageBullets";
import changeColorAlpha from "../../../../../Services/changeColorAlpha/changeColorAlpha";
import VisaInfoActionButton from "./VisaInfoActionButton";
import _ from "lodash";
import VisaInfoExpediateButton from "./VisaInfoExpediateButton";

const VisaStageHeader = ({
  containerStyle = StyleSheet.create({}),
  title = "",
  body = "",
  color = "",
  icon = "",
  listCheckBox = [],
  notes = "",
  action = {}
}) => {
  return (
    <View style={[styles.visaStageHeaderContainer, containerStyle]}>
      <View style={styles.iconSection}>
        <View
          style={[
            styles.iconWrapper,
            { backgroundColor: changeColorAlpha(color, 0.2) }
          ]}
        >
          <Icon name={icon} size={13} color={constants.black1} />
        </View>
      </View>
      <View style={styles.textSection}>
        <View style={styles.visaStageTitleWrapper}>
          <Text style={[styles.titleText]}>{title}</Text>
        </View>
        <View style={styles.bodyTextWrapper}>
          <Text style={[styles.bodyText]}>{body}</Text>
        </View>
        {listCheckBox && listCheckBox.length ? (
          <VisaStageBullets list={listCheckBox} />
        ) : null}
        {notes ? (
          <View style={styles.notesContainer}>
            <Text style={styles.notesText}>{notes}</Text>
          </View>
        ) : null}
        {!_.isEmpty(action) ? (
          <View style={styles.actionBar}>
            {!_.isEmpty(action.granted) ? (
              <VisaInfoActionButton
                cta={"Granted"}
                action={() => null}
                image={constants.thumbsUpIllus}
                containerStyle={styles.grantedButton}
              />
            ) : null}
            {!_.isEmpty(action.rejected) ? (
              <VisaInfoActionButton
                cta={"Rejected"}
                action={() => null}
                image={constants.thumbsDownIllus}
              />
            ) : null}
            {!_.isEmpty(action.expedite) ? (
              <VisaInfoExpediateButton cta={"Expedite"} action={() => null} />
            ) : null}
          </View>
        ) : null}
      </View>
    </View>
  );
};

VisaStageHeader.propTypes = {
  containerStyle: ViewPropTypes.style,
  title: PropTypes.string,
  body: PropTypes.string,
  color: PropTypes.string,
  isDisabled: PropTypes.bool
};

const styles = StyleSheet.create({
  visaStageHeaderContainer: {
    marginTop: 24,
    flexDirection: "row"
  },
  iconSection: {
    marginRight: 24
  },
  iconWrapper: {
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  textSection: {
    flex: 1
  },
  visaStageTitleWrapper: {
    flexDirection: "row",
    alignItems: "center"
  },
  infoDotWrapper: {
    marginRight: 4
  },
  infoDot: {},
  titleText: {
    ...constants.fontCustom(constants.primaryRegular, 14),
    color: constants.black2,
    marginTop: 2
  },
  bodyTextWrapper: {
    marginTop: 8
  },
  bodyText: {
    ...constants.fontCustom(constants.primaryRegular, 16, 22),
    color: constants.black1
  },
  notesContainer: {
    marginTop: 8,
    marginBottom: 16
  },
  notesText: {
    ...constants.fontCustom(constants.primaryRegular, 15, 21),
    color: constants.black2
  },
  actionBar: {
    marginTop: 16,
    flexDirection: "row"
  },
  grantedButton: {
    marginRight: 16
  }
});

export default VisaStageHeader;
