import React from "react";
import {
  responsiveWidth
  // @ts-ignore
} from "react-native-responsive-dimensions";

import { ITestCase } from "../../TypeInterfaces/TestCases/ITestCases";
import { ScrollView, Alert, View, StyleSheet } from "react-native";
import TestimonialCard from "./TestimonialCard";

const data: ICardData[] = [
  {
    name: "Mihir ",
    image:
      "https://pyt-images.imgix.net/images/testimonials/731/fbProfile/800xh/profile.jpg",
    fallbackImage: "https://pyt-images.imgix.net/images/city/2400xh/phuket.jpg",
    reviewText:
      "PYT are experts in customer satisfaction. they leave no stone unturned.",
    tripType: "Honeymoon",
    region: "Thailand",
    date: "Mar 2019"
  },
  {
    name: "Aarthi",
    image:
      "https://pyt-images.imgix.net/images/testimonials/1022/fbProfile/800xh/profile.jpg",
    fallbackImage: "https://pyt-images.imgix.net/images/city/2400xh/phuket.jpg",
    reviewText: "Tried PYT for the first time and got a well-planned vacation!",
    tripType: "Honeymoon",
    region: "Thailand",
    date: "May 2019"
  },
  {
    name: "Barani",
    image:
      "https://pyt-images.imgix.net/images/testimonials/1073/fbProfile/800xh/profile.jpg",
    fallbackImage: "https://pyt-images.imgix.net/images/city/2400xh/phuket.jpg",
    reviewText:
      "A happy bunch of people who create long-lasting memories with their support",
    tripType: "Honeymoon",
    region: "Thailand",
    date: "Apr 2019"
  }
];

interface ICardData {
  name: string;
  image: string;
  fallbackImage: string;
  reviewText: string;
  tripType: string;
  region: string;
  date: string;
}

interface TestimonialCardWrapperProps {
  cardData: ICardData[];
}

const styles = StyleSheet.create({
  wrapper: {
    height: 184,
    width: responsiveWidth(100)
  }
});

const TestimonialCardWrapper = ({ cardData }: TestimonialCardWrapperProps) => {
  return (
    <View style={styles.wrapper}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {cardData.map((dataObj, index) => {
          return (
            <TestimonialCard
              key={index}
              name={dataObj.name}
              image={{ uri: `${dataObj.image}` }}
              fallbackImage={{ uri: `${dataObj.fallbackImage}` }}
              reviewText={dataObj.reviewText}
              tripType={dataObj.tripType}
              region={dataObj.region}
              date={dataObj.date}
              action={() => Alert.alert(`Click -> ${dataObj.name}`)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const TestimonialCardTestCases: ITestCase[] = [
  {
    title: "Testimonial Card",
    Component: (
      <TestimonialCard
        name={"Niranjan Roy"}
        image={{
          uri: "https://pyt-images.imgix.net/images/misc/t21.jpg"
        }}
        fallbackImage={{
          uri: "https://pyt-images.imgix.net/images/city/2400xh/phuket.jpg"
        }}
        reviewText={"These guys sure know how to make their customers happy!"}
        tripType={"Family"}
        region={"Vietnam"}
        date={"Apr 2018"}
        action={() => {}}
      />
    )
  },
  {
    title: "Multiple Testimonial Card",
    Component: <TestimonialCardWrapper cardData={data} />
  }
];

export default TestimonialCardTestCases;
