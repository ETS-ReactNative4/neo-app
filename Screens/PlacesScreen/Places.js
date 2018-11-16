import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  LayoutAnimation
} from "react-native";
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
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const { navigation } = this.props;
    const { categories } = this.props.placesStore;
    const categorySections = Object.keys(categories);
    const city = this.props.navigation.getParam("city", {});
    const target = this.props.navigation.getParam("target", "");

    return (
      <ScrollView style={styles.placesContainer}>
        <CitySelectionMenu
          navigation={navigation}
          selectCity={this.changeCity}
        />
        {categorySections.map((section, sectionIndex) => {
          const category = categories[section];
          return (
            <View key={sectionIndex}>
              <PlaceSectionTitle title={section} />
              <Carousel firstMargin={24} containerStyle={{ height: 152 }}>
                {category.map((item, itemIndex) => {
                  return (
                    <PlaceCard
                      key={itemIndex}
                      image={{ uri: item.image }}
                      action={() => {
                        this.props.navigation.navigate(target, {
                          title: item.category,
                          city,
                          searchQuery: `${item.category} in ${city.city}`
                        });
                      }}
                      title={item.category}
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
