import React, {
  Component,
} from 'react';
import {
  View,
  Text,
} from 'react-native';

class Splash extends Component {

  static navigationOptions = {
    header: null,
  };

  render() {
    return(
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>SplashScreen</Text>
      </View>
    )
  }
}

export default Splash;
