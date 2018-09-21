import React, { Component } from "react";
import { View, StyleSheet, NetInfo } from "react-native";
import ScrollableTabView from "react-native-scrollable-tab-view";
import ScrollableTabBar from "../../CommonComponents/ScrollableTabBar/ScrollableTabBar";
import constants from "../../constants/constants";
import PhrasesSection from "./Components/PhrasesSection";
import CustomPhrase from "./Components/CustomPhrase";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import Tts from "react-native-tts";
import Sound from "react-native-sound";
import { inject, observer } from "mobx-react/custom";
import PhraseInfo from "./Components/PhraseInfo";
import LanguageSelector from "./Components/LanguageSelector";
import Loader from "../../CommonComponents/Loader/Loader";
import { logError } from "../../Services/errorLogger/errorLogger";

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
    isSoundPlaying: false,
    isTtsSpeaking: false,
    isLanguageSelectorVisible: false,
    isInternetAvailable: true
  };
  _didFocusSubscription;
  _willBlurSubscription;
  _translatedAudio;

  constructor(props) {
    super(props);

    this._didFocusSubscription = props.navigation.addListener(
      "didFocus",
      () => {
        Tts.addEventListener("tts-start", this.startSpeaking);
        Tts.addEventListener("tts-finish", this.stopSpeaking);
        Tts.addEventListener("tts-cancel", this.stopSpeaking);
        NetInfo.isConnected.addEventListener(
          "connectionChange",
          this.handleConnectivityChange
        );
      }
    );
  }

  componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener(
      "willBlur",
      () => {
        Tts.removeEventListener("tts-start", this.startSpeaking);
        Tts.removeEventListener("tts-finish", this.stopSpeaking);
        Tts.removeEventListener("tts-cancel", this.stopSpeaking);
        NetInfo.isConnected.removeEventListener(
          "connectionChange",
          this.handleConnectivityChange
        );
      }
    );
    const { selectedItineraryId } = this.props.itineraries;
    const {
      getLanguages,
      getAllPhrases,
      getPinnedPhrases
    } = this.props.phrasesStore;
    getLanguages(selectedItineraryId);
    getAllPhrases();
    getPinnedPhrases();
  }

  componentWillUnmount() {
    if (this.state.isTtsSpeaking) {
      Tts.stop();
    }
    if (this.state.isSoundPlaying) {
      this._translatedAudio.stop(() => {
        this._translatedAudio.release();
      });
    }
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }

  speak = () => {
    if (this.state.isSoundPlaying) {
      this._translatedAudio.stop(() => {
        this.setState({
          isSoundPlaying: false
        });
        this._translatedAudio.release();
        console.log("Sound was playing... Stopped!");
      });
    } else if (this.state.isTtsSpeaking) {
      Tts.stop();
      console.log("TTS was speaking... Stopped!");
    } else {
      const { translatedPhrase, selectedLanguage } = this.props.phrasesStore;
      const translatedSoundUri = encodeURI(
        constants.googleTranslateTts(
          translatedPhrase,
          selectedLanguage.language
        )
      );
      if (!this.state.isInternetAvailable) {
        console.log("Internet Unavailable... attempting with TTS");
        Tts.speak(translatedPhrase);
      } else {
        console.log("Internet Available... attempting to play Sound");
        this._translatedAudio = new Sound(
          translatedSoundUri,
          undefined,
          error => {
            if (error) {
              logError(error, {
                soundModule: "Unable to obtain the audio from google translate"
              });
              console.log("Unable to Play sound... Falling back to TTS");
              Tts.speak(translatedPhrase);
            } else {
              console.log("Audio Ready... Playing Sound");
              this.setState(
                {
                  isSoundPlaying: true
                },
                () => {
                  this._translatedAudio.play(() => {
                    this._translatedAudio.release();
                    this.setState({
                      isSoundPlaying: false
                    });
                  });
                }
              );
            }
          }
        );
      }
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

  handleConnectivityChange = isConnected => {
    console.log("Connectivity Change... Connection Status - ", isConnected);
    this.setState({
      isInternetAvailable: isConnected
    });
  };

  render() {
    const {
      phrases,
      pinnedPhrases,
      selectedPhrase,
      selectPhrase,
      translatedPhrase,
      isTranslating,
      languages,
      selectedLanguage,
      selectLanguage,
      isLoading,
      pinPhrase,
      unPinPhrase
    } = this.props.phrasesStore;

    const sections = ["pinned", ...Object.keys(phrases)];
    const allPhrases = {
      ...phrases,
      pinned: pinnedPhrases
    };

    const targetLanguage = selectedLanguage.language;
    if (selectLanguage.languageCode) {
      Tts.setDefaultLanguage(selectedLanguage.languageCode);
    }

    return [
      <View key={0} style={styles.container}>
        <PhraseInfo
          selectedPhrase={selectedPhrase}
          translatedPhrase={translatedPhrase}
          isTranslating={isTranslating}
          speak={this.speak}
          isSpeaking={this.state.isTtsSpeaking || this.state.isSoundPlaying}
          pinPhrase={pinPhrase}
          unPinPhrase={unPinPhrase}
          pinnedPhrases={pinnedPhrases}
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
                  phrases={allPhrases[section]}
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
