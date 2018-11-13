import React, { Component } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Platform,
  TouchableOpacity
} from "react-native";
import _ from "lodash";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import Carousel from "../../CommonComponents/Carousel/Carousel";
import PlaceImageContainer from "./Components/PlaceImageContainer";
import PlaceDetails from "./Components/PlaceDetails";
import { isIphoneX } from "react-native-iphone-x-helper";
import XSensorPlaceholder from "../../CommonComponents/XSensorPlaceholder/XSensorPlaceholder";
import Icon from "../../CommonComponents/Icon/Icon";
import constants from "../../constants/constants";
import PlaceCard from "./Components/PlaceCard";
import apiCall from "../../Services/networkRequests/apiCall";
import FilterOptions from "./Components/FilterOptions";
import MultiLineHeader from "../../CommonComponents/MultilineHeader/MultiLineHeader";
import { inject, observer } from "mobx-react/custom";
import getDeviceLocation from "../../Services/getDeviceLocation/getDeviceLocation";
import SmartImage from "../../CommonComponents/SmartImage/SmartImage";
import FastImage from "react-native-fast-image";
import { responsiveWidth } from "react-native-responsive-dimensions";

@inject("placesStore")
@observer
class NearBy extends Component {
  static navigationOptions = ({ navigation }) => {
    const city = navigation.getParam("city", {});
    const title = navigation.getParam("title", "");
    return {
      header: (
        <CommonHeader
          TitleComponent={
            <MultiLineHeader
              duration={city.city}
              title={title}
              disableDropDown={true}
            />
          }
          title={""}
          navigation={navigation}
        />
      )
    };
  };

  state = {
    selectedPlace: {},
    places: [],
    isLoading: false,
    sortOptions: [
      {
        text: "Distance from your hotel",
        action: () => null,
        isSelected: true
      },
      {
        text: "Distance from your current location",
        action: () => null,
        isSelected: false
      },
      {
        text: "Number of reviews",
        action: () => null,
        isSelected: false
      }
    ],
    filterOptions: [
      {
        text: "All Ratings",
        action: () => null,
        isSelected: true
      },
      {
        text: "Rated 3 stars and above",
        action: () => null,
        isSelected: false
      },
      {
        text: "Rated 4 stars and above",
        action: () => null,
        isSelected: false
      },
      {
        text: "Rated 5 stars",
        action: () => null,
        isSelected: false
      }
    ],
    isSortVisible: false,
    isFilterVisible: false
  };

  componentDidMount() {
    // getDeviceLocation(success => {
    //
    // }, error => {
    //
    // });
    const searchText = this.props.navigation.getParam("searchQuery", "");
    const { loadTextSearch } = this.props.placesStore;
    loadTextSearch(searchText);
  }

  toggleFilter = () => {
    this.setState({
      isFilterVisible: !this.state.isFilterVisible
    });
  };

  toggleSort = () => {
    this.setState({
      isSortVisible: !this.state.isSortVisible
    });
  };

  selectFilter = index => {
    const filterOptions = this.state.filterOptions.map((item, itemIndex) => {
      item.isSelected = itemIndex === index;
      return item;
    });
    this.setState({
      filterOptions
    });
  };

  selectSort = index => {
    const sortOptions = this.state.sortOptions.map((item, itemIndex) => {
      item.isSelected = itemIndex === index;
      return item;
    });
    this.setState({
      sortOptions
    });
  };

