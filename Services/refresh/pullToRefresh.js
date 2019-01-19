import storeService from "../storeService/storeService";

const pullToRefresh = ({ itinerary, voucher }) => {
  const itineraryId = storeService.itineraries.selectedItineraryId;
  if (itinerary) {
    const { updateItineraryDetails } = storeService.itineraries;
    updateItineraryDetails(itineraryId);
  }
  if (voucher) {
    const { updateVoucher } = storeService.voucherStore;
    updateVoucher(itineraryId);
  }
};

export default pullToRefresh;
