export const CONSTANT_drawerEvents = {
  event: 'Drawer',
  click: {
    login: 'login',
    home: 'home',
    payments: 'payments',
    about: 'about',
    storyBook: 'storyBook',
    logout: 'logout',
    openDrawer: 'open_drawer',
  },
};

export const CONSTANT_notificationEvents = {
  event: 'PushNotification',
  notificationType: {
    // This property is served from backend
  },
  notificationProps: {
    // This property is served from backend
  },
};

const appEvents = {
  StarterScreen: {
    event: 'Starter',
    click: {
      findBooking: 'find_booking',
      planVacation: 'plan_vacation',
      termsAndConditions: 'terms_and_conditions',
      privacyPolicy: 'privacy_policy',
    },
  },
  MobileNumber: {
    event: 'MobileNumber',
    click: {
      openCountryCode: 'open_country_code',
      closeCountryCode: 'close_country_code',
      selectCountryCode: 'select_country_code',
      requestOtpUi: 'request_otp_ui',
      requestOtpKeyboard: 'request_otp_keyboard',
      resendOtp: 'resend_otp',
      verifyOtp: 'verify_otp',
    },
    type: {
      otpFailed: 'otp_failed',
    },
  },
  userLoggedInEvent: 'user_logged_in',
  userLoggedOutEvent: 'user_logged_out',
  tripToggleClickEvent: 'trip_toggle_click',
  selectBookingHeaderClick: 'select_booking_header_button_click',
  YourBookings: {
    event: 'YourBookings',
    click: {
      closeButton: 'close_button',
      selectItinerary: 'select_itinerary',
    },
  },
  TripFeed: {
    event: 'TripFeed',
    widget: {
      // Widget Names go here from backend
    },
    click: {
      positiveClick: 'positive_click',
      negativeClick: 'negative_click',
      submitFeedback: 'submit_feedback',
      chatOfflineContact: 'chat_offline_contact',
    },
  },
  hamburgerButtonClick: 'hamburger_click',
  Journal: {
    event: 'Journal',
    click: {
      addNewStory: 'add_new_story',
      addNewStoryFab: 'add_new_story_fab',
      viewJournal: 'view_journal',
      publishJournal: 'publish_journal',
      openShareScreen: 'open_share_journal_screen',
      shareStory: 'story_share',
      editStory: 'edit_story',
      deleteStory: 'delete_story',
      imagePickerCrop: 'image_picker_crop',
      imagePickerContain: 'image_picker_contain',
      imagePickerDelete: 'image_picker_delete',
      publishScreenShare: 'publish_screen_share',
      shareScreenShare: 'share_screen_share',
    },
    share: {
      facebook: 'facebook',
      twitter: 'twitter',
      common: 'common',
    },
  },
  Bookings: {
    event: 'Bookings',
    click: {
      accordionHeader: 'accordion_header',
      accordionVoucher: 'accordion_voucher',
      downloadAllVouchers: 'download_all_vouchers',
      calendarEventDate: 'calendar_event_date',
      calendarNoEventDate: 'calendar_no_event_date',
    },
    type: {
      flights: 'flights',
      hotels: 'hotels',
      transfers: 'transfers',
      passes: 'passes',
      activities: 'activities',
      trains: 'trains',
      ferries: 'ferries',
      rentalCars: 'rental_cars',
      visa: 'visa',
      insurance: 'insurance',
      customVouchers: 'customVouchers',
    },
  },
  // Home: {
  //   event: 'Home',
  //   click: {
  //     packageCard: 'package_card',
  //     startPlanningNow: 'start_planning',
  //     findBooking: 'find_booking',
  //     openProduct: 'open_product',
  //   },
  // },
  // BookedItinerary: {
  //   event: 'BookedItinerary',
  //   scroll: {
  //     contentScroll: 'content_scroll',
  //   },
  //   click: {
  //     voucher: 'voucher',
  //     header: 'header',
  //     headerCity: 'header_city',
  //     exploreGuide: 'explore_guide',
  //   },
  //   type: {
  //     activity: 'activity',
  //     transfer: 'transfer',
  //     activityWithTransfer: 'activity_with_transfer',
  //     flight: 'flight',
  //   },
  // },
  Tools: {
    event: 'Tools',
    click: {
      currencyConverter: 'currency_converter',
      placesTile: 'places_tile',
      commonPhrases: 'common_phrases',
      // emergencyContacts: 'emergency_contacts',
      weatherForecast: 'weather_forecast',
      helpDesk: 'help_desk',
      passport: 'passport',
      documentsVisa: 'documents_visa',
      packingChecklist: 'packing_checklist',
      forex: 'forex',
    },
  },
  Payment: {
    event: 'Payment',
    click: {
      selectItinerary: 'select_itinerary',
      startPayment: 'start_payment',
      clearPayment: 'clear_payment',
      paymentSuccess: 'payment_success',
      paymentFailure: 'payment_failure',
      paymentFailureHelpDesk: 'payment_failure_help_desk',
      offlinePaymentLink: 'offline_payment_link',
    },
  },
  Places: {
    event: 'Places',
    click: {
      header: 'header',
      headerCity: 'header_city',
      category: 'category',
      filter: 'filter',
      sort: 'sort',
      placeDetails: 'place_details',
      placeContact: 'place_contact',
      placeDirections: 'place_directions',
    },
    scroll: {
      placesCarousel: 'places_carousel',
    },
    type: {
      allStar: 'all_star',
      threeStar: 'three_star',
      fourStar: 'four_star',
      fiveStar: 'five_star',
      ratings: 'ratings',
      location: 'location',
      hotel: 'hotel',
    },
  },
  weatherTileClick: 'weather_tile_click',
  CommonPhrases: {
    event: 'CommonPhrases',
    click: {
      playAudio: 'play_audio',
      book: 'book',
      pin: 'pin',
      unPin: 'un_pin',
      translate: 'translate',
      changeLanguage: 'change_language',
      selectLanguage: 'select_language',
    },
  },
  // EmergencyContacts: {
  //   event: 'EmergencyContacts',
  //   click: {
  //     phoneNumber: 'phone_number',
  //     directions: 'directions',
  //   },
  //   type: {
  //     police: 'police',
  //     ambulance: 'ambulance',
  //     fire: 'fire',
  //     missingChildren: 'missing_children',
  //     embassy: 'embassy',
  //     nationalEmergencyNumber: 'national_emergency_number',
  //   },
  // },
  PackingChecklist: {
    event: 'PackingChecklist',
    click: {
      selectItem: 'select_item',
      unselectItem: 'unselect_item',
      addItem: 'add_item',
      addItemKeyboard: 'add_item_keyboard',
      removeItem: 'remove_item',
    },
  },
  CurrencyConverter: {
    event: 'CurrencyConverter',
    click: {
      swap: 'swap',
      changeNative: 'change_native',
      changeForeign: 'change_foreign',
      selectCurrency: 'select_currency',
    },
  },
  Visa: {
    event: 'Visa',
    click: {
      contactHelpdesk: 'contact_helpdesk',
      getChecklist: 'get_checklist',
      emailChecklist: 'email_checklist',
      initializeVisa: 'visa_initialize',
      docsChecklistHeader: 'docs_checklist_header',
      visaSelectorList: 'visa_selector_list',
      docsChecklistWidget: 'docs_checklist_widget',
      visaHelpWidget: 'visa_help_widget',
      callAccountOwnerBar: 'call_account_owner_bar',
      callAccountOwnerFab: 'call_account_owner_fab',
      callAccountOwnerRejectedBar: 'call_account_owner_rejected_bar',
      maritalDropDownOption: 'marital_drop_down_option',
      employmentDropDownOption: 'employment_drop_down_option',
      toggleDocsCheckbox: 'toggle_docs_check_box',
      toggleDocsAccordion: 'toggle_docs_accordion',
      toggleVisaCard: 'toggle_visa_card',
      visaGranted: 'visa_granted',
      visaRejected: 'visa_rejected',
      visaExpedite: 'visa_expedite',
      emailAoFromCard: 'email_ao_from_card',
    },
  },
  Chat: {
    event: 'Chat',
    click: {
      openChat: 'open_chat',
      notifAppStart: 'notif_app_start',
      notifAppForeGround: 'notif_app_foreground',
    },
  },
  tripViewScroll: 'trip_view_scroll',
  tripViewLiteScroll: 'trip_view_lite_scroll',
  tripHighlightsScroll: 'trip_highlights_scroll',
  voucherHeaderViewVoucherClick: 'voucher_header_view_voucher_click',
  chatCallSupportClick: 'chat_call_support_click',
};

