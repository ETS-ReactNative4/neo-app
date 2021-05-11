import React, {useEffect, useState} from 'react';
import {
  CONSTANT_coupon_apply,
  CONSTANT_LOYALTY_CREDITS,
} from '../../../constants/apiUrls';
import constants from '../../../constants/constants';
import apiCall from '../../../Services/networkRequests/apiCall';
import {CouponInput} from './CouponInput';

export const LoyaltyCredits = ({
  itineraryId,
  applyCredit,
  userId,
  setOpenedBoxName,
  openedBoxName,
}) => {
  const [loyalCredit, setLoyaltyCredit] = useState({});
  const onApplyCoupon = () => {
    applyCoupon();
  };
  useEffect(() => {
    apiCall(
      CONSTANT_LOYALTY_CREDITS({userId}),
      {},
      'GET',
      constants.productUrl,
    ).then(response => {
      setLoyaltyCredit(response.data);
    });
  }, []);

  const setInputBoxVisible = value => {
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
  console.log('loyalCredit', loyalCredit);
  const conditionCheck = () => {
    
  }
  return (
    <CouponInput
      // onChangeText={setCoupon}
      applyCoupon={applyCredit}
      itineraryId={itineraryId}
      label="Apply loyalty credits"
      applyText="Apply"
      inputLabel="Number of credits"
      keyboardType={'numeric'}
      setInputBoxVisible={setInputBoxVisible}
      closeInputBox={openedBoxName === 'COUPON'}
    />
  );
};
