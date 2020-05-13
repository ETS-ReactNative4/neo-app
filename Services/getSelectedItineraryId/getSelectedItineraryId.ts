import storeService from "../storeService/storeService";

const getSelectedItineraryId = () => {
  if (storeService.itineraries.selectedItineraryId) {
    return storeService.itineraries.selectedItineraryId;
  } else {
    return storeService.yourBookingsStore.upcomingItineraries.length
      ? storeService.yourBookingsStore.upcomingItineraries[0].itineraryId
      : "";
  }
};

export default getSelectedItineraryId;