export const CONSTANT_StarterScreen = {
  event: 'Starter',
  click: {
    findBooking: 'find_booking',
    planVacation: 'plan_vacation',
    termsAndConditions: 'terms_and_conditions',
    privacyPolicy: 'privacy_policy',
  },
};
export const CONSTANT_MobileNumber = {
  event: 'MobileNumber',
  click: {
    openCountryCode: 'open_country_code',
    closeCountryCode: 'close_country_code',
    selectCountryCode: 'select_country_code',
    requestOtpUi: 'request_otp_ui',
    requestOtpKeyboard: 'request_otp_keyboard',
    resendOtp: 'resend_otp',
    verifyOtp: 'verify_otp',
  },
  type: {
    otpFailed: 'otp_failed',
  },
};
export const CONSTANT_userLoggedInEvent = 'user_logged_in';
export const CONSTANT_userLoggedOutEvent = 'user_logged_out';
export const CONSTANT_tripToggleClickEvent = 'trip_toggle_click';
export const CONSTANT_selectBookingHeaderClick =
  'select_booking_header_button_click';
export const CONSTANT_YourBookings = {
  event: 'YourBookings',
  click: {
    closeButton: 'close_button',
    selectItinerary: 'select_itinerary',
  },
};
export const CONSTANT_TripFeed = {
  event: 'TripFeed',
  widget: {
    // Widget Names go here from backend
  },
  click: {
    positiveClick: 'positive_click',
    negativeClick: 'negative_click',
    submitFeedback: 'submit_feedback',
    chatOfflineContact: 'chat_offline_contact',
  },
};
export const CONSTANT_hamburgerButtonClick = 'hamburger_click';
export const CONSTANT_Journal = {
  event: 'Journal',
  click: {
    addNewStory: 'add_new_story',
    addNewStoryFab: 'add_new_story_fab',
    viewJournal: 'view_journal',
    publishJournal: 'publish_journal',
    openShareScreen: 'open_share_journal_screen',
    shareStory: 'story_share',
    editStory: 'edit_story',
    deleteStory: 'delete_story',
    imagePickerCrop: 'image_picker_crop',
    imagePickerContain: 'image_picker_contain',
    imagePickerDelete: 'image_picker_delete',
    publishScreenShare: 'publish_screen_share',
    shareScreenShare: 'share_screen_share',
  },
  share: {
    facebook: 'facebook',
    twitter: 'twitter',
    common: 'common',
  },
};
export const CONSTANT_Bookings = {
  event: 'Bookings',
  click: {
    accordionHeader: 'accordion_header',
    accordionVoucher: 'accordion_voucher',
    downloadAllVouchers: 'download_all_vouchers',
    calendarEventDate: 'calendar_event_date',
    calendarNoEventDate: 'calendar_no_event_date',
  },
  type: {
    flights: 'flights',
    hotels: 'hotels',
    transfers: 'transfers',
    passes: 'passes',
    activities: 'activities',
    trains: 'trains',
    ferries: 'ferries',
    rentalCars: 'rental_cars',
    visa: 'visa',
    insurance: 'insurance',
    customVouchers: 'customVouchers',
  },
};
export const CONSTANT_Home = {
  event: 'Home',
  click: {
    packageCard: 'package_card',
    startPlanningNow: 'start_planning',
    findBooking: 'find_booking',
    openProduct: 'open_product',
  },
};
// export const CONSTANT_BookedItinerary = {
//   event: 'BookedItinerary',
//   scroll: {
//     contentScroll: 'content_scroll',
//   },
//   click: {
//     voucher: 'voucher',
//     header: 'header',
//     headerCity: 'header_city',
//     exploreGuide: 'explore_guide',
//   },
//   type: {
//     activity: 'activity',
//     transfer: 'transfer',
//     activityWithTransfer: 'activity_with_transfer',
//     flight: 'flight',
//   },
// };
export const CONSTANT_Tools = {
  event: 'Tools',
  click: {
    currencyConverter: 'currency_converter',
    placesTile: 'places_tile',
    commonPhrases: 'common_phrases',
    // emergencyContacts: 'emergency_contacts',
    weatherForecast: 'weather_forecast',
    helpDesk: 'help_desk',
    passport: 'passport',
    documentsVisa: 'documents_visa',
    packingChecklist: 'packing_checklist',
    forex: 'forex',
  },
};
export const CONSTANT_Payment = {
  event: 'Payment',
  click: {
    selectItinerary: 'select_itinerary',
    startPayment: 'start_payment',
    clearPayment: 'clear_payment',
    paymentSuccess: 'payment_success',
    paymentFailure: 'payment_failure',
    paymentFailureHelpDesk: 'payment_failure_help_desk',
    offlinePaymentLink: 'offline_payment_link',
  },
};
export const CONSTANT_Places = {
  event: 'Places',
  click: {
    header: 'header',
    headerCity: 'header_city',
    category: 'category',
    filter: 'filter',
    sort: 'sort',
    placeDetails: 'place_details',
    placeContact: 'place_contact',
    placeDirections: 'place_directions',
  },
  scroll: {
    placesCarousel: 'places_carousel',
  },
  type: {
    allStar: 'all_star',
    threeStar: 'three_star',
    fourStar: 'four_star',
    fiveStar: 'five_star',
    ratings: 'ratings',
    location: 'location',
    hotel: 'hotel',
  },
};
export const CONSTANT_weatherTileClick = 'weather_tile_click';
export const CONSTANT_CommonPhrases = {
  event: 'CommonPhrases',
  click: {
    playAudio: 'play_audio',
    book: 'book',
    pin: 'pin',
    unPin: 'un_pin',
    translate: 'translate',
    changeLanguage: 'change_language',
    selectLanguage: 'select_language',
  },
};
// export const CONSTANT_EmergencyContacts = {
//   event: 'EmergencyContacts',
//   click: {
//     phoneNumber: 'phone_number',
//     directions: 'directions',
//   },
//   type: {
//     police: 'police',
//     ambulance: 'ambulance',
//     fire: 'fire',
//     missingChildren: 'missing_children',
//     embassy: 'embassy',
//   },
// };
export const CONSTANT_PackingChecklist = {
  event: 'PackingChecklist',
  click: {
    selectItem: 'select_item',
    unselectItem: 'unselect_item',
    addItem: 'add_item',
    addItemKeyboard: 'add_item_keyboard',
    removeItem: 'remove_item',
  },
};
export const CONSTANT_CurrencyConverter = {
  event: 'CurrencyConverter',
  click: {
    swap: 'swap',
    changeNative: 'change_native',
    changeForeign: 'change_foreign',
    selectCurrency: 'select_currency',
  },
};
export const CONSTANT_Visa = {
  event: 'Visa',
  click: {
    contactHelpdesk: 'contact_helpdesk',
    getChecklist: 'get_checklist',
    emailChecklist: 'email_checklist',
    initializeVisa: 'visa_initialize',
    docsChecklistHeader: 'docs_checklist_header',
    visaSelectorList: 'visa_selector_list',
    docsChecklistWidget: 'docs_checklist_widget',
    visaHelpWidget: 'visa_help_widget',
    callAccountOwnerBar: 'call_account_owner_bar',
    callAccountOwnerFab: 'call_account_owner_fab',
    callAccountOwnerRejectedBar: 'call_account_owner_rejected_bar',
    maritalDropDownOption: 'marital_drop_down_option',
    employmentDropDownOption: 'employment_drop_down_option',
    toggleDocsCheckbox: 'toggle_docs_check_box',
    toggleDocsAccordion: 'toggle_docs_accordion',
    toggleVisaCard: 'toggle_visa_card',
    visaGranted: 'visa_granted',
    visaRejected: 'visa_rejected',
    visaExpedite: 'visa_expedite',
    emailAoFromCard: 'email_ao_from_card',
  },
};
export const CONSTANT_Chat = {
  event: 'Chat',
  click: {
    openChat: 'open_chat',
    notifAppStart: 'notif_app_start',
    notifAppForeGround: 'notif_app_foreground',
  },
};
export const CONSTANT_tripViewScroll = 'trip_view_scroll';
export const CONSTANT_tripViewLiteScroll = 'trip_view_lite_scroll';
export const CONSTANT_tripHighlightsScroll = 'trip_highlights_scroll';
export const CONSTANT_voucherHeaderViewVoucherClick =
  'voucher_header_view_voucher_click';
