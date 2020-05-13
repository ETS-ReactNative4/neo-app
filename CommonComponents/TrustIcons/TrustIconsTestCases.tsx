import React from "react";

import { ITestCase } from "../../TypeInterfaces/TestCases/ITestCases";
import { View, StyleSheet } from "react-native";
import TrustIcons from "./TrustIcons";

const data: ITrustIconsData[] = [
  {
    logo: "https://i.imgur.com/TNnGL9a.png",
    text: "4.8/5 Based on 1200+ ratings"
  },
  {
    logo: "https://i.imgur.com/iRK9LRd.png",
    text: "4.5/5 Based on 300+ ratings"
  },
  {
    logo: "https://i.imgur.com/jWlTJvq.png",
    text: "Accredited Agent"
  }
];

export interface ITrustIconsData {
  logo: string;
  text: string;
}

interface TrustIconsWrapperProps {
  TrustIconsData: ITrustIconsData[];
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24
  }
});

const TrustIconsWrapper = ({ TrustIconsData }: TrustIconsWrapperProps) => {
  return (
    <View style={styles.wrapper}>
      {TrustIconsData.map((item, index) => {
        return (
          <TrustIcons key={index} image={{ uri: item.logo }} text={item.text} />
        );
      })}
    </View>
  );
};

const TrustIconsTestCases: ITestCase[] = [
  {
    title: "Partner Section",
    Component: (
      <TrustIcons
        image={{ uri: "https://i.imgur.com/TNnGL9a.png" }}
        text={"4.8/5 Based on 1200+ ratings"}
      />
    )
  },
  {
    title: "Multiple Partner Section",
    Component: <TrustIconsWrapper TrustIconsData={data} />
  }
];

export default TrustIconsTestCases;
