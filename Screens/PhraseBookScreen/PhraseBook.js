import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import ScrollableTabView from "react-native-scrollable-tab-view";
import ScrollableTabBar from "../../CommonComponents/ScrollableTabBar/ScrollableTabBar";
import constants from "../../constants/constants";
import PhrasesSection from "./Components/PhrasesSection";
import CustomPhrase from "./Components/CustomPhrase";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import Tts from "react-native-tts";
import { inject, observer } from "mobx-react/custom";
import PhraseInfo from "./Components/PhraseInfo";

@inject("phrasesStore")
@observer
class PhraseBook extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CommonHeader title={"Common Phrases"} navigation={navigation} />
    };
  };

  state = {
    isTtsSpeaking: false
  };

  componentDidMount() {
    Tts.addEventListener("tts-start", this.startSpeaking);
    Tts.addEventListener("tts-finish", this.stopSpeaking);
    Tts.addEventListener("tts-cancel", this.stopSpeaking);
  }

  componentWillUnmount() {
    Tts.removeEventListener("tts-start", this.startSpeaking);
    Tts.removeEventListener("tts-finish", this.stopSpeaking);
    Tts.removeEventListener("tts-cancel", this.stopSpeaking);
  }

  speak = () => {
    if (this.state.isTtsSpeaking) Tts.stop();
    else {
      const { translatedPhrase } = this.props.phrasesStore;
      Tts.setDefaultLanguage("ru-RU");
      Tts.speak(translatedPhrase);
      // Tts.setDefaultLanguage("ja-JP");
      // Tts.speak("ありがとうございました");
      // Tts.setDefaultLanguage("id-ID");
      // Tts.speak("Maaf");
    }
  };

  startSpeaking = () => {
    this.setState({
      isTtsSpeaking: true
    });
  };

  stopSpeaking = () => {
    this.setState({
      isTtsSpeaking: false
    });
  };

  render() {
    const {
      phrases,
      selectedPhrase,
      selectPhrase,
      translatedPhrase,
      isTranslating
    } = this.props.phrasesStore;

    const sections = Object.keys(phrases);

    const targetLanguage = "ru";

    return [
      <View key={0} style={styles.container}>
        <PhraseInfo
          selectedPhrase={selectedPhrase}
          translatedPhrase={translatedPhrase}
          isTranslating={isTranslating}
          speak={this.speak}
          isSpeaking={this.state.isTtsSpeaking}
        />

        <View style={{ flex: 1 }}>
          <ScrollableTabView
            tabBarActiveTextColor={constants.black2}
            tabBarInactiveTextColor={constants.firstColor}
            tabBarUnderlineStyle={{
              height: 2,
              backgroundColor: constants.black2
            }}
            tabBarTextStyle={{ ...constants.font13(constants.primarySemiBold) }}
            initialPage={2}
            prerenderingSiblingsNumber={Infinity}
            renderTabBar={() => <ScrollableTabBar />}
          >
            {sections.map((section, sectionIndex) => {
              return (
                <PhrasesSection
                  key={sectionIndex}
                  phrases={phrases[section]}
                  selectPhrase={selectPhrase}
                  tabLabel={section}
                  targetLanguage={targetLanguage}
                />
              );
            })}
          </ScrollableTabView>
        </View>
      </View>,
      <CustomPhrase key={1} />
    ];
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
});

export default PhraseBook;