export const CONSTANT_chatCallSupportClick = 'chat_call_support_click';

export const CONSTANT_explore = {
  event: 'Explore',
  click: {
    recommendedForYouCard: 'recommended_for_you_card',
    pocketFriendlyDestinationsView: 'pocket_friendly_destinations_view',
    dealsFromOurPartnersCard: 'deals_from_our_partners_card',
    onGoingHolidaysView: 'on_going_holidays_view',
    dealsItineraryView: 'deals_itinerary_view',
    travellerTestimonialscard: 'traveller_testimonials_card',
    visaOnArrivalView: 'visa_on_arrival_view',
    forTheLoveBirds: 'for_the_love_birds_card',
    travelBlogs: 'travel_blogs_card',
  },
};

export const CONSTANT_APP_SIGNUP = {
  event: 'AppSignup',
  click: {
    mobileNumber: 'mobile_number',
    email: 'email',
    userName: 'user_name',
    locale: 'locale',
    leadSource: 'lead_source',
    activeDeepLink: 'active_deep_link',
  },
};

export const CONSTANT_APP_SIGNIN = {
  event: 'AppSignin',
  click: {
    mobileNumber: 'mobile_number',
    email: 'email',
    userName: 'user_name',
    locale: 'locale',
    leadSource: 'lead_source',
    activeDeepLink: 'active_deep_link',
  },
};

export const CONSTANT_itineraryCostedEvent: {event: 'ItineraryCosted'} = {
  event: 'ItineraryCosted',
};

export const CONSTANT_requestCallbackEvent: {event: 'RequestCallBack'} = {
  event: 'RequestCallBack',
};

export const CONSTANT_openCustomizeOnWeb: {event: 'OpenCustomizeOnWeb'} = {
  event: 'OpenCustomizeOnWeb',
};

export default appEvents;
