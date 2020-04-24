import React, { useState, Fragment, useRef, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppNavigatorParamsType } from "../../NavigatorsV2/AppNavigator";
import {
  SCREEN_PRETRIP_HOME_TABS,
  SCREEN_EXPLORE_TAB,
  SCREEN_ULTIMATE_MENU
} from "../../NavigatorsV2/ScreenNames";
import { PreTripHomeTabsType } from "../../NavigatorsV2/PreTripHomeTabs";
import HeroBannerRow from "./Components/HeroBannerRow";
import { CONSTANT_white, CONSTANT_shade5 } from "../../constants/colorPallete";
import ExploreSectionTitle from "./Components/ExploreSectionTitle";
import BlankSpacer from "../../CommonComponents/BlankSpacer/BlankSpacer";
import BookedItineraryCardsRow from "./Components/BookedItineraryCardsRow";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import PackageItineraryCardsRow from "./Components/PackageItineraryCardsRow";
import PromotedCardsRow from "./Components/PromotedCardsRow";
import BlogCardsRow from "./Components/BlogCardsRow";
import CountryCardsRow from "./Components/CountryCardsRow";
import PrimaryHeader from "../../NavigatorsV2/Components/PrimaryHeader";
import {
  CONSTANT_hamburgerIcon,
  CONSTANT_trustIconFacebook,
  CONSTANT_trustIconGoogle,
  CONSTANT_trustIconIata
} from "../../constants/imageAssets";
import TestimonialsCardsRow from "./Components/TestimonialsCardsRow";
import TrustIcons from "../../CommonComponents/TrustIcons/TrustIcons";
import { ExploreFeedType } from "./ExploreFeedType";
import useExploreDataRequest from "./hooks/useExploreDataRequest";
import useDeepCompareEffect from "use-deep-compare-effect";
import { inject, observer } from "mobx-react";
import YourBookings from "../../mobx/YourBookings";

export type ExploreScreenNavigationType = CompositeNavigationProp<
  StackNavigationProp<AppNavigatorParamsType, typeof SCREEN_PRETRIP_HOME_TABS>,
  BottomTabNavigationProp<PreTripHomeTabsType, typeof SCREEN_EXPLORE_TAB>
>;

export type ExploreScreenRouteProp = RouteProp<
  PreTripHomeTabsType,
  typeof SCREEN_EXPLORE_TAB
>;

export interface ExploreScreenProps {
  navigation: ExploreScreenNavigationType;
  route: ExploreScreenRouteProp;
  yourBookingsStore: YourBookings;
}

export type ExploreScreenSourcesType = "TravelProfileFlow";

