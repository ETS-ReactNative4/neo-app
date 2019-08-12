import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import CommonHeader from "../../../CommonComponents/CommonHeader/CommonHeader";
import constants from "../../../constants/constants";
import ContactUsTile from "../../SupportCenterScreen/Components/ContactUsTile";
import { inject, observer } from "mobx-react/custom";
import ErrorBoundary from "../../../CommonComponents/ErrorBoundary/ErrorBoundary";
import FaqAccordionList from "../../SupportCenterScreen/Components/FaqAccordionList";

@ErrorBoundary()
@inject("supportStore")
@observer
class FAQ extends Component {
  static navigationOptions = ({ navigation }) => {
    const title = navigation.getParam("title", "FAQ");
    return {
      header: <CommonHeader title={title} navigation={navigation} />
    };
  };

  contactSupport = () => {
    const title = this.props.navigation.getParam(
      "title",
      constants.defaultSupportType
    );
    this.props.navigation.navigate("ContactUs", { type: title });
  };

  render() {
    const { getFaqByType } = this.props.supportStore;
    const title = this.props.navigation.getParam("title", "FAQ");
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
