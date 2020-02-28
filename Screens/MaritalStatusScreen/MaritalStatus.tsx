import React, { useState, useEffect, Fragment, useRef } from "react";
import { View, StyleSheet, LayoutAnimation } from "react-native";
import SectionTitle from "../../CommonComponents/SectionTitle/SectionTitle";
import MaritalStatusCard from "./Components/MaritalStatusCard";
import PrimaryButton from "../../CommonComponents/PrimaryButton/PrimaryButton";
import { isIphoneX } from "react-native-iphone-x-helper";
import { CONSTANT_xSensorAreaHeight } from "../../constants/styles";
import MasonryView from "react-native-masonry-scrollview";

import {
  responsiveWidth
  // @ts-ignore
} from "react-native-responsive-dimensions";
import { SCREEN_TRAVEL_MARITAL_STATUS } from "../../NavigatorsV2/ScreenNames";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppNavigatorParamsType } from "../../NavigatorsV2/AppNavigator";
import WelcomeHeader from "../../NavigatorsV2/Components/WelcomeHeader";
import { observer, inject } from "mobx-react";
import TravelProfile from "../../mobx/TravelProfile";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import * as Animatable from "react-native-animatable";
import MaritalStatusActionSheet from "./Components/MaritalStatusActionSheet";
import ratioCalculator from "../../Services/ratioCalculator/ratioCalculator";

const { createAnimatableComponent } = Animatable;

const AnimatableView = createAnimatableComponent(View);

type screenName = typeof SCREEN_TRAVEL_MARITAL_STATUS;

export type MaritalStatusScreenNavigationProp = StackNavigationProp<
  AppNavigatorParamsType,
  screenName
>;

export interface IMaritalStatusData {
  text: string;
  image: string;
}

export interface MaritalStatusProps {
  navigation: MaritalStatusScreenNavigationProp;
  travelProfileStore: TravelProfile;
}

export interface IMaritalStatusOptions {
  id: number;
  imageUrl: string;
  text: string;
  isSelected: boolean;
}

/* SPACER */
const SPACING = 24;
const BOTTOM_SPACING = SPACING;

const MARITAL_STATUS_CARD_WIDTH = responsiveWidth(50) - SPACING;
const MARITAL_STATUS_CARD_HEIGHT = ratioCalculator(
  24,
  31,
  MARITAL_STATUS_CARD_WIDTH
);

const MaritalStatusComponent = ({
  navigation,
  travelProfileStore
}: MaritalStatusProps) => {
  const {
    maritalStatusOptions,
    maritalStatusOptionImages
  } = travelProfileStore;

  const maritalStatusRef = useRef(null);

  const [maritalStatusOptionsData, setMaritalStatusOptionsData] = useState<
    IMaritalStatusOptions[]
  >([]);

  useEffect(() => {
    setMaritalStatusOptionsData(
      maritalStatusOptions.map((maritalStatus, index) => {
        return {
          id: index,
          // @ts-ignore - unable to fix this type
          imageUrl: maritalStatusOptionImages[maritalStatus],
          text: maritalStatus,
          isSelected: false
        };
      })
    );

    navigation.setOptions({
      header: options =>
        WelcomeHeader(options, {
          rightLinkText: "Skip question",
          onRightLinkClick: skipFlow,
          leftLinkText: "Part 2 of 3",
          onLeftLinkClick: prevScreen
        })
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const skipFlow = () => {};

  const prevScreen = () => {};

  const continueFlow = () => {};

  const selectSuggestedMaritalStatusData = (statusIndex: number) => {
    const statusList = [...maritalStatusOptionsData];
    statusList[statusIndex].isSelected = !statusList[statusIndex].isSelected;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setMaritalStatusOptionsData(statusList);
  };

  const selectedMaritalOptions = maritalStatusOptionsData.filter(
    maritalOption => maritalOption.isSelected
  );

  return (
    <Fragment>
      <View style={styles.maritalStatusContainer}>
        <View style={styles.headerContainer}>
          <SectionTitle
            title={"What’s your marital status?"}
            description={
              "Soul searching, honeymoons, anniversary trips or full family vacations, we’ll plan them all for you :)"
            }
            containerStyle={styles.sectionTitleStyle}
          />
        </View>

        <View style={styles.bodyContainer}>
          <MasonryView
            columns={2}
            columnStyle={styles.scrollColumn}
            oddColumnStyle={styles.oddColumnStyle}
            evenColumnStyle={styles.evenColumnStyle}
          >
            {maritalStatusOptionsData.map((suggestedMaritalData, index) => {
              const onSelect = () => {
                selectSuggestedMaritalStatusData(suggestedMaritalData.id);
              };

              return (
                <MaritalStatusCard
                  key={index}
                  onPress={onSelect}
                  imageSource={suggestedMaritalData.imageUrl}
                  text={suggestedMaritalData.text}
                  isSelected={suggestedMaritalData.isSelected}
                  maritalStatusCardWidth={MARITAL_STATUS_CARD_WIDTH}
                  maritalStatusCardHeight={MARITAL_STATUS_CARD_HEIGHT}
                />
              );
            })}
          </MasonryView>
        </View>

        <AnimatableView
          animation={selectedMaritalOptions.length ? "fadeInUp" : "fadeOutDown"}
          style={styles.footerContainer}
          useNativeDriver={true}
          duration={150}
        >
          <PrimaryButton
            text={"Up Next - Holiday Style"}
            clickAction={continueFlow}
          />
        </AnimatableView>
      </View>
      <MaritalStatusActionSheet
        checkboxData={[]}
        actionSheetRef={maritalStatusRef}
      />
    </Fragment>
  );
};

const MaritalStatus = ErrorBoundary()(
  inject("travelProfileStore")(observer(MaritalStatusComponent))
);

const styles = StyleSheet.create({
  maritalStatusContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: SPACING + 8
  },
  headerContainer: {},
  bodyContainer: {
    flex: 1
  },
  sectionTitleStyle: {
    marginBottom: BOTTOM_SPACING
  },
  footerContainer: {
    marginTop: 16,
    paddingBottom:
      BOTTOM_SPACING + (isIphoneX() ? CONSTANT_xSensorAreaHeight : 0)
  },
  scrollColumn: {
    width: responsiveWidth(50) - 40
  },
  oddColumnStyle: {
    paddingLeft: 4
  },
  evenColumnStyle: {
    paddingRight: 4
  }
});

export default MaritalStatus;
