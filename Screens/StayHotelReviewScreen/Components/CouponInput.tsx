import {AnimatedInputBox, Box, Pill, Text} from '@pyt/micros';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Animated from 'react-native-reanimated';
import Icon from '../../../CommonComponents/Icon/Icon';
import {
  CONSTANT_fontPrimaryRegular,
  CONSTANT_fontPrimarySemiBold,
} from '../../../constants/fonts';
import {
  CONSTANT_arrowRight,
  CONSTANT_cancellationIcon,
} from '../../../constants/imageAssets';

export const CouponInput = ({
  applyCoupon,
  itineraryId,
  disabled,
  label,
  applyText,
  keyboardType,
  inputLabel,
  setInputBoxVisible = () => null,
  closeInputBox,
  pillText,
  getCouponText,
  isConditionValid,
  loading,
}: {
  applyCoupon: (req: {coupon: string | number; itineraryId: string}) => unknown;
  itineraryId: string;
  disabled: boolean;
  label?: string;
  applyText?: string;
  keyboardType: string;
  inputLabel?: string;
  setInputBoxVisible?: (showInput: boolean) => unknown;
  closeInputBox?: boolean;
  pillText?: string;
  getCouponText?: (value: string) => unknown;
  isConditionValid?: (value: number) => unknown;
  loading: boolean;
}) => {
  const [showInput, setShowInput] = useState(false);
  const [value, setValue] = useState<string | number>();
  const [couponApplied, setCouponApplied] = useState<boolean>(false);
  const [error, setError] = useState(false);

  const toogleInput = () => {
    setShowInput(!showInput);
    setInputBoxVisible(!showInput);
  };

  useEffect(() => {
    if (closeInputBox) {
      setShowInput(false);
      setValue('');
      setError(false);
    }
  }, [closeInputBox]);

  const onApplyCoupon = () => {
    if (value) {
      Keyboard.dismiss();
      const isValid = isConditionValid ? isConditionValid(value) : true;
      if (isValid) {
        if (applyCoupon) {
          applyCoupon({coupon: value, itineraryId})
            .then(() => {
              setCouponApplied(true);
              setShowInput(false);
              setInputBoxVisible(false);
            })
            .catch(() => {
              setError(true);
              setCouponApplied(false);
            });
        }
      } else {
        setError(true);
      }
    } else {
      setError(true);
    }
  };

  const removeCoupon = () => {
    applyCoupon({coupon: '', itineraryId})
      .then(() => {
        clearCoupon();
        setCouponApplied(false);
        setShowInput(false);
      })
      .catch(() => {
        setCouponApplied(false);
      });
  };
  const clearCoupon = () => {
    setValue('');
    setCouponApplied(false);
  };

  const onChangeValue = (text: string | number) => {
    setValue(text);
    error && setError(false);
  };

  return (
    <Box
      flexDirection="row"
      position="relative"
      height={68}
      alignContent="center"
      flex={1}>
      <Box
        flexDirection="row"
        alignItems="center"
        display={showInput ? 'none' : 'flex'}
        justifyContent="space-between"
        flex={1}>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          flex={1}>
          <TouchableOpacity onPress={disabled ? () => null : toogleInput}>
            <Text
              fontSize={15}
              lineHeight={21}
              fontFamily={CONSTANT_fontPrimarySemiBold}
              color={disabled ? '#AAAAAA' : '#00B277'}
              alignItems="center">
              {/* {icon && !couponApplied ? icon : ''}
              {icon && !couponApplied ? ' ' : ''} */}
              {couponApplied
                ? getCouponText
                  ? getCouponText(value)
                  : value
                : label || 'Apply Coupon'}
              {'  '}
              {!value ? (
                <Icon
                  name={CONSTANT_arrowRight}
                  color={disabled ? '#AAAAAA' : '#00B277'}
                  size={12}
                />
              ) : null}
            </Text>
          </TouchableOpacity>
          {couponApplied && !loading ? (
            <TouchableOpacity style={styles.close} onPress={removeCoupon}>
              <Text>
                <Icon
                  name={CONSTANT_cancellationIcon}
                  color={'#555555'}
                  size={18}
                />{' '}
              </Text>
            </TouchableOpacity>
          ) : null}
          {loading ? (
            <Box marginStart={16} marginTop={2}>
              <ActivityIndicator color="#00B277" />
            </Box>
          ) : null}
        </Box>
        {pillText && !couponApplied ? (
          <Pill
            text={pillText}
            margin={0}
            alignSelf="center"
            backgroundColor="#009E6A"
            textProps={{color: '#ffffff'}}
          />
        ) : null}
      </Box>
      <Animated.View
        style={[
          styles.inputContainer,
          showInput ? styles.visible : styles.hide,
        ]}>
        <AnimatedInputBox
          label={inputLabel || 'Enter coupon code'}
          containerProps={{
            backgroundColor: '#F2F2F2',
            width: 200,
          }}
          error={error}
          fontFamily={CONSTANT_fontPrimaryRegular}
          onChangeText={onChangeValue}
          value={value}
          keyboardType={keyboardType}
          labelProps={{
            fontSize: 12,
          }}
        />
        {loading ? (
          <Box marginStart={16} marginTop={2}>
            <ActivityIndicator color="#00B277" />
          </Box>
        ) : (
          <TouchableOpacity onPress={onApplyCoupon}>
            <Text marginStart={16}>
              <Text
                fontSize={15}
                lineHeight={21}
                fontFamily={CONSTANT_fontPrimarySemiBold}
                color="#00B277"
                paddingEnd={18}>
                {applyText || 'Apply Coupon'}
              </Text>
              <Icon
                name={CONSTANT_arrowRight}
                color={disabled ? '#AAAAAA' : '#00B277'}
                size={12}
              />
            </Text>
          </TouchableOpacity>
        )}
      </Animated.View>
    </Box>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hide: {
    display: 'none',
  },
  visible: {
    display: 'flex',
  },
  close: {
    marginStart: 18,
    alignSelf: 'flex-end',
  },
});
