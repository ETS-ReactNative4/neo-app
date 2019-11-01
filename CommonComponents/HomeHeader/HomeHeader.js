import React from "react";
import CommonHeader from "../CommonHeader/CommonHeader";
import HamburgerButton from "../HamburgerButton/HamburgerButton";
import HomeTitle from "../HomeTitle/HomeTitle";
import TripToggle from "../TripToggle/TripToggle";
import { recordEvent } from "../../Services/analytics/analyticsService";
import constants from "../../constants/constants";
import storeService from "../../Services/storeService/storeService";
import { CONSTANT_drawerEvents } from "../../constants/appEvents";

const HomeHeader = ({ navigation }) => {
  return {
    header: (
      <CommonHeader
        LeftButton={
          <HamburgerButton
            action={() => {
              storeService.appState.onDrawerOpen();
              recordEvent(CONSTANT_drawerEvents.event, {
                click: CONSTANT_drawerEvents.click.openDrawer
              });
              navigation.openDrawer();
            }}
          />
        }
        TitleComponent={
          <HomeTitle
            action={() => {
              recordEvent(constants.selectBookingHeaderClick);
              navigation.navigate("YourBookingsUniversal");
            }}
          />
        }
        title={""}
        RightButton={<TripToggle navigation={navigation} />}
        navigation={navigation}
      />
    )
  };
};

export default HomeHeader;
