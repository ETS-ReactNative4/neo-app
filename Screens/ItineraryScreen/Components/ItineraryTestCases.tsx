import React from "react";
import { ITestCase } from "../../../TypeInterfaces/TestCases/ITestCases";
import ItineraryView from "./ItineraryView";
import { ScrollView } from "react-native";
import BlankSpacer from "../../../CommonComponents/BlankSpacer/BlankSpacer";
import BottomButtonBar from "../../../CommonComponents/BottomButtonBar/BottomButtonBar";
import HighlightText from "./HighlightText";

const ItineraryTestCases: ITestCase[] = [
  {
    title: "Before costing",
    Component: (
      <ItineraryView>
        <HighlightText />

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Itinerary Component Code Added Here */}

          <BlankSpacer height={166} />
        </ScrollView>
        <BottomButtonBar
          leftButtonName={"Customize"}
          leftButtonAction={() => {}}
          rightButtonName={"Update cost"}
          rightButtonAction={() => {}}
        />
      </ItineraryView>
    )
  },
  {
    title: "After costing",
    Component: (
      <ItineraryView>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Itinerary Component Code Added Here */}

          <BlankSpacer height={166} />
        </ScrollView>

        <HighlightText afterCost />
        <BottomButtonBar
          leftButtonName={"Customize"}
          leftButtonAction={() => {}}
          rightButtonName={"Update cost"}
          rightButtonAction={() => {}}
        />
      </ItineraryView>
    )
  }
];

export default ItineraryTestCases;
