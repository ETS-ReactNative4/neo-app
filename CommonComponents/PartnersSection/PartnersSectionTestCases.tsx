import React from "react";

import { ITestCase } from "../../TypeInterfaces/TestCases/ITestCases";
import { View, StyleSheet } from "react-native";
import PartnersSection from "./PartnersSection";

const data: IPartnerData[] = [
  {
    logo: "https://i.imgur.com/TNnGL9a.png",
    fallbackLogo: "https://i.imgur.com/TNnGL9a.png",
    text: "4.8/5 Based on 1200+ ratings"
  },
  {
    logo: "https://i.imgur.com/iRK9LRd.png",
    fallbackLogo: "https://i.imgur.com/iRK9LRd.png",
    text: "4.5/5 Based on 300+ ratings"
  },
  {
    logo: "https://i.imgur.com/jWlTJvq.png",
    fallbackLogo: "https://i.imgur.com/jWlTJvq.png",
    text: "Accredited Agent"
  }
];

interface IPartnerData {
  logo: string;
  fallbackLogo: string;
  text: string;
}

interface PartnersSectionWrapperProps {
  partnetData: IPartnerData[];
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24
  }
});

const PartnersSectionWrapper = ({
  partnetData
}: PartnersSectionWrapperProps) => {
  return (
    <View style={styles.wrapper}>
      {partnetData.map((dataObj, index) => {
        return (
          <PartnersSection
            key={index}
            logo={{ uri: dataObj.logo }}
            fallbackLogo={{ uri: dataObj.fallbackLogo }}
            text={dataObj.text}
          />
        );
      })}
    </View>
  );
};

const PartnersSectionTestCases: ITestCase[] = [
  {
    title: "Partner Section",
    Component: (
      <PartnersSection
        logo={{ uri: "https://i.imgur.com/TNnGL9a.png" }}
        fallbackLogo={{ uri: "https://i.imgur.com/TNnGL9a.png" }}
        text={"4.8/5 Based on 1200+ ratings"}
      />
    )
  },
  {
    title: "Multiple Partner Section",
    Component: <PartnersSectionWrapper partnetData={data} />
  }
];

export default PartnersSectionTestCases;
