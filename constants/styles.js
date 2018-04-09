import { isIphoneX } from 'react-native-iphone-x-helper'

const styles = {
  tabBarBottomHeight: isIphoneX()? 86: 56,
};

export default styles;
