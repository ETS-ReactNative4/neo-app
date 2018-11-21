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
          <HomeTitle
            action={() => navigation.navigate("YourBookingsUniversal")}
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
