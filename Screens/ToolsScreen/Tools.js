import React, {
  Component,
} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableHighlight,
  ImageBackground,
  Text,
} from 'react-native';
import constants from "../../constants/constants";
import SectionHeader from "../../CommonComponents/SectionHeader/SectionHeader";
import Carousel from "../../CommonComponents/Carousel/Carousel";
import {
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import PrimaryTool from "./Components/PrimaryTool";
import SecondaryTool from "./Components/SecondaryTool";

class Tools extends Component {
  render() {

    const cityList = [
      {
        title: 'Bali',
        image: constants.starterBackground,
        action: () => {},
      },
      {
        title: 'Bali',
        image: constants.starterBackground,
        action: () => {},
      },
      {
        title: 'Bali',
        image: constants.starterBackground,
        action: () => {},
      },
      {
        title: 'Bali',
        image: constants.starterBackground,
        action: () => {},
      },
    ];

    const essentialTools = [
      {
        icon: constants.notificationIcon,
        text: `Common Phrases`,
        action: () => {},
      },
      {
        icon: constants.notificationIcon,
        text: `Emergency Contacts`,
        action: () => {},
      },
      {
        icon: constants.notificationIcon,
        text: `Medical Care`,
        action: () => {},
      },
      {
        icon: constants.notificationIcon,
        text: `Weather Forecast`,
        action: () => {},
      },
    ];

    const beforePacking = [
      {
        icon: constants.notificationIcon,
        text: `Passport Details`,
        action: () => {},
      },
      {
        icon: constants.notificationIcon,
        text: `Packing Checklist`,
        action: () => {},
      },
      {
        icon: constants.notificationIcon,
        text: `Documents & Visa`,
        action: () => {},
      },
    ];

    const moreTools = [
      {
        icon: constants.notificationIcon,
        text: `Download Invoice`,
        action: () => {},
      },
      {
        icon: constants.notificationIcon,
        text: `Frequently Asked Questions`,
        action: () => {},
      },
      {
        icon: constants.notificationIcon,
        text: `Cancel Trip`,
        action: () => {},
      },
    ];

    return(
      <ScrollView style={styles.container}>

        <SectionHeader sectionName={'CITY GUIDES'}/>

        <Carousel
          data={cityList}
          containerStyle={{width: responsiveWidth(100), marginLeft: -24}}
          firstMargin={24}
        />

        <SectionHeader sectionName={'ESSENTIALS'} containerStyle={{marginTop: 40}}/>

        <PrimaryTool
          text={`Currency Calculator`}
          action={() => {}}
        />

        {
          essentialTools.map((item, index) => (
            <SecondaryTool
              key={index}
              icon={item.icon}
              text={item.text}
              action={item.action}
            />
          ))
        }

        <SectionHeader sectionName={'BEFORE PACKING'} containerStyle={{marginTop: 40}}/>

        <PrimaryTool
          text={`Invite Co-passengers`}
          action={() => {}}
        />

        {
          beforePacking.map((item, index) => (
            <SecondaryTool
              key={index}
              icon={item.icon}
              text={item.text}
              action={item.action}
            />
          ))
        }

        <SectionHeader sectionName={'MORE TOOLS'} containerStyle={{marginTop: 40}}/>

        <PrimaryTool
          text={`Complete Payment`}
          action={() => {}}
        />

        {
          moreTools.map((item, index) => (
            <SecondaryTool
              key={index}
              icon={item.icon}
              text={item.text}
              action={item.action}
            />
          ))
        }

        <View style={{height: 20}}/>

      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constants.appBackgroundColor,
    paddingHorizontal: 24,
  },
  secondaryContainer: {
    height: 24,
    marginTop: 24,
  },
  secondaryWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  icon: {
    height: 24,
    width: 24,
  },
  text2: {
    fontFamily: constants.primaryFont,
    marginLeft: 8,
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "300",
    color: constants.black2,
  },
});

export default Tools;
