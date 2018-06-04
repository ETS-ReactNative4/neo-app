import { observable, computed, action, toJS } from "mobx";
import { createTransformer } from "mobx-utils";
import { persist } from "mobx-persist";
import _ from "lodash";
import moment from "moment";
import apiCall from "../Services/networkRequests/apiCall";
import constants from "../constants/constants";

class Itineraries {
  @observable _isLoading = false;

  @observable _loadingError = false;

  @persist("list")
  @observable
  _itineraries = [];

  @persist("object")
  @observable
  _selectedItinerary = {
    itinerary: {
      itineraryId: "5af151a83fef300c015c8077",
      landPackage: false,
      nights: 14,
      matchingPercentage: 93,
      costed: true,
      userUpdated: false,
      rcAvailable: false,
      departSlot: "82_4_15_1#3",
      allCityKeys: ["7_1", "200_2", "680_3", "82_4"],
      countries: [
        {
          countryId: 13,
          name: "Spain"
        },
        {
          countryId: 17,
          name: "Czech Republic"
        },
        {
          countryId: 34,
          name: "Slovakia"
        },
        {
          countryId: 16,
          name: "Austria"
        }
      ],
      totalCost: "4,67,128",
      netCost: null,
      staleCost: false,
      booking: false,
      regionCode: "eur",
      shared: false,
      hidePackagedRate: false,
      suggestedDepartureDate: null,
      packageRate: false,
      frozen: false,
      canUndo: true,
      uniqueId: "311212964",
      bookingDate: null,
      flightsBlocked: false,
      daysForTravel: 145,
      regionName: "Europe",
      special: false,
      specialImage: null,
      specialTitle: null,
      occasion: null,
      hideSplitPricing: false,
      enableSplitPricingForCustomer: true,
      campaign: false,
      interests: [32, 33, 49, 19, 51, 4, 52, 68, 27, 29, 15, 31],
      title: null,
      agent: false,
      pricingVersion: null,
      region: "EUROPE",
      averageAmountIncrease: "73,250"
    },
    iterCityByKey: {
      "680_3": {
        nights: 4,
        cityId: 680,
        transferSlot: "680_3_7_1#2",
        hotelRefKey: "680###06102018_10102018",
        allDayKeys: ["680_3_7", "680_3_8", "680_3_9", "680_3_10"],
        showRcTag: false,
        rcText: null,
        passId: 0
      },
      "200_2": {
        nights: 1,
        cityId: 200,
        transferSlot: "200_2_6_1#1",
        hotelRefKey: "200###05102018_06102018",
        allDayKeys: ["200_2_6"],
        showRcTag: false,
        rcText: null,
        passId: 0
      },
      "82_4": {
        nights: 4,
        cityId: 82,
        transferSlot: "82_4_11_1#2",
        hotelRefKey: "82###10102018_14102018",
        allDayKeys: ["82_4_11", "82_4_12", "82_4_13", "82_4_14", "82_4_15"],
        showRcTag: false,
        rcText: null,
        passId: 0
      },
      "7_1": {
        nights: 5,
        cityId: 7,
        transferSlot: "7_1_1_1#2",
        hotelRefKey: "7###30092018_05102018",
        allDayKeys: ["7_1_1", "7_1_2", "7_1_3", "7_1_4", "7_1_5"],
        showRcTag: false,
        rcText: null,
        passId: 0
      }
    },
    iterDayByKey: {
      "680_3_10": {
        day: "09",
        mon: "Oct",
        dayNum: 10,
        rcAvailable: false,
        allSlotKeys: ["680_3_10_1#3"]
      },
      "7_1_1": {
        day: "30",
        mon: "Sep",
        dayNum: 1,
        rcAvailable: false,
        allSlotKeys: ["7_1_1_1#2", "7_1_1_3#1"]
      },
      "680_3_7": {
        day: "06",
        mon: "Oct",
        dayNum: 7,
        rcAvailable: false,
        allSlotKeys: ["680_3_7_1#2", "680_3_7_3#1"]
      },
      "680_3_8": {
        day: "07",
        mon: "Oct",
        dayNum: 8,
        rcAvailable: false,
        allSlotKeys: ["680_3_8_1#1", "680_3_8_2#2"]
      },
      "7_1_4": {
        day: "03",
        mon: "Oct",
        dayNum: 4,
        rcAvailable: false,
        allSlotKeys: ["7_1_4_1#2", "7_1_4_3#1"]
      },
      "200_2_6": {
        day: "05",
        mon: "Oct",
        dayNum: 6,
        rcAvailable: false,
        allSlotKeys: ["200_2_6_1#1", "200_2_6_2#1", "200_2_6_3#1"]
      },
      "680_3_9": {
        day: "08",
        mon: "Oct",
        dayNum: 9,
        rcAvailable: false,
        allSlotKeys: ["680_3_9_1#3"]
      },
      "7_1_5": {
        day: "04",
        mon: "Oct",
        dayNum: 5,
        rcAvailable: false,
        allSlotKeys: ["7_1_5_1#3"]
      },
      "7_1_2": {
        day: "01",
        mon: "Oct",
        dayNum: 2,
        rcAvailable: false,
        allSlotKeys: ["7_1_2_1#2", "7_1_2_3#1"]
      },
      "7_1_3": {
        day: "02",
        mon: "Oct",
        dayNum: 3,
        rcAvailable: false,
        allSlotKeys: ["7_1_3_1#2", "7_1_3_3#1"]
      },
      "82_4_14": {
        day: "13",
        mon: "Oct",
        dayNum: 14,
        rcAvailable: false,
        allSlotKeys: ["82_4_14_1#1", "82_4_14_2#2"]
      },
      "82_4_13": {
        day: "12",
        mon: "Oct",
        dayNum: 13,
        rcAvailable: false,
        allSlotKeys: ["82_4_13_1#3"]
      },
      "82_4_12": {
        day: "11",
        mon: "Oct",
        dayNum: 12,
        rcAvailable: false,
        allSlotKeys: ["82_4_12_1#2", "82_4_12_3#1"]
      },
      "82_4_11": {
        day: "10",
        mon: "Oct",
        dayNum: 11,
        rcAvailable: false,
        allSlotKeys: ["82_4_11_1#2", "82_4_11_3#1"]
      },
      "82_4_15": {
        day: "14",
        mon: "Oct",
        dayNum: 15,
        rcAvailable: false,
        allSlotKeys: ["82_4_15_1#3"]
      }
    },
    iterSlotByKey: {
      "680_3_9_1#3": {
        start: "MORNING",
        span: 3,
        name: "Full Day",
        type: "LEISURE",
        prevCity: false,
        activitySlotDetail: null,
        arrivalSlotDetail: null,
        departureSlotDetail: null,
        intercityTransferSlotDetailVO: null,
        leisureSlotDetail: {
          text: "At leisure"
        }
      },
      "82_4_14_2#2": {
        start: "NOON",
        span: 2,
        name: "Noon to Evening",
        type: "LEISURE",
        prevCity: false,
        activitySlotDetail: null,
        arrivalSlotDetail: null,
        departureSlotDetail: null,
        intercityTransferSlotDetailVO: null,
        leisureSlotDetail: {
          text: "At leisure"
        }
      },
      "82_4_14_1#1": {
        start: "MORNING",
        span: 1,
        name: "Morning",
        type: "ACTIVITY",
        prevCity: false,
        activitySlotDetail: {
          activityId: 307453,
          intercityTransferIncluded: false,
          activityCostingIdentifier: "307453###13102018"
        },
        arrivalSlotDetail: null,
        departureSlotDetail: null,
        intercityTransferSlotDetailVO: null,
        leisureSlotDetail: null
      },
      "7_1_4_1#2": {
        start: "MORNING",
        span: 2,
        name: "Morning to Noon",
        type: "ACTIVITY",
        prevCity: false,
        activitySlotDetail: {
          activityId: 201031,
          intercityTransferIncluded: false,
          activityCostingIdentifier: "201031###03102018"
        },
        arrivalSlotDetail: null,
        departureSlotDetail: null,
        intercityTransferSlotDetailVO: null,
        leisureSlotDetail: null
      },
      "7_1_5_1#3": {
        start: "MORNING",
        span: 3,
        name: "Full Day",
        type: "ACTIVITY",
        prevCity: false,
        activitySlotDetail: {
          activityId: 305297,
          intercityTransferIncluded: false,
          activityCostingIdentifier: "305297###04102018"
        },
        arrivalSlotDetail: null,
        departureSlotDetail: null,
        intercityTransferSlotDetailVO: null,
        leisureSlotDetail: null
      },
      "680_3_8_2#2": {
        start: "NOON",
        span: 2,
        name: "Noon to Evening",
        type: "LEISURE",
        prevCity: false,
        activitySlotDetail: null,
        arrivalSlotDetail: null,
        departureSlotDetail: null,
        intercityTransferSlotDetailVO: null,
        leisureSlotDetail: {
          text: "At leisure"
        }
      },
      "7_1_3_3#1": {
        start: "EVENING",
        span: 1,
        name: "Evening",
        type: "LEISURE",
        prevCity: false,
        activitySlotDetail: null,
        arrivalSlotDetail: null,
        departureSlotDetail: null,
        intercityTransferSlotDetailVO: null,
        leisureSlotDetail: {
          text: "At leisure"
        }
      },
      "7_1_3_1#2": {
        start: "MORNING",
        span: 2,
        name: "Morning to Noon",
        type: "ACTIVITY",
        prevCity: false,
        activitySlotDetail: {
          activityId: 201030,
          intercityTransferIncluded: false,
          activityCostingIdentifier: "201030###02102018"
        },
        arrivalSlotDetail: null,
        departureSlotDetail: null,
        intercityTransferSlotDetailVO: null,
        leisureSlotDetail: null
      },
      "680_3_8_1#1": {
        start: "MORNING",
        span: 1,
        name: "Morning",
        type: "ACTIVITY",
        prevCity: false,
        activitySlotDetail: {
          activityId: 311509,
          intercityTransferIncluded: false,
          activityCostingIdentifier: "311509###07102018"
        },
        arrivalSlotDetail: null,
        departureSlotDetail: null,
        intercityTransferSlotDetailVO: null,
        leisureSlotDetail: null
      },
      "680_3_10_1#3": {
        start: "MORNING",
        span: 3,
        name: "Full Day",
        type: "LEISURE",
        prevCity: false,
        activitySlotDetail: null,
        arrivalSlotDetail: null,
        departureSlotDetail: null,
        intercityTransferSlotDetailVO: null,
        leisureSlotDetail: {
          text: "At leisure"
        }
      },
      "680_3_7_1#2": {
        start: "MORNING",
        span: 2,
        name: "Morning to Noon",
        type: "INTERCITY_TRANSFER",
        prevCity: false,
        activitySlotDetail: null,
        arrivalSlotDetail: null,
        departureSlotDetail: null,
        intercityTransferSlotDetailVO: {
          transferType: "DIRECT",
          transferCostingIdenfier: null,
          directTransferDetail: {
            transferMode: "TRAIN",
            slotText:
              "Checkout of your hotel. Take your train from Prague to Bratislava. Check-in to your new hotel",
            transferIndicatorText: "Train ride to Bratislava",
            transferCostingIdenfier: "200_680###06102018",
            alternatesAvailable: false
          },
          transitTransferDetail: null,
          fromCity: 200,
          toCity: 680,
          canBeReplacedWithActivity: false,
          alternateModesAvailable: false
        },
        leisureSlotDetail: null
      },
      "680_3_7_3#1": {
        start: "EVENING",
        span: 1,
        name: "Evening",
        type: "LEISURE",
        prevCity: false,
        activitySlotDetail: null,
        arrivalSlotDetail: null,
        departureSlotDetail: null,
        intercityTransferSlotDetailVO: null,
        leisureSlotDetail: {
          text: "At leisure"
        }
      },
      "82_4_13_1#3": {
        start: "MORNING",
        span: 3,
        name: "Full Day",
        type: "ACTIVITY",
        prevCity: false,
        activitySlotDetail: {
          activityId: 200178,
          intercityTransferIncluded: false,
          activityCostingIdentifier: "200178###12102018"
        },
        arrivalSlotDetail: null,
        departureSlotDetail: null,
        intercityTransferSlotDetailVO: null,
        leisureSlotDetail: null
      },
      "7_1_2_1#2": {
        start: "MORNING",
        span: 2,
        name: "Morning to Noon",
        type: "ACTIVITY",
        prevCity: false,
        activitySlotDetail: {
          activityId: 200104,
          intercityTransferIncluded: false,
          activityCostingIdentifier: "200104###01102018"
        },
        arrivalSlotDetail: null,
        departureSlotDetail: null,
        intercityTransferSlotDetailVO: null,
        leisureSlotDetail: null
      },
      "7_1_2_3#1": {
        start: "EVENING",
        span: 1,
        name: "Evening",
        type: "ACTIVITY",
        prevCity: false,
        activitySlotDetail: {
          activityId: 305442,
          intercityTransferIncluded: false,
          activityCostingIdentifier: "305442###01102018"
        },
        arrivalSlotDetail: null,
        departureSlotDetail: null,
        intercityTransferSlotDetailVO: null,
        leisureSlotDetail: null
      },
      "82_4_12_3#1": {
        start: "EVENING",
        span: 1,
        name: "Evening",
        type: "LEISURE",
        prevCity: false,
        activitySlotDetail: null,
        arrivalSlotDetail: null,
        departureSlotDetail: null,
        intercityTransferSlotDetailVO: null,
        leisureSlotDetail: {
          text: "At leisure"
        }
      },
      "82_4_12_1#2": {
        start: "MORNING",
        span: 2,
        name: "Morning to Noon",
        type: "ACTIVITY",
        prevCity: false,
        activitySlotDetail: {
          activityId: 200175,
          intercityTransferIncluded: false,
          activityCostingIdentifier: "200175###11102018"
        },
        arrivalSlotDetail: null,
        departureSlotDetail: null,
        intercityTransferSlotDetailVO: null,
        leisureSlotDetail: null
      },
      "200_2_6_2#1": {
        start: "NOON",
        span: 1,
        name: "Noon",
        type: "LEISURE",
        prevCity: false,
        activitySlotDetail: null,
        arrivalSlotDetail: null,
        departureSlotDetail: null,
        intercityTransferSlotDetailVO: null,
        leisureSlotDetail: {
          text: "At leisure"
        }
      },
      "200_2_6_1#1": {
        start: "MORNING",
        span: 1,
        name: "Morning",
        type: "INTERCITY_TRANSFER",
        prevCity: false,
        activitySlotDetail: null,
        arrivalSlotDetail: null,
        departureSlotDetail: null,
        intercityTransferSlotDetailVO: {
          transferType: "DIRECT",
          transferCostingIdenfier: null,
          directTransferDetail: {
            transferMode: "FLIGHT",
            slotText:
              "Checkout of your hotel. Board your flight to Prague. Check-in to your new hotel.",
            transferIndicatorText: "Fly to Prague",
            transferCostingIdenfier: "BCN_PRG",
            alternatesAvailable: false
          },
          transitTransferDetail: null,
          fromCity: 7,
          toCity: 200,
          canBeReplacedWithActivity: false,
          alternateModesAvailable: false
        },
        leisureSlotDetail: null
      },
      "7_1_1_3#1": {
        start: "EVENING",
        span: 1,
        name: "Evening",
        type: "LEISURE",
        prevCity: false,
        activitySlotDetail: null,
        arrivalSlotDetail: null,
        departureSlotDetail: null,
        intercityTransferSlotDetailVO: null,
        leisureSlotDetail: {
          text: "At leisure"
        }
      },
      "7_1_1_1#2": {
        start: "MORNING",
        span: 2,
        name: "Morning to Noon",
        type: "INTERNATIONAL_ARRIVE",
        prevCity: false,
        activitySlotDetail: null,
        arrivalSlotDetail: {
          arrivalAirport: null,
          slotText:
            "Arrive in Barcelona airport. Get transferred to your hotel.",
          transferIndicatorText: "Departure to Barcelona by flight",
          tripKey: "BLR_BCN",
          flightCostingKey: "BLR_BCN###VIE_BLR",
          airportCity: "Barcelona",
          hotelTransfer: null
        },
        departureSlotDetail: null,
        intercityTransferSlotDetailVO: null,
        leisureSlotDetail: null
      },
      "200_2_6_3#1": {
        start: "EVENING",
        span: 1,
        name: "Evening",
        type: "ACTIVITY",
        prevCity: false,
        activitySlotDetail: {
          activityId: 307779,
          intercityTransferIncluded: false,
          activityCostingIdentifier: "307779###05102018"
        },
        arrivalSlotDetail: null,
        departureSlotDetail: null,
        intercityTransferSlotDetailVO: null,
        leisureSlotDetail: null
      },
      "82_4_15_1#3": {
        start: "MORNING",
        span: 3,
        name: "Full Day",
        type: "INTERNATIONAL_DEPART",
        prevCity: false,
        activitySlotDetail: null,
        arrivalSlotDetail: null,
        departureSlotDetail: {
          transferIndicatorText: "Fly to India",
          tripKey: "VIE_BLR",
          cityId: 0,
          text: null,
          departureAirportCode: null,
          meetingPointTransfer: null,
          airportCity: "Vienna",
          slotText:
            "Take your flight back to India. Hope you end up with a lot of memories and a few souvenirs too."
        },
        intercityTransferSlotDetailVO: null,
        leisureSlotDetail: null
      },
      "7_1_4_3#1": {
        start: "EVENING",
        span: 1,
        name: "Evening",
        type: "LEISURE",
        prevCity: false,
        activitySlotDetail: null,
        arrivalSlotDetail: null,
        departureSlotDetail: null,
        intercityTransferSlotDetailVO: null,
        leisureSlotDetail: {
          text: "At leisure"
        }
      },
      "82_4_11_1#2": {
        start: "MORNING",
        span: 2,
        name: "Morning to Noon",
        type: "INTERCITY_TRANSFER",
        prevCity: false,
        activitySlotDetail: null,
        arrivalSlotDetail: null,
        departureSlotDetail: null,
        intercityTransferSlotDetailVO: {
          transferType: "DIRECT",
          transferCostingIdenfier: null,
          directTransferDetail: {
            transferMode: "TRAIN",
            slotText:
              "Checkout of your hotel. Take your train from Bratislava to Vienna. Check-in to your new hotel",
            transferIndicatorText: "Train ride to Vienna",
            transferCostingIdenfier: "680_82###10102018",
            alternatesAvailable: false
          },
          transitTransferDetail: null,
          fromCity: 680,
          toCity: 82,
          canBeReplacedWithActivity: false,
          alternateModesAvailable: false
        },
        leisureSlotDetail: null
      },
      "82_4_11_3#1": {
        start: "EVENING",
        span: 1,
        name: "Evening",
        type: "LEISURE",
        prevCity: false,
        activitySlotDetail: null,
        arrivalSlotDetail: null,
        departureSlotDetail: null,
        intercityTransferSlotDetailVO: null,
        leisureSlotDetail: {
          text: "At leisure"
        }
      }
    },
    cityById: {
      "7": {
        cityId: 7,
        cityName: "Barcelona",
        airportCode: "BCN",
        numberOfNights: 0,
        alternateCitiesString: null,
        image: "barcelona.jpg",
        internationalAirportRank: 2,
        europeAirportRank: 0,
        latitude: 41.385124,
        longitude: 2.1732435
      },
      "82": {
        cityId: 82,
        cityName: "Vienna",
        airportCode: "VIE",
        numberOfNights: 0,
        alternateCitiesString: null,
        image: "vienna.jpg",
        internationalAirportRank: 1,
        europeAirportRank: 0,
        latitude: 48.208244,
        longitude: 16.373724
      },
      "200": {
        cityId: 200,
        cityName: "Prague",
        airportCode: "PRG",
        numberOfNights: 0,
        alternateCitiesString: null,
        image: "prague.jpg",
        internationalAirportRank: 1,
        europeAirportRank: 0,
        latitude: 50.07556,
        longitude: 14.437632
      },
      "680": {
        cityId: 680,
        cityName: "Bratislava",
        airportCode: "BTS",
        numberOfNights: 0,
        alternateCitiesString: null,
        image: "bratislava.jpg",
        internationalAirportRank: 0,
        europeAirportRank: 0,
        latitude: 48.158638,
        longitude: 17.106167
      }
    },
    activityById: {
      "200104": {
        id: "5898553070ced255b93556f3",
        planningToolId: 200104,
        mustSee: true,
        title: "Montserrat Monastery & Hiking Experience",
        free: false,
        mainPhoto: "https://d3lf10b5gahyby.cloudfront.net/activity/200104.jpg",
        tourItinerary: null,
        termsConditions: "",
        salesPoints: null,
        currency: "INR",
        themes: [0, 5, 7],
        interests: [80, 19, 25, 74, 29],
        tags: ["Montserrat", "Hiking"],
        groupTypes: null,
        notes:
          "<p>You must be able to climb and descend stairs. You must be able to walk on unpaved or uneven terrain. Maximum group size is 15 people. Check-in is 10 minutes prior to the booked tour start time.</p>\r\n",
        type: 0,
        activityType: "EXPERIENCE",
        availabilityTime: "MORNING",
        longDesc:
          "<p>Nestled in the uniquely shaped mountains lies a monastery complete with stunning basilica and cloister. Marvel at the surreal setting and get a look at La Moreneta, the Virgin of Montserrat. After listening to the heavenly voices of the boys&#39; choir, take a walk through the natural park nearby.Meet your guide at the WE Boutique to begin your day trip to the Montserrat region that is just an hour north of Barcelona. As you arrive, pause to take in the sheer beauty of this tucked away monastery. The series of interestingly eroded mountains make up a backdrop that leaves you breathless. Explore the basilica and the cloister while your guide tells you about the history of the monastery.Inside the building is La Moreneta, a black-faced Virgin depiction with an interesting story. Finish your tour of the monastery by listening to the Escolania de Montserrat, a choir of children with the voice of little angels.Then you can enjoy the landscape and nature as you take the rack railway to Sant Joan. From here, you walk an hour through the Montserrat National Park to a high point that provides an excellent view of the region. Snap a photo to remember your trip by, and then journey back to Barcelona.</p>",
        shortDesc:
          "<p>Montserrat Monastery, considered a source of Catalan pride. Home to L&#39;Escolania, one of oldest boys&#39; choirs in Europe. Safe &amp; picturesque hike led adeptly by expert guides. 12th-century Black Virgin sculpture at the Royal Basilica. Breath-taking views of Montserrat Natural Park from Sant Joan.</p>",
        photos: [
          "https://a.travel-assets.com/mediavault.le/media/810b408418ced07fd6ca90b7e998c7c2494c921b.jpeg",
          "https://a.travel-assets.com/mediavault.le/media/5e42fa8a9b9ddcf562482c69ec86485b54f6d9a4.jpeg"
        ],
        rating: 4.5,
        openDays: null,
        preferredTimeofday: 0,
        otherTourGradesForCity: null,
        selectedTourGrade: {
          gradeCode: "DEFAULT",
          departureTime: "0830",
          gradeDescription: "",
          duration: "5hrs",
          pickupType: "Common Meeting Point",
          meetingPoint: "",
          inclusion:
            "<ul><li>Guided tour of Montserrat</li><li>1-hour guided trek in Montserrat Natural Park</li><li>Admission fees</li><li>Rack rail ticket</li></ul>",
          exclusion:
            "<ul><li>Meals</li><li>Hotel pick-up, hotel drop-off</li></ul>",
          cost: "5983",
          costText: "Cost per person",
          adultCost: "5983",
          startSlot: "MORNING",
          durationType: "HALF",
          slotSpan: 2,
          betweenCity: false,
          sameCityReturn: true,
          diffDetail: null,
          ourSourceProvider: "SELF",
          transferType: "NOTRANSFER"
        },
        intercityTransferAvailable: false,
        dropOffCityIds: null,
        interestNames: [
          "Caves",
          "Hiking",
          "Historical Architecture",
          "Religious Sites",
          "Scenery"
        ],
        themesMatch: 0,
        interestsMatch: 0,
        preferredCity: null,
        ticket: false,
        fastSelling: false,
        privateTour: false,
        freeTour: false,
        transferIncluded: false,
        kidFriendly: false,
        latitude: "41.593327",
        longitude: "1.8376757",
        includedAttractions: null,
        recommended: false,
        highlight: true
      },
      "200175": {
        id: "5898553a70ced255b935573a",
        planningToolId: 200175,
        mustSee: true,
        title: "Schonbrunn Palace & Vienna Explorations",
        free: false,
        mainPhoto: "https://d3lf10b5gahyby.cloudfront.net/activity/200175.jpg",
        tourItinerary: null,
        termsConditions: "",
        salesPoints: null,
        currency: "INR",
        themes: [0, 1, 2],
        interests: [1, 9, 25, 74],
        tags: ["Schonbrunn", "Palace"],
        groupTypes: null,
        notes: "<p>Children aged 2 and younger are complimentary.</p>\r\n",
        type: 0,
        activityType: "EXPERIENCE",
        availabilityTime: "MORNING",
        longDesc:
          "<p>Discover Vienna&#39;s most visited attractions, including the opulent masterpiece Sch&ouml;nbrunn Palace, former residence of the Habsburg monarchs. Explore the magnificent palace and the stunning buildings that line the city&#39;s Ringstrasse, including the State Opera House and Museum of Fine Arts.Starting from central Vienna, ride past some of the most significant and historic points in the city. Pass by numerous grand buildings along the Ringstrasse. Travel to the world-famous State Opera House &ndash; one of Europe&#39;s busiest &ndash; and see the stunning architecture of the Museum of Fine Arts, with its huge array of treasures from the Habsburg family.Travel to the Sch&ouml;nbrunn Palace for a visit to its incredible showrooms. Once a summer residence of the Habsburg family and former home of Maria Theresa, the palace transports you back to the days of Imperial Austria. Before the end of the tour, discover the site of the world&#39;s largest and most comprehensive Gustav Klimt collection at the Belvedere Palace.</p>",
        shortDesc:
          "<p>Luxurious Sch&ouml;nbrunn Palace &ndash; former home of the Habsburgs.Opulent state rooms &amp; intricately manicured gardens.Reserved ticket &ndash; no waiting in a queue at the palace.World&#39;s largest Klimt collection at the Belvedere Palace.</p>",
        photos: [
          "https://a.travel-assets.com/mediavault.le/media/67a24f77213cebd014380262fe2da4d9ecc07a92.jpeg",
          "https://a.travel-assets.com/mediavault.le/media/cb3f99bba506da611ab3eeeb7b2760c5f085275f.jpeg"
        ],
        rating: 4,
        openDays: null,
        preferredTimeofday: 0,
        otherTourGradesForCity: null,
        selectedTourGrade: {
          gradeCode: "DEFAULT",
          departureTime: "0945",
          gradeDescription: "",
          duration: "3hrs",
          pickupType: "Hotel",
          meetingPoint: "",
          inclusion:
            "<ul><li>Guided tour of Vienna</li><li>Admission to the Schönbrunn Palace with Skip-the-Line entrance</li><li>Hotel Pick up only and drop at common meeting point</li></ul>",
          exclusion:
            "<ul><li>Meals and drinks</li><li>Hotel drop off</li></ul>",
          cost: "5861",
          costText: "Cost per person",
          adultCost: "5861",
          startSlot: "MORNING",
          durationType: "HALF",
          slotSpan: 2,
          betweenCity: false,
          sameCityReturn: true,
          diffDetail: null,
          ourSourceProvider: "SELF",
          transferType: "SHARED"
        },
        intercityTransferAvailable: false,
        dropOffCityIds: null,
        interestNames: [
          "Historical Architecture",
          "Museums",
          "Must See",
          "Scenery"
        ],
        themesMatch: 0,
        interestsMatch: 0,
        preferredCity: null,
        ticket: false,
        fastSelling: false,
        privateTour: false,
        freeTour: false,
        transferIncluded: true,
        kidFriendly: true,
        latitude: "48.184864",
        longitude: "16.31224",
        includedAttractions: null,
        recommended: true,
        highlight: true
      },
      "200178": {
        id: "5898553a70ced255b935573d",
        planningToolId: 200178,
        mustSee: true,
        title: "Bratislava Day Trip",
        free: false,
        mainPhoto: "https://d3lf10b5gahyby.cloudfront.net/activity/200178.jpg",
        tourItinerary: null,
        termsConditions: "",
        salesPoints: null,
        currency: "INR",
        themes: [0, 1, 2],
        interests: [1, 9, 25, 74],
        tags: ["Bratislava"],
        groupTypes: null,
        notes: "<p>Children aged 1 and younger are complimentary.</p>\r\n",
        type: 0,
        activityType: "EXPERIENCE",
        availabilityTime: "MORNING",
        longDesc:
          "<p>Catch a comfortable, quick public bus to the Slovakian capital and take a guided walking tour through the city&rsquo;s exciting highlights. After a traditional lunch, enjoy free time in the afternoon to explore the picturesque city centre with its eclectic mix of architecture and culture.Vienna and Bratislava are located closer to each other than any other two European capitals. Leave the former bright and early and, after only one hour on the road, arrive at the latter. Your guide is here and ready to take you on a leisurely stroll through the scenic old-town area.Enjoy a two-course Slovakian lunch before taking some time to stroll through the streets and wander past the Old Town Hall, the main squares and the impressive St Martin Cathedral. See a different view of the majestic Danube river. Spend some time browsing the boutiques to pick up a couple of souvenirs of your adventure in Slovakia before the quick journey back to Vienna.</p>",
        shortDesc:
          "<p>Whole day to explore the capital of Slovakia.Picturesque city centre stroll through the main highlights.Exciting mix of cultures creating a unique city environment.Delicious &amp; authentic Slovakian lunch.</p>",
        photos: [
          "https://a.travel-assets.com/mediavault.le/media/aaa2fbe15579faabfe5903136c780067129a55ef.jpeg",
          "https://a.travel-assets.com/mediavault.le/media/eb92f88f6e8ea655f29e77c56848ccb98a6c8dce.jpeg"
        ],
        rating: 4.2,
        openDays: null,
        preferredTimeofday: 0,
        otherTourGradesForCity: null,
        selectedTourGrade: {
          gradeCode: "DEFAULT",
          departureTime: "0915",
          gradeDescription: "",
          duration: "8hrs 45mins",
          pickupType: "Common Meeting Point",
          meetingPoint: "Erdberg Bus Station",
          inclusion:
            "<ul><li>Guided tour of Bratislava</li><li>2-course lunch</li><li>Round trip transportation from common meeting point</li></ul>",
          exclusion:
            "<ul><li>Drinks</li><li>Hotel Pick up and drop off</li></ul>",
          cost: "6085",
          costText: "Cost per person",
          adultCost: "6085",
          startSlot: "MORNING",
          durationType: "FULL",
          slotSpan: 3,
          betweenCity: false,
          sameCityReturn: true,
          diffDetail: null,
          ourSourceProvider: "SELF",
          transferType: "NOTRANSFER"
        },
        intercityTransferAvailable: false,
        dropOffCityIds: null,
        interestNames: [
          "Historical Architecture",
          "Museums",
          "Must See",
          "Scenery"
        ],
        themesMatch: 0,
        interestsMatch: 0,
        preferredCity: null,
        ticket: false,
        fastSelling: false,
        privateTour: false,
        freeTour: false,
        transferIncluded: false,
        kidFriendly: true,
        latitude: "48.14374",
        longitude: "17.108843",
        includedAttractions: null,
        recommended: true,
        highlight: false
      },
      "201030": {
        id: "58bd473d70ced2560d88d884",
        planningToolId: 201030,
        mustSee: true,
        title:
          "Costa Brava Tour: Lloret de Mar & Tossa de Mar with Boat Cruise",
        free: false,
        mainPhoto: "https://d3lf10b5gahyby.cloudfront.net/activity/201030.jpg",
        tourItinerary: null,
        termsConditions: "",
        salesPoints: null,
        currency: "INR",
        themes: [0],
        interests: [81, 12, 79],
        tags: ["Costa Brava"],
        groupTypes: null,
        notes:
          "Children aged 6 and younger are complimentary.This tour departs from a central location near Plaça de Catalunya.",
        type: 0,
        activityType: "EXPERIENCE",
        availabilityTime: "MORNING",
        longDesc:
          "<p>Spend a day soaking up the sun, sand and beachy vibe of Spain's famed Costa Brava, travelling to 2 of its most beautiful towns on this full-day tour. Spend the morning shopping along the promenade of Lloret de Mar, then take a boat trip to Tossa de Mar for a look at this fishing village's rich history.Meet up with your guide near the Pla�a de Catalunya and settle into a comfortable coach for the trip to the rugged Mediterranean coastline of the southern Costa Brava. Arrive in vibrant Lloret de Mar, the tourist hub of the Costa Brava, and spend an hour or so exploring. Stroll along the golden beach, take in the view over the shore from a hilltop vantage point and wander the narrow streets to window shop at high-end boutiques and bazaars peddling locally made wares.From there, hop aboard a Dofi jet boat and grab a seat in the climate-controlled cabin or up on top of the open-air deck for a picturesque cruise past wave-shaped sea cliffs to Tossa de Mar. Disembark and set off on foot behind your guide to delve into the history of this ancient fishing village, the only fortified medieval town still standing on the Catalan coast.Absorb the maritime atmosphere of Sa Roqueta, the traditional fishing area, then walk along the beach, following the town's fortified perimeter to the centuries-old lighthouse. From there, take in sweeping views over the sea before heading down into the Vila Vella, or Old Town, packed with narrow streets and pretty stone houses. Enjoy some free time for lunch before meeting back up with your guide for the return trip to Barcelona.</p>",
        shortDesc:
          "<p>Visit to 2 lovely towns on Spain's southern Costa Brava.Time to shop & stroll in vibrant resort town Lloret de Mar.Scenic Dofi jet boat trip by wave-shaped cliffs & beaches.Walking tour of historic Tossa de Mar's fortified Vila Vella.</p>",
        photos: [],
        rating: 0,
        openDays: null,
        preferredTimeofday: 0,
        otherTourGradesForCity: null,
        selectedTourGrade: {
          gradeCode: "DEFAULT",
          departureTime: "0830",
          gradeDescription: "",
          duration: "8hrs",
          pickupType: "Common Meeting Point",
          meetingPoint: "Carrer de Balmes",
          inclusion:
            "<ul><li>Guided tour of the southern Costa Brava</li><li>Walking tour of Lloret de Mar and Tossa de Mar</li><li>Dofi jet boat trip to Tossa de Mar</li><li>Roundtrip transportation from common meeting point</li></ul>",
          exclusion:
            "<ul><li>Food and drinks</li><li>Hotel pick-up and drop-off</li></ul>",
          cost: "5949",
          costText: "Cost per person",
          adultCost: "5949",
          startSlot: "MORNING",
          durationType: "HALF",
          slotSpan: 2,
          betweenCity: false,
          sameCityReturn: true,
          diffDetail: null,
          ourSourceProvider: "SELF",
          transferType: "NOTRANSFER"
        },
        intercityTransferAvailable: false,
        dropOffCityIds: null,
        interestNames: ["Cruise", "SimpleActivity", "Water Sports"],
        themesMatch: 0,
        interestsMatch: 0,
        preferredCity: null,
        ticket: false,
        fastSelling: false,
        privateTour: false,
        freeTour: false,
        transferIncluded: false,
        kidFriendly: false,
        latitude: "41.698315",
        longitude: "2.847321",
        includedAttractions: null,
        recommended: false,
        highlight: true
      },
      "201031": {
        id: "58bd474570ced2560d88d887",
        planningToolId: 201031,
        mustSee: true,
        title: "Park Guell & Sagrada Familia Tour",
        free: false,
        mainPhoto: "https://d3lf10b5gahyby.cloudfront.net/activity/201031.jpg",
        tourItinerary: null,
        termsConditions: "",
        salesPoints: null,
        currency: "INR",
        themes: [0],
        interests: [80, 9, 25, 74, 13],
        tags: ["Sagrada Familia"],
        groupTypes: null,
        notes: "<p>Children aged 3 and younger are complimentary.</p>\r\n",
        type: 0,
        activityType: "EXPERIENCE",
        availabilityTime: "MORNING",
        longDesc:
          "<p>Step into a world of creations by visionary architect Antoni Gaud&iacute; with a couple of tours that show you his most masterful works. With convenient skip-the-line access, you can explore the naturalist art of Park G&uuml;ell and visit the towering Sagrada Fam&iacute;lia, Gaud&iacute;&#39;s grandest design.At Park G&uuml;ell, enter by the grand staircase to see the dragon sculpture decorated with a mosaic of ceramic tiles, one of Barcelona&#39;s iconic images. The park is arranged around a large central square bordered by a snaking, mosaic-covered bench and supported by a forest of Doric columns, with paths and viaducts creating a style that unites architecture and nature.After your visit, the tour bus takes you to check in for your visit to the Sagrada Fam&iacute;lia. After some free time to explore the area, it&#39;s time to step into the basilica, a UNESCO World Heritage Site and one of the most-visited buildings in the world despite being as yet incomplete. Skip the lines for a look at the richly decorated interior, where the ornate vaulted ceilings reach up to 230 feet (70 m).Your tour also visits the Sagrada Fam&iacute;lia museum, where you can see drawings, models, and pictures showing the design, history, and development of this basilica from its early beginnings to the present day. Learn about Antoni Gaud&iacute;&#39;s life</p>",
        shortDesc:
          "<p>Skip-the-Line access to iconic works by Antoni Gaud&iacute;.Must-see attractions at 2 UNESCO World Heritage Sites.Ornate architecture, amazing design &amp; waterfall of colours.Sweeping views over the city skyline &amp; Mediterranean Sea.</p>",
        photos: [],
        rating: 0,
        openDays: null,
        preferredTimeofday: 0,
        otherTourGradesForCity: null,
        selectedTourGrade: {
          gradeCode: "DEFAULT",
          departureTime: "1000",
          gradeDescription: "",
          duration: "4hrs 30mins",
          pickupType: "Common Meeting Point",
          meetingPoint: "Julia Travel Office",
          inclusion:
            "<ul><li>Guided tours of Park Güell and Sagrada Família</li><li>Skip-the-Line entrance to Park Güell and Sagrada Família</li><li>Transport between sites</li></ul>",
          exclusion:
            "<ul><li>Food and drinks</li><li>Hotel pick-up and drop-off</li></ul>",
          cost: "7787",
          costText: "Cost per person",
          adultCost: "7787",
          startSlot: "MORNING",
          durationType: "HALF",
          slotSpan: 2,
          betweenCity: false,
          sameCityReturn: true,
          diffDetail: null,
          ourSourceProvider: "SELF",
          transferType: "NOTRANSFER"
        },
        intercityTransferAvailable: false,
        dropOffCityIds: null,
        interestNames: [
          "City Walks",
          "Historical Architecture",
          "Must See",
          "Religious Sites",
          "Scenery"
        ],
        themesMatch: 0,
        interestsMatch: 0,
        preferredCity: null,
        ticket: false,
        fastSelling: false,
        privateTour: false,
        freeTour: false,
        transferIncluded: false,
        kidFriendly: false,
        latitude: "41.414494",
        longitude: "2.1526945",
        includedAttractions: null,
        recommended: true,
        highlight: true
      },
      "305297": {
        id: "5aa64d6e9103ee501fff00ec",
        planningToolId: 305297,
        mustSee: false,
        title:
          "Columbus Monument Ticket with Upgrade Wine Tasting in Barcelona",
        free: false,
        mainPhoto:
          "http://cache-graphicslib.viator.com/graphicslib-prelive/thumbs674x446/2512/SITours/columbus-monument-ticket-with-upgrade-wine-tasting-in-barcelona-in-barcelona-380151.jpg",
        tourItinerary: null,
        termsConditions: null,
        salesPoints: null,
        currency: "USD",
        themes: [0, 1, 2],
        interests: [1, 4, 85, 22, 25],
        tags: [
          "ticket",
          "upgrade",
          "tasting",
          "barcelona",
          "monument",
          "wine",
          "columbus"
        ],
        groupTypes: null,
        notes:
          "<ul><li>Confirmation will be received at time of booking</li><li>Not wheelchair accessible</li></ul>",
        type: 0,
        activityType: "EXPERIENCE",
        availabilityTime: "ANYTIME",
        longDesc:
          "<p>The Columbus Monument, which opened in 1888 during the Universal Exhibition, stands at the end of La Rambla. Take the lift to the viewing gallery at the top, 179 ft. above the ground, where you can enjoy�breathtaking panoramic views of the city and the port.</p>\r\nChristopher Columbus disembarked in Barcelona harbor when he returned from his voyage to America?.�<br />To commemorate the event, we suggest you visit the Monument dedicated to this unique historical moment. You'll be able to admire the sculptural ensemble around the base of the magnificent Corinthian-style iron column.<br /><br />When you get to the top, you'll be able�to enjoy stunning 360� views. For instance, to the north, you'll see the Gothic Quarter with the bell towers of the cathedral, Santa Maria del Mar and La Merc� or the bustling Rambla. To the south, you'll see Mount Montju�c, with the castle at the top. Montju�c is also the site of museums, gardens, theaters and the Olympic Ring. If you look down, you'll see the Royal Shipyards, the Drassanes, which are home to the Museu Mar�tim.<br /><br />If you look east and follow the coastline, you'll be able to see the modern Forum area with its characteristic photo voltaic roof and skyscrapers. Closer to you, the twin towers mark the entrance to the Olympic Marina. At your feet you'll see the old harbor, the Port Vell, and the industrial port. Finally, to the west, you'll see the Parc Natural de Collserola, the vast green \"lung\" that surrounds the city, with the Collserola Tower and Tibidabo Amusement Park at the top.<br /><br />Four of the best varieties of cava and wine with Designation of Origin status: from the coastal area of Alella to the inland region of Pla de Bages, the innovative D.O. Catalunya and world-renowned Pened�s accompanied by a sweet or salty tapa while you listen to a brief explanation of your choice of wine.<br /><br />You'll also find�information about activities and discover everything there is to do in Catalonia regarding wine tourism experiences. And you?ll be able to buy the wines you?ve tasted.",
        shortDesc:
          "<p>Take the lift to the viewing gallery at the top, 179 ft. above the ground, where you can enjoy breathtaking panoramic views of the city and the port. At the wine-tasting space, the Espai de Vins Mirador de Colom, you’ll be able to taste 1 glass from the four Designation of Origin regions: Alella, Catalunya, Penedès and Pla de Bages. (adults only)</p>",
        photos: [null],
        rating: 5,
        openDays: null,
        preferredTimeofday: 0,
        otherTourGradesForCity: null,
        selectedTourGrade: {
          gradeCode: "TG1",
          departureTime: "0900",
          gradeDescription:
            "Enjoy the breathtaking views from 197 ft. Climb up to the base of the Columbus' statue to see unique views of Las Ramblas, the Port and the whole city.",
          duration: "24hrs",
          pickupType: "Common Meeting Point",
          meetingPoint: "Mirador de Colom",
          inclusion:
            "<ul><li>Wine tasting (if selected)</li><li>Admission ticket</li></ul>",
          exclusion: "<ul><li>Lunch</li></ul>",
          cost: "369",
          costText: "Cost per person",
          adultCost: "5",
          startSlot: "MORNING",
          durationType: "FULL",
          slotSpan: 3,
          betweenCity: false,
          sameCityReturn: true,
          diffDetail: null,
          ourSourceProvider: "VIATOR",
          transferType: "NOTRANSFER"
        },
        intercityTransferAvailable: false,
        dropOffCityIds: null,
        interestNames: ["Food", "Museums", "Palaces", "Scenery", "Theme Parks"],
        themesMatch: 0,
        interestsMatch: 0,
        preferredCity: null,
        ticket: true,
        fastSelling: true,
        privateTour: false,
        freeTour: false,
        transferIncluded: false,
        kidFriendly: false,
        latitude: "41.385124",
        longitude: "2.1732435",
        includedAttractions: null,
        recommended: false,
        highlight: true
      },
      "305442": {
        id: "5aa64f529103ee501fff017d",
        planningToolId: 305442,
        mustSee: false,
        title: "Sunset with cocktails or cava",
        free: false,
        mainPhoto:
          "http://cache-graphicslib.viator.com/graphicslib-prelive/thumbs674x446/31881/SITours/sunset-with-cocktails-or-cava-in-barcelona-519625.jpg",
        tourItinerary: null,
        termsConditions: null,
        salesPoints: null,
        currency: "USD",
        themes: [0, 1, 2],
        interests: [1, 68, 36, 9],
        tags: ["or", "cocktails", "sunset", "cava"],
        groupTypes: null,
        notes:
          "<ul><li>Confirmation will be received at time of booking</li><li>If you want both cocktails and cava, you should pay extra money.</li><li>A maximum of&nbsp;11 people per booking (If you are more people, we will add an extra boat!)</li></ul>",
        type: 0,
        activityType: "EXPERIENCE",
        availabilityTime: "MORNING_NOON",
        longDesc:
          "Exhilarating or relaxing; live a real sailing experience from its deck observing the city from the Mediterranean sea. <br />Let yourself be immersed into authentic Barcelona soul visiting the city from the sea. We will start from the ancient harbor of the city and start our sunset expedition across Barcelona coast.�The activity includes one cocktail per person (Gin Tonic with botanics) or�a bottle of cava accompanied with some snacks.�<br />Scape from the city bustle, the pollution and the tourist mass and come to the Sailing District. From here you will have the chance to see the skyline of Barcelona,�including monuments like: Port Vell, Columbus monument, Montjuic and Tibidabo mountain, Barcelona district, Eixample, Sagrada Familia, Agbar Tower, the innovation district and much more!<br />The�activity�includes dried fruits and one cocktail per person (Gin Tonic with botanics) or�a bottle of�cava, moreover you have the chance to ask�for more extras, such as: cava, more cocktails, snacks... and much more! (Please tell us�if you would like to add more extras to the experience and we will bring them to�your�boat!)<br />Take the chance to enjoy an authentic salty experience in a unique &amp; special wooden sailboat :-)",
        shortDesc:
          "Welcome to the hidden district of Barcelona, the sea. <br />We will take you with a classic and unique wooden sailboat of 16 metres length that combines classic pedigree with contemporary comfort. You will have the chance to scape from the bustle city and enjoy the sunset colors of Barcelona accompanied by fresh cocktails or cava. <br />During the experience you will have the chance to discover the skyline of Barcelona and observe plenty of monuments, such as: Port Vell, Columbus monument, Montjuic and Tibidabo mountain, Barcelona district, Eixample, Sagrada Familia, Agbar Tower, the innovation district and much more!",
        photos: [
          "http://cache-graphicslib.viator.com/graphicslib-prelive/31881/SITours/sunset-with-cocktails-or-cava-in-barcelona-519626.jpg"
        ],
        rating: 0,
        openDays: null,
        preferredTimeofday: 0,
        otherTourGradesForCity: null,
        selectedTourGrade: {
          gradeCode: "DEFAULT",
          departureTime: "1200",
          gradeDescription: "",
          duration: "2hrs",
          pickupType: "Common Meeting Point",
          meetingPoint:
            "One Ocean Club (Moll de la Barceloneta, 1, 08003 Barcelona)",
          inclusion:
            "<ul><li><strong>Courtesy drinks:Â </strong>Bottled water and soft Drinks</li><li>One cocktail (1 Gin Tonic with botanics per person) <strong>orÂ </strong>bottle of cava (1 bottle eachÂ 4 people)</li><li>Snacks (Dried fruits)</li><li>Fuel surcharge</li><li>Driver (professional captain)</li><li>All taxes, fees and handling charges</li><li>Entrance fees</li><li>Private boat</li><li>Private tour</li></ul>",
          exclusion:
            "<ul><li>Hotel pickup and drop-off</li><li>Extra CocktailsÂ </li><li>Extra Cava Bottle</li><li>Cheese Selection</li><li>Ham Selection</li><li>Bread Selection</li><li>Water toys</li></ul>",
          cost: "56,864",
          costText: "Cost per person",
          adultCost: "829",
          startSlot: "EVENING",
          durationType: "QUARTER",
          slotSpan: 1,
          betweenCity: false,
          sameCityReturn: true,
          diffDetail: null,
          ourSourceProvider: "VIATOR",
          transferType: "NOTRANSFER"
        },
        intercityTransferAvailable: false,
        dropOffCityIds: null,
        interestNames: ["Museums", "Must See", "Sailing", "Sky Diving"],
        themesMatch: 0,
        interestsMatch: 0,
        preferredCity: null,
        ticket: false,
        fastSelling: true,
        privateTour: true,
        freeTour: false,
        transferIncluded: false,
        kidFriendly: false,
        latitude: "41.385124",
        longitude: "2.1732435",
        includedAttractions: null,
        recommended: false,
        highlight: true
      },
      "307453": {
        id: "5aa66a8c9103ee501fff0958",
        planningToolId: 307453,
        mustSee: false,
        title: "Vienna Schönbrunner Gardens Mini-Train Tour",
        free: false,
        mainPhoto:
          "http://cache-graphicslib.viator.com/graphicslib-prelive/thumbs674x446/3554/SITours/vienna-sch-nbrunner-gardens-mini-train-tour-in-vienna-188055.jpg",
        tourItinerary: null,
        termsConditions: null,
        salesPoints: null,
        currency: "USD",
        themes: [0, 1, 2],
        interests: [1, 81, 9, 15],
        tags: ["schã¶nbrunner", "gardens", "mini-train", "vienna"],
        groupTypes: null,
        notes:
          "<ul><li>Confirmation will be received at time of booking</li><li>Confirmation of this product will be received at time of booking</li></ul>",
        type: 0,
        activityType: "EXPERIENCE",
        availabilityTime: "MORNING",
        longDesc:
          "The gardens of Vienna's Sch&ouml;nbrunn Palace are a UNESCO World Heritage Site and one of the city's greatest treasures. Covering a vast area, the beautiful Baroque landscapes are sprinkled with ornamental monuments, pools, mazes and fountains as well as other attractions such as Sch&ouml;nbrunn Zoo and the spectacular Gloriette monument.<br />With so much to see, the gardens can be overwhelming for even the most intrepid visitors. So remove the punishing legwork, and explore the site aboard a miniature, hop-on, hop-off panorama train that circumnavigates the grounds. <br />Entrance to the Sch&ouml;nbrunn Palace Gardens is free, so all you need do is enter via any of the main gates, and then, armed with your 1-day train ticket, hop aboard the mini-train outside the Sch&ouml;nbrunn Palace or the Gloriette to explore the sights at your own pace. Learn about the gardens from the onboard commentary and either remain on the train for an entire loop (roughly 50 minutes) or hop on and hop off at any of the nine stops to create your own sightseeing itinerary.<br />Give the steep walk up to the Gloriette a miss by riding up to the hilltop terrace, or jump off to see showstoppers such as the ornate Obelisk Fountain and Roman Ruin. You can also hop on and off to see the glass Palm House and visit Sch&ouml;nbrunn Zoo (entrance fee applies). <br />The train runs daily, and you&rsquo;re free to complete as many circuits as you wish with your 1-day ticket. Click the &lsquo;View additional info&rsquo; link to see a map of the train route.<br /><strong>Hop-On Hop-Off Stops:</strong>\r\n<ul>\r\n<li>Exterior of Sch&ouml;nbrunn Palace</li>\r\n<li>Wagenburg</li>\r\n<li>Hietzinger Gate</li>\r\n<li>Exterior of Sch&ouml;nbrunn Zoo and Palm House</li>\r\n<li>Tirolergarten Tavern</li>\r\n<li>Gloriette</li>\r\n<li>Hohenbergstrasse and Tivoli</li>\r\n<li>Obelisk Fountain and Sch&ouml;nbrunn Spa</li>\r\n<li>Meidlinger Gate</li>\r\n</ul>",
        shortDesc:
          "Discover Vienna&rsquo;s glorious Sch&ouml;nbrunn Palace Gardens, set in the grounds of the Sch&ouml;nbrunn Palace, with this 1-day hop-on, hop-off mini-train ticket. Enter the gardens, and ride a mini-train around their lawns and attractions without any tiring legwork. Hop on and off at nine stops to see highlights such as the Gloriette viewpoint, Obelisk Fountain and Sch&ouml;nbrunn Zoo. Alternatively, stay on board for the full 50-minute circuit around the gardens&rsquo; treasures. Entrance fees to the Sch&ouml;nbrunn Palace, and other garden attractions such as the Gloriette and the zoo are not included.",
        photos: [
          "http://cache-graphicslib.viator.com/graphicslib-prelive/3554/SITours/vienna-sch-nbrunner-gardens-mini-train-tour-in-vienna-183782.jpg"
        ],
        rating: 3.5,
        openDays: null,
        preferredTimeofday: 0,
        otherTourGradesForCity: null,
        selectedTourGrade: {
          gradeCode: "DEFAULT",
          departureTime: "0900",
          gradeDescription: "",
          duration: "50mins",
          pickupType: "Common Meeting Point",
          meetingPoint: "Sch&ouml;nbrunner Palace Gardens, central Vienna",
          inclusion:
            "<ul><li>Hop-on hop-off train tour</li><li>Onboard commentary</li></ul>",
          exclusion:
            "<ul><li>Hotel pickup and drop-off</li><li>Gratuities (optional)</li><li>Food and drinks</li><li>Entrance fee to Schonbrunn Palace and other garden attractions where applicable</li></ul>",
          cost: "722",
          costText: "Cost per person",
          adultCost: "11",
          startSlot: "MORNING",
          durationType: "QUARTER",
          slotSpan: 1,
          betweenCity: false,
          sameCityReturn: true,
          diffDetail: null,
          ourSourceProvider: "VIATOR",
          transferType: "NOTRANSFER"
        },
        intercityTransferAvailable: false,
        dropOffCityIds: null,
        interestNames: ["SimpleActivity", "Museums", "Must See", "Zoo"],
        themesMatch: 0,
        interestsMatch: 0,
        preferredCity: null,
        ticket: true,
        fastSelling: true,
        privateTour: false,
        freeTour: false,
        transferIncluded: false,
        kidFriendly: false,
        latitude: "48.208244",
        longitude: "16.373724",
        includedAttractions: null,
        recommended: false,
        highlight: true
      },
      "307779": {
        id: "5aa66f339103ee501fff0a9e",
        planningToolId: 307779,
        mustSee: false,
        title: "Prague World War II and Communism Private Walking Tour",
        free: false,
        mainPhoto:
          "http://cache-graphicslib.viator.com/graphicslib-prelive/thumbs674x446/24445/SITours/prague-world-war-ii-and-communism-private-walking-tour-in-prague-301751.jpg",
        tourItinerary: null,
        termsConditions: null,
        salesPoints: null,
        currency: "USD",
        themes: [0, 1, 2],
        interests: [1, 13, 31],
        tags: [
          "ii",
          "private",
          "world",
          "walking",
          "war",
          "prague",
          "communism"
        ],
        groupTypes: null,
        notes:
          "<ul><li>Confirmation will be received at time of booking</li><li>Adult pricing applies to all travelers</li><li>A moderate amount of walking is involved</li><li>Wheelchair accessible</li></ul>",
        type: 0,
        activityType: "EXPERIENCE",
        availabilityTime: "ANYTIME",
        longDesc:
          "Learn about the most important events of the 20th century during Nazism and Communism in Czechoslovakia and visit the places where they�happened.�<br />�The tour begins in front of the most feared police station during Communism located in Bartolom?jsk� street. Listen to the stories of how the secret police worked and why each person had to be careful about talking about certain things in the public. From there you will go the National Avenue where the Velvet revolution was happening in 1989, leading to the collapse of the Communist regime in Czechoslovakia. The peaceful demonstration turned into violent suppression which triggered the massive demonstrations around the country.�<br /><br />You will continue to the crypt where the parachutists where hiding after the assaciantion of the Reichsprotector Reinhard Heydrich in June 1942. After being betrayed by another parachutist, the hiding place - crypt in a church close to the Charles Square - was surrounded by the Germans. The Czech heroes were shot there or rather poisened themselves. In any case, this museum is definitelly worth visiting.�<br /><br />Further you continue to the Wenceslas Square which was important for the 1968 Soviet occupation. You can still see the white dots of the shooting on the National museum. In front of the building you find a monument of Jan Palach and Jan Zaj�c, two young students who set themselves on fire and burnt themselves on the top of the Wenceslas Square as a protest against the passive acceptance of the occupation by the Czechoslovak society.�<br /><br />From there you walk to the Jewish quarter where you learn about the Jewish Museum during the Second World War, why was the former Jewish ghetto never destroyed, or where had the Jews relocate to during the war.<br />The last stop will be the monument of Jan Palach on the Philosophical faculty close to the Old Town Square.",
        shortDesc:
          "Explore how the city of Prague evolved through some of the most explosive moments in the 20th century. See firsthand the influence and transformation of Prague from the Occupation of Germany to the Velvet Revolution. Learn from your guide about the affects of the Prague Spring and the Communist Putsch of 1948. Walk through the city streets to gain insight into the events that shaped this city during this 3-hour tour.",
        photos: [null],
        rating: 0,
        openDays: null,
        preferredTimeofday: 0,
        otherTourGradesForCity: null,
        selectedTourGrade: {
          gradeCode: "TG3",
          departureTime: "1700",
          gradeDescription:
            "3-hour private Prague tour covering the topics of WWII and Communism.",
          duration: "3hrs",
          pickupType: "Hotel",
          meetingPoint: "Your hotel in Prague",
          inclusion:
            "<ul><li>Professional guide</li><li>Local guide</li><li>Private tour</li></ul>",
          exclusion: "<ul><li>Gratuities (recommended)</li></ul>",
          cost: "9026",
          costText: "Cost per person",
          adultCost: "132",
          startSlot: "EVENING",
          durationType: "QUARTER",
          slotSpan: 1,
          betweenCity: false,
          sameCityReturn: true,
          diffDetail: null,
          ourSourceProvider: "VIATOR",
          transferType: "PRIVATE"
        },
        intercityTransferAvailable: false,
        dropOffCityIds: null,
        interestNames: ["City Walks", "Hot air Balloon", "Museums"],
        themesMatch: 0,
        interestsMatch: 0,
        preferredCity: null,
        ticket: false,
        fastSelling: true,
        privateTour: true,
        freeTour: false,
        transferIncluded: true,
        kidFriendly: false,
        latitude: "50.07556",
        longitude: "14.437632",
        includedAttractions: null,
        recommended: false,
        highlight: true
      },
      "311509": {
        id: "5aa6aa449103ee501fff1930",
        planningToolId: 311509,
        mustSee: false,
        title: "Laser Tag Session in Bratislava",
        free: false,
        mainPhoto:
          "http://cache-graphicslib.viator.com/graphicslib-prelive/thumbs674x446/10657/SITours/laser-tag-session-in-bratislava-in-bratislava-197733.jpg",
        tourItinerary: null,
        termsConditions: null,
        salesPoints: null,
        currency: "USD",
        themes: [0, 1, 2],
        interests: [68, 9, 27],
        tags: ["bratislava", "laser", "session", "tag"],
        groupTypes: null,
        notes:
          "<ul><li>Confirmation will be received at time of booking</li><li>A minimum of 4 people per booking is required</li><li>Children must be accompanied by an adult</li><li>Minimum age is 8 years</li></ul>",
        type: 0,
        activityType: "EXPERIENCE",
        availabilityTime: "MORNING",
        longDesc:
          "Laser tag is a team game that engages everyone who is playful at heart and yearns for adventure. The game introduces a brilliant symbiosis of fun, exercise, and adrenaline while it can be enjoyed by children and adults as well. In contrast with the popular game of paintball there is no dirt, pain or dropping out after getting shot. In this unique game you have unlimited lives and ammunition so everyone can enjoy it until the end. You will not be bored!<br /><br />A game of laser tag generally lasts 12-minutes and is intended for 4 to 16 players from 8 years of age and above. A general rule applies that the more players there are, the more fun it gets. Before the beginning of the game, a professional team member will bring you into the briefing room to inform you about the rules, help you with vests and explain the use of the system. It is up to you to divide into one or more teams and choose a version of the game. Dressed in a special vest and equipped with a system that uses the newest hi-tech technology, you will enter the labyrinth. Darkness, dense fog, thrilling music, finger on the trigger, intersecting laser beams, adrenaline in the blood?. you are playing a laser game in Bratislava!<br /><br />Space World offers 13 different variations of laser tag, including Zombies, Agents, Golden Hero, Territories, and Gladiators, so you will fully enjoy the action. With a maze of over 360 square meters and interactive components like energy gates, base stations, and lazer mirrors your battle will be so much fun.",
        shortDesc:
          "Enjoy an amazing 2-hour laser tag session, plus other fun and exciting activities. The entertainment center allows children as well as adults to enjoy their free time playing laser tag, X-Box table tennis, XXL table football, or billiards.",
        photos: [
          "http://cache-graphicslib.viator.com/graphicslib-prelive/10657/SITours/laser-tag-session-in-bratislava-in-bratislava-197734.jpg"
        ],
        rating: 0,
        openDays: null,
        preferredTimeofday: 0,
        otherTourGradesForCity: null,
        selectedTourGrade: {
          gradeCode: "DEFAULT",
          departureTime: "0900",
          gradeDescription: "",
          duration: "2hrs",
          pickupType: "Common Meeting Point",
          meetingPoint: "Space World",
          inclusion:
            "<ul><li>Viator brokerage fee</li><li>All activities</li></ul>",
          exclusion:
            "<ul><li>Alcoholic drinks (available to purchase)</li><li>Gratuities (optional)</li><li>Transportation to/from attractions</li><li>Hotel pickup and drop-off</li></ul>",
          cost: "1354",
          costText: "Cost per person",
          adultCost: "20",
          startSlot: "MORNING",
          durationType: "QUARTER",
          slotSpan: 1,
          betweenCity: false,
          sameCityReturn: true,
          diffDetail: null,
          ourSourceProvider: "VIATOR",
          transferType: "NOTRANSFER"
        },
        intercityTransferAvailable: false,
        dropOffCityIds: null,
        interestNames: ["Must See", "Safaris", "Sky Diving"],
        themesMatch: 0,
        interestsMatch: 0,
        preferredCity: null,
        ticket: false,
        fastSelling: true,
        privateTour: false,
        freeTour: false,
        transferIncluded: false,
        kidFriendly: true,
        latitude: "48.158638",
        longitude: "17.106167",
        includedAttractions: null,
        recommended: false,
        highlight: true
      }
    },
    flightCostings: {
      totalFlightCost: "1,32,484",
      totalOurCost: "1,32,484",
      flightCostingById: {
        BCN_PRG: {
          flightSearchQueries: [
            {
              departureDate: {
                year: 2018,
                month: "OCTOBER",
                monthValue: 10,
                dayOfMonth: 5,
                dayOfWeek: "FRIDAY",
                era: "CE",
                dayOfYear: 278,
                leapYear: false,
                chronology: {
                  calendarType: "iso8601",
                  id: "ISO"
                }
              },
              departureAirportCode: "BCN",
              arrivalAirportCode: "PRG",
              departAfter: "0800",
              arriveBefore: "1600",
              allowedArrivalDate: {
                year: 2018,
                month: "OCTOBER",
                monthValue: 10,
                dayOfMonth: 5,
                dayOfWeek: "FRIDAY",
                era: "CE",
                dayOfYear: 278,
                leapYear: false,
                chronology: {
                  calendarType: "iso8601",
                  id: "ISO"
                }
              }
            }
          ],
          status: "SUCCESS",
          dbFlightId: "5af156093fef300c015c80cb",
          identifier: "VY###VY-BCN-PRG_06:25:00_08:45:00",
          price: "13,070",
          trips: {
            BCN_PRG: {
              duration: 140,
              routes: [
                {
                  departureCityId: 7,
                  departureCity: "Barcelona",
                  arrivalCityId: 200,
                  arrivalCity: "Prague",
                  departureAirportCode: "BCN",
                  arrivalAirportCode: "PRG",
                  carrierCode: "VY",
                  flightNumber: "8652",
                  flightModel: "",
                  carrierName: "Vueling Airlines",
                  departureDate: "2018-10-05",
                  departureDayOfWeek: "Fri",
                  arrivalDate: "2018-10-05",
                  arrivalDayOfWeek: "Fri",
                  depDateOfMonth: "5",
                  depMonth: "Oct",
                  arrDateOfMonth: "5",
                  arrMonth: "Oct",
                  departureTime: "06:25:00",
                  arrivalTime: "08:45:00",
                  connectionDuration: 0,
                  freeCheckInBaggage: "",
                  freeCabinBaggage: "",
                  travelDuration: 140,
                  flyTime: "2h 20m",
                  layoverTime: "0h"
                }
              ],
              tripIdentifier: "VY-BCN-PRG_06:25:00_08:45:00",
              key: "BCN_PRG",
              day: "5",
              mon: "Oct",
              dayOfWeek: "Fri",
              landSameDay: true,
              landDay: "5",
              landMon: "Oct",
              landDayOfWeek: "Fri",
              changesStayStartDate: false,
              flyTime: "2h 20m"
            }
          },
          allTrips: ["BCN_PRG"],
          marketingText: "",
          noOfSeatAvailable: 10,
          key: "BCN_PRG",
          airlineCode: "VY",
          airlineName: "Vueling Airlines",
          refundable: false,
          flightClass: "ECONOMY",
          freeCheckInBaggage: "",
          freeCabinBaggage: "",
          canRemoveCost: false,
          excessBaggageInfo: null,
          errorDetail: null,
          transitVisaText:
            "Transit Visa is required for flights with layover in ANY Australian city (airport)",
          ourSourceProvider: "SKYPICKER",
          internetSourceProvider: "SKYPICKER",
          pnr: null,
          expiresIn: null,
          pnrValidTill: null,
          bookedCost: null,
          lcc: false,
          canEditFareValidity: false,
          flightConvenienceStatus: "GOOD",
          totalCancellationFee: "NA",
          totalRescheduleFee: "NA",
          text: "Barcelona-Prague",
          ourCost: "13,070",
          validatingAirline: "VY",
          rateMatches: null
        },
        "BLR_BCN###VIE_BLR": {
          flightSearchQueries: [
            {
              departureDate: {
                year: 2018,
                month: "SEPTEMBER",
                monthValue: 9,
                dayOfMonth: 30,
                dayOfWeek: "SUNDAY",
                era: "CE",
                dayOfYear: 273,
                leapYear: false,
                chronology: {
                  calendarType: "iso8601",
                  id: "ISO"
                }
              },
              departureAirportCode: "BLR",
              arrivalAirportCode: "BCN",
              departAfter: null,
              arriveBefore: null,
              allowedArrivalDate: {
                year: 2018,
                month: "SEPTEMBER",
                monthValue: 9,
                dayOfMonth: 30,
                dayOfWeek: "SUNDAY",
                era: "CE",
                dayOfYear: 273,
                leapYear: false,
                chronology: {
                  calendarType: "iso8601",
                  id: "ISO"
                }
              }
            },
            {
              departureDate: {
                year: 2018,
                month: "OCTOBER",
                monthValue: 10,
                dayOfMonth: 14,
                dayOfWeek: "SUNDAY",
                era: "CE",
                dayOfYear: 287,
                leapYear: false,
                chronology: {
                  calendarType: "iso8601",
                  id: "ISO"
                }
              },
              departureAirportCode: "VIE",
              arrivalAirportCode: "BLR",
              departAfter: null,
              arriveBefore: null,
              allowedArrivalDate: null
            }
          ],
          status: "SUCCESS",
          dbFlightId: "5af156073fef300c015c80b7",
          identifier:
            "KL###KL-BLR-AMS_02:00:00_08:45:00#KL-AMS-BCN_14:15:00_16:25:00#KL-VIE-AMS_06:55:00_08:50:00#KL-AMS-BLR_10:50:00_00:15:00",
          price: "1,19,414",
          trips: {
            BLR_BCN: {
              duration: 1075,
              routes: [
                {
                  departureCityId: null,
                  departureCity: "Bangalore",
                  arrivalCityId: 2,
                  arrivalCity: "Amsterdam",
                  departureAirportCode: "BLR",
                  arrivalAirportCode: "AMS",
                  carrierCode: "KL",
                  flightNumber: "3813",
                  flightModel: "",
                  carrierName: "Klm Royal Dutch Airlines",
                  departureDate: "2018-09-30",
                  departureDayOfWeek: "Sun",
                  arrivalDate: "2018-09-30",
                  arrivalDayOfWeek: "Sun",
                  depDateOfMonth: "30",
                  depMonth: "Sep",
                  arrDateOfMonth: "30",
                  arrMonth: "Sep",
                  departureTime: "02:00:00",
                  arrivalTime: "08:45:00",
                  connectionDuration: 330,
                  freeCheckInBaggage: "1 pcs",
                  freeCabinBaggage: "Info not available",
                  travelDuration: 615,
                  flyTime: "10h 15m",
                  layoverTime: "5h 30m"
                },
                {
                  departureCityId: null,
                  departureCity: "Amsterdam",
                  arrivalCityId: 7,
                  arrivalCity: "Barcelona",
                  departureAirportCode: "AMS",
                  arrivalAirportCode: "BCN",
                  carrierCode: "KL",
                  flightNumber: "52",
                  flightModel: "",
                  carrierName: "Klm Royal Dutch Airlines",
                  departureDate: "2018-09-30",
                  departureDayOfWeek: "Sun",
                  arrivalDate: "2018-09-30",
                  arrivalDayOfWeek: "Sun",
                  depDateOfMonth: "30",
                  depMonth: "Sep",
                  arrDateOfMonth: "30",
                  arrMonth: "Sep",
                  departureTime: "14:15:00",
                  arrivalTime: "16:25:00",
                  connectionDuration: 0,
                  freeCheckInBaggage: "1 pcs",
                  freeCabinBaggage: "Info not available",
                  travelDuration: 130,
                  flyTime: "2h 10m",
                  layoverTime: "0h"
                }
              ],
              tripIdentifier:
                "KL-BLR-AMS_02:00:00_08:45:00#KL-AMS-BCN_14:15:00_16:25:00",
              key: "BLR_BCN",
              day: "30",
              mon: "Sep",
              dayOfWeek: "Sun",
              landSameDay: true,
              landDay: "30",
              landMon: "Sep",
              landDayOfWeek: "Sun",
              changesStayStartDate: false,
              flyTime: "17h 55m"
            },
            VIE_BLR: {
              duration: 830,
              routes: [
                {
                  departureCityId: null,
                  departureCity: "Vienna",
                  arrivalCityId: 2,
                  arrivalCity: "Amsterdam",
                  departureAirportCode: "VIE",
                  arrivalAirportCode: "AMS",
                  carrierCode: "KL",
                  flightNumber: "1838",
                  flightModel: "",
                  carrierName: "Klm Royal Dutch Airlines",
                  departureDate: "2018-10-14",
                  departureDayOfWeek: "Sun",
                  arrivalDate: "2018-10-14",
                  arrivalDayOfWeek: "Sun",
                  depDateOfMonth: "14",
                  depMonth: "Oct",
                  arrDateOfMonth: "14",
                  arrMonth: "Oct",
                  departureTime: "06:55:00",
                  arrivalTime: "08:50:00",
                  connectionDuration: 120,
                  freeCheckInBaggage: "1 pcs",
                  freeCabinBaggage: "Info not available",
                  travelDuration: 115,
                  flyTime: "1h 55m",
                  layoverTime: "2h"
                },
                {
                  departureCityId: null,
                  departureCity: "Amsterdam",
                  arrivalCityId: 305,
                  arrivalCity: "Bangalore",
                  departureAirportCode: "AMS",
                  arrivalAirportCode: "BLR",
                  carrierCode: "KL",
                  flightNumber: "3812",
                  flightModel: "",
                  carrierName: "Klm Royal Dutch Airlines",
                  departureDate: "2018-10-14",
                  departureDayOfWeek: "Sun",
                  arrivalDate: "2018-10-15",
                  arrivalDayOfWeek: "Mon",
                  depDateOfMonth: "14",
                  depMonth: "Oct",
                  arrDateOfMonth: "15",
                  arrMonth: "Oct",
                  departureTime: "10:50:00",
                  arrivalTime: "00:15:00",
                  connectionDuration: 0,
                  freeCheckInBaggage: "1 pcs",
                  freeCabinBaggage: "Info not available",
                  travelDuration: 595,
                  flyTime: "9h 55m",
                  layoverTime: "0h"
                }
              ],
              tripIdentifier:
                "KL-VIE-AMS_06:55:00_08:50:00#KL-AMS-BLR_10:50:00_00:15:00",
              key: "VIE_BLR",
              day: "14",
              mon: "Oct",
              dayOfWeek: "Sun",
              landSameDay: false,
              landDay: "15",
              landMon: "Oct",
              landDayOfWeek: "Mon",
              changesStayStartDate: false,
              flyTime: "13h 50m"
            }
          },
          allTrips: ["BLR_BCN", "VIE_BLR"],
          marketingText: "",
          noOfSeatAvailable: 7,
          key: "BLR_BCN###VIE_BLR",
          airlineCode: "KL",
          airlineName: "KLM",
          refundable: false,
          flightClass: "ECONOMY",
          freeCheckInBaggage: "1 pcs",
          freeCabinBaggage: null,
          canRemoveCost: true,
          excessBaggageInfo: null,
          errorDetail: null,
          transitVisaText:
            "Transit Visa is required for flights with layover in ANY Australian city (airport)",
          ourSourceProvider: "TBO",
          internetSourceProvider: "TBO",
          pnr: null,
          expiresIn: null,
          pnrValidTill: null,
          bookedCost: null,
          lcc: false,
          canEditFareValidity: false,
          flightConvenienceStatus: "LONG_FLIGHT",
          totalCancellationFee: "NA",
          totalRescheduleFee: "NA",
          text: "Bangalore-Barcelona-Vienna-Bangalore",
          ourCost: "1,19,414",
          validatingAirline: "KL",
          rateMatches: null
        }
      }
    },
    activityCostings: {
      activityCostingById: {
        "200175###11102018": {
          mon: "Oct",
          day: "11",
          dayOfWeek: "Thu",
          currency: null,
          date: 1539216000000,
          totalCost: "11,722",
          key: "200175###11102018",
          activityId: "200175",
          cityText: "Vienna",
          ourSourceProvider: "SELF",
          internetSourceProvider: "SELF",
          publishedCost: "11,722",
          inCombo: false,
          inSwissPass: false,
          comboId: "0",
          ourCost: "8996",
          activityName: "Schonbrunn Palace & Vienna Explorations",
          oldCostingInfo: null,
          refundable: false,
          rateMatches: null,
          cancelled: false
        },
        "307453###13102018": {
          mon: "Oct",
          day: "13",
          dayOfWeek: "Sat",
          currency: null,
          date: 1539388800000,
          totalCost: "1444",
          key: "307453###13102018",
          activityId: "307453",
          cityText: "Vienna",
          ourSourceProvider: "VIATOR",
          internetSourceProvider: "VIATOR",
          publishedCost: "1444",
          inCombo: false,
          inSwissPass: false,
          comboId: "0",
          ourCost: "1444",
          activityName: "Vienna Schönbrunner Gardens Mini-Train Tour",
          oldCostingInfo: null,
          refundable: true,
          rateMatches: null,
          cancelled: false
        },
        "305297###04102018": {
          mon: "Oct",
          day: "4",
          dayOfWeek: "Thu",
          currency: null,
          date: 1538611200000,
          totalCost: "739",
          key: "305297###04102018",
          activityId: "305297",
          cityText: "Barcelona",
          ourSourceProvider: "VIATOR",
          internetSourceProvider: "VIATOR",
          publishedCost: "739",
          inCombo: false,
          inSwissPass: false,
          comboId: "0",
          ourCost: "739",
          activityName:
            "Columbus Monument Ticket with Upgrade Wine Tasting in Barcelona",
          oldCostingInfo: null,
          refundable: false,
          rateMatches: null,
          cancelled: false
        },
        "200104###01102018": {
          mon: "Oct",
          day: "1",
          dayOfWeek: "Mon",
          currency: null,
          date: 1538352000000,
          totalCost: "11,967",
          key: "200104###01102018",
          activityId: "200104",
          cityText: "Barcelona",
          ourSourceProvider: "SELF",
          internetSourceProvider: "SELF",
          publishedCost: "11,967",
          inCombo: false,
          inSwissPass: false,
          comboId: "0",
          ourCost: "9184",
          activityName: "Montserrat Monastery & Hiking Experience",
          oldCostingInfo: null,
          refundable: false,
          rateMatches: null,
          cancelled: false
        },
        "201030###02102018": {
          mon: "Oct",
          day: "2",
          dayOfWeek: "Tue",
          currency: null,
          date: 1538438400000,
          totalCost: "11,899",
          key: "201030###02102018",
          activityId: "201030",
          cityText: "Barcelona",
          ourSourceProvider: "SELF",
          internetSourceProvider: "SELF",
          publishedCost: "11,899",
          inCombo: false,
          inSwissPass: false,
          comboId: "0",
          ourCost: "9132",
          activityName:
            "Costa Brava Tour: Lloret de Mar & Tossa de Mar with Boat Cruise",
          oldCostingInfo: null,
          refundable: false,
          rateMatches: null,
          cancelled: false
        },
        "307779###05102018": {
          mon: "Oct",
          day: "5",
          dayOfWeek: "Fri",
          currency: null,
          date: 1538697600000,
          totalCost: "18,053",
          key: "307779###05102018",
          activityId: "307779",
          cityText: "Prague",
          ourSourceProvider: "VIATOR",
          internetSourceProvider: "VIATOR",
          publishedCost: "18,053",
          inCombo: false,
          inSwissPass: false,
          comboId: "0",
          ourCost: "18,053",
          activityName:
            "Prague World War II and Communism Private Walking Tour",
          oldCostingInfo: null,
          refundable: true,
          rateMatches: null,
          cancelled: false
        },
        "305442###01102018": {
          mon: "Oct",
          day: "1",
          dayOfWeek: "Mon",
          currency: null,
          date: 1538352000000,
          totalCost: "1,13,729",
          key: "305442###01102018",
          activityId: "305442",
          cityText: "Barcelona",
          ourSourceProvider: "VIATOR",
          internetSourceProvider: "VIATOR",
          publishedCost: "1,13,729",
          inCombo: false,
          inSwissPass: false,
          comboId: "0",
          ourCost: "1,13,729",
          activityName: "Sunset with cocktails or cava",
          oldCostingInfo: null,
          refundable: true,
          rateMatches: null,
          cancelled: false
        },
        "311509###07102018": {
          mon: "Oct",
          day: "7",
          dayOfWeek: "Sun",
          currency: null,
          date: 1538870400000,
          totalCost: "2708",
          key: "311509###07102018",
          activityId: "311509",
          cityText: "Bratislava",
          ourSourceProvider: "VIATOR",
          internetSourceProvider: "VIATOR",
          publishedCost: "2708",
          inCombo: false,
          inSwissPass: false,
          comboId: "0",
          ourCost: "2708",
          activityName: "Laser Tag Session in Bratislava",
          oldCostingInfo: null,
          refundable: true,
          rateMatches: null,
          cancelled: false
        },
        "200178###12102018": {
          mon: "Oct",
          day: "12",
          dayOfWeek: "Fri",
          currency: null,
          date: 1539302400000,
          totalCost: "12,170",
          key: "200178###12102018",
          activityId: "200178",
          cityText: "Vienna",
          ourSourceProvider: "SELF",
          internetSourceProvider: "SELF",
          publishedCost: "12,170",
          inCombo: false,
          inSwissPass: false,
          comboId: "0",
          ourCost: "9340",
          activityName: "Bratislava Day Trip",
          oldCostingInfo: null,
          refundable: false,
          rateMatches: null,
          cancelled: false
        },
        "201031###03102018": {
          mon: "Oct",
          day: "3",
          dayOfWeek: "Wed",
          currency: null,
          date: 1538524800000,
          totalCost: "15,573",
          key: "201031###03102018",
          activityId: "201031",
          cityText: "Barcelona",
          ourSourceProvider: "SELF",
          internetSourceProvider: "SELF",
          publishedCost: "15,573",
          inCombo: false,
          inSwissPass: false,
          comboId: "0",
          ourCost: "11,952",
          activityName: "Park Guell & Sagrada Familia Tour",
          oldCostingInfo: null,
          refundable: false,
          rateMatches: null,
          cancelled: false
        }
      },
      totalActivityCost: "2,00,004",
      totalPublishedCost: "2,00,004",
      totalOurCost: "1,85,277"
    },
    transferCostings: {
      transferCostingById: {
        "200_200###05102018": {
          key: "200_200###05102018",
          fromCity: "Prague",
          toCity: "Prague",
          pickup: "Airport",
          drop: "Hotel",
          date: 1538697600000,
          day: "5",
          mon: "Oct",
          dayOfWeek: "Fri",
          duration: "40mins",
          passengers: 0,
          numberOfVehicles: 1,
          type: "PRIVATE",
          vehicle: "Car",
          refundable: false,
          totalCost: "2293",
          publishedCost: "2293",
          fromCityId: 200,
          toCityId: 200,
          text: "Prague Airport to Prague Hotel",
          inCombo: false,
          inSwissPass: false,
          comboId: "0",
          alternateAvailable: false,
          airportTransfer: true,
          status: "SUCCESS",
          airportCode: "PRG",
          ourCost: "1760"
        },
        "82_82###14102018": {
          key: "82_82###14102018",
          fromCity: "Vienna",
          toCity: "Vienna",
          pickup: "Hotel",
          drop: "Airport",
          date: 1539475200000,
          day: "14",
          mon: "Oct",
          dayOfWeek: "Sun",
          duration: "15mins",
          passengers: 0,
          numberOfVehicles: 1,
          type: "PRIVATE",
          vehicle: "Car",
          refundable: false,
          totalCost: "3744",
          publishedCost: "3744",
          fromCityId: 82,
          toCityId: 82,
          text: "Vienna Hotel to Vienna Airport",
          inCombo: false,
          inSwissPass: false,
          comboId: "0",
          alternateAvailable: false,
          airportTransfer: true,
          status: "SUCCESS",
          airportCode: "VIE",
          ourCost: "2873"
        },
        "7_7###30092018": {
          key: "7_7###30092018",
          fromCity: "Barcelona",
          toCity: "Barcelona",
          pickup: "Airport",
          drop: "Hotel",
          date: 1538265600000,
          day: "30",
          mon: "Sep",
          dayOfWeek: "Sun",
          duration: "25mins",
          passengers: 0,
          numberOfVehicles: 1,
          type: "PRIVATE",
          vehicle: "Car",
          refundable: false,
          totalCost: "3957",
          publishedCost: "3957",
          fromCityId: 7,
          toCityId: 7,
          text: "Barcelona Airport to Barcelona Hotel",
          inCombo: false,
          inSwissPass: false,
          comboId: "0",
          alternateAvailable: true,
          airportTransfer: true,
          status: "SUCCESS",
          airportCode: "BCN",
          ourCost: "3037"
        },
        "7_7###05102018": {
          key: "7_7###05102018",
          fromCity: "Barcelona",
          toCity: "Barcelona",
          pickup: "Hotel",
          drop: "Airport",
          date: 1538697600000,
          day: "5",
          mon: "Oct",
          dayOfWeek: "Fri",
          duration: "25mins",
          passengers: 0,
          numberOfVehicles: 1,
          type: "PRIVATE",
          vehicle: "Car",
          refundable: false,
          totalCost: "3957",
          publishedCost: "3957",
          fromCityId: 7,
          toCityId: 7,
          text: "Barcelona Hotel to Barcelona Airport",
          inCombo: false,
          inSwissPass: false,
          comboId: "0",
          alternateAvailable: true,
          airportTransfer: true,
          status: "SUCCESS",
          airportCode: "BCN",
          ourCost: "3037"
        }
      },
      totalTransferCost: "13,951",
      combinedTransferCost: "22,118",
      totalPublishedCost: "13,951",
      totalOurCost: "10,707"
    },
    trainCostings: {
      trainCostingById: {
        "200_680###06102018": {
          key: "200_680###06102018",
          fromCity: "Prague",
          toCity: "Bratislava",
          pickup: "Praha hl.n.",
          drop: "Bratislava hl st.",
          departureTime: "10:51",
          arrivalTime: "16:23",
          date: 1538784000000,
          day: "6",
          dayOfWeek: "Sat",
          mon: "Oct",
          adults: 0,
          children: 0,
          infants: 0,
          stops: 1,
          duration: "5hr 32mins",
          stopNames: "Wien Hbf",
          trainClass: null,
          refundable: false,
          totalCost: "6043",
          trainId: 1,
          trainCostingId: 3405,
          bucket: 150,
          fromCityId: 200,
          toCityId: 680,
          ticketType: "E-Ticket",
          text: "Prague to Bratislava",
          miscText: null,
          inCombo: false,
          inSwissPass: false,
          comboId: "0",
          publishedCost: "6043",
          ourCost: "4638"
        },
        "680_82###10102018": {
          key: "680_82###10102018",
          fromCity: "Bratislava",
          toCity: "Vienna",
          pickup: "Bratislava hl st.",
          drop: "Wien Hbf",
          departureTime: "09:37",
          arrivalTime: "10:43",
          date: 1539129600000,
          day: "10",
          dayOfWeek: "Wed",
          mon: "Oct",
          adults: 0,
          children: 0,
          infants: 0,
          stops: 0,
          duration: "1hr 6mins",
          stopNames: "",
          trainClass: null,
          refundable: false,
          totalCost: "2124",
          trainId: 1,
          trainCostingId: 3409,
          bucket: 154,
          fromCityId: 680,
          toCityId: 82,
          ticketType: "E-Ticket",
          text: "Bratislava to Vienna",
          miscText: null,
          inCombo: false,
          inSwissPass: false,
          comboId: "0",
          publishedCost: "2124",
          ourCost: "1630"
        }
      },
      totalTrainCost: "8167",
      totalPublishedCost: "8167",
      totalOurCost: "6268"
    },
    ferryCostings: {
      ferryCostingById: {},
      totalFerryCost: "0",
      totalPublishedCost: "0",
      totalOurCost: "0"
    },
    rentalCarCostings: {
      totalRentalCarsCost: "0",
      rentalCostingById: {},
      totalOurCost: "0"
    },
    hotelCostings: {
      totalHotelCost: "75,018",
      totalOurCost: "74,793",
      hotelCostingById: {
        "82###10102018_14102018": {
          planningToolId: 31910,
          hotelCode: "377273",
          name: "7 Days Premium Hotel Vienna",
          description:
            "<p><b>Property Location</b> <br />With a stay at 7 Days Premium Hotel Vienna in Vienna (Meidling), you'll be convenient to Bogi Park and Schoenbrunn Palace.  This hotel is within close proximity of Vienna Twin Tower and Business Park Vienna.</p><p><b>Rooms</b> <br />Stay in one of 95 guestrooms featuring flat-screen televisions. Complimentary high-speed (wired) Internet access keeps you connected, and cable programming is available for your entertainment. Bathrooms have complimentary toiletries and hair dryers. Conveniences include phones and safes, and housekeeping is provided daily.</p><p><b>Amenities</b> <br />Take in the views from a rooftop terrace and make use of amenities such as complimentary wireless Internet access and wedding services.</p><p><b>Dining</b> <br />Quench your thirst with your favorite drink at a bar/lounge. Buffet breakfasts are available daily for a fee.</p><p><b>Business, Other Amenities</b> <br />Featured amenities include dry cleaning/laundry services, a 24-hour front desk, and luggage storage. Planning an event in Vienna? This hotel has 2582 square feet (240 square meters) of space consisting of conference space and a meeting room. Self parking (subject to charges) is available onsite.</p>",
          imageURL:
            "https://i.travelapi.com/hotels/5000000/4350000/4340700/4340614/8637df31_z.jpg",
          otherImages: [
            "https://i.travelapi.com/hotels/5000000/4350000/4340700/4340614/4e75ec9d_z.jpg",
            "https://i.travelapi.com/hotels/5000000/4350000/4340700/4340614/0801e0f0_z.jpg",
            "https://i.travelapi.com/hotels/5000000/4350000/4340700/4340614/3cd82e75_z.jpg",
            "https://i.travelapi.com/hotels/5000000/4350000/4340700/4340614/5e474b65_z.jpg",
            "https://i.travelapi.com/hotels/5000000/4350000/4340700/4340614/93516db5_z.jpg",
            "https://i.travelapi.com/hotels/5000000/4350000/4340700/4340614/a4af92e1_z.jpg",
            "https://i.travelapi.com/hotels/5000000/4350000/4340700/4340614/e1e887aa_z.jpg",
            "https://i.travelapi.com/hotels/5000000/4350000/4340700/4340614/e5b01a77_z.jpg",
            "https://i.travelapi.com/hotels/5000000/4350000/4340700/4340614/b0e8807e_z.jpg",
            "https://i.travelapi.com/hotels/5000000/4350000/4340700/4340614/4340614_14_z.jpg",
            "https://i.travelapi.com/hotels/5000000/4350000/4340700/4340614/ad2bc1cd_z.jpg",
            "https://i.travelapi.com/hotels/5000000/4350000/4340700/4340614/3660ad07_z.jpg",
            "https://i.travelapi.com/hotels/5000000/4350000/4340700/4340614/9a2e6236_z.jpg",
            "https://i.travelapi.com/hotels/5000000/4350000/4340700/4340614/c88f4989_z.jpg",
            "https://i.travelapi.com/hotels/5000000/4350000/4340700/4340614/d671c5c8_z.jpg",
            "https://i.travelapi.com/hotels/5000000/4350000/4340700/4340614/fcb7d875_z.jpg",
            "https://i.travelapi.com/hotels/5000000/4350000/4340700/4340614/5b441cdf_z.jpg",
            "https://i.travelapi.com/hotels/5000000/4350000/4340700/4340614/e9afa70b_z.jpg"
          ],
          otherImagesHd: null,
          amenitiesList: [
            "Bar/lounge",
            "Elevator/lift",
            "Total number of rooms - ",
            "Number of floors - ",
            "Number of buildings/towers - ",
            "Conference space",
            "Breakfast available (surcharge)",
            "Laundry facilities",
            "24-hour front desk",
            "Dry cleaning/laundry service",
            "Wedding services",
            "Free WiFi",
            "Accessible bathroom",
            "In-room accessibility",
            "Conference space size (feet) - ",
            "Conference space size (meters) - ",
            "One meeting room",
            "Self parking (surcharge)",
            "Rooftop terrace",
            "Luggage storage"
          ],
          customerHappinessScores: [
            {
              scoreType: "ROOM",
              score: 8.9,
              scoreLabel: "Great"
            },
            {
              scoreType: "SERVICE_QUALITY",
              score: 9.1,
              scoreLabel: "Excellent"
            },
            {
              scoreType: "LOCATION",
              score: 8.4,
              scoreLabel: "Great"
            },
            {
              scoreType: "FOOD",
              score: 8.3,
              scoreLabel: "Great"
            },
            {
              scoreType: "VALUE",
              score: 8.6,
              scoreLabel: "Great"
            }
          ],
          lat: "48.1638298034668",
          lon: "16.322919845581055",
          stars: 3,
          tripAdvisorRating: 4.5,
          tripAdvisorReviewCount: 21,
          propertyType: 1,
          location: "Near Schoenbrunn Palace",
          reviewsAvailable: true,
          reviewsList: [
            {
              reviewText:
                "We booked this 7 Days Premium Hotel Vienna for our Honeymoon. Hotel is centrally located and the staff was really friendly and helpful. Rooms are substantial in sizes, comfy and lots of space to move around. Definitely worth every penny.",
              reviewerName: "Krishnan"
            },
            {
              reviewText:
                "On my honeymoon trip to Vienna, my wife and I stayed at the 7 Days Premium Hotel Vienna. I must say it's a great property for honeymooners. The room view is spectacular. The staff are very friendly and are always available to help out. Would recommend this property to future travelers too.",
              reviewerName: "Tejas"
            }
          ],
          amenityDisplayList: [
            {
              strikethrough: false,
              iconUrl: "vehoicon-bar-cocktail",
              amenityName: "Bar"
            },
            {
              strikethrough: false,
              iconUrl: "vehoicon-elevator",
              amenityName: "Elevator facility"
            },
            {
              strikethrough: false,
              iconUrl: "vehoicon-washing-machine",
              amenityName: "Laundry facility"
            },
            {
              strikethrough: false,
              iconUrl: "vehoicon-concierge-bell",
              amenityName: "Concierge Service"
            },
            {
              strikethrough: false,
              iconUrl: "vehoicon-parking",
              amenityName: "Parking Facility"
            },
            {
              strikethrough: false,
              iconUrl: "vehoicon-storage",
              amenityName: "Common storage facility"
            }
          ],
          status: "SUCCESS",
          costingId: "5af1560d3fef300c015c80ce",
          checkInDate: "10/Oct/2018",
          checkOutDate: "14/Oct/2018",
          checkInDateDisplay: "10",
          checkInMonthDisplay: "Oct",
          checkInDayOfWeek: "Wed",
          checkOutDateDisplay: "14",
          checkOutMonthDisplay: "Oct",
          checkOutDayOfWeek: "Sun",
          roomsInHotel: [
            {
              roomTypeId: "ZD2uqXy3jqSOpo5L",
              name: "Standard Room",
              bedTypes: ["1 queen bed", "2 twin beds"],
              cancellationPolicy: "",
              shortCancellationPolicy: "",
              roomSize: "269 sq feet",
              valueAddsMap: {},
              freeWireless: false,
              freeBreakfast: false,
              freeAirportTransfer: false,
              maxRoomOccupancy: 2,
              quotedRoomOccupancy: 2,
              roomImages: [
                "https://i.travelapi.com/hotels/5000000/4350000/4340700/4340614/e1e887aa_z.jpg",
                "https://i.travelapi.com/hotels/5000000/4350000/4340700/4340614/3cd82e75_z.jpg",
                "https://i.travelapi.com/hotels/5000000/4350000/4340700/4340614/93516db5_z.jpg",
                "https://i.travelapi.com/hotels/5000000/4350000/4340700/4340614/e5b01a77_z.jpg",
                "https://i.travelapi.com/hotels/5000000/4350000/4340700/4340614/3660ad07_z.jpg"
              ],
              roomWithView: false,
              refundable: false,
              discountApplied: false,
              originalPrice: "18589.0",
              discount: "0",
              finalPrice: "18,645",
              diffDetail: null,
              basePrice: "20,417",
              roomTypeCode: "200065398",
              rateCode: "200957050",
              discountPercentage: 9,
              positiveDiscount: false,
              roomConfiguration: {
                adultCount: 2,
                childAges: []
              },
              rateForDifferentDays: [
                "4054.97",
                "4170.25",
                "4054.97",
                "4170.25"
              ],
              averageRoomPrice: "4112.61",
              surcharges: [
                {
                  type: "TaxAndServiceFee (Per night)",
                  price: "534.64"
                }
              ],
              checkInInstructions: null,
              specialCheckInInstructions: null,
              mandatoryTax: null,
              salePrice: true,
              memberOnlyDeal: true,
              roomTypeDescription: null,
              extraInclusions: null,
              rateMatches: null,
              ourCost: "18,589"
            }
          ],
          numberOfNights: 4,
          discountApplied: false,
          offline: false,
          finalPrice: "18,645",
          marketingText: "",
          cityId: 82,
          cityName: "Vienna",
          amenities: [],
          costingKey: "82###10102018_14102018",
          hotelQuery: "82##2##10/Oct/2018##14/Oct/2018##false",
          diffDetail: null,
          discountPercentage: 9,
          sale: true,
          memberOnlyDeal: true,
          pytRecommended: false,
          ourCost: "18,589"
        },
        "680###06102018_10102018": {
          planningToolId: 45676,
          hotelCode: "538525",
          name: "Hotel West",
          description:
            "<p><b>Property Location</b> <br />With a stay at Hotel West in Bratislava, you'll be minutes from Kamzik TV Tower and close to Slavin Monument.  This family-friendly hotel is within close proximity of Bratislava Forest Park and Bratislava Zoo.</p><p><b>Rooms</b> <br />Make yourself at home in one of the 50 guestrooms featuring minibars and LCD televisions. Complimentary wireless Internet access keeps you connected, and satellite programming is available for your entertainment. Bathrooms have bathtubs or showers and complimentary toiletries. Conveniences include desks, housekeeping is provided daily, and irons/ironing boards can be requested.</p><p><b>Dining</b> <br />Satisfy your appetite at the hotel's restaurant, which serves lunch and dinner, or grab a snack at a coffee shop/café.</p><p><b>Business, Other Amenities</b> <br />Featured amenities include a business center, complimentary newspapers in the lobby, and a 24-hour front desk. Free self parking is available onsite.</p>",
          imageURL:
            "https://i.travelapi.com/hotels/12000000/11790000/11788700/11788616/c8f5f0d2_z.jpg",
          otherImages: [
            "https://i.travelapi.com/hotels/12000000/11790000/11788700/11788616/b6d293fd_z.jpg",
            "https://i.travelapi.com/hotels/12000000/11790000/11788700/11788616/9b5d173c_z.jpg",
            "https://i.travelapi.com/hotels/12000000/11790000/11788700/11788616/56f7f933_z.jpg",
            "https://i.travelapi.com/hotels/12000000/11790000/11788700/11788616/11788616_34_b.jpg",
            "https://i.travelapi.com/hotels/12000000/11790000/11788700/11788616/09082f79_z.jpg",
            "https://i.travelapi.com/hotels/12000000/11790000/11788700/11788616/269a9eb0_z.jpg",
            "https://i.travelapi.com/hotels/12000000/11790000/11788700/11788616/378fb6e5_z.jpg",
            "https://i.travelapi.com/hotels/12000000/11790000/11788700/11788616/7766b227_z.jpg",
            "https://i.travelapi.com/hotels/12000000/11790000/11788700/11788616/58c3a9e6_z.jpg",
            "https://i.travelapi.com/hotels/12000000/11790000/11788700/11788616/99931bfd_b.jpg",
            "https://i.travelapi.com/hotels/12000000/11790000/11788700/11788616/b6134e5b_z.jpg",
            "https://i.travelapi.com/hotels/12000000/11790000/11788700/11788616/517d5eb0_z.jpg",
            "https://i.travelapi.com/hotels/12000000/11790000/11788700/11788616/b8fd89e1_z.jpg",
            "https://i.travelapi.com/hotels/12000000/11790000/11788700/11788616/3a0048d0_z.jpg",
            "https://i.travelapi.com/hotels/12000000/11790000/11788700/11788616/b744f7e8_z.jpg",
            "https://i.travelapi.com/hotels/12000000/11790000/11788700/11788616/c011b543_z.jpg",
            "https://i.travelapi.com/hotels/12000000/11790000/11788700/11788616/43ec87d8_z.jpg",
            "https://i.travelapi.com/hotels/12000000/11790000/11788700/11788616/a7b56da6_z.jpg",
            "https://i.travelapi.com/hotels/12000000/11790000/11788700/11788616/c3f7d1fe_z.jpg",
            "https://i.travelapi.com/hotels/12000000/11790000/11788700/11788616/e08d8120_z.jpg",
            "https://i.travelapi.com/hotels/12000000/11790000/11788700/11788616/3c36324a_z.jpg",
            "https://i.travelapi.com/hotels/12000000/11790000/11788700/11788616/52a85afd_z.jpg",
            "https://i.travelapi.com/hotels/12000000/11790000/11788700/11788616/5f63cc3c_z.jpg",
            "https://i.travelapi.com/hotels/12000000/11790000/11788700/11788616/663d3ca7_z.jpg",
            "https://i.travelapi.com/hotels/12000000/11790000/11788700/11788616/7e27c1e0_z.jpg",
            "https://i.travelapi.com/hotels/12000000/11790000/11788700/11788616/b47af6c6_z.jpg",
            "https://i.travelapi.com/hotels/12000000/11790000/11788700/11788616/7e07091e_z.jpg",
            "https://i.travelapi.com/hotels/12000000/11790000/11788700/11788616/11788616_83_z.jpg",
            "https://i.travelapi.com/hotels/12000000/11790000/11788700/11788616/11788616_84_z.jpg",
            "https://i.travelapi.com/hotels/12000000/11790000/11788700/11788616/11788616_85_z.jpg",
            "https://i.travelapi.com/hotels/12000000/11790000/11788700/11788616/11788616_86_z.jpg",
            "https://i.travelapi.com/hotels/12000000/11790000/11788700/11788616/11788616_82_z.jpg",
            "https://i.travelapi.com/hotels/12000000/11790000/11788700/11788616/11788616_20_z.jpg",
            "https://i.travelapi.com/hotels/12000000/11790000/11788700/11788616/11790703_z.jpg",
            "https://i.travelapi.com/hotels/12000000/11790000/11788700/11788616/3ce04a6a_z.jpg",
            "https://i.travelapi.com/hotels/12000000/11790000/11788700/11788616/5e4a63e6_z.jpg",
            "https://i.travelapi.com/hotels/12000000/11790000/11788700/11788616/6f3d40cf_z.jpg",
            "https://i.travelapi.com/hotels/12000000/11790000/11788700/11788616/862021db_z.jpg",
            "https://i.travelapi.com/hotels/12000000/11790000/11788700/11788616/02470998_z.jpg",
            "https://i.travelapi.com/hotels/12000000/11790000/11788700/11788616/ce1dbf84_z.jpg",
            "https://i.travelapi.com/hotels/12000000/11790000/11788700/11788616/b77a3a39_z.jpg",
            "https://i.travelapi.com/hotels/12000000/11790000/11788700/11788616/11788616_24_z.jpg",
            "https://i.travelapi.com/hotels/12000000/11790000/11788700/11788616/11788616_33_b.jpg"
          ],
          otherImagesHd: null,
          amenitiesList: [
            "Elevator/lift",
            "Restaurant",
            "Total number of rooms - ",
            "Breakfast available (surcharge)",
            "Laundry facilities",
            "Coffee shop or café",
            "Safe-deposit box at front desk",
            "Multilingual staff",
            "Free newspapers in lobby",
            "24-hour front desk",
            "Business center",
            "Children's club",
            "Free WiFi",
            "Free self parking",
            "Children's club (surcharge)"
          ],
          customerHappinessScores: [
            {
              scoreType: "ROOM",
              score: 8.6,
              scoreLabel: "Great"
            },
            {
              scoreType: "SERVICE_QUALITY",
              score: 9.2,
              scoreLabel: "Excellent"
            },
            {
              scoreType: "LOCATION",
              score: 9,
              scoreLabel: "Great"
            },
            {
              scoreType: "FOOD",
              score: 9.3,
              scoreLabel: "Excellent"
            },
            {
              scoreType: "VALUE",
              score: 9.2,
              scoreLabel: "Excellent"
            }
          ],
          lat: "48.184661865234375",
          lon: "17.095909118652344",
          stars: 3.5,
          tripAdvisorRating: 4,
          tripAdvisorReviewCount: 75,
          propertyType: 1,
          location: "Near Kamzik TV Tower",
          reviewsAvailable: true,
          reviewsList: [
            {
              reviewText:
                "You just made me a customer for life! Hotel West is an amazing property. Well located and spacious rooms. The staff are super friendly and will go over and beyond to help you out when you have a problem. Definitely coming back here when I visit Bratislava in the future.",
              reviewerName: "Shyamala"
            },
            {
              reviewText:
                "The hotel is quite close to the city center. We had a great time here. The room service is top notch. The staff is friendly. The room is clean and quite big too. Will definitely recommend these guys to others. Thanks again for taking care of me and my family.",
              reviewerName: "Mathuvanthy"
            }
          ],
          amenityDisplayList: [
            {
              strikethrough: false,
              iconUrl: "vehoicon-elevator",
              amenityName: "Elevator facility"
            },
            {
              strikethrough: false,
              iconUrl: "vehoicon-restaurant",
              amenityName: "Restaurant"
            },
            {
              strikethrough: false,
              iconUrl: "vehoicon-washing-machine",
              amenityName: "Laundry facility"
            },
            {
              strikethrough: false,
              iconUrl: "vehoicon-safe-lock",
              amenityName: "Locker Facility"
            },
            {
              strikethrough: false,
              iconUrl: "vehoicon-concierge-bell",
              amenityName: "Concierge Service"
            },
            {
              strikethrough: false,
              iconUrl: "vehoicon-parking",
              amenityName: "Parking Facility"
            }
          ],
          status: "SUCCESS",
          costingId: "5af156093fef300c015c80cc",
          checkInDate: "06/Oct/2018",
          checkOutDate: "10/Oct/2018",
          checkInDateDisplay: "06",
          checkInMonthDisplay: "Oct",
          checkInDayOfWeek: "Sat",
          checkOutDateDisplay: "10",
          checkOutMonthDisplay: "Oct",
          checkOutDayOfWeek: "Wed",
          roomsInHotel: [
            {
              roomTypeId: "TC5Vq6YZFOP7nc95",
              name: "Economy Double Room",
              bedTypes: ["1 double bed"],
              cancellationPolicy:
                "We understand that sometimes your travel plans change. We do not charge a change or cancel fee. However, this property (Hotel West) imposes the following penalty to its customers that we are required to pass on: Cancellations or changes made after 11:59 PM ((GMT+02:00)) on Oct 5, 2018, or no-shows, are subject to a 1 Night Room & Tax penalty.  ",
              shortCancellationPolicy:
                "Free cancellation until 05 Oct 2018 23:59:00",
              roomSize: "194 sq feet",
              valueAddsMap: {
                "2109": "Free Parking",
                "2192": "Free Wireless Internet"
              },
              freeWireless: true,
              freeBreakfast: false,
              freeAirportTransfer: false,
              maxRoomOccupancy: 2,
              quotedRoomOccupancy: 2,
              roomImages: [
                "https://i.travelapi.com/hotels/12000000/11790000/11788700/11788616/09082f79_z.jpg",
                "https://i.travelapi.com/hotels/12000000/11790000/11788700/11788616/58c3a9e6_z.jpg",
                "https://i.travelapi.com/hotels/12000000/11790000/11788700/11788616/517d5eb0_z.jpg",
                "https://i.travelapi.com/hotels/12000000/11790000/11788700/11788616/b744f7e8_z.jpg",
                "https://i.travelapi.com/hotels/12000000/11790000/11788700/11788616/3a0048d0_z.jpg",
                "https://i.travelapi.com/hotels/12000000/11790000/11788700/11788616/a7b56da6_z.jpg"
              ],
              roomWithView: false,
              refundable: true,
              discountApplied: false,
              originalPrice: "17608.96",
              discount: "0",
              finalPrice: "17,662",
              diffDetail: null,
              basePrice: "17,609",
              roomTypeCode: "201204662",
              rateCode: "205710906",
              discountPercentage: 0,
              positiveDiscount: false,
              roomConfiguration: {
                adultCount: 2,
                childAges: []
              },
              rateForDifferentDays: [
                "3574.47",
                "3574.47",
                "3762.60",
                "3762.60"
              ],
              averageRoomPrice: "3668.54",
              surcharges: [
                {
                  type: "TaxAndServiceFee (Per night)",
                  price: "733.705"
                }
              ],
              checkInInstructions: null,
              specialCheckInInstructions: null,
              mandatoryTax: null,
              salePrice: false,
              memberOnlyDeal: false,
              roomTypeDescription: null,
              extraInclusions: null,
              rateMatches: null,
              ourCost: "17,609"
            }
          ],
          numberOfNights: 4,
          discountApplied: false,
          offline: false,
          finalPrice: "17,662",
          marketingText: "",
          cityId: 680,
          cityName: "Bratislava",
          amenities: [
            {
              code: "3",
              name: "FREE WIFI"
            }
          ],
          costingKey: "680###06102018_10102018",
          hotelQuery: "680##2##06/Oct/2018##10/Oct/2018##false",
          diffDetail: null,
          discountPercentage: 0,
          sale: false,
          memberOnlyDeal: false,
          pytRecommended: false,
          ourCost: "17,609"
        },
        "200###05102018_06102018": {
          planningToolId: 29750,
          hotelCode: "463746",
          name: "Lavanda Hotel & Apartments Prague",
          description:
            "<p><b>Property Location</b> <br />With a stay at Lavanda Hotel & Apartments Prague in Prague (Prague 5), you'll be minutes from Staropramen Brewery and close to Old Town Square.  This hotel is within close proximity of Prague Dancing House and Bertramka.</p><p><b>Rooms</b> <br />Stay in one of 34 guestrooms featuring flat-screen televisions. Complimentary wireless Internet access keeps you connected, and satellite programming is available for your entertainment. Private bathrooms with showers feature complimentary toiletries and hair dryers. Conveniences include blackout drapes/curtains, and rollaway/extra beds (surcharge) can be requested.</p><p><b>Amenities</b> <br />Take advantage of recreation opportunities such as a sauna, or other amenities including complimentary wireless Internet access and concierge services.</p><p><b>Dining</b> <br />Breakfast is available for a fee.</p><p><b>Business, Other Amenities</b> <br />Featured amenities include express check-out, a 24-hour front desk, and multilingual staff. Self parking (subject to charges) is available onsite.</p>",
          imageURL:
            "https://i.travelapi.com/hotels/9000000/8520000/8516100/8516077/8516077_40_z.jpg",
          otherImages: [
            "https://i.travelapi.com/hotels/9000000/8520000/8516100/8516077/8516077_4_z.jpg",
            "https://i.travelapi.com/hotels/9000000/8520000/8516100/8516077/8516077_15_z.jpg",
            "https://i.travelapi.com/hotels/9000000/8520000/8516100/8516077/8516077_27_z.jpg",
            "https://i.travelapi.com/hotels/9000000/8520000/8516100/8516077/8516077_34_z.jpg",
            "https://i.travelapi.com/hotels/9000000/8520000/8516100/8516077/8516077_39_z.jpg",
            "https://i.travelapi.com/hotels/9000000/8520000/8516100/8516077/8516077_42_b.jpg",
            "https://i.travelapi.com/hotels/9000000/8520000/8516100/8516077/8516077_33_z.jpg",
            "https://i.travelapi.com/hotels/9000000/8520000/8516100/8516077/8516077_37_z.jpg",
            "https://i.travelapi.com/hotels/9000000/8520000/8516100/8516077/8516077_43_z.jpg",
            "https://i.travelapi.com/hotels/9000000/8520000/8516100/8516077/8516077_41_b.jpg",
            "https://i.travelapi.com/hotels/9000000/8520000/8516100/8516077/8516077_10_z.jpg",
            "https://i.travelapi.com/hotels/9000000/8520000/8516100/8516077/8516077_12_z.jpg",
            "https://i.travelapi.com/hotels/9000000/8520000/8516100/8516077/8516077_14_z.jpg",
            "https://i.travelapi.com/hotels/9000000/8520000/8516100/8516077/8516077_6_z.jpg",
            "https://i.travelapi.com/hotels/9000000/8520000/8516100/8516077/8516077_21_z.jpg",
            "https://i.travelapi.com/hotels/9000000/8520000/8516100/8516077/8516077_20_z.jpg",
            "https://i.travelapi.com/hotels/9000000/8520000/8516100/8516077/8516077_32_z.jpg",
            "https://i.travelapi.com/hotels/9000000/8520000/8516100/8516077/8516077_38_b.jpg",
            "https://i.travelapi.com/hotels/9000000/8520000/8516100/8516077/8516077_44_b.jpg",
            "https://i.travelapi.com/hotels/9000000/8520000/8516100/8516077/8516077_16_z.jpg",
            "https://i.travelapi.com/hotels/9000000/8520000/8516100/8516077/8516077_31_z.jpg",
            "https://i.travelapi.com/hotels/9000000/8520000/8516100/8516077/8516077_36_z.jpg",
            "https://i.travelapi.com/hotels/9000000/8520000/8516100/8516077/8516077_2_z.jpg",
            "https://i.travelapi.com/hotels/9000000/8520000/8516100/8516077/8516077_1_z.jpg",
            "https://i.travelapi.com/hotels/9000000/8520000/8516100/8516077/8516077_13_z.jpg",
            "https://i.travelapi.com/hotels/9000000/8520000/8516100/8516077/8516077_3_z.jpg",
            "https://i.travelapi.com/hotels/9000000/8520000/8516100/8516077/8516077_5_z.jpg",
            "https://i.travelapi.com/hotels/9000000/8520000/8516100/8516077/8516077_9_z.jpg",
            "https://i.travelapi.com/hotels/9000000/8520000/8516100/8516077/8516077_8_z.jpg"
          ],
          otherImagesHd: null,
          amenitiesList: [
            "Elevator/lift",
            "Concierge services",
            "Total number of rooms - ",
            "Number of floors - ",
            "Number of buildings/towers - ",
            "Breakfast available (surcharge)",
            "Safe-deposit box at front desk",
            "Multilingual staff",
            "24-hour front desk",
            "Express check-out",
            "Sauna",
            "Designated smoking areas",
            "Tours/ticket assistance",
            "Free WiFi",
            "Year Built",
            "Self parking (surcharge)"
          ],
          customerHappinessScores: [
            {
              scoreType: "ROOM",
              score: 8.5,
              scoreLabel: "Great"
            },
            {
              scoreType: "SERVICE_QUALITY",
              score: 9,
              scoreLabel: "Great"
            },
            {
              scoreType: "LOCATION",
              score: 8.5,
              scoreLabel: "Great"
            },
            {
              scoreType: "FOOD",
              score: 9.2,
              scoreLabel: "Excellent"
            },
            {
              scoreType: "VALUE",
              score: 8.4,
              scoreLabel: "Great"
            }
          ],
          lat: "50.07164001464844",
          lon: "14.405659675598145",
          stars: 3,
          tripAdvisorRating: 4.5,
          tripAdvisorReviewCount: 100,
          propertyType: 1,
          location: "Near Prague Dancing House",
          reviewsAvailable: true,
          reviewsList: [
            {
              reviewText:
                "For our honeymoon trip, I and my wife recently stayed at the Lavanda Hotel & Apartments Prague. The staff is very welcoming and friendly. The girl at the reception desk was extremely courteous and would help us with directions and how to go about Prague. We both would recommend this hotel to everybody.",
              reviewerName: "Sruthi"
            },
            {
              reviewText:
                "Our honeymoon trip was made even more awesome, thanks to our stay in Lavanda Hotel & Apartments Prague. The staff welcomed us warmly upon entering the hotel. Inside, the room was clean and had floral decoration. The room service is very prompt too. Definitely, an awesome property to stay at.",
              reviewerName: "Shripal"
            }
          ],
          amenityDisplayList: [
            {
              strikethrough: false,
              iconUrl: "vehoicon-elevator",
              amenityName: "Elevator facility"
            },
            {
              strikethrough: false,
              iconUrl: "vehoicon-concierge-bell",
              amenityName: "Concierge Service"
            },
            {
              strikethrough: false,
              iconUrl: "vehoicon-safe-lock",
              amenityName: "Locker Facility"
            },
            {
              strikethrough: false,
              iconUrl: "vehoicon-spa-flower",
              amenityName: "Spa facility"
            },
            {
              strikethrough: false,
              iconUrl: "vehoicon-parking",
              amenityName: "Parking Facility"
            }
          ],
          status: "SUCCESS",
          costingId: "5af1560c3fef300c015c80cd",
          checkInDate: "05/Oct/2018",
          checkOutDate: "06/Oct/2018",
          checkInDateDisplay: "05",
          checkInMonthDisplay: "Oct",
          checkInDayOfWeek: "Fri",
          checkOutDateDisplay: "06",
          checkOutMonthDisplay: "Oct",
          checkOutDayOfWeek: "Sat",
          roomsInHotel: [
            {
              roomTypeId: "xOwtjkV1vuXvlo2u",
              name: "Double Room",
              bedTypes: ["1 double bed"],
              cancellationPolicy:
                "We understand that sometimes your travel plans change. We do not charge a change or cancel fee. However, this property (Lavanda Hotel & Apartments Prague) imposes the following penalty to its customers that we are required to pass on: Cancellations or changes made after 6:00 PM ((GMT+02:00)) on Sep 21, 2018, or no-shows, are subject to a 1 Night Room & Tax penalty.  ",
              shortCancellationPolicy:
                "Free cancellation until 21 Sep 2018 18:00:00",
              roomSize: "215 sq feet",
              valueAddsMap: {
                "2192": "Free Wireless Internet"
              },
              freeWireless: true,
              freeBreakfast: false,
              freeAirportTransfer: false,
              maxRoomOccupancy: 2,
              quotedRoomOccupancy: 2,
              roomImages: [
                "https://i.travelapi.com/hotels/9000000/8520000/8516100/8516077/8516077_6_z.jpg",
                "https://i.travelapi.com/hotels/9000000/8520000/8516100/8516077/8516077_15_z.jpg",
                "https://i.travelapi.com/hotels/9000000/8520000/8516100/8516077/8516077_14_z.jpg",
                "https://i.travelapi.com/hotels/9000000/8520000/8516100/8516077/8516077_16_z.jpg"
              ],
              roomWithView: false,
              refundable: true,
              discountApplied: false,
              originalPrice: "4192.98",
              discount: "0",
              finalPrice: "4206",
              diffDetail: null,
              basePrice: "4611",
              roomTypeCode: "200727459",
              rateCode: "203613736",
              discountPercentage: 9,
              positiveDiscount: false,
              roomConfiguration: {
                adultCount: 2,
                childAges: []
              },
              rateForDifferentDays: ["3646.07"],
              averageRoomPrice: "3646.07",
              surcharges: [
                {
                  type: "TaxAndServiceFee (Per night)",
                  price: "546.91"
                }
              ],
              checkInInstructions: null,
              specialCheckInInstructions: null,
              mandatoryTax: null,
              salePrice: true,
              memberOnlyDeal: false,
              roomTypeDescription: null,
              extraInclusions: null,
              rateMatches: null,
              ourCost: "4193"
            }
          ],
          numberOfNights: 1,
          discountApplied: false,
          offline: false,
          finalPrice: "4206",
          marketingText: "",
          cityId: 200,
          cityName: "Prague",
          amenities: [
            {
              code: "3",
              name: "FREE WIFI"
            }
          ],
          costingKey: "200###05102018_06102018",
          hotelQuery: "200##2##05/Oct/2018##06/Oct/2018##false",
          diffDetail: null,
          discountPercentage: 9,
          sale: true,
          memberOnlyDeal: false,
          pytRecommended: false,
          ourCost: "4193"
        },
        "7###30092018_05102018": {
          planningToolId: 33357,
          hotelCode: "497088",
          name: "Apartaments Sant Jordi Girona 97",
          description:
            "<p><b>Property Location</b> <br />With a stay at Apartaments Sant Jordi Girona 97 in Barcelona (Downtown Barcelona), you'll be minutes from Museu Egipci and close to Casa Batllo.  This apartment is close to Sagrada Familia and Palau de la Musica Catalana.</p><p><b>Rooms</b> <br />Make yourself at home in one of the 15 air-conditioned rooms featuring kitchenettes with refrigerators and stovetops. Rooms have private balconies. Complimentary wireless Internet access keeps you connected, and flat-screen televisions are provided for your entertainment. Conveniences include phones, as well as safes and desks.</p><p><b>Amenities</b> <br />Make use of convenient amenities, which include complimentary wireless Internet access and tour/ticket assistance.</p><p><b>Business, Other Amenities</b> <br />Self parking (subject to charges) is available onsite.</p>",
          imageURL:
            "https://i.travelapi.com/hotels/11000000/10110000/10109900/10109877/10109877_1_z.jpg",
          otherImages: [
            "https://i.travelapi.com/hotels/11000000/10110000/10109900/10109877/10109877_12_z.jpg",
            "https://i.travelapi.com/hotels/11000000/10110000/10109900/10109877/10109877_13_z.jpg",
            "https://i.travelapi.com/hotels/11000000/10110000/10109900/10109877/10109877_20_z.jpg",
            "https://i.travelapi.com/hotels/11000000/10110000/10109900/10109877/10109877_24_z.jpg",
            "https://i.travelapi.com/hotels/11000000/10110000/10109900/10109877/10109877_25_z.jpg",
            "https://i.travelapi.com/hotels/11000000/10110000/10109900/10109877/10109877_26_z.jpg",
            "https://i.travelapi.com/hotels/11000000/10110000/10109900/10109877/10109877_9_z.jpg",
            "https://i.travelapi.com/hotels/11000000/10110000/10109900/10109877/10109877_11_z.jpg",
            "https://i.travelapi.com/hotels/11000000/10110000/10109900/10109877/10109877_23_z.jpg",
            "https://i.travelapi.com/hotels/11000000/10110000/10109900/10109877/10109877_18_z.jpg",
            "https://i.travelapi.com/hotels/11000000/10110000/10109900/10109877/10109877_10_z.jpg",
            "https://i.travelapi.com/hotels/11000000/10110000/10109900/10109877/10109877_19_z.jpg",
            "https://i.travelapi.com/hotels/11000000/10110000/10109900/10109877/10109877_16_z.jpg",
            "https://i.travelapi.com/hotels/11000000/10110000/10109900/10109877/10109877_14_z.jpg",
            "https://i.travelapi.com/hotels/11000000/10110000/10109900/10109877/10109877_22_z.jpg",
            "https://i.travelapi.com/hotels/11000000/10110000/10109900/10109877/10109877_15_z.jpg",
            "https://i.travelapi.com/hotels/11000000/10110000/10109900/10109877/10109877_17_z.jpg",
            "https://i.travelapi.com/hotels/11000000/10110000/10109900/10109877/10109877_21_z.jpg",
            "https://i.travelapi.com/hotels/11000000/10110000/10109900/10109877/10109877_8_z.jpg"
          ],
          otherImagesHd: null,
          amenitiesList: [
            "Total number of rooms - ",
            "Safe-deposit box at front desk",
            "Smoke-free property",
            "Tours/ticket assistance",
            "Free WiFi",
            "Self parking (surcharge)"
          ],
          customerHappinessScores: [
            {
              scoreType: "ROOM",
              score: 8.7,
              scoreLabel: "Great"
            },
            {
              scoreType: "SERVICE_QUALITY",
              score: 9,
              scoreLabel: "Great"
            },
            {
              scoreType: "LOCATION",
              score: 8.4,
              scoreLabel: "Great"
            },
            {
              scoreType: "FOOD",
              score: 8.7,
              scoreLabel: "Great"
            },
            {
              scoreType: "VALUE",
              score: 9.1,
              scoreLabel: "Excellent"
            }
          ],
          lat: "41.396209716796875",
          lon: "2.169260025024414",
          stars: 3,
          tripAdvisorRating: 4,
          tripAdvisorReviewCount: 36,
          propertyType: 4,
          location: "Near Casa Batllo",
          reviewsAvailable: true,
          reviewsList: [
            {
              reviewText:
                "This Apartaments Sant Jordi Girona 97 has a wide spread of breakfast options for guests. Located in the Centre of the Barcelona , Rooms are spacious and offers best views of the city. Glad that we made the best choice :)",
              reviewerName: "Samyuktha"
            },
            {
              reviewText:
                "The hotel has comfortable rooms and good views to offer. Staff is very polite and helpful. Located near to city center and major attractions its definitely worth every penny spent. The breakfast spread has also been well thought. It includes sufficient vegetarian options.",
              reviewerName: "Balakrishnan"
            }
          ],
          amenityDisplayList: [
            {
              strikethrough: false,
              iconUrl: "vehoicon-safe-lock",
              amenityName: "Locker Facility"
            },
            {
              strikethrough: false,
              iconUrl: "vehoicon-concierge-bell",
              amenityName: "Concierge Service"
            },
            {
              strikethrough: false,
              iconUrl: "vehoicon-parking",
              amenityName: "Parking Facility"
            }
          ],
          status: "SUCCESS",
          costingId: "5af1560e3fef300c015c80cf",
          checkInDate: "30/Sep/2018",
          checkOutDate: "05/Oct/2018",
          checkInDateDisplay: "30",
          checkInMonthDisplay: "Sep",
          checkInDayOfWeek: "Sun",
          checkOutDateDisplay: "05",
          checkOutMonthDisplay: "Oct",
          checkOutDayOfWeek: "Fri",
          roomsInHotel: [
            {
              roomTypeId: "pMA0Gc5SBsEZiiiU",
              name: "Apartment, 1 Bedroom (2 adults)",
              bedTypes: ["1 double bed"],
              cancellationPolicy:
                "We understand that sometimes your travel plans change. We do not charge a change or cancel fee. However, this property (Apartaments Sant Jordi Girona 97) imposes the following penalty to its customers that we are required to pass on: Cancellations or changes made after 6:00 PM ((GMT+02:00)) on Sep 23, 2018, or no-shows, are subject to a 1 Night Room & Tax penalty.  ",
              shortCancellationPolicy:
                "Free cancellation until 23 Sep 2018 18:00:00",
              roomSize: null,
              valueAddsMap: {
                "2192": "Free Wireless Internet"
              },
              freeWireless: true,
              freeBreakfast: false,
              freeAirportTransfer: false,
              maxRoomOccupancy: 3,
              quotedRoomOccupancy: 2,
              roomImages: [
                "https://i.travelapi.com/hotels/11000000/10110000/10109900/10109877/10109877_1_z.jpg",
                "https://i.travelapi.com/hotels/11000000/10110000/10109900/10109877/10109877_9_z.jpg",
                "https://i.travelapi.com/hotels/11000000/10110000/10109900/10109877/10109877_12_z.jpg",
                "https://i.travelapi.com/hotels/11000000/10110000/10109900/10109877/10109877_13_z.jpg",
                "https://i.travelapi.com/hotels/11000000/10110000/10109900/10109877/10109877_20_z.jpg",
                "https://i.travelapi.com/hotels/11000000/10110000/10109900/10109877/10109877_24_z.jpg",
                "https://i.travelapi.com/hotels/11000000/10110000/10109900/10109877/10109877_25_z.jpg",
                "https://i.travelapi.com/hotels/11000000/10110000/10109900/10109877/10109877_26_z.jpg",
                "https://i.travelapi.com/hotels/11000000/10110000/10109900/10109877/10109877_11_z.jpg",
                "https://i.travelapi.com/hotels/11000000/10110000/10109900/10109877/10109877_23_z.jpg",
                "https://i.travelapi.com/hotels/11000000/10110000/10109900/10109877/10109877_18_z.jpg",
                "https://i.travelapi.com/hotels/11000000/10110000/10109900/10109877/10109877_10_z.jpg",
                "https://i.travelapi.com/hotels/11000000/10110000/10109900/10109877/10109877_19_z.jpg",
                "https://i.travelapi.com/hotels/11000000/10110000/10109900/10109877/10109877_16_z.jpg",
                "https://i.travelapi.com/hotels/11000000/10110000/10109900/10109877/10109877_14_z.jpg",
                "https://i.travelapi.com/hotels/11000000/10110000/10109900/10109877/10109877_22_z.jpg",
                "https://i.travelapi.com/hotels/11000000/10110000/10109900/10109877/10109877_15_z.jpg",
                "https://i.travelapi.com/hotels/11000000/10110000/10109900/10109877/10109877_17_z.jpg",
                "https://i.travelapi.com/hotels/11000000/10110000/10109900/10109877/10109877_21_z.jpg"
              ],
              roomWithView: false,
              refundable: true,
              discountApplied: false,
              originalPrice: "34401.59",
              discount: "0",
              finalPrice: "34,505",
              diffDetail: null,
              basePrice: "38,102",
              roomTypeCode: "200994123",
              rateCode: "204847319",
              discountPercentage: 10,
              positiveDiscount: false,
              roomConfiguration: {
                adultCount: 2,
                childAges: []
              },
              rateForDifferentDays: [
                "6895.19",
                "6094.74",
                "6094.74",
                "6094.74",
                "6094.74"
              ],
              averageRoomPrice: "6254.83",
              surcharges: [
                {
                  type: "TaxAndServiceFee (Per night)",
                  price: "625.488"
                }
              ],
              checkInInstructions: null,
              specialCheckInInstructions: null,
              mandatoryTax: null,
              salePrice: true,
              memberOnlyDeal: true,
              roomTypeDescription: null,
              extraInclusions: null,
              rateMatches: null,
              ourCost: "34,402"
            }
          ],
          numberOfNights: 5,
          discountApplied: false,
          offline: false,
          finalPrice: "34,505",
          marketingText: "",
          cityId: 7,
          cityName: "Barcelona",
          amenities: [
            {
              code: "3",
              name: "FREE WIFI"
            }
          ],
          costingKey: "7###30092018_05102018",
          hotelQuery: "7##2##30/Sep/2018##05/Oct/2018##false",
          diffDetail: null,
          discountPercentage: 10,
          sale: true,
          memberOnlyDeal: true,
          pytRecommended: false,
          ourCost: "34,402"
        }
      }
    },
    visaCostings: {
      visaCostingById: {
        "visa###13###5af151a83fef300c015c8077": {
          status: "SUCCESS",
          key: "visa###13###5af151a83fef300c015c8077",
          country: "Spain",
          notes: null,
          schengen: true,
          onArrival: false,
          required: true,
          doubleEntry: false,
          knowMoreUrl: null,
          individualVisaCost: null,
          familyVisaCost: null,
          totalCost: "1203",
          individualVisas: 2,
          familyVisas: 0,
          membersInFamilies: [],
          totalPax: 2,
          schengenCostDetails: [
            {
              travellerAge: "1-5",
              cost: "0"
            },
            {
              travellerAge: "6-12",
              cost: "2560"
            },
            {
              travellerAge: "13 and above",
              cost: "4388"
            }
          ],
          processingDays: 25,
          documentationDays: 0,
          ourCost: "1000"
        }
      },
      totalVisaCost: "1203",
      totalVisaCostInteger: 1203,
      totalVisaInsuranceCost: "2902",
      totalVisaInsuranceCostInt: 2902,
      totalOurCost: "1000"
    },
    insuranceCosting: {
      insuranceCostingById: {
        countries: ["Spain", "Czech Republic", "Slovakia", "Austria"],
        insuranceRegion: "EXCUS",
        plan: "50k Silver Plan",
        insuranceKey: "insurance###5af151a83fef300c015c8077",
        totalCost: "1699",
        required: true,
        planId: 1,
        ourCost: "1699"
      },
      totalInsuranceCost: "1699",
      totalInsuranceCostInt: 1699,
      totalOurCost: "1699"
    },
    passCostings: {
      passCostingById: {},
      totalPassCost: "0",
      totalOurCost: "0"
    },
    miscellaneousCostings: {
      totalMiscellaneousCost: "34,602",
      miscellaneousCostings: [
        {
          type: "PLANNING_FEE",
          cost: "34,602",
          description: null
        },
        {
          type: "PAYMENT_GATEWAY",
          cost: "0",
          description: null
        },
        {
          type: "CURRENCY_CONVERSION",
          cost: "0",
          description: null
        },
        {
          type: "GST",
          cost: "0",
          description: null
        }
      ]
    },
    summary: {
      inclusions: [
        "Roundtrip airfare from Bangalore",
        "Airfare from Barcelona to Prague",
        "5 nights stay in Barcelona",
        "1 nights stay in Prague",
        "4 nights stay in Bratislava",
        "4 nights stay in Vienna",
        "Montserrat Monastery & Hiking Experience",
        "Sunset with cocktails or cava",
        "Costa Brava Tour: Lloret de Mar & Tossa de Mar with Boat Cruise",
        "Park Guell & Sagrada Familia Tour",
        "Columbus Monument Ticket with Upgrade Wine Tasting in Barcelona",
        "Prague World War II and Communism Private Walking Tour",
        "Laser Tag Session in Bratislava",
        "Schonbrunn Palace & Vienna Explorations",
        "Bratislava Day Trip",
        "Vienna Schönbrunner Gardens Mini-Train Tour",
        "All airport-hotel and hotel-airport transfers",
        "Train ride from Prague to Bratislava",
        "Train ride from Bratislava to Vienna",
        "Guidance for getting Spain visa",
        "Travel insurance for 2 adults."
      ],
      exclusions: [
        "Meals not mentioned in the itinerary or inclusions",
        "Expenses of personal nature"
      ],
      complimentaryServices: ["Live Concierge Service over app"],
      discounts: "0",
      agentDiscounts: "0",
      savings: null,
      totalCost: null,
      recommendedPayment: {
        recommendedAmountToBePaid: "3,26,990",
        recommendedPercentage: 70,
        remainingInstallments: 1
      }
    },
    allFlightCostingRefs: ["BLR_BCN###VIE_BLR", "BCN_PRG"],
    allHotelCostingRefs: [
      "7###30092018_05102018",
      "200###05102018_06102018",
      "680###06102018_10102018",
      "82###10102018_14102018"
    ],
    allTransferCostingRefs: [
      "7_7###30092018",
      "7_7###05102018",
      "200_200###05102018",
      "82_82###14102018"
    ],
    allTrainCostingRefs: ["200_680###06102018", "680_82###10102018"],
    allFerryCostingRefs: [],
    allVisaCostingRefs: ["visa###13###5af151a83fef300c015c8077"],
    allActivityCostingRefs: [
      "200104###01102018",
      "305442###01102018",
      "201030###02102018",
      "201031###03102018",
      "305297###04102018",
      "307779###05102018",
      "311509###07102018",
      "200175###11102018",
      "200178###12102018",
      "307453###13102018"
    ],
    allPassCostingRefs: [],
    allRentalCostingRefs: [],
    costingConfiguration: {
      departureAirport: "BLR",
      tripStage: null,
      departureDate: "30/Sep/2018",
      hotelGuestRoomConfigurations: [
        {
          adultCount: 2,
          childAges: []
        }
      ],
      packageRate: false,
      departureCity: "Bengaluru",
      passengerConfig: 2
    },
    totalDiff: {
      changeType: "NONE",
      totalCostChange: "0",
      totalFlightHotelCostChange: "0",
      flightHotelCostChangeType: "PRICEDECREASE",
      totalFlightHotelActivityCostChange: "0",
      flightHotelActivityCostChangeType: "PRICEDECREASE",
      flightDiffContainer: {
        totalFlightDiff: 0,
        totalFlightCostChange: "0",
        priceChangeType: "NONE",
        flightDiffCostingById: {
          BCN_PRG: {
            oldFlightName: null,
            elementChangeType: "NONE",
            priceChangeType: "NONE",
            diffCost: "0",
            oldFlightCost: null
          },
          "BLR_BCN###VIE_BLR": {
            oldFlightName: null,
            elementChangeType: "NONE",
            priceChangeType: "NONE",
            diffCost: "0",
            oldFlightCost: null
          }
        }
      },
      hotelDiffContainer: {
        hotelDiffValue: 0,
        totelHotelCostChange: "0",
        priceChangeType: "NONE",
        hotelDiffCostingById: {
          "82###10102018_14102018": {
            oldHotelName: null,
            elementChangeType: "NONE",
            priceChangeType: "NONE",
            oldHotelCost: null,
            diffCost: "0"
          },
          "680###06102018_10102018": {
            oldHotelName: null,
            elementChangeType: "NONE",
            priceChangeType: "NONE",
            oldHotelCost: null,
            diffCost: "0"
          },
          "200###05102018_06102018": {
            oldHotelName: null,
            elementChangeType: "NONE",
            priceChangeType: "NONE",
            oldHotelCost: null,
            diffCost: "0"
          },
          "7###30092018_05102018": {
            oldHotelName: null,
            elementChangeType: "NONE",
            priceChangeType: "NONE",
            oldHotelCost: null,
            diffCost: "0"
          }
        }
      },
      activityDiffContainer: {
        activityDiffValue: 0,
        totelActivityCostChange: "0",
        priceChangeType: "NONE",
        activityDiffCostingById: {
          "200175###11102018": {
            oldActivityName: null,
            elementChangeType: "NONE",
            priceChangeType: "NONE",
            oldActivityCost: null,
            diffCost: "0"
          },
          "307453###13102018": {
            oldActivityName: null,
            elementChangeType: "NONE",
            priceChangeType: "NONE",
            oldActivityCost: null,
            diffCost: "0"
          },
          "305297###04102018": {
            oldActivityName: null,
            elementChangeType: "NONE",
            priceChangeType: "NONE",
            oldActivityCost: null,
            diffCost: "0"
          },
          "200104###01102018": {
            oldActivityName: null,
            elementChangeType: "NONE",
            priceChangeType: "NONE",
            oldActivityCost: null,
            diffCost: "0"
          },
          "201030###02102018": {
            oldActivityName: null,
            elementChangeType: "NONE",
            priceChangeType: "NONE",
            oldActivityCost: null,
            diffCost: "0"
          },
          "307779###05102018": {
            oldActivityName: null,
            elementChangeType: "NONE",
            priceChangeType: "NONE",
            oldActivityCost: null,
            diffCost: "0"
          },
          "305442###01102018": {
            oldActivityName: null,
            elementChangeType: "NONE",
            priceChangeType: "NONE",
            oldActivityCost: null,
            diffCost: "0"
          },
          "311509###07102018": {
            oldActivityName: null,
            elementChangeType: "NONE",
            priceChangeType: "NONE",
            oldActivityCost: null,
            diffCost: "0"
          },
          "200178###12102018": {
            oldActivityName: null,
            elementChangeType: "NONE",
            priceChangeType: "NONE",
            oldActivityCost: null,
            diffCost: "0"
          },
          "201031###03102018": {
            oldActivityName: null,
            elementChangeType: "NONE",
            priceChangeType: "NONE",
            oldActivityCost: null,
            diffCost: "0"
          }
        }
      },
      numberOfChanges: 0
    },
    totalFlightHotelCost: "2,07,502",
    otherTexts: {
      transitVisaText:
        "Transit visa is required for flights with layover in Australia"
    },
    allAlerts: {
      alerts: [
        {
          type: "NON_REFUNDABLE_HOTELS",
          text: null
        },
        {
          type: "NON_REFUNDABLE_FLIGHTS",
          text: null
        },
        {
          type: "EARLY_FLIGHT",
          text: null
        }
      ]
    },
    paymentSchedule: {
      id: null,
      paymentOptions: [
        {
          paymentAllowed: true,
          paymentOptionType: "PARTIAL_50",
          amount: "2,33,564",
          paymentStatus: "PENDING",
          payBefore: "26/Aug/2018",
          percentage: 50,
          paidOn: null,
          transactionId: null,
          recommended: false
        },
        {
          paymentAllowed: true,
          paymentOptionType: "PARTIAL_70",
          amount: "3,26,990",
          paymentStatus: "PENDING",
          payBefore: "09/Sep/2018",
          percentage: 70,
          paidOn: null,
          transactionId: null,
          recommended: true
        },
        {
          paymentAllowed: true,
          paymentOptionType: "FULL",
          amount: "4,67,128",
          paymentStatus: "PENDING",
          payBefore: "09/Sep/2018",
          percentage: 100,
          paidOn: null,
          transactionId: null,
          recommended: false
        }
      ],
      itineraryId: "5af151a83fef300c015c8077",
      itineraryTotalCost: "4,67,128",
      totalPaid: "0",
      totalPending: "4,67,128",
      lastSaved: null,
      paymentEnvironmentType: "LIVE"
    },
    freeActivitiesSize: 0
  };

