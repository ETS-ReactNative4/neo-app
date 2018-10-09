import React, { Component } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import Carousel from "../../CommonComponents/Carousel/Carousel";
import PlaceImageContainer from "./Components/PlaceImageContainer";
import PlaceDetails from "./Components/PlaceDetails";
import { isIphoneX } from "react-native-iphone-x-helper";
import XSensorPlaceholder from "../../CommonComponents/XSensorPlaceholder/XSensorPlaceholder";

class NearBy extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CommonHeader title={""} navigation={navigation} />
    };
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

    return (
      <ScrollView style={styles.nearByContainer}>
        {placeDetails.map((place, placeIndex) => {
          return (
            <View key={placeIndex}>
              <Carousel containerStyle={{ height: 176 }}>
                {place.images.map((imageUrl, imageIndex) => {
                  return (
                    <PlaceImageContainer key={imageIndex} imageUrl={imageUrl} />
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
              />
            </View>
          );
        })}
        {isIphoneX() ? <XSensorPlaceholder /> : null}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  nearByContainer: {
    backgroundColor: "white"
  }
});

export default NearBy;
