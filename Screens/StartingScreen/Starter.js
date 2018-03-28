import React, {
  Component,
} from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  StyleSheet,
} from 'react-native';
import constants from "../../constants/constants";

class Starter extends Component {

  static navigationOptions = {
    header: null,
  };

  render() {
    return(
      <View style={styles.container}>
        <TouchableHighlight style={styles.button} onPress={() => {
          this.props.navigation.navigate('Bookings');
        }}>
          <Text>Bookings</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={() => {
          this.props.navigation.navigate('Explore');
        }}>
          <Text>Explore</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constants.backgroundColor,
  },
  button: {
    height: 40,
    width: 80,
    margin: 15,
    backgroundColor: 'red',
  },
});

export default Starter;
