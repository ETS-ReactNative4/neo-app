import React from 'react';
import Icon from '../../../CommonComponents/Icon/Icon';
import {CONSTANT_offer} from '../../../constants/imageAssets';
import {CouponRequestType} from '../hook/useCouponApi';
import {CouponInput} from './CouponInput';

export const Coupon = ({
  itineraryId,
  applyCoupon,
  setOpenedBoxName,
  openedBoxName,
  disabled,
  loading,
}: {
  itineraryId: string;
  applyCoupon: (req: CouponRequestType) => unknown;
  setOpenedBoxName: (type: 'CREDIT' | 'COUPON') => unknown;
  openedBoxName: string;
  disabled: boolean;
  loading: boolean;
}) => {
  const setInputBoxVisible = (value: boolean) => {
    if (value) {
      setOpenedBoxName('COUPON');
    }
  };

  return (
    <CouponInput
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
