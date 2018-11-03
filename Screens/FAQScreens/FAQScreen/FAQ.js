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
    const faq = [
      {
        question: "What are the documents needed for Visa?",
        answer:
          "Passport, in original, with a minimum validity of six months as on the date of submission of application for visa. The passport should have at least two blank pages. Copy of the passport (first four pages and endorsement of extension of validity if any) should be attached One recent passport-size colour photograph depicting full face. Proof of Residence: Either a copy of National ID Card or Utility Bill such as electricity, telephone or water bill. Proof of Profession: Certificate from the employer. In case of students, copy of Identity card from the educational institution is to be attached. Proof of Financial soundness: Endorsement of foreign currency equivalent to US $150/- per applicant or copy of international credit card or updated bank statement showing sufficient balance to finance travel to India."
      },
      {
        question: "What are the documents needed for Visa?",
        answer:
          "Passport, in original, with a minimum validity of six months as on the date of submission of application for visa. The passport should have at least two blank pages. Copy of the passport (first four pages and endorsement of extension of validity if any) should be attached One recent passport-size colour photograph depicting full face. Proof of Residence: Either a copy of National ID Card or Utility Bill such as electricity, telephone or water bill. Proof of Profession: Certificate from the employer. In case of students, copy of Identity card from the educational institution is to be attached. Proof of Financial soundness: Endorsement of foreign currency equivalent to US $150/- per applicant or copy of international credit card or updated bank statement showing sufficient balance to finance travel to India."
      },
      {
        question: "What are the documents needed for Visa?",
        answer:
          "Passport, in original, with a minimum validity of six months as on the date of submission of application for visa. The passport should have at least two blank pages. Copy of the passport (first four pages and endorsement of extension of validity if any) should be attached One recent passport-size colour photograph depicting full face. Proof of Residence: Either a copy of National ID Card or Utility Bill such as electricity, telephone or water bill. Proof of Profession: Certificate from the employer. In case of students, copy of Identity card from the educational institution is to be attached. Proof of Financial soundness: Endorsement of foreign currency equivalent to US $150/- per applicant or copy of international credit card or updated bank statement showing sufficient balance to finance travel to India."
      },
      {
        question: "What are the documents needed for Visa?",
        answer:
          "Passport, in original, with a minimum validity of six months as on the date of submission of application for visa. The passport should have at least two blank pages. Copy of the passport (first four pages and endorsement of extension of validity if any) should be attached One recent passport-size colour photograph depicting full face. Proof of Residence: Either a copy of National ID Card or Utility Bill such as electricity, telephone or water bill. Proof of Profession: Certificate from the employer. In case of students, copy of Identity card from the educational institution is to be attached. Proof of Financial soundness: Endorsement of foreign currency equivalent to US $150/- per applicant or copy of international credit card or updated bank statement showing sufficient balance to finance travel to India."
      }
    ];
    const title = this.props.navigation.getParam("title", "FAQ");
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
                  name={constants.activityIcon}
                  color={constants.shade3}
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
    marginHorizontal: 24,
    borderTopWidth: 2,
    borderTopColor: constants.shade4
  },
  questionContainer: {
    flexDirection: "row",
    minHeight: 24,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginVertical: 8
  },
  questionText: {
    marginLeft: 8,
    ...constants.fontCustom(constants.primaryLight, 17),
    color: constants.black2,
    flexWrap: "wrap"
  }
});

export default FAQ;