  @action
  reset = () => {
    this._isLoading = false;
    this._loadingError = false;
    this._itineraries = [];
    this._selectedItinerary = {};
  };

  @action
  selectItinerary = itineraryId => {
    const selectedItinerary = this._itineraries.find(itineraryDetail => {
      return itineraryDetail.itinerary.itineraryId === itineraryId;
    });
    if (selectedItinerary) this._selectedItinerary = selectedItinerary;
    else this.getItineraryDetails(itineraryId);
  };

  @action
  getItineraryDetails = itineraryId => {
    this._isLoading = true;
    const requestBody = {};
    apiCall(
      `${constants.getItineraryDetails}?itineraryId=${itineraryId}`,
      requestBody
    )
      .then(response => {
        this._isLoading = false;
        if (response.status === "SUCCESS") {
          this._itineraries.push(response.data);
          this._selectedItinerary = response.data;
          this._loadingError = false;
        } else {
          this._loadingError = true;
        }
      })
      .catch(error => {
        console.error(error);
        this._isLoading = false;
        this._loadingError = true;
      });
  };

  @computed
  get isLoading() {
    return this._isLoading;
  }

  @computed
  get hasError() {
    return this._loadingError;
  }

  @computed
  get selectedItineraryId() {
    return this._selectedItinerary.itinerary.itineraryId;
  }

