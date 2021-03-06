import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
  StyleSheet
} from "react-native";
import Modal from "react-native-modal";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";
import PropTypes from "prop-types";
import { isIphoneX } from "react-native-iphone-x-helper";
import constants from "../../../constants/constants";
import Icon from "../../../CommonComponents/Icon/Icon";
import SelectionRow from "../../../CommonComponents/SelectionRow/SelectionRow";
import { recordEvent } from "../../../Services/analytics/analyticsService";

const LanguageSelector = ({ languages, selectLanguage, cancel, isVisible }) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={cancel}
      style={{ margin: 0, backgroundColor: "white" }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableHighlight
              style={styles.icon}
              underlayColor={"transparent"}
              onPress={cancel}
            >
              <Icon size={24} name={constants.closeIcon} />
            </TouchableHighlight>
            <View style={styles.headingArea}>
              <Text style={styles.headingText}>Select Language</Text>
            </View>
            {/*<TouchableHighlight style={styles.icon}>*/}
            {/*<Icon style={24} source={constants.searchIcon} color={"white"} />*/}
            {/*</TouchableHighlight>*/}
          </View>
          <ScrollView
            style={[
              styles.optionsContainer,
              { marginBottom: isIphoneX() ? 30 : 0 }
            ]}
          >
            {languages.map((language, languageIndex) => {
              return (
                <SelectionRow
                  key={languageIndex}
                  disableImage={true}
                  text={`${language.languageName} (${language.languageCode})`}
                  action={() => {
                    recordEvent(constants.CommonPhrases.event, {
                      click: constants.CommonPhrases.click.selectLanguage
                    });
                    selectLanguage(language);
                    cancel();
                  }}
                />
              );
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24
  },
  header: {
    height: 32,
    marginVertical: 32,
    flexDirection: "row",
    alignItems: "center"
  },
  headingArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  headingText: {
    ...constants.font20(constants.primarySemiBold)
  },
  icon: {
    height: 24,
    width: 24
  },
  optionsContainer: {}
});

LanguageSelector.propTypes = forbidExtraProps({
  languages: PropTypes.array.isRequired,
  selectLanguage: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired
});

export default LanguageSelector;
