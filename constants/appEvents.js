export const CONSTANT_drawerEvents = {
  event: "Drawer",
  click: {
    login: "login",
    home: "home",
    payments: "payments",
    about: "about",
    storyBook: "storyBook",
    logout: "logout",
    openDrawer: "open_drawer"
  }
};

export const CONSTANT_notificationEvents = {
  event: "PushNotification",
  notificationType: {
    // This property is served from backend
  },
  notificationProps: {
    // This property is served from backend
  }
};

const appEvents = {
  StarterScreen: {
    event: "Starter",
    click: {
      findBooking: "find_booking",
      planVacation: "plan_vacation",
      termsAndConditions: "terms_and_conditions",
      privacyPolicy: "privacy_policy"
    }
  },
  MobileNumber: {
    event: "MobileNumber",
    click: {
      openCountryCode: "open_country_code",
      closeCountryCode: "close_country_code",
      selectCountryCode: "select_country_code",
      requestOtpUi: "request_otp_ui",
      requestOtpKeyboard: "request_otp_keyboard",
      resendOtp: "resend_otp",
      verifyOtp: "verify_otp"
    },
    type: {
      otpFailed: "otp_failed"
    }
  },
  userLoggedInEvent: "user_logged_in",
  userLoggedOutEvent: "user_logged_out",
  tripToggleClickEvent: "trip_toggle_click",
  selectBookingHeaderClick: "select_booking_header_button_click",
  YourBookings: {
    event: "YourBookings",
    click: {
      closeButton: "close_button",
      selectItinerary: "select_itinerary"
    }
  },
  TripFeed: {
    event: "TripFeed",
    widget: {
      // Widget Names go here from backend
    },
    click: {
      positiveClick: "positive_click",
      negativeClick: "negative_click",
      submitFeedback: "submit_feedback"
    }
  },
  hamburgerButtonClick: "hamburger_click",
  Journal: {
    event: "Journal",
    click: {
      addNewStory: "add_new_story",
      addNewStoryFab: "add_new_story_fab",
      viewJournal: "view_journal",
      publishJournal: "publish_journal",
      openShareScreen: "open_share_journal_screen",
      shareStory: "story_share",
      editStory: "edit_story",
      deleteStory: "delete_story",
      imagePickerCrop: "image_picker_crop",
      imagePickerContain: "image_picker_contain",
      imagePickerDelete: "image_picker_delete",
      publishScreenShare: "publish_screen_share",
      shareScreenShare: "share_screen_share"
    },
    share: {
      facebook: "facebook",
      twitter: "twitter",
      common: "common"
    }
  },
  Bookings: {
    event: "Bookings",
    click: {
      accordionHeader: "accordion_header",
      accordionVoucher: "accordion_voucher",
      downloadAllVouchers: "download_all_vouchers",
      calendarEventDate: "calendar_event_date",
      calendarNoEventDate: "calendar_no_event_date"
    },
    type: {
      flights: "flights",
      hotels: "hotels",
      transfers: "transfers",
      passes: "passes",
      activities: "activities",
      trains: "trains",
      ferries: "ferries",
      rentalCars: "rental_cars",
      visa: "visa",
      insurance: "insurance"
    }
  },
  Home: {
    event: "Home",
    click: {
      packageCard: "package_card",
      startPlanningNow: "start_planning",
      findBooking: "find_booking",
      openProduct: "open_product"
    }
  },
  BookedItinerary: {
    event: "BookedItinerary",
    scroll: {
      contentScroll: "content_scroll"
    },
    click: {
      voucher: "voucher",
      header: "header",
      headerCity: "header_city",
      exploreGuide: "explore_guide"
    },
    type: {
      activity: "activity",
      transfer: "transfer",
      activityWithTransfer: "activity_with_transfer",
      flight: "flight"
    }
  },
  Tools: {
    event: "Tools",
    click: {
      currencyConverter: "currency_converter",
      placesTile: "places_tile",
      commonPhrases: "common_phrases",
      emergencyContacts: "emergency_contacts",
      weatherForecast: "weather_forecast",
      helpDesk: "help_desk",
      passport: "passport",
      documentsVisa: "documents_visa",
      packingChecklist: "packing_checklist",
      forex: "forex"
    }
  },
  Payment: {
    event: "Payment",
    click: {
      selectItinerary: "select_itinerary",
      startPayment: "start_payment",
      clearPayment: "clear_payment",
      paymentSuccess: "payment_success",
      paymentFailure: "payment_failure",
      paymentFailureHelpDesk: "payment_failure_help_desk",
      offlinePaymentLink: "offline_payment_link"
    }
  },
  Places: {
    event: "Places",
    click: {
      header: "header",
      headerCity: "header_city",
      category: "category",
      filter: "filter",
      sort: "sort",
      placeDetails: "place_details",
      placeContact: "place_contact",
      placeDirections: "place_directions"
    },
    scroll: {
      placesCarousel: "places_carousel"
    },
    type: {
      allStar: "all_star",
      threeStar: "three_star",
      fourStar: "four_star",
      fiveStar: "five_star",
      ratings: "ratings",
      location: "location",
      hotel: "hotel"
    }
  },
  weatherTileClick: "weather_tile_click",
  CommonPhrases: {
    event: "CommonPhrases",
    click: {
      playAudio: "play_audio",
      book: "book",
      pin: "pin",
      unPin: "un_pin",
      translate: "translate",
      changeLanguage: "change_language",
      selectLanguage: "select_language"
    }
  },
  EmergencyContacts: {
    event: "EmergencyContacts",
    click: {
      phoneNumber: "phone_number",
      directions: "directions"
    },
    type: {
      police: "police",
      ambulance: "ambulance",
      fire: "fire",
      missingChildren: "missing_children",
      embassy: "embassy"
    }
  },
  PackingChecklist: {
    event: "PackingChecklist",
    click: {
      selectItem: "select_item",
      unselectItem: "unselect_item",
      addItem: "add_item",
      addItemKeyboard: "add_item_keyboard",
      removeItem: "remove_item"
    }
  },
  CurrencyConverter: {
    event: "CurrencyConverter",
    click: {
      swap: "swap",
      changeNative: "change_native",
      changeForeign: "change_foreign",
      selectCurrency: "select_currency"
    }
  },
  Visa: {
    event: "Visa",
    click: {
      contactHelpdesk: "contact_helpdesk",
      getChecklist: "get_checklist",
      emailChecklist: "email_checklist",
      initializeVisa: "visa_initialize",
      docsChecklistHeader: "docs_checklist_header",
      visaSelectorList: "visa_selector_list",
      docsChecklistWidget: "docs_checklist_widget",
      visaHelpWidget: "visa_help_widget",
      callAccountOwnerBar: "call_account_owner_bar",
      callAccountOwnerFab: "call_account_owner_fab",
      callAccountOwnerRejectedBar: "call_account_owner_rejected_bar",
      maritalDropDownOption: "marital_drop_down_option",
      employmentDropDownOption: "employment_drop_down_option",
      toggleDocsCheckbox: "toggle_docs_check_box",
      toggleDocsAccordion: "toggle_docs_accordion",
      toggleVisaCard: "toggle_visa_card",
      visaGranted: "visa_granted",
      visaRejected: "visa_rejected",
      visaExpedite: "visa_expedite",
      emailAoFromCard: "email_ao_from_card"
    }
  },
  Chat: {
    event: "Chat",
    click: {
      openChat: "open_chat",
      notifAppStart: "notif_app_start",
      notifAppForeGround: "notif_app_foreground"
    }
  },
  tripViewScroll: "trip_view_scroll",
  tripViewLiteScroll: "trip_view_lite_scroll",
  tripHighlightsScroll: "trip_highlights_scroll",
  voucherHeaderViewVoucherClick: "voucher_header_view_voucher_click",
  chatCallSupportClick: "chat_call_support_click"
};

