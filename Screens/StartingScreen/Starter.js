import React, {
  Component,
} from 'react';
import {
  View,
  ImageBackground,
  TouchableHighlight,
  Text,
  StyleSheet,
} from 'react-native';
import constants from "../../constants/constants";
import StarterButton from "./Components/StarterButton";

class Starter extends Component {

  static navigationOptions = {
    header: null,
  };

  render() {
    return(
      <ImageBackground source={constants.starterBackground} style={styles.container}>
        <StarterButton
          text={`Find your Bookings`}
          textColor={`white`}
          color={constants.firstColor}
          underlayColor={constants.firstColorAlpha(0.7)}
          action={() => {
            this.props.navigation.navigate('Bookings');
          }}
        />
        <StarterButton
          text={`Explore Itineraries`}
          textColor={`white`}
          color={`transparent`}
          underlayColor={`transparent`}
          hasBorder={true}
          action={() => {
            this.props.navigation.navigate('Explore');
          }}
          marginBottom={9}
        />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
});

export default Starter;
