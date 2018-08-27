import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight
} from "react-native";
import ScrollableTabView from "react-native-scrollable-tab-view";
import ScrollableTabBar from "../../CommonComponents/ScrollableTabBar/ScrollableTabBar";
import constants from "../../constants/constants";
import PhrasesSection from "./Components/PhrasesSection";
import Icon from "../../CommonComponents/Icon/Icon";
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

  state = {};

  selectPhrase = selectedPhrase => {
    this.setState({ selectedPhrase });
  };

  speak = () => {
    // Tts.setDefaultLanguage("ja-JP");
    // Tts.speak("ありがとうございました");
    Tts.setDefaultLanguage("id-ID");
    Tts.speak("Maaf");
  };

  render() {
    const { phrases, selectedPhrase, selectPhrase } = this.props.phrasesStore;

    const selectedTranslation = selectedPhrase;

    const sections = Object.keys(phrases);

    return [
      <View key={0} style={styles.container}>
        <PhraseInfo
          selectedPhrase={selectedPhrase}
          selectedTranslation={selectedTranslation}
          speak={this.speak}
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
