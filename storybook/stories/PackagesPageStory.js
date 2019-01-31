import React from "react";
import { storiesOf } from "@storybook/react-native";
import PackageCard from "../../Screens/HomeScreen/Components/PackageCard";
import PackageCarousel from "../../Screens/HomeScreen/Components/PackageCarousel";

const packageData = {
  campaignItineraryId: "5a378ec4b58ce008e806b2ea",
  type: "RECENTLY_BOOKED",
  image: "https://d3lf10b5gahyby.cloudfront.net/cityImages/20/dubai-1.jpg",
  title: "The exciting 6 day Dubai honeymoon package",
  destinationString: "Dubai",
  departureCity: "Chennai",
  departureAirport: "MAA",
  itineraryCost: 63745.5,
  hotelStarRating: 3,
  nights: 6,
  slug: "packages/the-exciting-6-day-dubai-honeymoon-package",
  themes: ["LEISURE", "ATTRACTION"],
  tripType: "Honeymoon",
  regionName: "Dubai",
  regionCode: "dxb",
  activities: [
    "Relax at the Dhow Cruise with a buffet dinner",
    "Fun filled city tour of Dubai ",
    "Desert Safari tour of fun and heart-stopping activities with a BBQ dinner",
    "See the splendid sights with a visit to the 124th floor at Burj Khalifa ",
    "Glimpse into an underwater world with panoramic chambers at the Lost Chambers at Atlantis",
    "Complete fun and frolic at the Bollywood Park housing exciting rides and shows at the Dubai Park"
  ],
  cityHotelStay: [
    {
      cityId: 20,
      cityName: "Dubai",
      hotelIds: null,
      nights: 6
    }
  ],
  flightsIncluded: true,
  hotelsIncluded: true,
  transferIncluded: true,
  visaIncluded: true,
  visaType: "NORMAL"
};

