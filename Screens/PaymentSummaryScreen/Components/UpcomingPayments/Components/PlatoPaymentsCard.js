import React, {Fragment} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import constants from '../../../../../constants/constants';
import PaymentInfoText from '../../PaymentInfoText';
import PropTypes from 'prop-types';
import forbidExtraProps from '../../../../../Services/PropTypeValidation/forbidExtraProps';
import Icon from '../../../../../CommonComponents/Icon/Icon';
import openCustomTab from '../../../../../Services/openCustomTab/openCustomTab';
import {recordEvent} from '../../../../../Services/analytics/analyticsService';

/**
 * This card will print a list of upcoming plato payments
 */
const PlatoPaymentsCard = ({payments, containerStyle}) => {
  return (
    <View style={[styles.platoPaymentsCardContainer, containerStyle]}>
      {payments.map((payment, paymentIndex) => {
        const {isExpired} = payment;
        const Wrapper = isExpired ? TouchableOpacity : View;
        const WrapperProps = isExpired
          ? {onPress: payment.action, activeOpacity: 1}
          : {};
        return (
          <Fragment>
            <Wrapper
              key={paymentIndex}
              style={[
                styles.paymentWrapper,
                paymentIndex === 0 ? {marginTop: 24} : null,
                paymentIndex === payments.length - 1
                  ? {marginBottom: 24}
                  : null,
              ]}
              {...WrapperProps}>
              <PaymentInfoText
                title={payment.installmentText}
                text={payment.amount}
                textColor={constants.black1}
                titleStyle={[
                  styles.titleTextStyle,
                  isExpired ? styles.expiredTitle : null,
                ]}
              />
              <PaymentInfoText
                containerStyle={styles.paymentDueContainer}
                title={isExpired ? 'Expired' : 'Due'}
                text={isExpired ? 'Call Support' : payment.dueBy}
                textColor={constants.black1}
                titleStyle={[
                  styles.titleTextStyle,
                  isExpired ? styles.expiredTitle : null,
                ]}
                textStyle={isExpired ? styles.expiredText : null}
              />
            </Wrapper>
            {payment.paymentUrlNB || payment.paymentUrl ? (
              <View style={styles.row}>
                {payment.paymentUrlNB ? (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      recordEvent(constants.Payment.event, {
                        click: constants.Payment.click.offlinePaymentLink,
                      });
                      openCustomTab(payment.paymentUrlNB);
                    }}
                    style={styles.actionTextArea}>
                    <Text style={[styles.actionText]}>
                      {'Pay through Net Banking'}
                    </Text>
                  </TouchableOpacity>
                ) : null}
                {payment.paymentUrlNB ? <View style={styles.divider} /> : null}
                {payment.paymentUrl ? (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      recordEvent(constants.Payment.event, {
                        click: constants.Payment.click.offlinePaymentLink,
                      });
                      openCustomTab(payment.paymentUrl);
                    }}
                    style={styles.actionTextArea}>
                    <Text style={[styles.actionText]}>
                      {'Pay through Credit Card'}
                    </Text>
                    {!payment.paymentUrlNB ? (
                      <View style={styles.actionIcon}>
                        <Icon
                          name={constants.backIcon}
                          color={constants.ninthColor}
                          size={24}
                        />
                      </View>
                    ) : null}
                  </TouchableOpacity>
                ) : null}
              </View>
            ) : null}
            {paymentIndex !== payments.length - 1 ? (
              <View style={styles.verticalDivider} />
            ) : null}
          </Fragment>
        );
      })}
    </View>
  );
};

PlatoPaymentsCard.propTypes = forbidExtraProps({
  payments: PropTypes.array,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
});

const styles = StyleSheet.create({
  platoPaymentsCardContainer: {
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 3,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'transparent',
    ...constants.elevationFive,
  },
  paymentWrapper: {
    width: responsiveWidth(100) - 96,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 24,
    marginVertical: 12,
  },
  titleTextStyle: {
    color: constants.shade1,
    ...constants.fontCustom(constants.primaryRegular, 14),
  },
  expiredTitle: {
    color: constants.thirdColor,
  },
  expiredText: {
    color: constants.ninthColor,
  },
  paymentDueContainer: {
    width: 104,
  },
  actionTextArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    paddingHorizontal: 4,
    paddingTop: 8,
    paddingBottom: 16,
  },
  actionText: {
    ...constants.fontCustom(constants.primaryRegular, 16),
    marginTop: 5,
    marginRight: 4,
    color: constants.ninthColor,
  },
  actionIcon: {
    transform: [{rotateY: '180deg'}],
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  divider: {
    borderWidth: StyleSheet.hairlineWidth,
    height: 20,
    borderColor: constants.ninthColor,
    marginHorizontal: 8,
  },
  verticalDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: 'auto',
  },
});

export default PlatoPaymentsCard;
