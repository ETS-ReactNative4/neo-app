import React, { Component, useState, Fragment } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  ViewPropTypes,
  LayoutAnimation
} from "react-native";
import constants from "../../constants/constants";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import { inject, observer } from "mobx-react";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import DropDown from "../../CommonComponents/DropDown/DropDown";
import debouncer from "../../Services/debouncer/debouncer";
import VisaChecklistTile from "../VisaScreen/Components/VisaChecklistTile";
import PropTypes from "prop-types";
import { toastBottom } from "../../Services/toast/toast";
import {
  responsiveHeight,
  responsiveWidth
} from "react-native-responsive-dimensions";
import StickyActionBar from "../VisaStatusScreen/Component/StickyActionBar";
import XSensorPlaceholder from "../../CommonComponents/XSensorPlaceholder/XSensorPlaceholder";
import BlankSpacer from "../../CommonComponents/BlankSpacer/BlankSpacer";
import { recordEvent } from "../../Services/analytics/analyticsService";

const CheckListItem = ({
  item,
  visaId,
  maritalStatus,
  employmentType,
  toggleChecklist,
  selectedVisaChecklistItems,
  url,
  containerStyle = StyleSheet.create({})
}) => {
  const [isExpanded, toggleExpansion] = useState(false);

  const onToggleExpand = () => toggleExpansion(!isExpanded);

  const isChecked = !!selectedVisaChecklistItems.find(id => id === item.id);

  const onToggleSelection = () =>
    toggleChecklist(visaId, maritalStatus, employmentType, item.id, isChecked);

  return (
    <VisaChecklistTile
      isChecked={isChecked}
      onToggleExpand={() => {
        recordEvent(constants.Visa.event, {
          click: constants.Visa.click.toggleDocsAccordion
        });
        onToggleExpand();
      }}
      isExpanded={isExpanded}
      title={item.name}
      desc={item.details}
      onToggleSelection={onToggleSelection}
      downloadUrl={url}
      ctaText={url ? "Download Sample" : ""}
      containerStyle={containerStyle}
    />
  );
};

CheckListItem.propTypes = {
  item: PropTypes.object,
  visaId: PropTypes.string.isRequired,
  maritalStatus: PropTypes.string.isRequired,
  employmentType: PropTypes.string.isRequired,
  toggleChecklist: PropTypes.func.isRequired,
  selectedVisaChecklistItems: PropTypes.array.isRequired,
  url: PropTypes.string.isRequired,
  containerStyle: ViewPropTypes.style
};

