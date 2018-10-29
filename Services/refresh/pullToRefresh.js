import storeService from "../storeService/storeService";

const pullToRefresh = ({ itinerary, voucher }) => {
  if (itinerary) {
    const { updateItineraryDetails } = storeService.itineraries;
    updateItineraryDetails();
  }
  if (voucher) {
    const { updateVoucher } = storeService.voucherStore;
    updateVoucher();
  }
};

export default pullToRefresh;
