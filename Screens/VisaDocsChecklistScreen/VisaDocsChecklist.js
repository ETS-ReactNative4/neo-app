import React, { Component, useState } from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import constants from "../../constants/constants";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import { inject, observer } from "mobx-react/custom";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import CheckBox from "../../CommonComponents/CheckBox/CheckBox";
import DropDown from "../../CommonComponents/DropDown/DropDown";
import debouncer from "../../Services/debouncer/debouncer";
import VisaChecklistTile from "../VisaScreen/Components/VisaChecklistTile";

const CheckListItem = ({ item }) => {
  const [isExpanded, toggleExpansion] = useState(false);

  const onToggleExpand = () => toggleExpansion(!isExpanded);

  return (
    <VisaChecklistTile
      isChecked={false}
      onToggleExpand={onToggleExpand}
      isExpanded={isExpanded}
      title={item.name}
      desc={item.details}
      onToggleSelection={() => null}
    />
  );
};

@ErrorBoundary()
@inject("visaStore")
@observer
class VisaDocsChecklist extends Component {
  static navigationOptions = ({ navigation }) => {
    const title = navigation.getParam("screenTitle");
    return {
      header: (
        <CommonHeader
          title={`Document Checklist${title ? ` - ${title}` : ""}`}
          navigation={navigation}
        />
      )
    };
  };

  state = {
    maritalStatus: "",
    employmentType: ""
  };

  componentDidMount() {
    this.initializeChecklist();
  }

  initializeChecklist = () => {
    const { navigation, visaStore } = this.props;
    const { getVisaDetailsById } = visaStore;
    const visaId = navigation.getParam("visaId", "");
    const visaDetails = getVisaDetailsById(visaId);
    const { visaDocsMetaDetails = {} } = visaDetails;
    const {
      selectedMaritialStatus = "",
      selectedEmploymentType = ""
    } = visaDocsMetaDetails;
    this.setState({
      maritalStatus: selectedMaritialStatus,
      employmentType: selectedEmploymentType
    });
    debouncer(() => {
      navigation.setParams({
        screenTitle: `${visaDetails.visaStr || ""}`
      });
    });
  };

  changeMaritalStatus = maritalStatus => this.setState({ maritalStatus });

  changeEmploymentType = employmentType => this.setState({ employmentType });

  render() {
    const { navigation, visaStore } = this.props;
    const { maritalStatus, employmentType } = this.state;

    const visaId = navigation.getParam("visaId", "");
    const {
      getMaritalStatusesByVisaId,
      getEmploymentTypesByVisaId,
      getChecklistItemsBySelectedOptions
    } = visaStore;
    const maritalStatuses = getMaritalStatusesByVisaId(visaId);
    const employmentTypes = getEmploymentTypesByVisaId(visaId);

    const checklistToDisplay = getChecklistItemsBySelectedOptions({
      visaId,
      maritalStatus,
      employmentType
    });

    const checklistSections = Object.keys(checklistToDisplay);

    return (
      <ScrollView style={styles.visaDocsChecklistContainer}>
        <View>
          <View>
            <View>
              <Text>Marital Status</Text>
            </View>
            <View>
              <DropDown
                selectedValue={maritalStatus}
                dropDownOptions={maritalStatuses}
                onChange={this.changeMaritalStatus}
              />
            </View>
          </View>
          <View>
            <View>
              <Text>Employment</Text>
            </View>
            <View>
              <DropDown
                selectedValue={employmentType}
                dropDownOptions={employmentTypes}
                onChange={this.changeEmploymentType}
              />
            </View>
          </View>
        </View>
        <View>
          {checklistSections.map((section, sectionIndex) => {
            const checklistData = checklistToDisplay[section];
            return (
              <View key={sectionIndex}>
                <View>
                  <Text>{checklistData.categoryText}</Text>
                </View>
                <View>
                  {checklistData.items.map((item, itemIndex) => {
                    return <CheckListItem item={item} key={itemIndex} />;
                  })}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  visaDocsChecklistContainer: {
    backgroundColor: constants.white1
  }
});

export default VisaDocsChecklist;
