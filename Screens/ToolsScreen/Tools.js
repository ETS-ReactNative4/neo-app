import React, {
  Component,
} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  ImageBackground,
  Text,
} from 'react-native';
import constants from "../../constants/constants";
import SectionHeader from "../../CommonComponents/SectionHeader/SectionHeader";
import Carousel from "../../CommonComponents/Carousel/Carousel";

class Tools extends Component {
  render() {

    const cityList = [
      {
        title: 'Bali',
        image: constants.starterBackground,
        action: () => {},
      },
      {
        title: 'Bali',
        image: constants.starterBackground,
        action: () => {},
      },
      {
        title: 'Bali',
        image: constants.starterBackground,
        action: () => {},
      },
      {
        title: 'Bali',
        image: constants.starterBackground,
        action: () => {},
      },
    ];

    return(
      <View style={styles.container}>

        <SectionHeader sectionName={'CITY GUIDES'}/>

        <Carousel data={cityList}/>

        <SectionHeader sectionName={'ESSENTIALS'} containerStyle={{marginTop: 43}}/>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constants.appBackgroundColor,
    paddingHorizontal: 24,
  },
});

export default Tools;
