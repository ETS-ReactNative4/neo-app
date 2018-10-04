import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import constants from "../../constants/constants";
import Carousel from "../../CommonComponents/Carousel/Carousel";
import PlaceCard from "./Components/PlaceCard";
import PlaceSectionTitle from "./Components/PlaceSectionTitle";
import XSensorPlaceholder from "../../CommonComponents/XSensorPlaceholder/XSensorPlaceholder";
import { isIphoneX } from "react-native-iphone-x-helper";

class Places extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CommonHeader title={""} navigation={navigation} />
    };
  };

  render() {
    const sections = [
      {
        title: "Shopping",
        icon: constants.medicalCareIcon,
        items: [
          {
            title: "Malls",
            image: constants.splashBackground,
            action: () => {}
          },
          {
            title: "Malls",
            image: constants.splashBackground,
            action: () => {}
          },
          {
            title: "Malls",
            image: constants.splashBackground,
            action: () => {}
          },
          {
            title: "Malls",
            image: constants.splashBackground,
            action: () => {}
          },
          {
            title: "Malls",
            image: constants.splashBackground,
            action: () => {}
          }
        ]
      },
      {
        title: "Shopping",
        icon: constants.medicalCareIcon,
        items: [
          {
            title: "Malls",
            image: constants.splashBackground,
            action: () => {}
          },
          {
            title: "Malls",
            image: constants.splashBackground,
            action: () => {}
          },
          {
            title: "Malls",
            image: constants.splashBackground,
            action: () => {}
          },
          {
            title: "Malls",
            image: constants.splashBackground,
            action: () => {}
          },
          {
            title: "Malls",
            image: constants.splashBackground,
            action: () => {}
          }
        ]
      },
      {
        title: "Shopping",
        icon: constants.medicalCareIcon,
        items: [
          {
            title: "Malls",
            image: constants.splashBackground,
            action: () => {}
          },
          {
            title: "Malls",
            image: constants.splashBackground,
            action: () => {}
          },
          {
            title: "Malls",
            image: constants.splashBackground,
            action: () => {}
          },
          {
            title: "Malls",
            image: constants.splashBackground,
            action: () => {}
          },
          {
            title: "Malls",
            image: constants.splashBackground,
            action: () => {}
          }
        ]
      }
    ];

    return (
      <ScrollView style={styles.placesContainer}>
        {sections.map((section, sectionIndex) => {
          return (
            <View key={sectionIndex}>
              <PlaceSectionTitle title={section.title} image={section.icon} />
              <Carousel firstMargin={24} containerStyle={{ height: 152 }}>
                {section.items.map((item, itemIndex) => {
                  return (
                    <PlaceCard
                      key={itemIndex}
                      image={{ uri: "" }}
                      action={() => null}
                      title={item.title}
                    />
                  );
                })}
              </Carousel>
            </View>
          );
        })}
        {isIphoneX() ? <XSensorPlaceholder /> : null}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  placesContainer: {
    backgroundColor: "white"
  }
});

export default Places;
