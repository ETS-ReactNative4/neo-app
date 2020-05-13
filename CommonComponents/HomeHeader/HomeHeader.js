import React from "react";
import { View, StyleSheet } from "react-native";
import CommonHeader from "../CommonHeader/CommonHeader";
import HamburgerButton from "../HamburgerButton/HamburgerButton";
import HomeTitle from "../HomeTitle/HomeTitle";
import { recordEvent } from "../../Services/analytics/analyticsService";
import { CONSTANT_drawerEvents } from "../../constants/appEvents";
import { SCREEN_ULTIMATE_MENU } from "../../NavigatorsV2/ScreenNames";

const HomeHeader = ({ navigation }) => {
  return {
    header: (
      <CommonHeader
        LeftButton={
          <HamburgerButton
            action={() => {
              recordEvent(CONSTANT_drawerEvents.event, {
                click: CONSTANT_drawerEvents.click.openDrawer
              });
              navigation.navigate(SCREEN_ULTIMATE_MENU);
            }}
          />
        }
        TitleComponent={<HomeTitle />}
        title={""}
        RightButton={<View style={styles.placeholder} />}
        navigation={navigation}
      />
    )
  };
};

const styles = StyleSheet.create({
  placeholder: {
    height: 32,
    width: 56,
    marginRight: 24
  }
});

export default HomeHeader;
