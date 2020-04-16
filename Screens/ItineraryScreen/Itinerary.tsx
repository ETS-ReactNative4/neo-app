import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import ItineraryView from "./Components/ItineraryView";
import HighlightText from "./Components/HighlightText";
import BlankSpacer from "../../CommonComponents/BlankSpacer/BlankSpacer";
import BottomButtonBar from "../../CommonComponents/BottomButtonBar/BottomButtonBar";
import { AppNavigatorProps } from "../../NavigatorsV2/AppNavigator";
import { SCREEN_ITINERARY } from "../../NavigatorsV2/ScreenNames";
import TranslucentStatusBar from "../../CommonComponents/TranslucentStatusBar/TranslucentStatusBar";
import apiCall from "../../Services/networkRequests/apiCall";
import { CONSTANT_packages } from "../../constants/apiUrls";

type ItineraryNavType = AppNavigatorProps<typeof SCREEN_ITINERARY>;

export interface ItineraryProps extends ItineraryNavType {}

const Itinerary = ({ route }: ItineraryProps) => {
  useEffect(() => {
    const { slug = "" } = route.params;
    apiCall(CONSTANT_packages, {
      key: slug
    })
      .then(data => {
        console.log(data);
      })
      .catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ItineraryView>
      <TranslucentStatusBar />
      <HighlightText />

      <ScrollView showsVerticalScrollIndicator={false}>
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
  );
};

export default Itinerary;