const Explore = ({ navigation, yourBookingsStore }: ExploreScreenProps) => {
  let [exploreData, setExploreData] = useState<ExploreFeedType>([]);
  const [exploreDataApi, loadExploreData] = useExploreDataRequest();

  const openUltimateMenu = () => {
    navigation.navigate(SCREEN_ULTIMATE_MENU);
  };

  const header = useRef(
    PrimaryHeader({
      leftAction: openUltimateMenu,
      leftIcon: CONSTANT_hamburgerIcon
    })
  ).current;

  useEffect(() => {
    loadExploreData();
    yourBookingsStore.getUpcomingItineraries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { successResponseData } = exploreDataApi;

  useDeepCompareEffect(() => {
    if (successResponseData) {
      setExploreData(successResponseData.data);
    }
  }, [successResponseData || {}]);

  exploreData = [
    {
      type: "HERO_BANNER",
      title: "",
      subTitle: "",
      color: "rgba(0,0,0,1)",
      items: [
        {
          type: "SRI_LANKA_CARD",
          imageUrl:
            "https://pyt-voyager-content.s3.ap-south-1.amazonaws.com/mobileContent/Group+294.png",
          deepLinking: {
            link: "ListingPage",
            screenData: {
              slug: "packages/maldives"
            }
          }
        },
        {
          type: "MALDIVES_CARD",
          imageUrl:
            "https://pyt-voyager-content.s3.ap-south-1.amazonaws.com/mobileContent/Group+280.png",
          deepLinking: {
            link: "ListingPage",
            screenData: {
              slug: "packages/maldives"
            }
          }
        },
        {
          type: "ITALY_CARD",
          imageUrl:
            "https://pyt-voyager-content.s3.ap-south-1.amazonaws.com/mobileContent/Group+295.png",
          deepLinking: {
            link: "ListingPage",
            screenData: {
              slug: "packages/italy"
            }
          }
        }
      ]
    },
    {
      type: "COUNTRY_CARDS",
      title: "Recommended for you",
      color: "rgba(145, 77, 156,1)",
      subTitle: "Top destinations based on your travel style",
      httpMethod: "GET",
      apiUrl: "userprofile/country"
    },
    {
      type: "PACKAGE_ITINERARY_CARDS",
      title: "Pocket-friendly destinations",
      color: "rgba(255, 136, 51,1)",
      subTitle: "Holidays that are budgeted for the best",
      apiUrl: "packages",
      httpMethod: "POST",
      requestPayload: {
        key: "packages",
        budgets: ["0_50000"],
        testimonials: 10,
        limit: 10,
        journalTestimonials: false
      }
    },
    {
      type: "PROMOTED_CARDS",
      title: "Deals from our partners",
      color: "rgba(0, 198, 132, 1)",
      subTitle: "Get the best rates on your favourite destinations",
      items: [
        {
          type: "WORLD_CUP_T20",
          imageUrl:
            "https://pyt-images.imgix.net/images/product_blog/itinerary-box/australia-small.jpeg",
          text: "All inclusive offers starting from",
          cost: 75000,
          deepLinking: {
            link: "Promo",
            screenData: {
              slug: "packages/maldives",
              promoData:
                "https://pyt-voyager-content.s3.ap-south-1.amazonaws.com/mobileContent/promo_card_info.json"
            }
          }
        },
        {
          type: "AUSTRALIA",
          imageUrl:
            "https://pyt-images.imgix.net/images/product_blog/itinerary-box/australia-small.jpeg",
          text: "The best trips #DownUnder",
          cost: 145000,
          deepLinking: {
            link: "Promo",
            screenData: {
              slug: "packages/australia",
              promoData:
                "https://pyt-voyager-content.s3.ap-south-1.amazonaws.com/mobileContent/promo_card_info.json"
            }
          }
        },
        {
          type: "BEACH",
          imageUrl:
            "https://pyt-images.imgix.net/images/product_blog/itinerary-box/australia-small.jpeg",
          text: "Exclusive for Beach Bums",
          cost: 45500,
          deepLinking: {
            link: "Promo",
            screenData: {
              slug: "packages/maldives",
              promoData:
                "https://pyt-voyager-content.s3.ap-south-1.amazonaws.com/mobileContent/promo_card_info.json"
            }
          }
        }
      ]
    },
    {
      type: "BOOKED_ITINERARY_CARDS",
      title: "On-going holidays",
      color: "rgba(27, 169, 204,1)",
      subTitle: "Check out where our other travellers are!",
      httpMethod: "GET",
      apiUrl: "itinerary/ongoingitineraries"
    },
    {
      type: "TESTIMONIAL_CARDS",
      title: "Traveller testimonials",
      color: "rgba(145, 77, 156,1)",
      subTitle: "Find out why our customers love us!",
      httpMethod: "GET",
      apiUrl: "userprofile/country"
    },
    {
      type: "PACKAGE_ITINERARY_CARDS",
      title: "VISA-ON-ARRIVAL",
      color: "rgba(237, 182, 29, 1)",
      subTitle: "Pick, Pack and Gooo",
      apiUrl: "packages",
      httpMethod: "POST",
      requestPayload: {
        key: "visa-on-arrival-packages",
        testimonials: 10,
        limit: 10,
        journalTestimonials: false
      }
    },
    {
      type: "PACKAGE_ITINERARY_CARDS",
      title: "For the love birds",
      color: "rgba(215, 60, 84,1)",
      subTitle: "Create memories of a lifetime.",
      apiUrl: "packages",
      httpMethod: "POST",
      requestPayload: {
        key: "honeymoon-packages",
        testimonials: 10,
        limit: 10,
        journalTestimonials: false
      }
    },
    {
      type: "BLOG_CARDS",
      title: "Travel Blogs",
      subTitle: "Read more about your favourite destinations",
      color: "rgba(27, 169, 204,1)",
      items: [
        {
          bgColor: "rgba(145, 77, 156,1)",
          blogText: "10 amazing things to do in Europe.",
          type: "blog",
          deepLinking: {
            link: "https://pickyourtrail.com/blog"
          }
        },
        {
          bgColor: "rgba(215, 60, 84,1)",
          blogText: "5 essential things to know about Dubai.",
          type: "blog",
          deepLinking: {
            link: "https://pickyourtrail.com/blog"
          }
        },
        {
          bgColor: "rgba(237, 182, 29, 1)",
          blogText: "A local's guide to experience Turkey.",
          type: "guide",
          deepLinking: {
            link: "https://pickyourtrail.com/blog"
          }
        }
      ]
    }
  ];

  return (
    <View style={styles.container}>
      {header}
      <ScrollView removeClippedSubviews>
        {exploreData.map((section, sectionIndex) => {
          return (
            <Fragment key={sectionIndex}>
              <BlankSpacer height={24} />
              <ExploreSectionTitle
                title={section.title}
                description={section.subTitle}
                titleColor={section.color}
              />
              {section.title || section.subTitle ? (
                <BlankSpacer height={16} />
              ) : null}
              {section.type === "HERO_BANNER" ? (
                <HeroBannerRow {...section} />
              ) : section.type === "BOOKED_ITINERARY_CARDS" ? (
                <BookedItineraryCardsRow {...section} />
              ) : section.type === "PACKAGE_ITINERARY_CARDS" ? (
                <PackageItineraryCardsRow {...section} />
              ) : section.type === "PROMOTED_CARDS" ? (
                <PromotedCardsRow {...section} />
              ) : section.type === "BLOG_CARDS" ? (
                <BlogCardsRow {...section} />
              ) : section.type === "COUNTRY_CARDS" ? (
                <CountryCardsRow {...section} />
              ) : section.type === "TESTIMONIAL_CARDS" ? (
                <TestimonialsCardsRow {...section} />
              ) : null}
              <BlankSpacer height={24} />
              <BlankSpacer
                containerStyle={styles.spacerBackgroundStyle}
                height={4}
              />
            </Fragment>
          );
        })}

        <BlankSpacer height={24} />
        {exploreData.length ? (
          <View style={styles.trustIconsWrapper}>
            <TrustIcons
              image={CONSTANT_trustIconFacebook()}
              text={"4.8/5 Based on 1200+ ratings"}
            />
            <TrustIcons
              image={CONSTANT_trustIconGoogle()}
              text={"4.5/5 Based on 300+ ratings"}
            />
            <TrustIcons
              image={CONSTANT_trustIconIata()}
              text={"Accredited Agent"}
            />
          </View>
        ) : null}
        <BlankSpacer height={40} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CONSTANT_white
  },
  spacerBackgroundStyle: {
    backgroundColor: CONSTANT_shade5
  },
  trustIconsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 24
  }
});

export default ErrorBoundary({ isRoot: true })(
  inject("yourBookingsStore")(observer(Explore))
);
