import React, { Component, useState } from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import constants from "../../constants/constants";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import { inject, observer } from "mobx-react/custom";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import DropDown from "../../CommonComponents/DropDown/DropDown";
import debouncer from "../../Services/debouncer/debouncer";
import VisaChecklistTile from "../VisaScreen/Components/VisaChecklistTile";
import PropTypes from "prop-types";
import _ from "lodash";
import { toastBottom } from "../../Services/toast/toast";

const CheckListItem = ({
  item,
  visaId,
  maritalStatus,
  employmentType,
  toggleChecklist,
  selectedVisaChecklistItems
}) => {
  const [isExpanded, toggleExpansion] = useState(false);

  const onToggleExpand = () => toggleExpansion(!isExpanded);

  const isChecked = !!selectedVisaChecklistItems.find(id => id === item.id);

  const onToggleSelection = () =>
    toggleChecklist(visaId, maritalStatus, employmentType, item.id, isChecked);

  return (
    <VisaChecklistTile
      isChecked={isChecked}
      onToggleExpand={onToggleExpand}
      isExpanded={isExpanded}
      title={item.name}
      desc={item.details}
      onToggleSelection={onToggleSelection}
    />
  );
};

CheckListItem.propTypes = {
  item: PropTypes.object,
  visaId: PropTypes.string.isRequired,
  maritalStatus: PropTypes.string.isRequired,
  employmentType: PropTypes.string.isRequired,
  toggleChecklist: PropTypes.func.isRequired,
  selectedVisaChecklistItems: PropTypes.array.isRequired
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

  toggleChecklist = (visaId, mstatus, empType, selected, isDeleteMode) => {
    const { toggleVisaChecklistItem } = this.props.visaStore;
    toggleVisaChecklistItem(visaId, mstatus, empType, selected, isDeleteMode)
      .then(() => null)
      .catch(() => toastBottom(constants.visaScreenText));
  };

  render() {
    const { navigation } = this.props;
    const { maritalStatus, employmentType } = this.state;

    const visaId = navigation.getParam("visaId", "");
    const {
      getMaritalStatusesByVisaId,
      getEmploymentTypesByVisaId,
      getChecklistItemsBySelectedOptions,
      selectedVisaChecklistItems
    } = this.props.visaStore;
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
                    return (
                      <CheckListItem
                        item={item}
                        key={itemIndex}
                        visaId={visaId}
                        maritalStatus={maritalStatus}
                        employmentType={employmentType}
                        toggleChecklist={this.toggleChecklist}
                        selectedVisaChecklistItems={selectedVisaChecklistItems}
                      />
                    );
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