const packagesList = {
  packages: [
    {
      campaignItineraryId: "5a378ec4b58ce008e806b2ea",
      type: "RECENTLY_BOOKED",
      image: "https://d3lf10b5gahyby.cloudfront.net/cityImages/20/dubai-1.jpg",
      title: "The exciting 6 day Dubai honeymoon package",
      destinationString: "Dubai",
      departureCity: "Chennai",
      departureAirport: "MAA",
      itineraryCost: 63745.5,
      hotelStarRating: 3,
      nights: 6,
      slug: "packages/the-exciting-6-day-dubai-honeymoon-package",
      themes: ["LEISURE", "ATTRACTION"],
      tripType: "Honeymoon",
      regionName: "Dubai",
      regionCode: "dxb",
      activities: [
        "Relax at the Dhow Cruise with a buffet dinner",
        "Fun filled city tour of Dubai ",
        "Desert Safari tour of fun and heart-stopping activities with a BBQ dinner",
        "See the splendid sights with a visit to the 124th floor at Burj Khalifa ",
        "Glimpse into an underwater world with panoramic chambers at the Lost Chambers at Atlantis",
        "Complete fun and frolic at the Bollywood Park housing exciting rides and shows at the Dubai Park"
      ],
      cityHotelStay: [
        {
          cityId: 20,
          cityName: "Dubai",
          hotelIds: null,
          nights: 6
        }
      ],
      flightsIncluded: true,
      hotelsIncluded: true,
      transferIncluded: true,
      visaIncluded: true,
      visaType: "NORMAL"
    },
    {
      campaignItineraryId: "5a378e6bb58ce008e806b24d",
      type: "RECENTLY_BOOKED",
      image: "https://d3lf10b5gahyby.cloudfront.net/city/2400xh/singapore.jpg",
      title: "A 6 day Singapore itinerary to the most romantic honeymoon ever",
      destinationString: "Singapore",
      departureCity: "Bengaluru",
      departureAirport: "BLR",
      itineraryCost: 63690.5,
      hotelStarRating: 3,
      nights: 5,
      slug:
        "packages/a-6-day-singapore-itinerary-to-the-most-romantic-honeymoon-ever",
      metadata: {
        title: "",
        description: ""
      },
      themes: ["KID_FRIENDLY", "LEISURE"],
      tripType: "Honeymoon",
      regionName: "Singapore",
      regionCode: "sin",
      activities: [
        "Explore the vibrant & colorful atmosphere of Little India with a walking trail ",
        "Singapore city tour of the best places like  Merlion Park, Chinatown and other places",
        "Exciting adventure during private night safari",
        "Happy feels at Gardens by the bay",
        "A morning at Sentosa island with visits to Cable Car Ride,S.E.A. Aquarium and more",
        "Singapore by night - The Fountain of Wealth,Benjamin Sheares Bridge, Pasar Malam,Bugis Street bazaar"
      ],
      cityHotelStay: [
        {
          cityId: 75,
          cityName: "Singapore",
          hotelIds: null,
          nights: 5
        }
      ],
      flightsIncluded: true,
      hotelsIncluded: true,
      transferIncluded: true,
      visaIncluded: true,
      visaType: "NORMAL"
    },
    {
      campaignItineraryId: "5bcd9298ecd3d7235f88af3c",
      type: "RECENTLY_BOOKED",
      image: "https://d3lf10b5gahyby.cloudfront.net/city/2400xh/kuta.jpg",
      title:
        "ideal itinerary for the best Honeymoon vacation to Bali + Vietnam",
      destinationString: "Kuta, Gili Island and Ubud",
      departureCity: "Delhi",
      departureAirport: "DEL",
      itineraryCost: 70589.5,
      hotelStarRating: 4,
      nights: 7,
      slug:
        "packages/ideal-itinerary-for-the-best-honeymoon-vacation-to-bali-vietnam",
      bookedString: "Someone from Delhi booked this 100 days ago",
      themes: ["LEISURE", "ADVENTURE"],
      tripType: "Honeymoon",
      regionName: "South East Asia",
      regionCode: "idn_vnm",
      activities: [
        "Car hire for 10 hours in Bali with a private chauffeur for recommendations and places to visit",
        "Car hire for 10 hours - Full day car in Bali",
        "Car hire for 5 hours to explore the best of Bali at leisure",
        "Treasure Hunt- Lembongan Beach Club"
      ],
      cityHotelStay: [
        {
          cityId: 41,
          cityName: "Kuta",
          hotelIds: null,
          nights: 3
        },
        {
          cityId: 25,
          cityName: "Gili Island",
          hotelIds: null,
          nights: 2
        },
        {
          cityId: 79,
          cityName: "Ubud",
          hotelIds: null,
          nights: 2
        }
      ],
      flightsIncluded: true,
      hotelsIncluded: true,
      transferIncluded: true,
      visaIncluded: false,
      visaType: "ON_ARRIVAL"
    },
    {
      campaignItineraryId: "5a378e6bb58ce008e806b24f",
      type: "RECENTLY_BOOKED",
      image: "https://d3lf10b5gahyby.cloudfront.net/city/2400xh/krabi.jpg",
      title: "The ideal Thailand honeymoon package for 7 days",
      destinationString: "Phuket, Krabi and Bangkok",
      departureCity: "Mumbai",
      departureAirport: "BOM",
      itineraryCost: 59699.5,
      hotelStarRating: 3,
      nights: 6,
      slug: "packages/the-ideal-thailand-honeymoon-package-for-7-days",
      themes: ["LEISURE"],
      tripType: "Honeymoon",
      regionName: "Thailand",
      regionCode: "tha",
      activities: [],
      cityHotelStay: [
        {
          cityId: 62,
          cityName: "Phuket",
          hotelIds: null,
          nights: 3
        },
        {
          cityId: 38,
          cityName: "Krabi",
          hotelIds: null,
          nights: 2
        },
        {
          cityId: 6,
          cityName: "Bangkok",
          hotelIds: null,
          nights: 1
        }
      ],
      flightsIncluded: true,
      hotelsIncluded: true,
      transferIncluded: true,
      visaIncluded: true,
      visaType: "NORMAL"
    },
    {
      campaignItineraryId: "5b60088d62ab871c1484fff5",
      type: "RECENTLY_BOOKED",
      image:
        "https://d3lf10b5gahyby.cloudfront.net/cityImages/74/siem_reap-3.jpg",
      title: "The perfect 6 day trip to Cambodia",
      destinationString: "Siem Reap and Phnom Penh",
      departureCity: "Chennai",
      departureAirport: "MAA",
      itineraryCost: 65053.5,
      hotelStarRating: 3,
      nights: 5,
      slug: "packages/the-perfect-6-day-trip-to-cambodia",
      metadata: {
        title: "Cambodia and Vietnam Tours Packages | Cambodia Packages ",
        description:
          "Cambodia & Vietnam tour packages with airfare. Places to visit Phnom Penh City History & Killing Fields, Siem Reap, Tour of Temples at Angkor Wat & Angkor Thom, Tonle Sap Secrets Tour. Book now!"
      },
      bookedString: "Someone from Chennai booked this 184 days ago",
      themes: ["ATTRACTION", "LEISURE"],
      tripType: "Honeymoon",
      regionName: "Cambodia",
      regionCode: "khm",
      activities: [
        "Phnom Penh City History & Killing Fields",
        "Admission to Phare: The Cambodian Circus - Section A & Superior Menu",
        "Tour of Temples at Angkor Wat & Angkor Thom",
        "Tonle Sap Secrets Tour"
      ],
      cityHotelStay: [
        {
          cityId: 74,
          cityName: "Siem Reap",
          hotelIds: null,
          nights: 3
        },
        {
          cityId: 61,
          cityName: "Phnom Penh",
          hotelIds: null,
          nights: 2
        }
      ],
      flightsIncluded: true,
      hotelsIncluded: true,
      transferIncluded: true,
      visaIncluded: true,
      visaType: "NORMAL"
    },
    {
      campaignItineraryId: "59ccfb0905f42b07367d4b93",
      type: "ON_SALE",
      image: "https://d3lf10b5gahyby.cloudfront.net/city/2400xh/mahe.jpg",
      title: "Romance reloaded in Seychelles",
      destinationString: "Mahe and Praslin",
      departureCity: "Delhi",
      departureAirport: "DEL",
      itineraryCost: 122165.5,
      hotelStarRating: 4,
      nights: 5,
      slug: "packages/romance-reloaded-in-seychelles",
      metadata: {
        title: "Romance Reloaded in Seychelles - 6 Days, 5 Nights Itinerary",
        description:
          "Book Romantic 6 days 5 nights Seychelles Itinerary. Customize your package and explore the best of Seychelles. Choose activities, things to do, places to visit in Seychelles and more with just a click."
      },
      themes: ["LEISURE"],
      tripType: "Honeymoon",
      regionName: "Seychelles",
      regionCode: "sez",
      activities: [],
      cityHotelStay: [
        {
          cityId: 229,
          cityName: "Mahe",
          hotelIds: [53049],
          nights: 3
        },
        {
          cityId: 228,
          cityName: "Praslin",
          hotelIds: [53032],
          nights: 2
        }
      ],
      flightsIncluded: true,
      hotelsIncluded: true,
      visaIncluded: false,
      visaType: "ON_ARRIVAL"
    }
  ],
  title: "Honeymoon packages"
};

storiesOf("Packages Page", module)
  .add("Package Card", () => {
    const props = {
      image: { uri: packageData.image },
      title: packageData.title,
      price: packageData.itineraryCost,
      region: packageData.regionName,
      slug: packageData.slug
    };
    console.log(props);
    return <PackageCard {...props} />;
  })
  .add("Package Carousel", () => {
    const props = {
      title: packagesList.title,
      packages: packagesList.packages.map(packageData => {
        return {
          image: { uri: packageData.image },
          title: packageData.title,
          price: packageData.itineraryCost,
          region: packageData.regionName,
          slug: packageData.slug
        };
      })
    };
    console.log(props);
    return <PackageCarousel {...props} />;
  });
