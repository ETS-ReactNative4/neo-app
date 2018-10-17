import React from "react";
import CommonHeader from "../CommonHeader/CommonHeader";
import HamburgerButton from "../HamburgerButton/HamburgerButton";
import HomeTitle from "../HomeTitle/HomeTitle";
import TripToggle from "../TripToggle/TripToggle";

const HomeHeader = ({ navigation }) => {
  return {
    header: (
      <CommonHeader
        LeftButton={<HamburgerButton action={() => navigation.openDrawer()} />}
        TitleComponent={
          <HomeTitle action={() => navigation.push("YourBookings")} />
        }
        title={""}
        RightButton={<TripToggle />}
        navigation={navigation}
      />
    )
  };
};

export default HomeHeader;
