import React, { Component } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import constants from "../../../constants/constants";
import ContactUsTile from "../../SupportCenterScreen/Components/ContactUsTile";
import { inject, observer } from "mobx-react";
import ErrorBoundary from "../../../CommonComponents/ErrorBoundary/ErrorBoundary";
import FaqAccordionList from "../../SupportCenterScreen/Components/FaqAccordionList";
import PropTypes from "prop-types";
import PrimaryHeader from "../../../NavigatorsV2/Components/PrimaryHeader";
import { SCREEN_CONTACT_US } from "../../../NavigatorsV2/ScreenNames";

@ErrorBoundary()
@inject("supportStore")
@observer
class FAQ extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    supportStore: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      header: () =>
        PrimaryHeader({
          leftAction: () => props.navigation.goBack(),
          headerText: props.route.params
            ? props.route.params.title
            : constants.defaultSupportType
        })
    });
  }

  contactSupport = () => {
    const title = this.props.route.params
      ? this.props.route.params.title
      : constants.defaultSupportType;
    this.props.navigation.navigate(SCREEN_CONTACT_US, { type: title });
  };

  render() {
    const { getFaqByType } = this.props.supportStore;
    const title = this.props.route.params
      ? this.props.route.params.title
      : constants.defaultSupportType;
    const faq = (getFaqByType(title) || []).map(faqObject => {
      return {
        title: faqObject.question,
        content: faqObject.answer
      };
    });

    return (
      <View style={styles.faqQuestionsContainer}>
        <ScrollView style={styles.faqScrollView}>
          <FaqAccordionList faqSections={faq} />
        </ScrollView>
        <ContactUsTile contactAction={this.contactSupport} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  faqQuestionsContainer: {
    flex: 1,
    backgroundColor: constants.white1
  },
  faqScrollView: {
    paddingTop: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: constants.shade4
  },
  questionContainer: {
    flexDirection: "row",
    minHeight: 24,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginVertical: 8,
    marginRight: 24
  },
  questionText: {
    marginLeft: 16,
    marginTop: 2,
    ...constants.fontCustom(constants.primaryLight, 17),
    color: constants.black2,
    flexWrap: "wrap"
  }
});

export default FAQ;