/**
 * Old events that are no longer in use...
 */
// visaDocumentsContactHelpdeskClick: "visa_documents_contact_helpdesk_click",
// visaDocumentsGetChecklistClick: "visa_documents_get_checklist_click",
// visaDocumentsEmailChecklistClick: "visa_documents_email_checklist_click",
// currencyConverterSwapCurrencyClick: "currency_converter_swap_currency_click",
// currencyConverterChangeCurrencyNativeClick:
//   "currency_converter_change_currency_native_click",
// currencyConverterChangeCurrencyForeignClick:
//   "currency_converter_change_currency_foreign_click",
// currencyConverterSelectCurrencyClick:
//   "currency_converter_select_currency_click",
// packingChecklistSelectItemClick: "packing_checklist_select_item_click",
// packingChecklistUnselectItemClick: "packing_checklist_unselect_item_click",
// packingChecklistAddItemClick: "packing_checklist_add_item_click",
// packingChecklistAddItemClickKeyboard:
//   "packing_checklist_add_item_click_keyboard",
// packingChecklistRemoveItemClick: "packing_checklist_remove_item_click",
// emergencyContactsPoliceNumberClick: "emergency_contacts_police_number_click",
// emergencyContactsAmbulanceNumberClick:
//   "emergency_contacts_ambulance_number_click",
// emergencyContactsFireDeptNumberClick:
//   "emergency_contacts_fire_dept_number_click",
// emergencyContactsChildrenMissingNumberClick:
//   "emergency_contacts_children_missing_number_click",
// emergencyContactsEmbassyDirectionsClick:
//   "emergency_contacts_embassy_directions_click",
// emergencyContactsEmbassyContactsClick:
//   "emergency_contacts_embassy_contact_click",
// commonPhrasesPlayAudioClick: "common_phrases_play_audio_click",
// commonPhrasesTranslateFromBookClick:
//   "common_phrases_translate_from_book_click",
// commonPhrasesPinClick: "common_phrases_pin_click",
// commonPhrasesUnPinClick: "common_phrases_unpin_click",
// commonPhrasesTranslateButtonClick: "common_phrases_translate_button_click",
// commonPhrasesChangeLanguageButtonClick:
//   "common_phrases_change_language_button_click",
// commonPhrasesSelectDifferentLanguageClick:
//   "common_phrases_select_different_language_click",
// placesHeaderClick: "places_header_click",
// placesHeaderCityNameClick: "places_header_city_name_click",
// placesCarouselScroll: "places_carousel_scroll",
// placesCategoryTileClick: "places_category_tile_click",
// nearByAllStarClick: "near_by_filter_all_star_click",
// nearByThreeStarClick: "near_by_filter_three_star_click",
// nearByFourStarClick: "near_by_filter_four_star_click",
// nearByFiveStarClick: "near_by_filter_five_star_click",
// nearByRatingsClick: "near_by_sort_ratings_click",
// nearByLocationClick: "near_by_sort_location_click",
// nearByHotelClick: "near_by_sort_hotel_click",
// nearByPlaceDetailsClick: "near_by_place_details_click",
// nearByPlaceDirectionsClick: "near_by_place_directions_click",
// nearByContactPlaceClick: "near_by_place_contact_click",
// paymentScreenItineraryCardClick: "payment_screen_itinerary_card_click",
// paymentScreenStartPayment: "payment_screen_start_payment",
// paymentScreenClearPayment: "payment_screen_clear_payment",
// paymentScreenPaymentSuccess: "payment_screen_payment_success",
// paymentScreenPaymentFailure: "payment_screen_payment_failure",
// paymentFailureSupportClick: "payment_failure_support_click",
// toolsPlacesTileClick: "tools_places_tile_click",
// toolsCommonPhrasesTileClick: "tools_common_phrases_tile_click",
// toolsEmergencyContactsTileClick: "tools_emergency_contacts_tile_click",
// toolsWeatherForecastTileClick: "tools_weather_forecast_tile_click",
// toolsSupportCenterTileClick: "tools_support_center_tile_click",
// toolsPassportTileClick: "tools_passport_tile_click",
// toolsDocumentsVisaTileClick: "tools_documents_visa_tile_click",
// bookedItineraryContentScroll: "booked_itinerary_content_scroll",
// bookedItineraryExploreGuideClick: "booked_itinerary_explore_guide_click",
// bookedItineraryFlightVoucherClick: "booked_itinerary_flight_voucher_click",
// bookedItineraryActivityVoucherClick:
//   "booked_itinerary_activity_voucher_click",
// bookedItineraryTransferVoucherClick:
//   "booked_itinerary_transfer_voucher_click",
// bookedItineraryActivityWithTransferVoucherClick:
//   "booked_itinerary_activity_transfer_voucher_click",
// bookedItineraryHeaderClick: "booked_itinerary_header_click",
// bookedItineraryHeaderCityNameClick: "booked_itinerary_header_city_name_click",
// homePackageCardClick: "home_package_card_click",
// homeStartPlanningNowClick: "home_start_planning_click",
// homeFindBookingClick: "home_find_booking_click",
// homeOpenProductClick: "home_open_product_click",
// bookingsHomeCalendarDateClick: "bookings_home_calendar_date_click",
// bookingsHomeCalendarNoEventClick: "bookings_home_calendar_no_event_click",
// bookingsHomeAccordionFlightsHeaderClick:
//   "bookings_home_accordion_flights_header_click",
// bookingsHomeAccordionHotelsHeaderClick:
//   "bookings_home_accordion_hotels_header_click",
// bookingsHomeAccordionTransfersHeaderClick:
//   "bookings_home_accordion_transfers_header_click",
// bookingsHomeAccordionPassesHeaderClick:
//   "bookings_home_accordion_passes_header_click",
// bookingsHomeAccordionActivitiesHeaderClick:
//   "bookings_home_accordion_activities_header_click",
// bookingsHomeAccordionTrainsHeaderClick:
//   "bookings_home_accordion_trains_header_click",
// bookingsHomeAccordionFerriesHeaderClick:
//   "bookings_home_accordion_ferries_header_click",
// bookingsHomeAccordionRentalCarsHeaderClick:
//   "bookings_home_accordion_rental_cars_header_click",
// bookingsHomeAccordionVisaHeaderClick:
//   "bookings_home_accordion_visa_header_click",
// bookingsHomeAccordionInsuranceHeaderClick:
//   "bookings_home_accordion_insurance_header_click",
// bookingsHomeAccordionFlightsVoucherClick:
//   "bookings_home_accordion_flights_voucher_click",
// bookingsHomeAccordionHotelsVoucherClick:
//   "bookings_home_accordion_hotels_voucher_click",
// bookingsHomeAccordionTransfersVoucherClick:
//   "bookings_home_accordion_transfers_voucher_click",
// bookingsHomeAccordionPassesVoucherClick:
//   "bookings_home_accordion_passes_voucher_click",
// bookingsHomeAccordionActivitiesVoucherClick:
//   "bookings_home_accordion_activities_voucher_click",
// bookingsHomeAccordionViatorActivitiesVoucherClick:
//   "bookings_home_accordion_viator_activities_voucher_click",
// bookingsHomeAccordionProcessingActivitiesVoucherClick:
//   "bookings_home_accordion_processing_activities_voucher_click",
// bookingsHomeAccordionTrainsVoucherClick:
//   "bookings_home_accordion_trains_voucher_click",
// bookingsHomeAccordionFerriesVoucherClick:
//   "bookings_home_accordion_ferries_voucher_click",
// bookingsHomeAccordionRentalCarsVoucherClick:
//   "bookings_home_accordion_rental_cars_voucher_click",
// bookingsHomeAccordionVisaVoucherClick:
//   "bookings_home_accordion_visa_voucher_click",
// bookingsHomeAccordionInsuranceVoucherClick:
//   "bookings_home_accordion_insurance_voucher_click",
// bookingsHomeDownloadAllVouchersClick:
//   "bookings_home_download_all_vouchers_click",
// journalHomeAddNewStory: "journal_home_add_new_story_click",
// journalHomeAddNewStoryFab: "journal_home_add_new_story_fab_click",
// journalHomeViewJournal: "journal_home_view_journal_click",
// journalHomePublishJournal: "journal_home_publish_journal_click",
// journalHomeShareJournal: "journal_home_share_journal_click", // -> becomes open share journal screen
// journalHomeStoryShareFacebook: "journal_home_story_share_facebook_click",
// journalHomeStoryShareTwitter: "journal_home_story_share_twitter_click",
// journalHomeEditStory: "journal_home_edit_story_click",
// journalHomeDeleteStory: "journal_home_delete_story_click",
// journalImagePickerCrop: "journal_image_picker_crop_click",
// journalImagePickerContain: "journal_image_picker_contain_click",
// journalImagePickerDelete: "journal_image_picker_delete_click",
// journalPublishShareFacebook: "journal_publish_share_facebook_click",
// journalPublishShareTwitter: "journal_publish_share_twitter_click",
// journalPublishShareCommon: "journal_publish_share_common_click",
// journalShareScreenShareFacebook: "journal_share_screen_share_facebook",
// journalShareScreenShareTwitter: "journal_share_screen_share_twitter",
// journalShareScreenShareCommon: "journal_share_screen_share_common",
// yourBookingsCloseButtonClick: "your_bookings_close_button_click",
// yourBookingsSelectItineraryClick: "your_bookings_select_itinerary_click",
// starterFindBooking: "starter_find_booking_click",
// starterPlanVacation: "starter_plan_vacation_click",
// mobileNumberOpenCountryCode: "mobile_number_open_country_code_click",
// mobileNumberCloseCountryCode: "mobile_number_close_country_code_click",
// mobileNumberSelectCountryCode: "mobile_number_select_country_code_click",
// mobileNumberNextClick: "mobile_number_next_click_ui", //-> is now request otp
// mobileNumberKeyboardClick: "mobile_number_next_click_keyboard",
// mobileNumberResendOtp: "mobile_number_resend_otp_click",
// mobileNumberVerifyOtp: "mobile_number_verify_otp_click",
// mobileNumberOtpAutoFill: "mobile_number_otp_autofill", //-> no longer used
// mobileNumberOtpFailed: "mobile_number_otp_failed",

// console.log('-----------------------------------');
// console.log(Object.values(appEvents).length);
// console.log('-----------------------------------');

export default appEvents;
