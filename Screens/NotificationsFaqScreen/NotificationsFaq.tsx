import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { AppNavigatorProps } from "../../NavigatorsV2/AppNavigator";
import { SCREEN_NOTIFICATION_FAQ } from "../../NavigatorsV2/ScreenNames";
import PrimaryHeader from "../../NavigatorsV2/Components/PrimaryHeader";
import HelpDeskView from "../ChatScreen/Components/HelpDeskView";

type NotificationFaqNavTypes = AppNavigatorProps<
  typeof SCREEN_NOTIFICATION_FAQ
>;

export interface NotificationFaqProps extends NotificationFaqNavTypes {}

const NotificationsFaq = ({ navigation }: NotificationFaqProps) => {
  useEffect(() => {
    navigation.setOptions({
      header: () =>
        PrimaryHeader({
          leftAction: () => navigation.goBack(),
          headerText: "FAQs"
        })
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.notificationFaqContainer}>
      <HelpDeskView disableHeader faqSections={[]} />
    </View>
  );
};

const styles = StyleSheet.create({
  notificationFaqContainer: {
    flex: 1
  }
});

export default NotificationsFaq;
