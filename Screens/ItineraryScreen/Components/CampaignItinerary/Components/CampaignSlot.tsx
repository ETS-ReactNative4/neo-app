import React from "react";
import { StyleSheet, View, LayoutChangeEvent } from "react-native";
import UnbookedItinerary, {
  IUnbookedIterSlotWithActivity,
  IUnbookedActivitySlotDetail
} from "../../../ItineraryStore/UnbookedItinerary";
import { ItineraryNavType } from "../../../Itinerary";
import { IIterSlotByKey } from "../../../../../TypeInterfaces/IItinerary";
import SectionHeader from "../../../../../CommonComponents/SectionHeader/SectionHeader";
import BookingSectionComponent from "../../../../../CommonComponents/BookingSectionComponent/BookingSectionComponent";
import {
  CONSTANT_flightLogoPlaceholderIllus,
  CONSTANT_leisureIcon,
  CONSTANT_activityThumbPlaceholderIllus
} from "../../../../../constants/imageAssets";

export interface CampaignSlotProps extends ItineraryNavType {
  dayNum: number;
  slot: (IUnbookedIterSlotWithActivity | IIterSlotByKey)[];
  updateSectionPostions: any;
  spinValue: any;
  itinerary: UnbookedItinerary;
}

const CampaignSlot = ({
  dayNum,
  slot,
  updateSectionPostions
}: CampaignSlotProps) => {
  const setOnLayout = (event: LayoutChangeEvent) => {
    updateSectionPostions(event, dayNum);
  };

  return (
    <View onLayout={setOnLayout}>
      <SectionHeader
        sectionName={`Day ${dayNum}`}
        containerStyle={styles.headerContainer}
      />
      {slot.map((item, itemIndex) => {
        switch (item.type) {
          case "INTERNATIONAL_ARRIVE":
            return (
              <BookingSectionComponent
                key={itemIndex}
                containerStyle={styles.horizontalMarginSpacing}
                title={item.name}
                content={item.arrivalSlotDetail.slotText}
                sectionImage={{ uri: "" }}
                isImageContain={true}
                onClick={() => null}
                contentNumberOfLines={3}
                defaultSource={CONSTANT_flightLogoPlaceholderIllus}
                isProcessing={false}
              />
            );
          case "INTERNATIONAL_DEPART":
            return (
              <BookingSectionComponent
                key={itemIndex}
                containerStyle={styles.horizontalMarginSpacing}
                title={item.name}
                content={item.departureSlotDetail.slotText}
                sectionImage={{ uri: "" }}
                isImageContain={true}
                onClick={() => null}
                contentNumberOfLines={3}
                defaultSource={CONSTANT_flightLogoPlaceholderIllus}
                isProcessing={false}
              />
            );

          case "LEISURE":
            return (
              <BookingSectionComponent
                key={itemIndex}
                containerStyle={styles.horizontalMarginSpacing}
                title={item.name}
                content={item.leisureSlotDetail.text}
                sectionImage={CONSTANT_leisureIcon}
                isImageContain={true}
                onClick={() => null}
                contentNumberOfLines={3}
                defaultSource={CONSTANT_leisureIcon}
                isProcessing={false}
              />
            );

          case "ACTIVITY":
            const {
              mainPhoto,
              title
            } = item.activitySlotDetail as IUnbookedActivitySlotDetail;
            return (
              <BookingSectionComponent
                key={itemIndex}
                containerStyle={styles.horizontalMarginSpacing}
                title={item.name}
                content={title}
                sectionImage={{ uri: mainPhoto }}
                isImageContain={false}
                onClick={() => null}
                contentNumberOfLines={3}
                defaultSource={CONSTANT_activityThumbPlaceholderIllus}
                isProcessing={false}
              />
            );

          default:
            return null;
        }
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: { marginHorizontal: 24 },
  horizontalMarginSpacing: { marginHorizontal: 24 }
});

export default CampaignSlot;
