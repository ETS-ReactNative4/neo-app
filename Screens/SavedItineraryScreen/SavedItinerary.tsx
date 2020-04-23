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
import SavedItineraryCard from "../../CommonComponents/SavedItineraryCard/SavedItineraryCard";
import XSensorPlaceholder from "../../CommonComponents/XSensorPlaceholder/XSensorPlaceholder";
import CustomScrollView from "../../CommonComponents/CustomScrollView/CustomScrollView";

type SavedItineraryNavType = AppNavigatorProps<typeof SCREEN_SAVED_ITINERARIES>;

export interface SavedItineraryProps extends SavedItineraryNavType {}

const SavedItinerary = ({ navigation }: SavedItineraryProps) => {
  useEffect(() => {
    navigation.setOptions({
      header: () =>
        PrimaryHeader({
          leftAction: () => navigation.goBack(),
          headerText: "Saved Itineraries"
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

  return (
    <CustomScrollView refreshing={isLoading} onRefresh={loadItineraries}>
      {savedItineraries.map((itinerary, itineraryIndex) => {
        const onNotificationClick = () =>
          navigation.navigate(SCREEN_ITINERARY, {
            itineraryId: itinerary.itineraryId
          });

        return (
          <SavedItineraryCard
            key={itineraryIndex}
            isUnread={false}
            action={onNotificationClick}
            image={getImgIXUrl({ src: itinerary.image })}
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
