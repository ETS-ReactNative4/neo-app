import {Box} from '@pyt/micros/src/box';
import {Text} from '@pyt/micros/src/text';
import React, {useEffect, useState} from 'react';
import {CONSTANT_LOYALTY_CREDITS} from '../../../constants/apiUrls';
import constants from '../../../constants/constants';
import {
  CONSTANT_fontPrimaryRegular,
  CONSTANT_fontPrimarySemiBold,
} from '../../../constants/fonts';
import apiCall from '../../../Services/networkRequests/apiCall';
import {CouponInput} from './CouponInput';
import getSymbolFromCurrency from 'currency-symbol-map';
import {getGlobalPriceWithoutSymbol} from '../../ExploreScreen/services/getPriceWithoutSymbol';
import Icon from '../../../CommonComponents/Icon/Icon';
import {CONSTANT_heart} from '../../../constants/imageAssets';

type UserLoayltyCreditResponseType = {
  domesticLoyaltyBalance: number;
  internationalLoyaltyBalance: number;
};
export const LoyaltyCredits = ({
  itineraryId,
  applyCredit,
  userId,
  setOpenedBoxName,
  openedBoxName,
  displayCurrency,
  disabled,
  loading,
}: {
  itineraryId: string;
  userId: string;
  setOpenedBoxName: (type: 'CREDIT' | 'COUPON') => unknown;
  openedBoxName: string;
  applyCredit: (req: {coupon: string | number; itineraryId: string}) => unknown;
  displayCurrency: string;
  disabled: boolean;
  loading: boolean;
}) => {
  const [loyalCredit, setLoyaltyCredit] = useState<
    UserLoayltyCreditResponseType
  >({domesticLoyaltyBalance: 0, internationalLoyaltyBalance: 0});

  const [inputVisible, setInputVisible] = useState<boolean>(false);

  useEffect(() => {
    apiCall(
      CONSTANT_LOYALTY_CREDITS({userId}),
      {},
      'GET',
      constants.productUrl,
    ).then(response => {
      setLoyaltyCredit(response.data);
    });
  }, [userId]);

  const setInputBoxVisible = (value: boolean) => {
    setInputVisible(value);
    if (value) {
      setOpenedBoxName('CREDIT');
    }
  };

  const totalCredits =
    loyalCredit.domesticLoyaltyBalance +
    loyalCredit.internationalLoyaltyBalance;

  if (!totalCredits) {
    return null;
  }

  const costSymbol = getSymbolFromCurrency(displayCurrency);

  const closeInputBox = openedBoxName === 'COUPON';

  const getCouponText = (data: string) => {
    const cost = getGlobalPriceWithoutSymbol({
      amount: parseInt(data, 10),
      currency: displayCurrency,
    });
    return `${costSymbol}${cost} discounted as loyalty offer`;
  };

  const isConditionValid = (value: number) => {
    if (value <= 0) {
      return false;
    } else if (value > loyalCredit.domesticLoyaltyBalance) {
      return false;
    }
    return true;
  };
  return (
    <>
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        flex={1}>
        <CouponInput
          applyCoupon={applyCredit}
          itineraryId={itineraryId}
          label="Apply loyalty credits"
          applyText="Apply"
          inputLabel="Number of credits"
          keyboardType={'numeric'}
          setInputBoxVisible={setInputBoxVisible}
          closeInputBox={openedBoxName === 'COUPON'}
          pillText={!disabled ? `${totalCredits} credits` : ''}
          getCouponText={getCouponText}
          isConditionValid={isConditionValid}
          disabled={disabled}
          icon={<Icon name={CONSTANT_heart} size={14} />}
          loading={loading}
        />
      </Box>
      {inputVisible && !closeInputBox ? (
        <Box
          borderRadius={8}
          backgroundColor="#E5F9F3"
          padding={16}
          marginBottom={24}>
          <Text
            color="#333333"
            fontFamily={CONSTANT_fontPrimaryRegular}
            fontSize={13}
            lineHeight={16}>
            You can use upto{' '}
            <Text fontFamily={CONSTANT_fontPrimarySemiBold}>
              {loyalCredit.domesticLoyaltyBalance} credit
            </Text>{' '}
            for this booking
          </Text>
          <Text
            color="#333333"
            fontFamily={CONSTANT_fontPrimaryRegular}
            fontSize={13}
            lineHeight={16}
            marginTop={8}>
            Remaining {loyalCredit.internationalLoyaltyBalance} credit out of{' '}
            {totalCredits} credit can be used only for International bookings
          </Text>
        </Box>
      ) : null}
    </>
  );
};
