import React from "react";
import { ScrollView } from "react-native";
import { ItineraryNavType } from "../../Itinerary";
import CampaignSlot from "./Components/CampaignSlot";
import UnbookedItinerary from "../../ItineraryStore/UnbookedItinerary";
import BlankSpacer from "../../../../CommonComponents/BlankSpacer/BlankSpacer";

export interface CampaignItineraryProps extends ItineraryNavType {
  itineraryDetails: UnbookedItinerary;
}

const CampaignItinerary = ({
  itineraryDetails,
  navigation,
  route
}: CampaignItineraryProps) => {
  const { days, slots } = itineraryDetails;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {days.map((day, dayIndex) => {
        /**
         * Campaign itineraries don't have a date, hence day index is being used for dayNum
         */
        return (
          <CampaignSlot
            itinerary={itineraryDetails}
            key={dayIndex}
            dayNum={dayIndex + 1}
            slot={slots[dayIndex]}
            navigation={navigation}
            route={route}
            onItemLayout={() => null}
            spinValue={{}}
          />
        );
      })}
      <BlankSpacer height={166} />
    </ScrollView>
  );
};

export default CampaignItinerary;