  @computed
  get selectedItinerary() {
    if (_.isEmpty(this._selectedItinerary)) return {};

    return toJS(this._selectedItinerary);
  }

  @computed
  get sortedDays() {
    const itineraryDayByKey = toJS(this._selectedItinerary.iterDayByKey);
    const days = Object.values(itineraryDayByKey);
    return _.sortBy(days, "dayNum");
  }

  @computed
  get startEndDates() {
    if (_.isEmpty(this._selectedItinerary)) return {};

    const sortedDays = this.sortedDays;

    const startDay = sortedDays[0];
    const lastDay = sortedDays[sortedDays.length - 1];
    const startDate = moment(
      `${startDay.day}-${startDay.mon}-${constants.currentYear}`,
      "DD-MMM-YYYY"
    ).toDate();
    const lastDate = moment(
      `${lastDay.day}-${lastDay.mon}-${constants.currentYear}`,
      "DD-MMM-YYYY"
    ).toDate();

    const startWeek = moment(startDate).day();
    const endWeek = moment(lastDate).day();

    const startBuffer = startWeek;
    const endBuffer = 6 - endWeek;

    const calendarStartDate = moment(startDate)
      .subtract(startBuffer, "days")
      .toDate();
    const calendarLastDate = moment(lastDate)
      .add(endBuffer, "days")
      .toDate();

    const numberOfDays =
      moment(calendarLastDate).diff(calendarStartDate, "days") + 1;

    return {
      calendarStartDate,
      calendarLastDate,
      startDate,
      lastDate,
      numberOfDays
    };
  }

