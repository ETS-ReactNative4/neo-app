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

class NearBy extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CommonHeader title={""} navigation={navigation} />
    };
  };

  state = {
    selectedPlace: {}
  };

  render() {
    const placeDetails = [
      {
        name: "Mall 1",
        rating: 4,
        ratingCount: 50,
        type: "Shopping Mall",
        isClosed: false,
        closesAt: "Closes at 9.30pm",
        opensAt: "",
        distance: "5 km",
        address: "No. 11, Bradfort Street (Near Dominos), New York, USA,",
        images: [
          "http://pickyourtrail-guides-images.imgix.net/country/1820xh/bali.jpg",
          "http://pickyourtrail-guides-images.imgix.net/country/1820xh/bali.jpg",
          "http://pickyourtrail-guides-images.imgix.net/country/1820xh/bali.jpg",
          "http://pickyourtrail-guides-images.imgix.net/country/1820xh/bali.jpg"
        ]
      },
      {
        name: "Mall 2",
        rating: 4,
        ratingCount: 50,
        type: "",
        isClosed: true,
        closesAt: "",
        opensAt: "Opens in 3 hours",
        distance: "5 Km",
        address: "No. 11, Bradfort Street (Near Dominos), New York, USA,",
        images: [
          "http://pickyourtrail-guides-images.imgix.net/country/1820xh/bali.jpg",
          "http://pickyourtrail-guides-images.imgix.net/country/1820xh/bali.jpg",
          "http://pickyourtrail-guides-images.imgix.net/country/1820xh/bali.jpg"
        ]
      },
      {
        name: "Mall 3",
        rating: 4,
        ratingCount: 50,
        type: "",
        isClosed: false,
        closesAt: "",
        opensAt: "",
        distance: "10 km",
        address: "No. 11, Bradfort Street (Near Dominos), New York, USA,",
        images: [
          "http://pickyourtrail-guides-images.imgix.net/country/1820xh/bali.jpg",
          "http://pickyourtrail-guides-images.imgix.net/country/1820xh/bali.jpg",
          "http://pickyourtrail-guides-images.imgix.net/country/1820xh/bali.jpg",
          "http://pickyourtrail-guides-images.imgix.net/country/1820xh/bali.jpg",
          "http://pickyourtrail-guides-images.imgix.net/country/1820xh/bali.jpg",
          "http://pickyourtrail-guides-images.imgix.net/country/1820xh/bali.jpg",
          "http://pickyourtrail-guides-images.imgix.net/country/1820xh/bali.jpg"
        ]
      }
    ];

    return [
      <ScrollView key={0} style={styles.nearByContainer}>
        <PlaceCard
          selectedPlace={this.state.selectedPlace}
          isVisible={!_.isEmpty(this.state.selectedPlace)}
          onClose={() => this.setState({ selectedPlace: {} })}
        />
        {placeDetails.map((place, placeIndex) => {
          return (
            <View key={placeIndex}>
              <Carousel containerStyle={{ height: 176 }}>
                {place.images.map((imageUrl, imageIndex) => {
                  const isLast = place.images.length === imageIndex + 1;
                  return (
                    <PlaceImageContainer
                      key={imageIndex}
                      imageUrl={imageUrl}
                      isLast={isLast}
                    />
                  );
                })}
              </Carousel>
              <PlaceDetails
                containerStyle={{ marginBottom: 16 }}
                name={place.name}
                rating={place.rating}
                ratingCount={place.ratingCount}
                type={place.type}
                isClosed={place.isClosed}
                closesAt={place.closesAt}
                opensAt={place.opensAt}
                distance={place.distance}
                address={place.address}
                action={() => this.setState({ selectedPlace: place })}
              />
            </View>
          );
        })}
      </ScrollView>,
      <View key={1} style={styles.bottomBar}>
        <TouchableOpacity style={styles.button}>
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
            <Text style={styles.buttonText}>Distance from Hotel</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
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
            <Text style={styles.buttonText}>All Ratings</Text>
          </View>
        </TouchableOpacity>
      </View>,
      isIphoneX() ? (
        <XSensorPlaceholder
          key={2}
          containerStyle={{ backgroundColor: "white" }}
        />
      ) : null
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
  }
});

export default NearBy;
