import React from "react";
import { Text, View } from "react-native-animatable";
import { StyleSheet } from "react-native";

const AppLogin = () => {
  return (
    <View style={styles.container}>
      <Text>App Login</Text>
    </View>
  );
};

AppLogin.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default AppLogin;