  @computed
  get hotels() {
    if (_.isEmpty(this._selectedItinerary)) return {};

    let hotels;
    try {
      const hotelRefs = this._selectedItinerary.allHotelCostingRefs;
      hotels = hotelRefs.map(ref => {
        return toJS(
          this._selectedItinerary.hotelCostings.hotelCostingById[ref]
        );
      });
    } catch (e) {
      hotels = [];
    }
    return hotels;
  }

  @computed
  get activities() {
    if (_.isEmpty(this._selectedItinerary)) return {};

    let activities;
    try {
      activities = Object.values(this._selectedItinerary.activityById);
      const activityRefs = this._selectedItinerary.allActivityCostingRefs;
      const activitiesCosting = activityRefs.map(ref => {
        return toJS(
          this._selectedItinerary.activityCostings.activityCostingById[ref]
        );
      });
      activities = activities.map(activity => {
        activity = toJS(activity);
        return {
          ...activity,
          costing: _.find(activitiesCosting, {
            activityId: JSON.stringify(activity.planningToolId)
          })
        };
      });
    } catch (e) {
      activities = [];
    }
    return activities;
  }

  @computed
  get flights() {
    if (_.isEmpty(this._selectedItinerary)) return {};

    let flights;
    try {
      const flightRefs = this._selectedItinerary.allFlightCostingRefs;
      flights = flightRefs.map(ref => {
        return toJS(
          this._selectedItinerary.flightCostings.flightCostingById[ref]
        );
      });
    } catch (e) {
      flights = [];
    }
    return flights;
  }

