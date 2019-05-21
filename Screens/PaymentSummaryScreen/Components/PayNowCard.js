import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import constants from "../../../constants/constants";
import PaymentInfoText from "./PaymentInfoText";
import Icon from "../../../CommonComponents/Icon/Icon";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";

const PayNowCard = ({
  cardInfo = [],
  actionText = "",
  action = () => null,
  color = constants.ninthColor,
  actionIcon = constants.backIcon,
  containerStyle = {},
  textColor = "white"
}) => {
  return (
    <TouchableOpacity
      onPress={action}
      activeOpacity={0.8}
      style={[
        styles.payNowCardContainer,
        { backgroundColor: color },
        containerStyle
      ]}
    >
      <View>
        {cardInfo.map((info, infoIndex) => {
          return (
            <PaymentInfoText
              key={infoIndex}
              containerStyle={[
                styles.infoAreaWrapper,
                infoIndex === 0 ? styles.isFirstInfo : {},
                infoIndex === cardInfo.length - 1 ? styles.isLastInfo : {}
              ]}
              title={info.title}
              text={info.text}
              textColor={textColor}
            />
          );
        })}
      </View>
      <View style={styles.actionArea}>
        <View style={styles.actionTextArea}>
          <Text
            style={[styles.actionText, { color: textColor }]}
          >{`${actionText}`}</Text>
          <View style={styles.actionIcon}>
            <Icon name={actionIcon} color={textColor} size={24} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

PayNowCard.propTypes = forbidExtraProps({
  cardInfo: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    })
  ).isRequired,
  actionText: PropTypes.string,
  action: PropTypes.func.isRequired,
  color: PropTypes.string,
  actionIcon: PropTypes.string,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  textColor: PropTypes.string
});

const styles = StyleSheet.create({
  payNowCardContainer: {
    alignSelf: "center",
    flexDirection: "row",
    width: responsiveWidth(100) - 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "transparent",
    borderRadius: 3
  },
  infoAreaWrapper: {
    marginLeft: 24,
    marginVertical: 8
  },
  isFirstInfo: {
    marginTop: 16
  },
  isLastInfo: {
    marginBottom: 16
  },
  actionArea: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end"
  },
  actionTextArea: {
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    marginRight: 24
  },
  actionText: {
    ...constants.fontCustom(constants.primaryRegular, 16),
    marginTop: 5,
    marginRight: 4
  },
  actionIcon: {
    transform: [{ rotateY: "180deg" }]
  }
});

export default PayNowCard;
