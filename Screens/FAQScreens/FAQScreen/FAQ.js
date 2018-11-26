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
import Icon from "../../../CommonComponents/Icon/Icon";
import ContactUsTile from "../../SupportCenterScreen/Components/ContactUsTile";
import { inject, observer } from "mobx-react/custom";

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
    const faq = getFaqByType(title);

    return (
      <View style={styles.faqQuestionsContainer}>
        <ScrollView style={styles.faqScrollView}>
          {faq.map((qa, qaIndex) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("FAQAnswers", {
                    data: {
                      title,
                      question: qa.question,
                      answer: qa.answer
                    }
                  });
                }}
                key={qaIndex}
                style={styles.questionContainer}
              >
                <Icon
                  name={constants.helpIcon}
                  color={constants.black2}
                  size={18}
                />
                <Text style={styles.questionText}>{qa.question}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <ContactUsTile contactAction={this.contactSupport} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  faqQuestionsContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  faqScrollView: {
    paddingHorizontal: 24,
    paddingTop: 8,
    borderTopWidth: 2,
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
