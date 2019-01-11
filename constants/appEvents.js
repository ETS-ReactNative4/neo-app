const appEvents = {
  starterFindBooking: "starter_find_booking_click",
  starterPlanVacation: "starter_plan_vacation_click",
  mobileNumberOpenCountryCode: "mobile_number_open_country_code_click",
  mobileNumberCloseCountryCode: "mobile_number_close_country_code_click",
  mobileNumberSelectCountryCode: "mobile_number_select_country_code_click",
  mobileNumberNextClick: "mobile_number_next_click_ui",
  mobileNumberKeyboardClick: "mobile_number_next_click_keyboard",
  mobileNumberResendOtp: "mobile_number_resend_otp_click",
  mobileNumberVerifyOtp: "mobile_number_verify_otp_click",
  mobileNumberOtpAutoFill: "mobile_number_otp_autofill",
  mobileNumberOtpFailed: "mobile_number_otp_failed",
  userLoggedInEvent: "user_logged_in",
  tripToggleClickEvent: "trip_toggle_click",
  tripViewScroll: "trip_view_scroll",
  tripViewLiteScroll: "trip_view_lite_scroll",
  tripHighlightsScroll: "trip_highlights_scroll",
  hamburgerButtonClick: "hamburger_click",
  selectBookingHeaderClick: "select_booking_header_button_click",
  bookingsHomeCalendarDateClick: "bookings_home_calendar_date_click",
  bookingsHomeCalendarNoEventClick: "bookings_home_calendar_no_event_click",
  bookingsHomeAccordionFlightsHeaderClick:
    "bookings_home_accordion_flights_header_click",
  bookingsHomeAccordionHotelsHeaderClick:
    "bookings_home_accordion_hotels_header_click",
  bookingsHomeAccordionTransfersHeaderClick:
    "bookings_home_accordion_transfers_header_click",
  bookingsHomeAccordionPassesHeaderClick:
    "bookings_home_accordion_passes_header_click",
  bookingsHomeAccordionActivitiesHeaderClick:
    "bookings_home_accordion_activities_header_click",
  bookingsHomeAccordionTrainsHeaderClick:
    "bookings_home_accordion_trains_header_click",
  bookingsHomeAccordionFerriesHeaderClick:
    "bookings_home_accordion_ferries_header_click",
  bookingsHomeAccordionRentalCarsHeaderClick:
    "bookings_home_accordion_rental_cars_header_click",
  bookingsHomeAccordionVisaHeaderClick:
    "bookings_home_accordion_visa_header_click",
  bookingsHomeAccordionInsuranceHeaderClick:
    "bookings_home_accordion_insurance_header_click",
  bookingsHomeAccordionFlightsVoucherClick:
    "bookings_home_accordion_flights_voucher_click",
  bookingsHomeAccordionHotelsVoucherClick:
    "bookings_home_accordion_hotels_voucher_click",
  bookingsHomeAccordionTransfersVoucherClick:
    "bookings_home_accordion_transfers_voucher_click",
  bookingsHomeAccordionPassesVoucherClick:
    "bookings_home_accordion_passes_voucher_click",
  bookingsHomeAccordionActivitiesVoucherClick:
    "bookings_home_accordion_activities_voucher_click",
  bookingsHomeAccordionTrainsVoucherClick:
    "bookings_home_accordion_trains_voucher_click",
  bookingsHomeAccordionFerriesVoucherClick:
    "bookings_home_accordion_ferries_voucher_click",
  bookingsHomeAccordionRentalCarsVoucherClick:
    "bookings_home_accordion_rental_cars_voucher_click",
  bookingsHomeAccordionVisaVoucherClick:
    "bookings_home_accordion_visa_voucher_click",
  bookingsHomeAccordionInsuranceVoucherClick:
    "bookings_home_accordion_insurance_voucher_click",
  bookingsHomeDownloadAllVouchersClick:
    "bookings_home_download_all_vouchers_click",
  bookedItineraryContentScroll: "booked_itinerary_content_scroll",
  bookedItineraryExploreGuideClick: "booked_itinerary_explore_guide_click",
  bookedItineraryFlightVoucherClick: "booked_itinerary_flight_voucher_click",
  bookedItineraryActivityVoucherClick:
    "booked_itinerary_activity_voucher_click",
  bookedItineraryTransferVoucherClick:
    "booked_itinerary_transfer_voucher_click",
  bookedItineraryHeaderClick: "booked_itinerary_header_click",
  bookedItineraryHeaderCityNameClick: "booked_itinerary_header_city_name_click",
  yourBookingsCloseButtonClick: "your_bookings_close_button_click",
  yourBookingsSelectItineraryClick: "your_bookings_select_itinerary_click",
  chatOpenSupportCenterClick: "chat_open_support_center_click",
  chatCallSupportClick: "chat_call_support_click",
  toolsPlacesTileClick: "tools_places_tile_click",
  toolsCommonPhrasesTileClick: "tools_common_phrases_tile_click",
  toolsEmergencyContactsTileClick: "tools_emergency_contacts_tile_click",
  toolsWeatherForecastTileClick: "tools_weather_forecast_tile_click",
  toolsSupportCenterTileClick: "tools_support_center_tile_click",
  toolsPassportTileClick: "tools_passport_tile_click",
  toolsDocumentsVisaTileClick: "tools_documents_visa_tile_click",
  placesHeaderClick: "places_header_click",
  placesHeaderCityNameClick: "places_header_city_name_click",
  placesCarouselScroll: "places_carousel_scroll",
  placesCategoryTileClick: "places_category_tile_click",
  nearByAllStarClick: "near_by_filter_all_star_click",
  nearByThreeStarClick: "near_by_filter_three_star_click",
  nearByFourStarClick: "near_by_filter_four_star_click",
  nearByFiveStarClick: "near_by_filter_five_star_click",
  nearByRatingsClick: "near_by_sort_ratings_click",
  nearByLocationClick: "near_by_sort_location_click",
  nearByHotelClick: "near_by_sort_hotel_click",
  nearByPlaceDetailsClick: "near_by_place_details_click",
  nearByPlaceDirectionsClick: "near_by_place_directions_click",
  nearByContactPlaceClick: "near_by_place_contact_click",
  currencyConverterSwapCurrencyClick: "currency_converter_swap_currency_click",
  currencyConverterChangeCurrencyNativeClick:
    "currency_converter_change_currency_native_click",
  currencyConverterChangeCurrencyForeignClick:
    "currency_converter_change_currency_foreign_click",
  currencyConverterSelectCurrencyClick:
    "currency_converter_select_currency_click",
  commonPhrasesPlayAudioClick: "common_phrases_play_audio_click",
  commonPhrasesTranslateFromBookClick:
    "common_phrases_translate_from_book_click",
  commonPhrasesPinClick: "common_phrases_pin_click",
  commonPhrasesUnPinClick: "common_phrases_unpin_click",
  commonPhrasesTranslateButtonClick: "common_phrases_translate_button_click",
  commonPhrasesChangeLanguageButtonClick:
    "common_phrases_change_language_button_click",
  commonPhrasesSelectDifferentLanguageClick:
    "common_phrases_select_different_language_click",
  emergencyContactsPoliceNumberClick: "emergency_contacts_police_number_click",
  emergencyContactsAmbulanceNumberClick:
    "emergency_contacts_ambulance_number_click",
  emergencyContactsFireDeptNumberClick:
    "emergency_contacts_fire_dept_number_click",
  emergencyContactsChildrenMissingNumberClick:
    "emergency_contacts_children_missing_number_click",
  emergencyContactsEmbassyDirectionsClick:
    "emergency_contacts_embassy_directions_click",
  emergencyContactsEmbassyContactsClick:
    "emergency_contacts_embassy_contact_click",
  weatherTileClick: "weather_tile_click",
  packingChecklistSelectItemClick: "packing_checklist_select_item_click",
  packingChecklistUnselectItemClick: "packing_checklist_unselect_item_click",
  packingChecklistAddItemClick: "packing_checklist_add_item_click",
  packingChecklistAddItemClickKeyboard:
    "packing_checklist_add_item_click_keyboard",
  packingChecklistRemoveItemClick: "packing_checklist_remove_item_click",
  visaDocumentsContactHelpdeskClick: "visa_documents_contact_helpdesk_click",
  visaDocumentsGetChecklistClick: "visa_documents_get_checklist_click",
  visaDocumentsEmailChecklistClick: "visa_documents_email_checklist_click"
};

// console.log('-----------------------------------');
// console.log(Object.values(appEvents).length);
// console.log('-----------------------------------');

export default appEvents;
