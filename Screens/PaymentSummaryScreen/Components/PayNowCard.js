import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import constants from "../../../constants/constants";
import PaymentInfoText from "./PaymentInfoText";
import Icon from "../../../CommonComponents/Icon/Icon";

const PayNowCard = ({ cardInfo = [], actionText = "", action = "" }) => {
  return (
    <TouchableOpacity
      onPress={action}
      activeOpacity={0.8}
      style={styles.payNowCardContainer}
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
            />
          );
        })}
      </View>
      <View style={styles.actionArea}>
        <View style={styles.actionTextArea}>
          <Text style={styles.actionText}>{`${actionText}`}</Text>
          <View style={styles.actionIcon}>
            <Icon
              name={constants.backIcon}
              color={constants.ninthColor}
              size={24}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  payNowCardContainer: {
    alignSelf: "center",
    flexDirection: "row",
    width: responsiveWidth(100) - 48,
    backgroundColor: constants.shade5,
    borderWidth: 1,
    borderColor: constants.shade4,
    borderRadius: 3
  },
  infoAreaWrapper: {
    marginLeft: 24,
    marginVertical: 8
  },
  isFirstInfo: {
    marginTop: 16,
    marginBottom: 8
  },
  isLastInfo: {
    marginTop: 8,
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
    color: constants.ninthColor,
    marginTop: 5,
    marginRight: 4
  },
  actionIcon: {
    transform: [{ rotate: "180deg" }]
  }
});

export default PayNowCard;