  render() {
    // const placeDetails = [
    //   {
    //     name: "Mall 1",
    //     rating: 4,
    //     ratingCount: 50,
    //     type: "Shopping Mall",
    //     isClosed: false,
    //     closesAt: "Closes at 9.30pm",
    //     opensAt: "",
    //     distance: "5 km",
    //     address: "No. 11, Bradfort Street (Near Dominos), New York, USA,",
    //     images: [
    //       "http://pickyourtrail-guides-images.imgix.net/country/1820xh/bali.jpg",
    //       "http://pickyourtrail-guides-images.imgix.net/country/1820xh/bali.jpg",
    //       "http://pickyourtrail-guides-images.imgix.net/country/1820xh/bali.jpg",
    //       "http://pickyourtrail-guides-images.imgix.net/country/1820xh/bali.jpg"
    //     ]
    //   },
    //   {
    //     name: "Mall 2",
    //     rating: 4,
    //     ratingCount: 50,
    //     type: "",
    //     isClosed: true,
    //     closesAt: "",
    //     opensAt: "Opens in 3 hours",
    //     distance: "5 Km",
    //     address: "No. 11, Bradfort Street (Near Dominos), New York, USA,",
    //     images: [
    //       "http://pickyourtrail-guides-images.imgix.net/country/1820xh/bali.jpg",
    //       "http://pickyourtrail-guides-images.imgix.net/country/1820xh/bali.jpg",
    //       "http://pickyourtrail-guides-images.imgix.net/country/1820xh/bali.jpg"
    //     ]
    //   },
    //   {
    //     name: "Mall 3",
    //     rating: 4,
    //     ratingCount: 50,
    //     type: "",
    //     isClosed: false,
    //     closesAt: "",
    //     opensAt: "",
    //     distance: "10 km",
    //     address: "No. 11, Bradfort Street (Near Dominos), New York, USA,",
    //     images: [
    //       "http://pickyourtrail-guides-images.imgix.net/country/1820xh/bali.jpg",
    //       "http://pickyourtrail-guides-images.imgix.net/country/1820xh/bali.jpg",
    //       "http://pickyourtrail-guides-images.imgix.net/country/1820xh/bali.jpg",
    //       "http://pickyourtrail-guides-images.imgix.net/country/1820xh/bali.jpg",
    //       "http://pickyourtrail-guides-images.imgix.net/country/1820xh/bali.jpg",
    //       "http://pickyourtrail-guides-images.imgix.net/country/1820xh/bali.jpg",
    //       "http://pickyourtrail-guides-images.imgix.net/country/1820xh/bali.jpg"
    //     ]
    //   }
    // ];

    const selectedSort = this.state.sortOptions.find(item => item.isSelected);
    const selectedFilter = this.state.filterOptions.find(
      item => item.isSelected
    );
    const { getSearchResultsByText } = this.props.placesStore;
    const searchText = this.props.navigation.getParam("searchQuery", "");
    const resultObject = getSearchResultsByText(searchText);
    const placeDetails = resultObject.searchResults;
    return [
      <ScrollView key={0} style={styles.nearByContainer}>
        <PlaceCard
          selectedPlace={this.state.selectedPlace}
          isVisible={!_.isEmpty(this.state.selectedPlace)}
          onClose={() => this.setState({ selectedPlace: {} })}
        />
        {placeDetails.map((place, placeIndex) => {
          const imageUrl = place.photos[0].photoUrl;
          return (
            <View key={placeIndex}>
              <SmartImage
                uri={imageUrl}
                style={styles.imageCover}
                defaultImageUri={
                  "http://pickyourtrail-guides-images.imgix.net/country/1820xh/bali.jpg"
                }
                resizeMode={FastImage.resizeMode.cover}
              />
              <PlaceDetails
                containerStyle={{ marginBottom: 16 }}
                name={place.name}
                rating={place.rating}
                ratingCount={place.ratingCount}
                type={place.types[0]}
                isClosed={!place.openingHours.openNow}
                opensAt={place.openingHours.weekdayText}
                distance={place.distance}
                formattedAddress={place.formattedAddress}
                action={() => this.setState({ selectedPlace: place })}
              />
            </View>
          );
        })}
      </ScrollView>,
      <View key={1} style={styles.bottomBar}>
        <TouchableOpacity style={styles.button} onPress={this.toggleSort}>
          <View style={styles.buttonTitleWrapper}>
            <Text style={styles.buttonTitleText}>Sort By</Text>
            <Icon
              style={styles.buttonArrowIcon}
              name={constants.arrowDown}
              size={8}
              color={constants.firstColor}
            />
          </View>
          <View style={styles.buttonTextWrapper}>
            <Text style={styles.buttonText}>{selectedSort.text || ""}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.toggleFilter}>
          <View style={styles.buttonTitleWrapper}>
            <Text style={styles.buttonTitleText}>Filter By</Text>
            <Icon
              style={styles.buttonArrowIcon}
              name={constants.arrowDown}
              size={8}
              color={constants.firstColor}
            />
          </View>
          <View style={styles.buttonTextWrapper}>
            <Text style={styles.buttonText}>{selectedFilter.text || ""}</Text>
          </View>
        </TouchableOpacity>
      </View>,
      isIphoneX() ? (
        <XSensorPlaceholder
          key={2}
          containerStyle={{ backgroundColor: "white" }}
        />
      ) : null,
      <FilterOptions
        key={3}
        title={"Filter Results by"}
        isVisible={this.state.isFilterVisible}
        onClose={this.toggleFilter}
        options={this.state.filterOptions}
        onSelect={this.selectFilter}
      />,
      <FilterOptions
        key={4}
        title={"Sort Results by"}
        isVisible={this.state.isSortVisible}
        onClose={this.toggleSort}
        options={this.state.sortOptions}
        onSelect={this.selectSort}
      />
    ];
  }
}

const styles = StyleSheet.create({
  nearByContainer: {
    backgroundColor: "white"
  },
  bottomBar: {
    height: 56,
    backgroundColor: "white",
    flexDirection: "row",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(0, 0, 0, .3)"
  },
  button: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 24
  },
  buttonTitleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 16,
    marginTop: 10
  },
  buttonTitleText: {
    ...constants.fontCustom(constants.primaryLight, 11),
    color: constants.firstColor,
    marginRight: 4
  },
  buttonArrowIcon: {
    ...Platform.select({
      ios: {
        marginTop: -3
      }
    })
  },
  buttonTextWrapper: {
    height: 24
  },
  buttonText: {
    ...constants.fontCustom(constants.primarySemiBold, 13),
    color: constants.black1
  },
  imageCover: {
    height: 160,
    width: responsiveWidth(100)
  }
});

export default NearBy;