@ErrorBoundary()
@inject("visaStore")
@observer
class VisaDocsChecklist extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    maritalStatus: "",
    employmentType: "",
    isBackPressed: false,
    isOverlayHidden: true
  };

  componentDidMount() {
    this.initializeChecklist();
  }

  initializeChecklist = () => {
    const { navigation, visaStore, route } = this.props;
    const { getVisaDetailsById } = visaStore;
    const visaId = route.params?.visaId ?? "";
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

  toggleOverlay = () => {
    this.setState(state => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      return {
        isOverlayHidden: !state.isOverlayHidden
      };
    });
  };

  pressBackButton = () => {
    this.setState(
      {
        isBackPressed: true
      },
      () => {
        this.props.navigation.goBack();
      }
    );
  };

  render() {
    const { navigation, isFocused, route } = this.props;
    const {
      maritalStatus,
      employmentType,
      isBackPressed,
      isOverlayHidden
    } = this.state;

    const visaId = route.params?.visaId ?? "";
    const title = route.params?.screenTitle ?? "";
    const {
      getMaritalStatusesByVisaId,
      getEmploymentTypesByVisaId,
      getChecklistItemsBySelectedOptions,
      selectedVisaChecklistItems,
      getDocumentMustKnowsByVisaId
    } = this.props.visaStore;
    const maritalStatuses = getMaritalStatusesByVisaId(visaId);
    const employmentTypes = getEmploymentTypesByVisaId(visaId);
    const { title: mustKnowTitle, body } = getDocumentMustKnowsByVisaId(visaId);

    const checklistToDisplay = getChecklistItemsBySelectedOptions({
      visaId,
      maritalStatus,
      employmentType
    });

    const checklistSections = Object.keys(checklistToDisplay);

    const openDocumentMustKnows = () => {
      this.toggleOverlay();
      navigation.navigate("VisaDocumentActionSheet", {
        visaId,
        toggleOverlay: this.toggleOverlay
      });
    };

    return (
      <Fragment>
        <CommonHeader
          title={`Document Checklist${title ? ` - ${title}` : ""}`}
          navigation={navigation}
          leftAction={this.pressBackButton}
        />
        <ScrollView style={styles.visaDocsChecklistContainer}>
          <View style={styles.dropDownOptionsContainer}>
            <View style={styles.leftOptionsWrapper}>
              <View style={styles.optionLabelWrapper}>
                <Text style={styles.optionLabelText}>Marital Status</Text>
              </View>
              <View style={styles.dropDownWrapper}>
                <DropDown
                  color={constants.fifteenthColor}
                  containerStyle={styles.dropDown}
                  selectedValue={maritalStatus}
                  dropDownOptions={maritalStatuses}
                  onChange={this.changeMaritalStatus}
                  textStyle={styles.dropDownTextStyle}
                />
              </View>
            </View>
            <View style={styles.rightOptionsWrapper}>
              <View style={styles.optionLabelWrapper}>
                <Text style={styles.optionLabelText}>Employment</Text>
              </View>
              <View style={styles.dropDownWrapper}>
                <DropDown
                  color={constants.fifteenthColor}
                  containerStyle={styles.dropDown}
                  selectedValue={employmentType}
                  dropDownOptions={employmentTypes}
                  onChange={this.changeEmploymentType}
                  textStyle={styles.dropDownTextStyle}
                />
              </View>
            </View>
            <View style={styles.optionsDividerLine} />
          </View>
          <View>
            {checklistSections.map((section, sectionIndex) => {
              const checklistData = checklistToDisplay[section];
              return (
                <View key={sectionIndex}>
                  <View>
                    <Text style={styles.categoryTitle}>
                      {checklistData.categoryText}
                    </Text>
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
                          selectedVisaChecklistItems={
                            selectedVisaChecklistItems
                          }
                          url={item.url}
                          containerStyle={styles.checklistWrapper}
                        />
                      );
                    })}
                  </View>
                </View>
              );
            })}
          </View>
          <BlankSpacer height={16} />
          {/**
           * 16 - additional padding
           */}
        </ScrollView>
        {mustKnowTitle && body ? (
          <StickyActionBar
            containerStyle={styles.stickyActionBar}
            action={openDocumentMustKnows}
            title={mustKnowTitle}
          />
        ) : null}
        <XSensorPlaceholder containerStyle={styles.sensorPlaceHolder} />
        {!isBackPressed && !isOverlayHidden ? (
          <View style={styles.screenOverlay} />
        ) : null}
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  screenOverlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    height: responsiveHeight(100),
    width: responsiveWidth(100),
    position: "absolute",
    top: 0,
    left: 0
  },
  visaDocsChecklistContainer: {
    backgroundColor: constants.white1
  },
  dropDownOptionsContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 24,
    height: 88,
    marginTop: 4
  },
  optionsDividerLine: {
    width: 1,
    height: 88,
    position: "absolute",
    backgroundColor: constants.white1,
    top: 0,
    left: responsiveWidth(47)
  },
  dropDownTextStyle: {
    ...constants.fontCustom(constants.primaryRegular, 17)
  },
  leftOptionsWrapper: {
    width: responsiveWidth(50) - 0.5,
    alignItems: "center",
    justifyContent: "center"
  },
  rightOptionsWrapper: {
    width: responsiveWidth(50) - 0.5,
    alignItems: "center",
    justifyContent: "center"
  },
  optionLabelWrapper: {
    width: 112
  },
  optionLabelText: {
    ...constants.fontCustom(constants.primaryRegular, 14, 16),
    color: constants.shade1
  },
  dropDownWrapper: {
    width: 112,
    marginTop: 8
  },
  dropDown: {},
  categoryTitle: {
    ...constants.fontCustom(constants.primarySemiBold, 14),
    color: constants.shade1,
    paddingTop: 10,
    paddingBottom: 7,
    paddingHorizontal: 24
  },
  stickyActionBar: {},
  checklistWrapper: {
    marginBottom: 2
  },
  sensorPlaceHolder: {
    backgroundColor: constants.fourteenthColor
  }
});

export default VisaDocsChecklist;
