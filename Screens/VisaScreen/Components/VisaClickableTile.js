import React from "react";
import {
  View,
  StyleSheet,
  ViewPropTypes,
  TouchableOpacity,
  Text,
  Platform
} from "react-native";
import PropTypes from "prop-types";
import Icon from "../../../CommonComponents/Icon/Icon";
import InfoDot from "../../../CommonComponents/InfoDot/InfoDot";
import constants from "../../../constants/constants";
import { responsiveWidth } from "react-native-responsive-dimensions";

const VisaClickableTile = ({
  containerStyle = StyleSheet.create({}),
  action = () => null,
  title = "",
  subTitle = "",
  infoText = "",
  tileIcon = "",
  titleColor = constants.black1,
  hasUnread = false
}) => {
  return (
    <TouchableOpacity
      onPress={action}
      activeOpacity={0.8}
      style={[styles.visaCountrySelectorContainer, containerStyle]}
    >
      {tileIcon ? (
        <View style={styles.iconSection}>
          <Icon name={tileIcon} color={titleColor} size={24} />
        </View>
      ) : (
        <View />
      )}
      <View style={styles.textSection}>
        <View style={styles.cardDetails}>
          <View style={styles.titleTextSection}>
            <Text style={[styles.titleText, { color: titleColor }]}>
              {title}
            </Text>
            <Text style={styles.subTitleText}>{subTitle}</Text>
            <View style={styles.titleIconWrapper}>
              <Icon name={constants.arrowRight} color={titleColor} size={10} />
            </View>
          </View>
          {hasUnread ? (
            <View style={styles.notifSection}>
              <InfoDot dotRadius={5} />
            </View>
          ) : null}
        </View>
        <View style={styles.infoTextWrapper}>
          <Text style={styles.infoText}>{infoText}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

VisaClickableTile.propTypes = {
  containerStyle: ViewPropTypes.style,
  action: PropTypes.func.isRequired,
  title: PropTypes.string,
  infoText: PropTypes.string,
  subTitle: PropTypes.string,
  hasUnread: PropTypes.bool,
  titleColor: PropTypes.string,
  tileIcon: PropTypes.string
};

const styles = StyleSheet.create({
  visaCountrySelectorContainer: {
    flexDirection: "row",
    padding: 24,
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: constants.shade5,
    borderRadius: 4
  },
  iconSection: {
    marginRight: 16
  },
  textSection: {
    flex: 1
  },
  cardDetails: {
    flexDirection: "row"
  },
  titleTextSection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  titleText: {
    ...constants.fontCustom(constants.primarySemiBold, 16),
    marginRight: 4
  },
  subTitleText: {
    ...constants.fontCustom(constants.primaryRegular, 14),
    color: constants.shade1,
    marginHorizontal: 4
  },
  titleIconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        marginTop: -3
      },
      android: {
        marginTop: -1
      }
    })
  },
  notifSection: {
    alignItems: "center",
    justifyContent: "center"
  },
  infoTextWrapper: {
    marginTop: 8
  },
  infoText: {
    ...constants.fontCustom(constants.primaryRegular, 16, 16),
    color: constants.black1,
    width: responsiveWidth(70)
  }
});

export default VisaClickableTile;
