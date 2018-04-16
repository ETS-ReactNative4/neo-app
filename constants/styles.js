import { isIphoneX } from 'react-native-iphone-x-helper';

const styles = {
  tabBarBottomHeight: isIphoneX()? 86: 56,
  xSensorAreaHeight: 30,
};

export default styles;
