import React, {
  Component,
} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ScrollableTabBar from '../../CommonComponents/ScrollableTabBar/ScrollableTabBar';
import constants from "../../constants/constants";
import PhrasesSection from "./Components/PhrasesSection";

class PhraseBook extends Component {

  static navigationOptions = {
    title: 'Phrase book',
  };

  state = {
    selectedPhrase: {
      phrase: `Where's the station`,
      translation: `¿Habla inglés?`,
      sound: '',
    },
    phrases: [
      {
        phrase: `Where's the station`,
        translation: `¿Habla inglés?`,
        sound: '',
      },
      {
        phrase: `Where's the station`,
        translation: `¿Habla inglés?`,
        sound: '',
      },
      {
        phrase: `Where's the station`,
        translation: `¿Habla inglés?`,
        sound: '',
      },
      {
        phrase: `Where's the station`,
        translation: `¿Habla inglés?`,
        sound: '',
      },
      {
        phrase: `Where's the station`,
        translation: `¿Habla inglés?`,
        sound: '',
      },
      {
        phrase: `Where's the station`,
        translation: `¿Habla inglés?`,
        sound: '',
      },
      {
        phrase: `Where's the station`,
        translation: `¿Habla inglés?`,
        sound: '',
      },
      {
        phrase: `Where's the station`,
        translation: `¿Habla inglés?`,
        sound: '',
      },
      {
        phrase: `Where's the station`,
        translation: `¿Habla inglés?`,
        sound: '',
      },
      {
        phrase: `Where's the station`,
        translation: `¿Habla inglés?`,
        sound: '',
      },
    ],
  };

  selectPhrase = selectedPhrase => {
    this.setState({selectedPhrase});
  };

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.infoContainer}>

          <Text style={styles.selectedPhrase}>{this.state.selectedPhrase.phrase}</Text>
          <Text style={styles.selectedTranslation}>{this.state.selectedPhrase.translation}</Text>

          <View style={styles.actionsContainer}>
            <TouchableHighlight
              underlayColor={constants.shade1}
              onPress={() => {}}
              style={styles.buttonContainer}>
              <Image
                style={styles.icon}
                source={constants.notificationIcon}
              />
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={constants.shade1}
              onPress={() => {}}
              style={styles.buttonContainer}>
              <Image
                style={styles.icon}
                source={constants.notificationIcon}
              />
            </TouchableHighlight>
          </View>

        </View>

        <View style={{flex: 1}}>
          <ScrollableTabView
            tabBarActiveTextColor={constants.black2}
            tabBarInactiveTextColor={constants.firstColor}
            tabBarUnderlineStyle={{height: 2, backgroundColor: constants.black2}}
            tabBarTextStyle={{...constants.font13(constants.primarySemiBold)}}
            initialPage={2}
            prerenderingSiblingsNumber={Infinity}
            renderTabBar={() => <ScrollableTabBar />}
            >
            <PhrasesSection phrases={this.state.phrases} selectPhrase={this.selectPhrase} tabLabel="Favouries" />
            <PhrasesSection phrases={this.state.phrases} selectPhrase={this.selectPhrase} tabLabel="Pinned" />
            <PhrasesSection phrases={this.state.phrases} selectPhrase={this.selectPhrase} tabLabel="Basic" />
            <PhrasesSection phrases={this.state.phrases} selectPhrase={this.selectPhrase} tabLabel="Pattern" />
            <PhrasesSection phrases={this.state.phrases} selectPhrase={this.selectPhrase} tabLabel="Question" />
          </ScrollableTabView>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  infoContainer: {
    paddingHorizontal: 24,
    height: 184,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedPhrase: {
    ...constants.font17(constants.primaryLight),
  },
  selectedTranslation: {
    ...constants.font30(constants.primarySemiBold),
  },
  actionsContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  buttonContainer: {
    height: 42,
    width: 42,
    borderRadius: 21,
    borderWidth: 0.5,
    borderColor: constants.shade1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginHorizontal: 8,
  },
  icon: {
    height: 24,
    width: 24,
  },
});

export default PhraseBook;
