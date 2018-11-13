import React, { Component } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Platform,
  FlatList,
  TouchableOpacity,
  Image
} from "react-native";
import _ from "lodash";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import PlaceDetails from "./Components/PlaceDetails";
import { isIphoneX } from "react-native-iphone-x-helper";
import XSensorPlaceholder from "../../CommonComponents/XSensorPlaceholder/XSensorPlaceholder";
import Icon from "../../CommonComponents/Icon/Icon";
import constants from "../../constants/constants";
import PlaceCard from "./Components/PlaceCard";
import FilterOptions from "./Components/FilterOptions";
import MultiLineHeader from "../../CommonComponents/MultilineHeader/MultiLineHeader";
import { inject, observer } from "mobx-react/custom";
import SmartImage from "../../CommonComponents/SmartImage/SmartImage";
import FastImage from "react-native-fast-image";
import {
  responsiveHeight,
  responsiveWidth
} from "react-native-responsive-dimensions";
import EmptyListPlaceholder from "../../CommonComponents/EmptyListPlaceholder/EmptyListPlaceholder";

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
        isSelected: true,
        filter: 0
      },
      {
        text: "Rated 3 stars and above",
        action: () => null,
        isSelected: false,
        filter: 3
      },
      {
        text: "Rated 4 stars and above",
        action: () => null,
        isSelected: false,
        filter: 4
      },
      {
        text: "Rated 5 stars",
        action: () => null,
        isSelected: false,
        filter: 5
      }
    ],
    isSortVisible: false,
    isFilterVisible: false
  };

  componentDidMount() {
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

  loadPlaceDetail = place => {
    const { selectPlace } = this.props.placesStore;
    selectPlace(place);
  };

  render() {
    const selectedSort = this.state.sortOptions.find(item => item.isSelected);
    const selectedFilter = this.state.filterOptions.find(
      item => item.isSelected
    );
    const {
      getSearchResultsByText,
      isLoading,
      unSelectPlace,
      selectedPlace,
      getPlaceById
    } = this.props.placesStore;
    const searchText = this.props.navigation.getParam("searchQuery", "");
    const resultObject = getSearchResultsByText(searchText);
    const placeDetails = resultObject.searchResults.filter(result => {
      if (selectedFilter.filter) {
        if (selectedFilter.filter === 3) {
          return result.rating >= 3;
        } else if (selectedFilter.filter === 4) {
          return result.rating >= 4;
        } else if (selectedFilter.filter === 5) {
          return result.rating === 5;
        }
      }
      return true;
    });
    const activePlace = getPlaceById(selectedPlace);
    return [
      <FlatList
        key={0}
        data={placeDetails}
        renderItem={({ item: place }) => {
          if (_.isEmpty(place)) return null;
          const imageUrl = place.photos ? place.photos[0].photoUrl : "";
          return (
            <TouchableOpacity
              onPress={() => this.loadPlaceDetail(place)}
              activeOpacity={0.8}
              style={styles.listItemContainer}
            >
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
                type={place.types ? place.types[0] : ""}
                isClosed={!place.openingHours.openNow}
                opensAt={place.openingHours.weekdayText}
                distance={place.distance}
                formattedAddress={place.formattedAddress}
                action={() => this.loadPlaceDetail(place)}
              />
            </TouchableOpacity>
          );
        }}
        ListFooterComponent={() => {
          if (!isLoading && !placeDetails.length) {
            return (
              <EmptyListPlaceholder
                containerStyle={{
                  backgroundColor: "white",
                  height: responsiveHeight(100) - 60 - 44 - 56
                }}
                text={"No items found for you current filters..."}
              />
            );
          } else if (isLoading && !placeDetails.length) {
            return (
              <View
                style={{
                  backgroundColor: "white",
                  height: responsiveHeight(100) - 60 - 44 - 56,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Image
                  resizeMode={"contain"}
                  source={constants.loadingIcon}
                  style={{ height: 40, width: 40 }}
                />
              </View>
            );
          } else {
            return null;
          }
        }}
      />,
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
      />,
      <PlaceCard
        key={5}
        selectedPlace={activePlace}
        isVisible={!_.isEmpty(activePlace)}
        onClose={unSelectPlace}
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
  },
  listItemContainer: {
    backgroundColor: "white"
  }
});

export default NearBy;