  @computed
  get transfers() {
    if (_.isEmpty(this._selectedItinerary)) return {};

    let transfers;
    try {
      const transferRefs = this._selectedItinerary.allTransferCostingRefs;
      transfers = transferRefs.map(ref => {
        return toJS(
          this._selectedItinerary.transferCostings.transferCostingById[ref]
        );
      });
    } catch (e) {
      transfers = [];
    }
    return transfers;
  }

  @computed
  get trains() {
    if (_.isEmpty(this._selectedItinerary)) return {};

    let trains;
    try {
      const trainRefs = this._selectedItinerary.allTrainCostingRefs;
      trains = trainRefs.map(ref => {
        return toJS(
          this._selectedItinerary.trainCostings.trainCostingById[ref]
        );
      });
    } catch (e) {
      trains = [];
    }
    return trains;
  }

  @computed
  get ferries() {
    if (_.isEmpty(this._selectedItinerary)) return {};

    let ferries;
    try {
      const trainRefs = this._selectedItinerary.allFerryCostingRefs;
      ferries = trainRefs.map(ref => {
        return toJS(
          this._selectedItinerary.ferryCostings.ferryCostingById[ref]
        );
      });
    } catch (e) {
      ferries = [];
    }
    return ferries;
  }

  @computed
  get visa() {
    if (_.isEmpty(this._selectedItinerary)) return {};

    let visa;
    try {
      const visaRefs = this._selectedItinerary.allVisaCostingRefs;
      visa = visaRefs.map(ref => {
        return toJS(this._selectedItinerary.visaCostings.visaCostingById[ref]);
      });
    } catch (e) {
      visa = [];
    }
    return visa;
  }

