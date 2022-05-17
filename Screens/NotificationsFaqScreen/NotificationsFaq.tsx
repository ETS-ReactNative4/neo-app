import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { AppNavigatorProps } from "../../NavigatorsV2/AppNavigator";
import {
  SCREEN_NOTIFICATION_FAQ,
  SCREEN_NOTIFICATION_ANSWER
} from "../../NavigatorsV2/ScreenNames";
import PrimaryHeader from "../../NavigatorsV2/Components/PrimaryHeader";
// import HelpDeskView from "../ChatScreen/Components/HelpDeskView";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import { observer } from "mobx-react";
import useNotificationFaq from "./hooks/useNotificationFaq";

type NotificationFaqNavTypes = AppNavigatorProps<
  typeof SCREEN_NOTIFICATION_FAQ
>;

export interface NotificationFaqProps extends NotificationFaqNavTypes {}

const NotificationsFaq = ({ navigation, route }: NotificationFaqProps) => {
  const { isDomestic = false } = route.params;

  const faqStore = useNotificationFaq();

  useEffect(() => {
    navigation.setOptions({
      header: () =>
        PrimaryHeader({
          leftAction: () => navigation.goBack(),
          headerText: "FAQs"
        })
    });

    if (isDomestic) {
      faqStore.loadFaqDetails("domestic-faq.json");
    } else {
      faqStore.loadFaqDetails("faq.json");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { faqDetails } = faqStore;

  const faqSections = Object.keys(faqDetails).map(faqSection => {
    return {
      title: faqSection,
      icon: faqSection,
      action: () =>
        navigation.navigate(SCREEN_NOTIFICATION_ANSWER, {
          title: faqSection,
          disableMessaging: true,
          getFaqByType: faqStore.getFaqByType
        })
    };
  });

  return (
    <View style={styles.notificationFaqContainer}>
      {/* <HelpDeskView disableIcons disableHeader faqSections={faqSections} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  notificationFaqContainer: {
    flex: 1
  }
});

export default ErrorBoundary()(observer(NotificationsFaq));
