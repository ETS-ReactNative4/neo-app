import React from "react";

import { View, ViewStyle } from "react-native";

interface NotificationsProps {
  containerStyle?: ViewStyle;
}

const Notifications = ({ containerStyle }: NotificationsProps) => {
  return <View style={containerStyle} />;
};

export default Notifications;
