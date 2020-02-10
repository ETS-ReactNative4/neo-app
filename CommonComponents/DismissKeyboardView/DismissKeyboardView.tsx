import React, { ReactNode } from "react";
import {
  TouchableWithoutFeedback,
  StyleProp,
  ViewStyle,
  Keyboard,
  View
} from "react-native";

export interface DismissKeyboardViewProps {
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}

const DismissKeyboardView = ({ style, children }: DismissKeyboardViewProps) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={style}>{children}</View>
    </TouchableWithoutFeedback>
  );
};

export default DismissKeyboardView;
