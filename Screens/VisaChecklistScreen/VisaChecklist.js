import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import constants from "../../constants/constants";
import { inject, observer } from "mobx-react/custom";
import SimpleButton from "../../CommonComponents/SimpleButton/SimpleButton";
import { isIphoneX } from "react-native-iphone-x-helper";
import { responsiveWidth } from "react-native-responsive-dimensions";
import Loader from "../../CommonComponents/Loader/Loader";
import apiCall from "../../Services/networkRequests/apiCall";
import storeService from "../../Services/storeService/storeService";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import { recordEvent } from "../../Services/analytics/analyticsService";

@ErrorBoundary()
@inject("itineraries")
@observer
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
        { label: "Salaried", value: "SALARIED", isSelected: true },
        { label: "Self employed", value: "SELF_EMPLOYED", isSelected: false }
      ],
      "Group Type": [
        { label: "Couple", value: "COUPLE", isSelected: true },
        { label: "Family", value: "FAMILY", isSelected: false },
        { label: "Solo", value: "SOLO", isSelected: false },
        { label: "Single", value: "SINGLE", isSelected: false },
        { label: "Married", value: "MARRIED", isSelected: false }
      ]
    },
    isLoading: false
  };

  componentDidMount() {
    const { countries } = this.props.itineraries;
    const sections = { ...this.state.sections };
    countries.map((country, countryIndex) => {
      const countryObject = {
        label: country.name,
        value: country.countryId,
        isSelected: !!(countryIndex === 0)
      };
      sections.Country.push(countryObject);
      return null;
    });
    this.setState({
      sections
    });
  }

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

  emailChecklist = () => {
    const { selectedItineraryId: itineraryId } = this.props.itineraries;
    const { sections } = this.state;
    const requestParams = {
      countryId: sections.Country.find(country => country.isSelected).value,
      occupationType: sections.Occupation.find(
        occupation => occupation.isSelected
      ).value,
      martialStatus: sections["Group Type"].find(status => status.isSelected)
        .value
    };
    this.setState({
      isLoading: true
    });
    apiCall(
      `${constants.sendVisaDocs}?itineraryId=${itineraryId}&countryId=${
        requestParams.countryId
      }&occupationType=${requestParams.occupationType}&martialStatus=${
        requestParams.martialStatus
      }`
    )
      .then(response => {
        this.setState({
          isLoading: false
        });
        if (response.status === "SUCCESS") {
          storeService.infoStore.setSuccess(
            "Email Sent!",
            "Visa Documents have been sent to your email address."
          );
          this.props.navigation.goBack();
        } else {
          storeService.infoStore.setError(
            "Unable to Send Email!",
            "Please try again after some time..."
          );
        }
      })
      .catch(err => {
        this.setState({
          isLoading: false
        });
        storeService.infoStore.setError(
          "Unable to Send Email!",
          "Please try again after some time..."
        );
      });
  };

  render() {
    const sectionKeys = Object.keys(this.state.sections);
    return [
      <View style={styles.visaChecklistContainer} key={0}>
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
        <View style={styles.actionBar}>
          <SimpleButton
            containerStyle={{ height: 40, width: responsiveWidth(100) - 48 }}
            underlayColor={constants.firstColorAlpha(0.7)}
            text={"Email Checklist"}
            action={() => {
              recordEvent(constants.visaDocumentsEmailChecklistClick);
              this.emailChecklist();
            }}
            textColor={"white"}
          />
        </View>
      </View>,
      <Loader isVisible={this.state.isLoading} key={1} />
    ];
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
  },
  actionBar: {
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(0,0,0,.3)",
    marginBottom: isIphoneX() ? constants.xSensorAreaHeight : 0
  }
});

export default VisaChecklist;
