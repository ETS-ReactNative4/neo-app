import React, {
  ReactNode,
  FunctionComponent,
  useRef,
  useState,
  useCallback,
  useEffect,
} from 'react';
import {Animated, Pressable, TextInput, TouchableOpacity} from 'react-native';

import {
  InputText,
  InputTextProps,
  Text,
  TextProps,
  Box,
  BoxProps,
} from '@pyt/micros';

export interface AnimatedInputBoxProps extends InputTextProps {
  label?: string;
  showClear?: boolean;
  containerProps?: BoxProps;
  fontFamily?: string;
  editable?: boolean;
  error?: boolean;
  labelProps?: TextProps;
}

export const AnimatedInputBox: FunctionComponent<AnimatedInputBoxProps> = ({
  label,
  value,
  placeholder,
  showClear,
  containerProps = {},
  fontFamily,
  editable = true,
  error,
  inputRef=null,
  labelProps={},
  ...restProps
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const animatedIsFocused = useRef(
    new Animated.Value(value || placeholder ? 1 : 0),
  ).current;

  const handleFocus = useCallback(() => {
    Animated.timing(animatedIsFocused, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [animatedIsFocused]);

  const handleBlur = () => {
    Animated.timing(animatedIsFocused, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    if(value){
      handleFocus()
    }else{
      handleBlur()
    }
  }, [value, handleFocus]);

  const labelStyle = {
    transform: [
      {
        translateY: animatedIsFocused.interpolate({
          inputRange: [0, 1],
          outputRange: [10, 0],
        }),
      },
    ],
  };

  return (
    <Box
      height={53}
      borderRadius={8}
      backgroundColor={'#EDEDED'}
      borderWidth={1}
      borderColor={error ? '#EF435D' : isFocused ? '#00774F' : '#EDEDED' }
      // paddingHorizontal={16}
      // paddingVertical={8}
      {...containerProps}>
      <Box flex={1} marginHorizontal={12} marginVertical={8}>
        <Animated.Text style={labelStyle}>
          <Text
            fontSize={11}
            // lineHeight={14}
            color={'#777777'}
            fontFamily={fontFamily}
            {...labelProps}>
            {label}
          </Text>
        </Animated.Text>

        <Pressable
          onPress={() => {
            console.log('triggered');
            editable && handleFocus();
          }}>
          <TextInput
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            // zIndex={1}
            // height={51}
            clearButtonMode="never"
            value={value}
            ref={inputRef}
            onFocus={e => {
              setIsFocused(true);
              //   onFocus && onFocus(e)
              handleFocus();
            }}
            onBlur={e => {
              setIsFocused(false);
              //   onBlur && onBlur(e)
              handleBlur();
            }}
            style={{
              zIndex: 1,
            }}
            editable={editable}
            {...restProps}
          />
        </Pressable>
      </Box>

      {/* {showClear ? (
				<Box>
					<Text>x</Text>
				</Box>
			) : null}  */}
    </Box>
  );
};
