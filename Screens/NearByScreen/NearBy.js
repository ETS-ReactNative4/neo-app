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
import getDeviceLocation from "../../Services/getDeviceLocation/getDeviceLocation";
import apiCall from "../../Services/networkRequests/apiCall";
import DebouncedAlert from "../../CommonComponents/DebouncedAlert/DebouncedAlert";
import Moment from "moment";
import { recordEvent } from "../../Services/analytics/analyticsService";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);

@inject("placesStore")
@inject("itineraries")
@inject("infoStore")
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

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      sortOptions: [
        {
          text: "Ratings",
          action: () => null,
          isSelected: true,
          type: "text"
        },
        {
          text: "Distance from your current location",
          action: () => null,
          isSelected: false,
          type: "nearby"
        },
        {
          text: "Distance from your hotel",
          action: () => null,
          isSelected: false,
          type: "nearHotel"
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
      isFilterVisible: false,
      lat: "",
      lng: "",
      isTripActive: false
    };
  }

  componentDidMount() {
    const searchText = this.props.navigation.getParam("searchQuery", "");
    const { loadTextSearch } = this.props.placesStore;
    loadTextSearch(searchText);
    this.checkCurrentCity();
    this.checkTripStatus();
  }

  checkCurrentCity = () => {
    const city = this.props.navigation.getParam("city", {});
    const today = moment().toDate();
    const startDayText = moment(city.startDay).format("DD/MM/YYYY");
    const endDayText = moment(city.endDay).format("DD/MM/YYYY");
    const startDay = moment(startDayText, "DD/MM/YYYY").toDate();
    const endDay = moment(endDayText, "DD/MM/YYYY").toDate();
    const range = moment.range(startDay, endDay);
    if (!range.contains(today)) {
      this.removeNearHotelSearch();
    }
  };

  checkTripStatus = () => {
    const today = moment();
    const dateDifference = this.props.itineraries.firstDay.diff(today, "days");
    if (dateDifference < 1) {
      this.setState({
        isTripActive: true
      });
    }
  };

  toggleFilter = () => {
    this.setState({
      isFilterVisible: !this.state.isFilterVisible
    });
  };

  toggleSort = () => {
    if (this.state.isTripActive) {
      this.setState({
        isSortVisible: !this.state.isSortVisible
      });
    } else {
      this.props.infoStore.setInfo(
        "Not yet there...",
        "Sort options will be available once you have started your trip!"
      );
    }
  };

  selectFilter = index => {
    const filterOptions = this.state.filterOptions.map((item, itemIndex) => {
      item.isSelected = itemIndex === index;
      return item;
    });
    const selectedFilter = filterOptions.find(item => item.isSelected);
    switch (selectedFilter.text) {
      case "All Ratings":
        recordEvent(constants.nearByAllStarClick);
        break;
      case "Rated 3 stars and above":
        recordEvent(constants.nearByThreeStarClick);
        break;
      case "Rated 4 stars and above":
        recordEvent(constants.nearByFourStarClick);
        break;
      case "Rated 5 stars":
        recordEvent(constants.nearByFiveStarClick);
        break;
    }
    this.setState({
      filterOptions
    });
  };

  selectSort = index => {
    const sortOptions = this.state.sortOptions.map((item, itemIndex) => {
      item.isSelected = itemIndex === index;
      return item;
    });
    const selectedSort = sortOptions.find(item => item.isSelected);
    switch (selectedSort.type) {
      case "nearHotel":
        recordEvent(constants.nearByHotelClick);
        break;
      case "nearby":
        recordEvent(constants.nearByLocationClick);
        break;
      case "text":
        recordEvent(constants.nearByRatingsClick);
        break;
    }
    if (selectedSort.type === "nearby") {
      // fix modal issue
      setTimeout(() => {
        this.nearbySearch(sortOptions);
      }, 500);
    } else if (selectedSort.type === "nearHotel") {
      // fix modal issue
      setTimeout(() => {
        this.hotelNearBySearch(sortOptions);
      }, 500);
    }
  };

  nearbySearch = sortOptions => {
    const { loadLocationSearch } = this.props.placesStore;
    getDeviceLocation(
      location => {
        const lat = location.coords.latitude;
        const lng = location.coords.longitude;
        const keyword = this.props.navigation.getParam("title", "");
        loadLocationSearch({
          lat,
          lng,
          keyword
        });
        this.setState(
          {
            lat,
            lng
          },
          () => {
            this.setState({
              sortOptions
            });
          }
        );
      },
      error => {
        this.selectSort(0);
        this.removeNearBySearch();
      },
      () => {
        this.selectSort(0);
      }
    );
  };

  hotelNearBySearch = sortOptions => {
    const { getHotelByDate } = this.props.itineraries;
    const today = moment().format("DDMMYYYY");
    const { loadLocationSearch } = this.props.placesStore;
    const hotelDetails = getHotelByDate(today);
    const keyword = this.props.navigation.getParam("title", "");
    const lat = Number(hotelDetails.lat);
    const lng = Number(hotelDetails.lon);
    loadLocationSearch({
      lat,
      lng,
      keyword
    });
    this.setState(
      {
        lat,
        lng
      },
      () => {
        this.setState({
          sortOptions
        });
      }
    );
  };

  removeNearBySearch = () => {
    let sortOptions = [...this.state.sortOptions];
    sortOptions = sortOptions.filter(item => item.type !== "nearby");
    this.setState(
      {
        sortOptions
      },
      () => {
        DebouncedAlert(
          "Device location unavailable!",
          "Unable to perform Location Search..."
        );
      }
    );
  };

  removeNearHotelSearch = () => {
    let sortOptions = [...this.state.sortOptions];
    sortOptions = sortOptions.filter(item => item.type !== "nearHotel");
    this.setState({
      sortOptions
    });
  };

  loadPlaceDetail = place => {
    recordEvent(constants.nearByPlaceDetailsClick);
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
      getPlaceById,
      paginateTextSearch,
      paginateLocationSearch,
      getSearchResultsByLocation,
      isNextPageLoading
    } = this.props.placesStore;
    const searchText = this.props.navigation.getParam("searchQuery", "");
    const keyword = this.props.navigation.getParam("title", "");
    const { lat, lng } = this.state;
    let placeDetails = {
      searchResults: [],
      token: ""
    };
    switch (selectedSort.type) {
      case "text":
        placeDetails = getSearchResultsByText(searchText);
        break;
      default:
        if (lat && lng) {
          placeDetails = getSearchResultsByLocation({ lat, lng });
        }
    }
    const placesArray = placeDetails.searchResults.filter(result => {
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
      <View key={0} style={styles.flatListContainer}>
        <FlatList
          data={placesArray}
          onEndReached={() => {
            if (placeDetails.token) {
              switch (selectedSort.type) {
                case "nearby":
                  if (lat && lng) {
                    paginateLocationSearch({
                      lat,
                      lng,
                      keyword,
                      token: placeDetails.token
                    });
                  }
                  break;
                case "text":
                  paginateTextSearch(searchText, placeDetails.token);
                  break;
                case "nearHotel":
                  break;
              }
            }
          }}
          renderItem={({ item: place, index }) => {
            if (_.isEmpty(place)) return null;
            const imageUrl = place.photos ? place.photos[0].photoUrl : "";
            return (
              <TouchableOpacity
                onPress={() => this.loadPlaceDetail(place)}
                activeOpacity={0.8}
                style={styles.listItemContainer}
              >
                {imageUrl ? (
                  <SmartImage
                    uri={imageUrl}
                    style={styles.imageCover}
                    defaultImageUri={
                      "http://pickyourtrail-guides-images.imgix.net/country/1820xh/bali.jpg"
                    }
                    resizeMode={FastImage.resizeMode.cover}
                  />
                ) : null}
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
            if (isLoading) {
              return (
                <View
                  style={{
                    backgroundColor: "white",
                    marginTop: responsiveHeight(40),
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
            } else if (!isLoading && !placesArray.length) {
              return (
                <EmptyListPlaceholder
                  containerStyle={{
                    backgroundColor: "white",
                    marginTop: responsiveHeight(40)
                  }}
                  text={"No items found for you current filters..."}
                />
              );
            } else if (isNextPageLoading) {
              return (
                <View
                  style={{
                    width: responsiveWidth(100),
                    height: 56,
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
        />
        <View style={styles.footerPlaceholder} />
      </View>,
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
          containerStyle={{
            backgroundColor: "white",
            width: responsiveWidth(100),
            position: "absolute",
            bottom: 0
          }}
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
        fromLocation={selectedSort.type}
      />
    ];
  }
}

const styles = StyleSheet.create({
  flatListContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },
  nearByContainer: {
    backgroundColor: "white"
  },
  bottomBar: {
    height: 56,
    width: responsiveWidth(100),
    position: "absolute",
    bottom: isIphoneX() ? constants.xSensorAreaHeight : 0,
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
  },
  footerPlaceholder: {
    height: 56 + (isIphoneX() ? constants.xSensorAreaHeight : 0),
    width: responsiveWidth(100)
  }
});

export default NearBy;
