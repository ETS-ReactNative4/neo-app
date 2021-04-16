import React, {ReactNode} from 'react';
import {
  View,
  StyleProp,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
  Text,
} from 'react-native';

import {
  CONSTANT_black2,
  CONSTANT_white,
  CONSTANT_shade5,
  CONSTANT_black1,
} from '../../../constants/colorPallete';
import Icon from '../../../CommonComponents/Icon/Icon';
import {
  CONSTANT_arrowRight,
  CONSTANT_pytLogo,
} from '../../../constants/imageAssets';
import SmartImageV2 from '../../../CommonComponents/SmartImage/SmartImageV2';
import ratioCalculator from '../../../Services/ratioCalculator/ratioCalculator';
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold,
} from '../../../constants/fonts';

export interface ExploreHeaderProps {
  containerStyle?: StyleProp<ViewStyle>;
  leftAction: () => any;
  leftIcon?: string;
  headerLogo?: ImageSourcePropType;
  headerText?: string;
  rightElement?: ReactNode;
}

const HEADER_LOGO_IMAGE_WIDTH = 112;
const HEADER_LOGO_IMAGE_HEIGHT = ratioCalculator(
  28,
  5,
  HEADER_LOGO_IMAGE_WIDTH,
);

const ExploreHeader = ({
  containerStyle,
  leftAction = () => null,
  leftIcon = CONSTANT_arrowRight,
  headerLogo = CONSTANT_pytLogo,
  headerText = '',
  rightElement,
}: ExploreHeaderProps) => {
  return (
    <View style={[styles.headerContainerStyle, containerStyle]}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.backArrowIconStyle}
        onPress={leftAction}>
        <Icon name={leftIcon} size={16} color={CONSTANT_black2} />
      </TouchableOpacity>

      {headerText ? (
        <Text style={styles.headerText}>{headerText}</Text>
      ) : (
        <SmartImageV2
          source={headerLogo}
          resizeMode={'cover'}
          style={styles.logoImageStyle}
        />
      )}

      {rightElement}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainerStyle: {
    backgroundColor: CONSTANT_white,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: CONSTANT_shade5,
  },
  backArrowIconStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 56,
    height: 56,
    transform: [{scaleX: -1}],
  },
  headerText: {
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 16),
    color: CONSTANT_black1,
  },
  logoImageStyle: {
    width: HEADER_LOGO_IMAGE_WIDTH,
    height: HEADER_LOGO_IMAGE_HEIGHT,
  },
});

export default ExploreHeader;