  @computed
  get passes() {
    if (_.isEmpty(this._selectedItinerary)) return {};

    let passes;
    try {
      const passRefs = this._selectedItinerary.allFerryCostingRefs;
      passes = passRefs.map(ref => {
        return toJS(this._selectedItinerary.passCostings.passCostingById[ref]);
      });
    } catch (e) {
      passes = [];
    }
    return passes;
  }

  @computed
  get rentals() {
    if (_.isEmpty(this._selectedItinerary)) return {};

    let rentals;
    try {
      const rentalRefs = this._selectedItinerary.allRentalCostingRefs;
      rentals = rentalRefs.map(ref => {
        return toJS(
          this._selectedItinerary.rentalCostings.rentalCostingById[ref]
        );
      });
    } catch (e) {
      rentals = [];
    }
    return rentals;
  }

  @computed
  get days() {
    if (_.isEmpty(this._selectedItinerary)) return [];

    return this.sortedDays.map(day => {
      return moment(
        `${day.day}-${day.mon}-${constants.currentYear}`,
        "DD-MMM-YYYY"
      ).toDate();
    });
  }

  @computed
  get slots() {
    if (_.isEmpty(this._selectedItinerary)) return [];

    return this.sortedDays.reduce((slots, day) => {
      return slots.concat([
        day.allSlotKeys.map(slotKey => {
          const slot = toJS(this._selectedItinerary.iterSlotByKey[slotKey]);
          if (slot.type === "ACTIVITY") {
            slot.activitySlotDetail = {
              ...slot.activitySlotDetail,
              ...this.getActivityById(slot.activitySlotDetail.activityId)
            };
          }
          return slot;
        })
      ]);
    }, []);
  }

