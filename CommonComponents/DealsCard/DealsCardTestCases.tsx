import React from "react";

import { ITestCase } from "../../TypeInterfaces/TestCases/ITestCases";
import DealsCard from "./DealsCard";
import { CONSTANT_defaultPlaceImage } from "../../constants/imageAssets";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  dealsTestCaseWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

const DealsCardTestCases: ITestCase[] = [
  {
    title: "Deals/Staycations Card",
    Component: (
      <View style={styles.dealsTestCaseWrapper}>
        <DealsCard
          defaultSource={{ uri: CONSTANT_defaultPlaceImage }}
          imgSource={{
            uri:
              "https://pyt-images.imgix.net/images/product_blog/operahouse.jpeg"
          }}
          width={responsiveWidth(100) - 48}
          location={"Chennai"}
          title={"2 nights weekend getaway to Camp Serai Tiger"}
          info={"Travel On: Nov 7 - May 15"}
          bookingTime={"Book by Jan 3"}
          offerPercent={8}
          strikedPrice={"₹ 83,200"}
          price={"75,500"}
          onClick={() => null}
          offerText={"Early Bird Offer"}
          isPerPerson
        />
      </View>
    )
  }
];

export default DealsCardTestCases;
