import React, {useState} from 'react';
import Icon from '../../../CommonComponents/Icon/Icon';
import {CONSTANT_coupon_apply} from '../../../constants/apiUrls';
import constants from '../../../constants/constants';
import {CONSTANT_offer} from '../../../constants/imageAssets';
import apiCall from '../../../Services/networkRequests/apiCall';
import {CouponInput} from './CouponInput';

export const Coupon = ({
  itineraryId,
  applyCoupon,
  setCouponInputVisible,
  setOpenedBoxName,
  openedBoxName,
  disabled,
  loading,
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
      disabled={disabled}
      icon={<Icon name={CONSTANT_offer} />}
      loading={loading}
    />
  );
};
