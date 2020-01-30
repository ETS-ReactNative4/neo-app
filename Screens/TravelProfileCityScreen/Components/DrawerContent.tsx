import React from "react";
import { View, StyleSheet } from "react-native";

import SectionTitle from "../../../CommonComponents/SectionTitle/SectionTitle";

const DrawerContent = () => {
  return (
    <View style={styles.drawerContentStyle}>
      <SectionTitle
        smallTitle={"BEFORE WE START"}
        title={"Is this your first time travelling out of India?"}
        titleNumberOfLines={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContentStyle: {}
});

export default DrawerContent;
