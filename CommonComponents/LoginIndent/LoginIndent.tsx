import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import BlankSpacer from '../BlankSpacer/BlankSpacer';
import {CONSTANT_pytLogoIcon} from '../../constants/imageAssets';
import {
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular,
} from '../../constants/fonts';
import {CONSTANT_black1} from '../../constants/colorPallete';
import navigationServiceV2 from '../../Services/navigationService/navigationServiceV2';
import {SCREEN_APP_LOGIN} from '../../NavigatorsV2/ScreenNames';

export interface LoginIndentProps {
  message: string;
}

// An indent view that requests user to login
const LoginIndent = ({
  message = 'Please login to access this screen',
}: LoginIndentProps) => {
  return (
    <View style={styles.loginIndentContainer}>
      {/* <Image style={styles.pytLogo} source={CONSTANT_pytLogoIcon()} /> */}
      <BlankSpacer height={24} />
      <Text style={styles.indentText}>{message}</Text>
      {/* <BlankSpacer height={32} /> */}
      <PrimaryButton
        text={'Log in'}
        clickAction={() => navigationServiceV2(SCREEN_APP_LOGIN)}
        containerStyle={styles.buttonStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pytLogo: {
    height: 48,
    width: 64,
  },
  indentText: {
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 16),
    color: CONSTANT_black1,
  },
  loginIndentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
  },
  buttonStyle: {
    height: 40,
    paddingHorizontal: 32,
    minWidth: 152,
  },
});

export default LoginIndent;
