import React from "react";
import { storiesOf } from "@storybook/react-native";
import PackageCard from "../../Screens/HomeScreen/Components/PackageCard";

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

storiesOf("Packages Page", module).add("Package Card", () => {
  const props = {
    image: { uri: packageData.image },
    title: packageData.title,
    price: packageData.itineraryCost,
    region: packageData.regionName
  };
  console.log(props);
  return <PackageCard {...props} />;
});
