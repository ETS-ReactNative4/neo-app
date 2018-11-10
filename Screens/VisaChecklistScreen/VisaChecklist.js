import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import constants from "../../constants/constants";

class VisaChecklist extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CommonHeader title={"Visa checklist"} navigation={navigation} />
    };
  };

  state = {
    sections: {
      Country: [],

      Occupation: [
        { label: "Salaried", value: 0, isSelected: true },
        { label: "Self employed", value: 1, isSelected: false }
      ],
      "Group Type": [
        { label: "Couple", value: 0, isSelected: true },
        { label: "Family", value: 1, isSelected: false },
        { label: "Solo", value: 2, isSelected: false }
      ]
    }
  };

  selectItem = (section, label) => {
    const sections = { ...this.state.sections };
    const requiredSection = sections[section];
    requiredSection.forEach((item, itemIndex) => {
      if (item.label === label) item.isSelected = true;
      else item.isSelected = false;
      if (itemIndex === requiredSection.length - 1) {
        this.setState({
          sections
        });
      }
    });
  };

  render() {
    const sectionKeys = Object.keys(this.state.sections);
    return (
      <View style={styles.visaChecklistContainer}>
        <ScrollView style={styles.visaChecklistScroll}>
          {sectionKeys.map((sectionKey, sectionIndex) => {
            const title = sectionKey;
            const section = this.state.sections[sectionKey];
            return (
              <View key={sectionIndex}>
                <Text style={styles.titleText}>{title}</Text>
                <RadioForm formHorizontal={false} animation={true}>
                  {section.map((item, itemIndex) => {
                    const onPress = () => this.selectItem(title, item.label);
                    const isSelected = item.isSelected;
                    return (
                      <RadioButton labelHorizontal={true} key={itemIndex}>
                        <RadioButtonInput
                          obj={item}
                          index={itemIndex}
                          isSelected={isSelected}
                          onPress={onPress}
                          borderWidth={1}
                          buttonInnerColor={constants.firstColor}
                          buttonOuterColor={
                            isSelected
                              ? constants.firstColor
                              : "rgba(121,5,114,0.2)"
                          }
                          buttonSize={14}
                          buttonOuterSize={20}
                          buttonStyle={{}}
                          buttonWrapStyle={{}}
                        />
                        <RadioButtonLabel
                          obj={item}
                          index={itemIndex}
                          labelHorizontal={true}
                          onPress={onPress}
                          labelStyle={styles.labelStyle}
                          labelWrapStyle={{}}
                        />
                      </RadioButton>
                    );
                  })}
                </RadioForm>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  visaChecklistContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  visaChecklistScroll: {
    paddingHorizontal: 24
  },
  titleText: {
    ...constants.fontCustom(constants.primarySemiBold, 17, 24),
    color: constants.black1,
    marginBottom: 16
  },
  labelStyle: {
    ...constants.fontCustom(constants.primaryLight, 20, 24),
    color: constants.black2
  }
});

export default VisaChecklist;