  @computed
  get cities() {
    const cityKeys = this._selectedItinerary.itinerary.allCityKeys;
    return cityKeys.map(key => {
      const cityKeyObject = this._selectedItinerary.iterCityByKey[key];
      const cityId = cityKeyObject.cityId;
      const startDayId = cityKeyObject.allDayKeys[0];
      const endDayId =
        cityKeyObject.allDayKeys[cityKeyObject.allDayKeys.length - 1];

      const cityObject = this._selectedItinerary.cityById[cityId];
      const startDayObject = this._selectedItinerary.iterDayByKey[startDayId];
      const endDayObject = this._selectedItinerary.iterDayByKey[endDayId];

      const city = cityObject.cityName;
      const startDay = moment(
        `${startDayObject.day}-${startDayObject.mon}-${constants.currentYear}`,
        "DD-MMM-YYYY"
      ).toDate();
      const endDay = moment(
        `${endDayObject.day}-${endDayObject.mon}-${constants.currentYear}`,
        "DD-MMM-YYYY"
      ).toDate();

      return { city, startDay, endDay };
    });
  }

  getCityById = createTransformer(id => {
    const cityObject = this._selectedItinerary.cityById[id];
    return toJS(cityObject);
  });

  getActivityById = createTransformer(id =>
    toJS(this._selectedItinerary.activityById[id])
  );

