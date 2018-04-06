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

        <SectionHeader sectionName={'CITY GUIDES'} containerStyle={{marginHorizontal: 24}}/>

        <Carousel
          data={cityList}
          firstMargin={24}
        />

        <SectionHeader sectionName={'ESSENTIALS'} containerStyle={{marginTop: 40, marginHorizontal: 24}}/>

        <PrimaryTool
          text={`Currency Calculator`}
          action={() => this.props.navigation.navigate('Calculator')}
          containerStyle={{marginHorizontal: 24}}
        />

        {
          essentialTools.map((item, index) => (
            <SecondaryTool
              containerStyle={{marginHorizontal: 24}}
              key={index}
              icon={item.icon}
              text={item.text}
              action={item.action}
            />
          ))
        }

        <SectionHeader sectionName={'BEFORE PACKING'} containerStyle={{marginTop: 40, marginHorizontal: 24}}/>

        <PrimaryTool
          text={`Invite Co-passengers`}
          action={() => {}}
          containerStyle={{marginHorizontal: 24}}
        />

        {
          beforePacking.map((item, index) => (
            <SecondaryTool
              containerStyle={{marginHorizontal: 24}}
              key={index}
              icon={item.icon}
              text={item.text}
              action={item.action}
            />
          ))
        }

        <SectionHeader sectionName={'MORE TOOLS'} containerStyle={{marginTop: 40, marginHorizontal: 24}}/>

        <PrimaryTool
          containerStyle={{marginHorizontal: 24}}
          text={`Complete Payment`}
          action={() => {}}
        />

        {
          moreTools.map((item, index) => (
            <SecondaryTool
              containerStyle={{marginHorizontal: 24}}
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
    fontFamily: constants.primaryRegular,
    marginLeft: 8,
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "300",
    color: constants.black2,
  },
});

export default Tools;
