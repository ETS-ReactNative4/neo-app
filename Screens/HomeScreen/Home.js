import React, {
  Component,
} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

class Home extends Component {
  render() {
    return(
      <View
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
        >
        <Text>Home Screen</Text>
      </View>
    )
  }
}

export default Home;