  getDateSelectionMatrixSingle = createTransformer(index => {
    try {
      let dayKey;

      for (let key in this._selectedItinerary.iterDayByKey) {
        if (this._selectedItinerary.iterDayByKey[key].dayNum === index + 1) {
          dayKey = key;
          break;
        }
      }

      for (let key in this._selectedItinerary.iterCityByKey) {
        const datesArray = this._selectedItinerary.iterCityByKey[key]
          .allDayKeys;
        for (let i = 0; i < datesArray.length; i++) {
          if (dayKey === datesArray[i]) {
            const selection = [];
            if (i === 0) {
              selection.push(0);
            } else {
              selection.push(1);
            }
            selection.push(1);
            if (i === datesArray.length - 1) {
              selection.push(0);
            } else {
              selection.push(1);
            }
            return selection;
          }
        }
      }
    } catch (e) {
      return [0, 0, 0];
    }
  });

  numOfActivitiesByDay = createTransformer(index => {
    try {
      for (let key in this._selectedItinerary.iterDayByKey) {
        if (this._selectedItinerary.iterDayByKey[key].dayNum === index + 1) {
          const slotKeys = this._selectedItinerary.iterDayByKey[key]
            .allSlotKeys;
          let activityCount = 0;
          for (let i = 0; i < slotKeys.length; i++) {
            if (
              this._selectedItinerary.iterSlotByKey[slotKeys[i]].type ===
              "ACTIVITY"
            ) {
              activityCount++;
            }
          }
          return activityCount;
        }
      }
    } catch (e) {
      return 0;
    }
  });

  getTransferTypeByDay = createTransformer(index => {
    try {
      for (let key in this._selectedItinerary.iterDayByKey) {
        if (this._selectedItinerary.iterDayByKey[key].dayNum === index + 1) {
          const slotKeys = this._selectedItinerary.iterDayByKey[key]
            .allSlotKeys;
          for (let i = 0; i < slotKeys.length; i++) {
            const activity = this._selectedItinerary.iterSlotByKey[slotKeys[i]];
            if (activity.type === "INTERCITY_TRANSFER") {
              return activity.intercityTransferSlotDetailVO.directTransferDetail
                .transferMode;
            } else if (
              activity.type === "INTERNATIONAL_ARRIVE" ||
              activity.type === "INTERNATIONAL_DEPART"
            ) {
              return "FLIGHT";
            } else {
              return "NONE";
            }
          }
        }
      }
    } catch (e) {
      return "NONE";
    }
  });

  constructor() {
    // console.log(JSON.stringify(toJS(this._selectedItinerary)));
  }
}

export default Itineraries;
