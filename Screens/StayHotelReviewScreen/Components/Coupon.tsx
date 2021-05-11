import React, {useState} from 'react';
import {CONSTANT_coupon_apply} from '../../../constants/apiUrls';
import constants from '../../../constants/constants';
import apiCall from '../../../Services/networkRequests/apiCall';
import {CouponInput} from './CouponInput';

export const Coupon = ({
  itineraryId,
  applyCoupon,
  setCouponInputVisible,
  setOpenedBoxName,
  openedBoxName,
}) => {
  const [coupon, setCoupon] = useState('');

  const onApplyCoupon = () => {
    applyCoupon();
  };

  const setInputBoxVisible = value => {
    if (value) {
      setOpenedBoxName('COUPON');
    }
  };

  return (
    <CouponInput
      onChangeText={setCoupon}
      applyCoupon={applyCoupon}
      itineraryId={itineraryId}
      setInputBoxVisible={setInputBoxVisible}
      closeInputBox={openedBoxName === 'CREDIT'}
    //   disabled
    />
  );
};
