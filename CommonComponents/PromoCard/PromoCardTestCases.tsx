import React from "react";

import { ITestCase } from "../../TypeInterfaces/TestCases/ITestCases";
import { ScrollView, Alert, View, StyleSheet } from "react-native";
import PromoCard from "./PromoCard";

const data: ICardData[] = [
  {
    image:
      "https://pyt-images.imgix.net/images/product_blog/itinerary-box/australia-small.jpeg",
    fallbackImage:
      "https://pyt-images.imgix.net/images/product_blog/operahouse.jpeg",
    text: "All inclusive offers starting from",
    price: "75,500"
  },
  {
    image:
      "https://pyt-images.imgix.net/images/product_blog/itinerary-box/bali-small.jpeg",
    fallbackImage:
      "https://pyt-images.imgix.net/images/product_blog/operahouse.jpeg",
    text: "The best trips #DownUnder",
    price: "1,45,500"
  },
  {
    image:
      "https://pyt-images.imgix.net/images/product_blog/itinerary-box/europe-small.jpeg",
    fallbackImage:
      "https://pyt-images.imgix.net/images/product_blog/operahouse.jpeg",
    text: "Exclusive for Beach Bums",
    price: "45,500"
  }
];

interface ICardData {
  image: string;
  fallbackImage: string;
  text: string;
  price: string;
}

interface PromoCardWrapperProps {
  cardData: ICardData[];
}

const styles = StyleSheet.create({
  wrapper: {
    minHeight: 344
  }
});

const PromoCardWrapper = ({ cardData }: PromoCardWrapperProps) => {
  return (
    <View style={styles.wrapper}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {cardData.map((dataObj, index) => {
          return (
            <PromoCard
              key={index}
              image={{ uri: dataObj.image }}
              fallbackImage={{ uri: dataObj.fallbackImage }}
              text={dataObj.text}
              price={dataObj.price}
              action={() => Alert.alert(`Click -> ${dataObj.text}`)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const PromoCardTestCases: ITestCase[] = [
  {
    title: "Promo card",
    Component: (
      <PromoCard
        image={{
          uri: "https://pyt-images.imgix.net/images/city/2400xh/prague.jpg"
        }}
        fallbackImage={{
          uri: "https://pyt-images.imgix.net/images/city/2400xh/prague.jpg"
        }}
        text={"All inclusive offers starting from"}
        price={"75,500"}
        action={() => {}}
      />
    )
  },
  {
    title: "Multiple Promo cards",
    Component: <PromoCardWrapper cardData={data} />
  }
];

export default PromoCardTestCases;
