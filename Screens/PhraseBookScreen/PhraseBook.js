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
import LanguageSelector from "./Components/LanguageSelector";
import Loader from "../../CommonComponents/Loader/Loader";

@inject("phrasesStore")
@inject("itineraries")
@observer
class PhraseBook extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CommonHeader title={"Common Phrases"} navigation={navigation} />
    };
  };

  state = {
    isTtsSpeaking: false,
    isLanguageSelectorVisible: false
  };

  componentDidMount() {
    Tts.addEventListener("tts-start", this.startSpeaking);
    Tts.addEventListener("tts-finish", this.stopSpeaking);
    Tts.addEventListener("tts-cancel", this.stopSpeaking);
    const { selectedItineraryId } = this.props.itineraries;
    const { getLanguages, getAllPhrases } = this.props.phrasesStore;
    /**
     * TODO: Remove test itinerary id
     */
    getLanguages("5b77f7399698f8b69a21867d" || selectedItineraryId);
    getAllPhrases();
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

  openLanguageSelector = () => {
    this.setState({
      isLanguageSelectorVisible: true
    });
  };

  closeLanguageSelector = () => {
    this.setState({
      isLanguageSelectorVisible: false
    });
  };

  render() {
    const {
      phrases,
      selectedPhrase,
      selectPhrase,
      translatedPhrase,
      isTranslating,
      languages,
      selectedLanguage,
      selectLanguage,
      isLoading
    } = this.props.phrasesStore;

    const sections = Object.keys(phrases);

    const targetLanguage = selectedLanguage.language;
    if (selectLanguage.languageCode) {
      Tts.setDefaultLanguage(selectedLanguage.languageCode);
    }

    console.log(selectedPhrase);
    console.log(translatedPhrase);

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
            initialPage={1}
            prerenderingSiblingsNumber={Infinity}
            renderTabBar={() => <ScrollableTabBar />}
          >
            {sections.map((section, sectionIndex) => {
              return (
                <PhrasesSection
                  key={sectionIndex}
                  phrases={phrases[section]}
                  selectPhrase={selectPhrase}
                  tabLabel={section.toUpperCase()}
                  targetLanguage={targetLanguage}
                />
              );
            })}
          </ScrollableTabView>
        </View>
      </View>,
      <CustomPhrase
        openLanguageSelector={this.openLanguageSelector}
        key={1}
        selectedLanguage={selectedLanguage}
        selectPhrase={selectPhrase}
        targetLanguage={targetLanguage}
      />,
      <LanguageSelector
        selectLanguage={selectLanguage}
        languages={languages}
        cancel={this.closeLanguageSelector}
        isVisible={this.state.isLanguageSelectorVisible}
        key={2}
      />,
      <Loader isVisible={isLoading} key={3} />
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
