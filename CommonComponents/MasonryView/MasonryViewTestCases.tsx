import React, { useState, useEffect } from "react";
import { ITestCase } from "../../TypeInterfaces/TestCases/ITestCases";
import MasonryView from "./MasonryView";
import { IMasonryViewData } from "../../Screens/TravelProfileCityScreen/TravelProfileCity";
import { StyleSheet } from "react-native";
import {
  responsiveWidth
  // @ts-ignore
} from "react-native-responsive-dimensions";
import SelectablePortraitImage from "../SelectablePortraitImage/SelectablePortraitImage";

const data: IMasonryViewData[] = [
  {
    image:
      "https://pyt-images.imgix.net/images/city/paris.jpg?w=146&h=200&fit=crop&dpr=2&auto=format,compress,enhance&q=20"
  },
  {
    image:
      "https://pyt-images.imgix.net/images/city/london.jpg?w=146&h=200&fit=crop&dpr=2&auto=format,compress,enhance&q=20"
  },
  {
    image:
      "https://pyt-images.imgix.net/images/city/zagreb.jpg?w=146&h=200&fit=crop&dpr=2&auto=format,compress,enhance&q=20"
  },
  {
    image:
      "https://pyt-images.imgix.net/images/misc/germany.jpeg?w=146&h=200&fit=crop&dpr=2&auto=format,compress,enhance&q=20"
  },
  {
    image:
      "https://pyt-images.imgix.net/images/city/paris.jpg?w=146&h=200&fit=crop&dpr=2&auto=format,compress,enhance&q=20"
  },
  {
    image:
      "https://pyt-images.imgix.net/images/city/london.jpg?w=146&h=200&fit=crop&dpr=2&auto=format,compress,enhance&q=20"
  },
  {
    image:
      "https://pyt-images.imgix.net/images/city/zagreb.jpg?w=146&h=200&fit=crop&dpr=2&auto=format,compress,enhance&q=20"
  },
  {
    image:
      "https://pyt-images.imgix.net/images/misc/germany.jpeg?w=146&h=200&fit=crop&dpr=2&auto=format,compress,enhance&q=20"
  },
  {
    image:
      "https://pyt-images.imgix.net/images/city/paris.jpg?w=146&h=200&fit=crop&dpr=2&auto=format,compress,enhance&q=20"
  },
  {
    image:
      "https://pyt-images.imgix.net/images/city/london.jpg?w=146&h=200&fit=crop&dpr=2&auto=format,compress,enhance&q=20"
  },
  {
    image:
      "https://pyt-images.imgix.net/images/city/zagreb.jpg?w=146&h=200&fit=crop&dpr=2&auto=format,compress,enhance&q=20"
  },
  {
    image:
      "https://pyt-images.imgix.net/images/misc/germany.jpeg?w=146&h=200&fit=crop&dpr=2&auto=format,compress,enhance&q=20"
  },
  {
    image:
      "https://pyt-images.imgix.net/images/city/paris.jpg?w=146&h=200&fit=crop&dpr=2&auto=format,compress,enhance&q=20"
  },
  {
    image:
      "https://pyt-images.imgix.net/images/city/london.jpg?w=146&h=200&fit=crop&dpr=2&auto=format,compress,enhance&q=20"
  },
  {
    image:
      "https://pyt-images.imgix.net/images/city/zagreb.jpg?w=146&h=200&fit=crop&dpr=2&auto=format,compress,enhance&q=20"
  },
  {
    image:
      "https://pyt-images.imgix.net/images/misc/germany.jpeg?w=146&h=200&fit=crop&dpr=2&auto=format,compress,enhance&q=20"
  },
  {
    image:
      "https://pyt-images.imgix.net/images/city/paris.jpg?w=146&h=200&fit=crop&dpr=2&auto=format,compress,enhance&q=20"
  },
  {
    image:
      "https://pyt-images.imgix.net/images/city/london.jpg?w=146&h=200&fit=crop&dpr=2&auto=format,compress,enhance&q=20"
  },
  {
    image:
      "https://pyt-images.imgix.net/images/city/zagreb.jpg?w=146&h=200&fit=crop&dpr=2&auto=format,compress,enhance&q=20"
  },
  {
    image:
      "https://pyt-images.imgix.net/images/misc/germany.jpeg?w=146&h=200&fit=crop&dpr=2&auto=format,compress,enhance&q=20"
  },
  {
    image:
      "https://pyt-images.imgix.net/images/city/paris.jpg?w=146&h=200&fit=crop&dpr=2&auto=format,compress,enhance&q=20"
  },
  {
    image:
      "https://pyt-images.imgix.net/images/city/london.jpg?w=146&h=200&fit=crop&dpr=2&auto=format,compress,enhance&q=20"
  },
  {
    image:
      "https://pyt-images.imgix.net/images/city/zagreb.jpg?w=146&h=200&fit=crop&dpr=2&auto=format,compress,enhance&q=20"
  },
  {
    image:
      "https://pyt-images.imgix.net/images/misc/germany.jpeg?w=146&h=200&fit=crop&dpr=2&auto=format,compress,enhance&q=20"
  }
];

const styles = StyleSheet.create({
  scrollColumn: {
    width: responsiveWidth(50) - 24
  },

  oddColumnStyle: {
    paddingLeft: 8
  },

  evenColumnStyle: {
    paddingRight: 8
  },
  selectablePortraitImageStyle: {
    marginBottom: 16
  }
});

interface MasonryViewWrapperProps {
  cityData: IMasonryViewData[];
}

interface ISuggestedCity {
  index: number;
  imageUrl: string;
  isSelected: boolean;
}

const MasonryViewWrapper = ({ cityData }: MasonryViewWrapperProps) => {
  const [suggestedCities, setSuggestedCities] = useState<ISuggestedCity[]>([]);

  useEffect(() => {
    setSuggestedCities(
      cityData.map((city, cityIndex) => {
        return {
          index: cityIndex,
          imageUrl: city.image,
          isSelected: false
        };
      })
    );
  }, [cityData]);

  const selectSuggestedCity = (cityIndex: number) => {
    const citiesList = [...suggestedCities];
    citiesList[cityIndex].isSelected = !citiesList[cityIndex].isSelected;
    setSuggestedCities(citiesList);
  };

  return (
    <MasonryView
      columns={2}
      columnStyle={styles.scrollColumn}
      oddColumnStyle={styles.oddColumnStyle}
      evenColumnStyle={styles.evenColumnStyle}
    >
      {suggestedCities.map((suggestedCity, suggestedCityIndex) => {
        const onSelect = () => {
          selectSuggestedCity(suggestedCity.index);
        };

        return (
          <SelectablePortraitImage
            key={suggestedCityIndex}
            onPress={onSelect}
            isSelected={suggestedCity.isSelected}
            imageSource={suggestedCity.imageUrl}
            containerStyle={styles.selectablePortraitImageStyle}
          />
        );
      })}
    </MasonryView>
  );
};

const SelectablePortraitImageTestCases: ITestCase[] = [
  {
    title: "Masonry View",
    Component: <MasonryViewWrapper cityData={data} />
  }
];

export default SelectablePortraitImageTestCases;
