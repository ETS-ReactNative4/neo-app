import React, { Component } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";
import { SCREEN_NOTIFICATION_ANSWER } from "../../NavigatorsV2/ScreenNames";
import { AppNavigatorProps } from "../../NavigatorsV2/AppNavigator";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import PrimaryHeader from "../../NavigatorsV2/Components/PrimaryHeader";
import FaqAccordionList from "../SupportCenterScreen/Components/FaqAccordionList";
import { CONSTANT_defaultSupportType } from "../../constants/stringConstants";
import {
  CONSTANT_white1,
  CONSTANT_shade4,
  CONSTANT_black2
} from "../../constants/colorPallete";
import {
  CONSTANT_fontCustom,
  CONSTANT_primaryLight
} from "../../constants/fonts";
import { IFaqBlock } from "../NotificationsFaqScreen/hooks/useNotificationFaq";

type NotificationAnswerNavTypes = AppNavigatorProps<
  typeof SCREEN_NOTIFICATION_ANSWER
>;

export interface NotificationAnswerProps extends NotificationAnswerNavTypes {}

@ErrorBoundary()
@inject("supportStore")
@observer
class NotificationsAnswer extends Component<NotificationAnswerProps> {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    supportStore: PropTypes.object.isRequired
  };

  constructor(props: NotificationAnswerProps) {
    super(props);

    props.navigation.setOptions({
      header: () =>
        PrimaryHeader({
          leftAction: () => props.navigation.goBack(),
          headerText: props.route.params
            ? props.route.params.title
            : CONSTANT_defaultSupportType
        })
    });
  }

  render() {
    const getFaqByType = this.props.route.params?.getFaqByType ?? (() => null);
    const title = this.props.route.params
      ? this.props.route.params.title
      : CONSTANT_defaultSupportType;
    // const disableMessaging = this.props.route.params?.disableMessaging ?? false;
    const faq = (getFaqByType(title) || []).map((faqObject: IFaqBlock) => {
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  faqQuestionsContainer: {
    flex: 1,
    backgroundColor: CONSTANT_white1
  },
  faqScrollView: {
    paddingTop: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: CONSTANT_shade4
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
    ...CONSTANT_fontCustom(CONSTANT_primaryLight, 17),
    color: CONSTANT_black2,
    flexWrap: "wrap"
  }
});

export default NotificationsAnswer;
