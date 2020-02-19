import React from "react";

import { ITestCase } from "../../TypeInterfaces/TestCases/ITestCases";
import { View, StyleSheet } from "react-native";
import SecurePartner from "./SecurePartner";

const data: IPartnerData[] = [
  {
    logo: "https://i.imgur.com/CuzPdn6.png",
    fallbackLogo: "https://i.imgur.com/CuzPdn6.png"
  },
  {
    logo: "https://i.imgur.com/G2RiQ0H.png",
    fallbackLogo: "https://i.imgur.com/G2RiQ0H.png"
  },
  {
    logo: "https://i.imgur.com/WoBurIh.png",
    fallbackLogo: "https://i.imgur.com/WoBurIh.png"
  },
  {
    logo: "https://i.imgur.com/740Rtyd.png",
    fallbackLogo: "https://i.imgur.com/740Rtyd.png"
  }
];

interface IPartnerData {
  logo: string;
  fallbackLogo: string;
}

interface SecurePartnerWrapperProps {
  securePartnerData: IPartnerData[];
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16
  }
});

const SecurePartnerWrapper = ({
  securePartnerData
}: SecurePartnerWrapperProps) => {
  return (
    <View style={styles.wrapper}>
      {securePartnerData.map((dataObj, index) => {
        return (
          <SecurePartner
            key={index}
            logo={{ uri: dataObj.logo }}
            fallbackLogo={{ uri: dataObj.fallbackLogo }}
          />
        );
      })}
    </View>
  );
};

const SecurePartnerTestCases: ITestCase[] = [
  {
    title: "Secure Partner Logo Section",
    Component: <SecurePartnerWrapper securePartnerData={data} />
  }
];

export default SecurePartnerTestCases;
