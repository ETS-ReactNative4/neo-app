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
      <TouchableHighlight
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
        onPress={() => this.props.navigation.navigate('DrawerOpen')}
        >
        <Text>Home Screen</Text>
      </TouchableHighlight>
    )
  }
}

export default Home;
