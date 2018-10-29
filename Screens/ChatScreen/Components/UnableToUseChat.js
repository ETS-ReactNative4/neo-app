import React from "react";
import { View, StyleSheet, Text } from "react-native";
import constants from "../../../constants/constants";
import SimpleButton from "../../../CommonComponents/SimpleButton/SimpleButton";

const UnableToUseChat = () => {
  return (
    <View style={styles.unableToUseChatContainer}>
      <Text style={styles.message}>
        {
          "We are unable to connect to the live chat currently. Please check for a proper internet connection and try again. Alternatively, you can contact us on the number below."
        }
      </Text>
      <SimpleButton
        containerStyle={{ marginTop: 8 }}
        text={"+91 9600019211"}
        action={() => null}
        textColor={constants.firstColor}
        color={"transparent"}
        hasBorder={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  unableToUseChatContainer: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24
  },
  message: {
    ...constants.fontCustom(constants.primaryLight, 15, 18),
    color: constants.black2,
    textAlign: "center"
  }
});

export default UnableToUseChat;
