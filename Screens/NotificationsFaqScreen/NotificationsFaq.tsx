import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { AppNavigatorProps } from "../../NavigatorsV2/AppNavigator";
import {
  SCREEN_NOTIFICATION_FAQ,
  SCREEN_FAQ
} from "../../NavigatorsV2/ScreenNames";
import PrimaryHeader from "../../NavigatorsV2/Components/PrimaryHeader";
import HelpDeskView from "../ChatScreen/Components/HelpDeskView";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import { observer, inject } from "mobx-react";
import SupportStore from "../../mobx/SupportStore";

type NotificationFaqNavTypes = AppNavigatorProps<
  typeof SCREEN_NOTIFICATION_FAQ
>;

export interface NotificationFaqProps extends NotificationFaqNavTypes {
  supportStore: SupportStore;
}

const NotificationsFaq = ({
  navigation,
  supportStore
}: NotificationFaqProps) => {
  useEffect(() => {
    navigation.setOptions({
      header: () =>
        PrimaryHeader({
          leftAction: () => navigation.goBack(),
          headerText: "FAQs"
        })
    });

    const { loadFaqDetails } = supportStore;
    loadFaqDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { faqDetails } = supportStore;

  const faqSections = Object.keys(faqDetails).map(faqSection => {
    return {
      title: faqSection,
      icon: faqSection,
      action: () =>
        navigation.navigate(SCREEN_FAQ, {
          title: faqSection,
          disableMessaging: true
        })
    };
  });

  return (
    <View style={styles.notificationFaqContainer}>
      <HelpDeskView disableHeader faqSections={faqSections} />
    </View>
  );
};

const styles = StyleSheet.create({
  notificationFaqContainer: {
    flex: 1
  }
});

export default ErrorBoundary()(
  inject("supportStore")(observer(NotificationsFaq))
);
