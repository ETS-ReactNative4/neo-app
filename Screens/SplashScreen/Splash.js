import React, {
  Component,
} from 'react';
import {
  ImageBackground,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import constants from "../../constants/constants";

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({routeName: 'Starter'}),
  ]
});

class Splash extends Component {

  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.dispatch(resetAction);
    }, 3000)
  }

  render() {
    return(
      <ImageBackground
        source={constants.starterBackground}
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

      </ImageBackground>
    )
  }
}

export default Splash;
