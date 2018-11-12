import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import constants from "../../constants/constants";
import Carousel from "../../CommonComponents/Carousel/Carousel";
import PlaceCard from "./Components/PlaceCard";
import PlaceSectionTitle from "./Components/PlaceSectionTitle";
import XSensorPlaceholder from "../../CommonComponents/XSensorPlaceholder/XSensorPlaceholder";
import { isIphoneX } from "react-native-iphone-x-helper";
import { inject, observer } from "mobx-react/custom";
import CitySelectionMenu from "../../CommonComponents/CitySelectionMenu/CitySelectionMenu";
import PlacesPageTitle from "./Components/PlacesPageTitle";

@inject("placesStore")
@observer
class Places extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <CommonHeader
          TitleComponent={<PlacesPageTitle />}
          title={""}
          navigation={navigation}
        />
      )
    };
  };

  componentDidMount() {
    const { selectCity } = this.props.placesStore;
    const city = this.props.navigation.getParam("city", {});
    selectCity(city);
  }

  changeCity = city => {
    const { selectCity } = this.props.placesStore;
    selectCity(city);
  };

  render() {
    const { navigation } = this.props;
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

    const { categories } = this.props.placesStore;
    console.log(categories);

    return (
      <ScrollView style={styles.placesContainer}>
        <CitySelectionMenu
          navigation={navigation}
          selectCity={this.changeCity}
        />
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
                      action={() => this.props.navigation.navigate("NearBy")}
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
