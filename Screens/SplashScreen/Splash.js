import React, {
  Component,
} from 'react';
import {
  View,
  Text,
} from 'react-native';
import { NavigationActions } from 'react-navigation';

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({routeName: 'Starter'}),
  ]
});

class Splash extends Component {

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.dispatch(resetAction);
    }, 3000)
  }

  render() {
    return(
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>SplashScreen</Text>
      </View>
    )
  }
}

export default Splash;
