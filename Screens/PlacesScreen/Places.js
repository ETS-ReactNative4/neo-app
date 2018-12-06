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
import PlaceSectionTitle from "./Components/PlaceSectionTitle";
import XSensorPlaceholder from "../../CommonComponents/XSensorPlaceholder/XSensorPlaceholder";
import { isIphoneX } from "react-native-iphone-x-helper";
import { inject, observer } from "mobx-react/custom";
import CitySelectionMenu from "../../CommonComponents/CitySelectionMenu/CitySelectionMenu";
import PlacesPageTitle from "./Components/PlacesPageTitle";
import { recordEvent } from "../../Services/analytics/analyticsService";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import SimpleCard from "../../CommonComponents/SimpleCard/SimpleCard";

@ErrorBoundary()
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

  state = {
    isScrollRecorded: false
  };

  componentDidMount() {
    const { selectCity } = this.props.placesStore;
    const city = this.props.navigation.getParam("city", {});
    selectCity(city);
  }

  changeCity = city => {
    recordEvent(constants.placesHeaderCityNameClick);
    const { selectCity } = this.props.placesStore;
    selectCity(city);
  };

  scrollAction = () => {
    if (!this.state.isScrollRecorded) {
      recordEvent(constants.placesCarouselScroll);
      this.setState({
        isScrollRecorded: true
      });
    }
  };

  render() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const { navigation } = this.props;
    const { categories } = this.props.placesStore;
    const categorySections = Object.keys(categories);
    const city = this.props.navigation.getParam("city", {});
    const target = this.props.navigation.getParam("target", "");
    let onScrollProps = {};
    if (!this.state.isScrollRecorded) {
      onScrollProps["onScroll"] = () => this.scrollAction();
    }
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
              <Carousel
                {...onScrollProps}
                firstMargin={24}
                containerStyle={{ height: 152 }}
              >
                {category.map((item, itemIndex) => {
                  return (
                    <SimpleCard
                      key={itemIndex}
                      image={{ uri: item.image }}
                      action={() => {
                        recordEvent(constants.placesCategoryTileClick);
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
