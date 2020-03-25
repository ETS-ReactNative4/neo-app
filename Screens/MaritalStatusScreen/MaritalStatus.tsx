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
import TravelProfile, {
  travellingWithType,
  maritalStatusType
} from "../../mobx/TravelProfile";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import * as Animatable from "react-native-animatable";
import MaritalStatusActionSheet from "./Components/MaritalStatusActionSheet";
import ratioCalculator from "../../Services/ratioCalculator/ratioCalculator";
import { CONSTANT_white1 } from "../../constants/colorPallete";
import launchPretripHome from "../../Services/launchPretripHome/launchPretripHome";
import skipUserProfileBuilder from "../../Services/skipUserProfileBuilder/skipUserProfileBuilder";
import WelcomeState from "../../mobx/WelcomeState";

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
  welcomeStateStore: WelcomeState;
}

export interface IMaritalStatusOptions {
  id: number;
  imageUrl: string;
  text: maritalStatusType;
  isSelected: boolean;
}

export interface ITravellingWithOptions {
  id: number;
  text: travellingWithType;
  isSelected: boolean;
}

/* SPACER */
const SPACING = 24;
const BOTTOM_SPACING = SPACING;

const MARITAL_STATUS_CARD_WIDTH = responsiveWidth(50) - SPACING - 4;
const MARITAL_STATUS_CARD_HEIGHT = ratioCalculator(
  24,
  31,
  MARITAL_STATUS_CARD_WIDTH
);

const MaritalStatusComponent = ({
  navigation,
  travelProfileStore,
  welcomeStateStore
}: MaritalStatusProps) => {
  const {
    maritalStatusOptions,
    maritalStatusOptionImages,
    travellingWith
  } = travelProfileStore;

  const maritalStatusRef = useRef(null);

  const [maritalStatusOptionsData, setMaritalStatusOptionsData] = useState<
    IMaritalStatusOptions[]
  >([]);
  const [travellingWithOptionsData, setTravellingWithOptionsData] = useState<
    ITravellingWithOptions[]
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

    setTravellingWithOptionsData(
      travellingWith.map((item, itemIndex) => {
        return {
          id: itemIndex,
          text: item,
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

  const openTravellingWithModal = () => {
    travelProfileStore.updateTravelProfileData({
      maritalStatus: maritalStatusOptionsData.find(option => option.isSelected)
        ?.text
    });
    // @ts-ignore
    maritalStatusRef.current?.snapTo({ index: 1 });
  };

  const skipFlow = () => {
    welcomeStateStore.patchWelcomeState(
      "skippedAt",
      SCREEN_TRAVEL_MARITAL_STATUS
    );
    navigation.dispatch(skipUserProfileBuilder());
  };

  const prevScreen = () => {
    navigation.goBack();
  };

  const continueFlow = () => {
    welcomeStateStore.patchWelcomeState("seenMaritalStatus", true);
    travelProfileStore.updateTravelProfileData({
      travellingWith: travellingWithOptionsData
        .filter(option => option.isSelected)
        .map(option => option.text)
    });
    navigation.dispatch(launchPretripHome({ source: "TravelProfileFlow" }));
  };

  const selectSuggestedMaritalStatusData = (statusId: number) => {
    const statusList = maritalStatusOptionsData.map(option => {
      if (option.id === statusId) {
        return {
          ...option,
          isSelected: !option.isSelected
        };
      }
      return {
        ...option,
        isSelected: false
      };
    });
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setMaritalStatusOptionsData(statusList);
  };

  const selectTravellingWithOption = (id: number) => {
    const travellingWithOptionsList = travellingWithOptionsData.map(item => {
      if (item.id === id) {
        return {
          ...item,
          isSelected: !item.isSelected
        };
      }
      return item;
    });
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTravellingWithOptionsData(travellingWithOptionsList);
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
            clickAction={openTravellingWithModal}
          />
        </AnimatableView>
      </View>
      <MaritalStatusActionSheet
        onChange={selectTravellingWithOption}
        onNext={continueFlow}
        checkboxData={travellingWithOptionsData}
        actionSheetRef={maritalStatusRef}
      />
    </Fragment>
  );
};

const MaritalStatus = ErrorBoundary()(
  inject("welcomeStateStore")(
    inject("travelProfileStore")(observer(MaritalStatusComponent))
  )
);

const styles = StyleSheet.create({
  maritalStatusContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: CONSTANT_white1,
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
  oddColumnStyle: {
    paddingLeft: 4
  },
  evenColumnStyle: {
    paddingRight: 4
  }
});

export default MaritalStatus;
