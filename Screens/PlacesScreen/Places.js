import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import constants from "../../constants/constants";
import Carousel from "../../CommonComponents/Carousel/Carousel";
import PlaceCard from "./Components/PlaceCard";

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
              <Text>{section.title}</Text>
              <Carousel firstMargin={24} containerStyle={{ height: 152 }}>
                {section.items.map((item, itemIndex) => {
                  return (
                    <PlaceCard
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
