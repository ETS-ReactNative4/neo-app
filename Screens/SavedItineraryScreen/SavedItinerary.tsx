import React, { useEffect, useCallback } from "react";
import { AppNavigatorProps } from "../../NavigatorsV2/AppNavigator";
import {
  SCREEN_SAVED_ITINERARIES,
  SCREEN_ITINERARY
} from "../../NavigatorsV2/ScreenNames";
import PrimaryHeader from "../../NavigatorsV2/Components/PrimaryHeader";
import useSavedItinerariesApi from "../NotificationsScreen/hooks/useSavedItinerariesApi";
import { useFocusEffect } from "@react-navigation/native";
import getImgIXUrl from "../../Services/getImgIXUrl/getImgIXUrl";
import SavedItineraryCard, {
  SAVED_ITINERARY_IMAGE_HEIGHT,
  SAVED_ITINERARY_IMAGE_WIDTH
} from "../../CommonComponents/SavedItineraryCard/SavedItineraryCard";
import XSensorPlaceholder from "../../CommonComponents/XSensorPlaceholder/XSensorPlaceholder";
import CustomScrollView from "../../CommonComponents/CustomScrollView/CustomScrollView";
import useIsUserLoggedIn from "../../Services/isUserLoggedIn/hooks/useIsUserLoggedIn";
import LoginIndent from "../../CommonComponents/LoginIndent/LoginIndent";

type SavedItineraryNavType = AppNavigatorProps<typeof SCREEN_SAVED_ITINERARIES>;

export interface SavedItineraryProps extends SavedItineraryNavType {}

const SavedItinerary = ({ navigation }: SavedItineraryProps) => {
  useEffect(() => {
    navigation.setOptions({
      header: () =>
        PrimaryHeader({
          leftAction: () => navigation.goBack(),
          headerText: "Saved itineraries"
        })
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [savedItineraryApiDetails, loadItineraries] = useSavedItinerariesApi();
  const { successResponseData, isLoading } = savedItineraryApiDetails;
  const { data: savedItineraries = [] } = successResponseData || {};

  useFocusEffect(
    useCallback(() => {
      loadItineraries();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  );

  const isUserLoggedIn = useIsUserLoggedIn();

  if (!isUserLoggedIn) {
    return (
      <LoginIndent message={"Please login to see your saved itineraries"} />
    );
  }

  return (
    <CustomScrollView refreshing={isLoading} onRefresh={loadItineraries}>
      {savedItineraries.map((itinerary, itineraryIndex) => {
        const onNotificationClick = () =>
          navigation.navigate(SCREEN_ITINERARY, {
            itineraryId: itinerary.itineraryId,
            itinerarySource: SCREEN_SAVED_ITINERARIES
          });

        return (
          <SavedItineraryCard
            key={itineraryIndex}
            isUnread={false}
            action={onNotificationClick}
            image={getImgIXUrl({
              src: itinerary.image,
              imgFactor: `h=${SAVED_ITINERARY_IMAGE_HEIGHT}&w=${SAVED_ITINERARY_IMAGE_WIDTH}&crop=fit`
            })}
            cities={itinerary.citiesArr || []}
            lastEdited={itinerary.lastEdited}
            title={itinerary.title}
          />
        );
      })}
      <XSensorPlaceholder />
    </CustomScrollView>
  );
};

export default SavedItinerary;
