import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import constants from "../../../../../constants/constants";
import PaymentInfoText from "../../PaymentInfoText";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../../../Services/PropTypeValidation/forbidExtraProps";

/**
 * This card will print a list of upcoming plato payments
 */
const PlatoPaymentsCard = ({ payments, containerStyle }) => {
  return (
    <View style={[styles.platoPaymentsCardContainer, containerStyle]}>
      {payments.map((payment, paymentIndex) => {
        const { isExpired } = payment;
        const Wrapper = isExpired ? TouchableOpacity : View;
        const WrapperProps = isExpired
          ? { onPress: payment.action, activeOpacity: 1 }
          : {};
        return (
          <Wrapper
            key={paymentIndex}
            style={[
              styles.paymentWrapper,
              paymentIndex === 0 ? { marginTop: 24 } : null,
              paymentIndex === payments.length - 1 ? { marginBottom: 24 } : null
            ]}
            {...WrapperProps}
          >
            <PaymentInfoText
              title={payment.installmentText}
              text={payment.amount}
              textColor={constants.black1}
              titleStyle={[
                styles.titleTextStyle,
                isExpired ? styles.expiredTitle : null
              ]}
            />
            <PaymentInfoText
              containerStyle={styles.paymentDueContainer}
              title={isExpired ? "Expired" : "Due"}
              text={isExpired ? "Call Support" : payment.dueBy}
              textColor={constants.black1}
              titleStyle={[
                styles.titleTextStyle,
                isExpired ? styles.expiredTitle : null
              ]}
              textStyle={isExpired ? styles.expiredText : null}
            />
          </Wrapper>
        );
      })}
    </View>
  );
};

PlatoPaymentsCard.propTypes = forbidExtraProps({
  payments: PropTypes.array,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
});

const styles = StyleSheet.create({
  platoPaymentsCardContainer: {
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 3,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "transparent",
    ...constants.elevationFive
  },
  paymentWrapper: {
    width: responsiveWidth(100) - 96,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 24,
    marginVertical: 12
  },
  titleTextStyle: {
    color: constants.shade1
  },
  expiredTitle: {
    color: constants.thirdColor
  },
  expiredText: {
    color: constants.ninthColor
  },
  paymentDueContainer: {
    width: 104
  }
});

export default PlatoPaymentsCard;
