import { ExploreFeedType } from "../ExploreScreen/ExploreFeedType";

export const exploreTestData: ExploreFeedType = [
  {
    type: "HERO_BANNER",
    title: "",
    subTitle: "",
    color: "rgba(0,0,0,1)",
    items: [
      {
        type: "SRI_LANKA_CARD",
        imageUrl:
          "https://pyt-images.imgix.net/images/product_blog/itinerary-box/australia-small.jpeg",
        deepLinking: {
          link: "ListingPage",
          screenData: {}
        }
      },
      {
        type: "MALDIVES_CARD",
        imageUrl:
          "https://pyt-images.imgix.net/images/product_blog/itinerary-box/australia-small.jpeg",
        deepLinking: {
          link: "ListingPage",
          screenData: {}
        }
      },
      {
        type: "ITALY_CARD",
        imageUrl:
          "https://pyt-images.imgix.net/images/product_blog/itinerary-box/australia-small.jpeg",
        deepLinking: {
          link: "ListingPage",
          screenData: {}
        }
      }
    ]
  },
  {
    type: "COUNTRY_CARDS",
    title: "Recommended for you",
    color: "rgba(0,0,0,1)",
    subTitle: "Top destinations based on your travel style",
    httpMethod: "GET",
    apiUrl: "userprofile/country"
  },
  {
    type: "PACKAGE_ITINERARY_CARDS",
    title: "Pocket-friendly destinations",
    color: "rgba(0,0,0,1)",
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
    color: "",
    subTitle: "Get the best rates on your favourite destinations",
    items: [
      {
        type: "WORLD_CUP_T20",
        imageUrl:
          "https://pyt-images.imgix.net/images/product_blog/itinerary-box/australia-small.jpeg",
        text: "All inclusive offers starting from",
        cost: 75000,
        deepLinking: {
          link: "ListingPage",
          screenData: {
            slug: "packages/maldives"
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
          link: "ListingPage",
          screenData: {
            slug: "packages/maldives"
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
          link: "ListingPage",
          screenData: {
            slug: "packages/maldives"
          }
        }
      }
    ]
  },
  {
    type: "BOOKED_ITINERARY_CARDS",
    title: "On-going holidays",
    color: "rgba(0,0,0,1)",
    subTitle: "Check out where our other travellers are!",
    httpMethod: "GET",
    apiUrl: "itinerary/ongoingitineraries"
  },
  {
    type: "PACKAGE_ITINERARY_CARDS",
    title: "VISA-ON-ARRIVAL",
    color: "",
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
    color: "",
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
    color: "",
    items: [
      {
        bgColor: "rgba(0,0,0,1)",
        blogText: "10 amazing things to do in Europe.",
        type: "blog",
        deepLinking: {
          link: "https://pickyourtrail.com/blog"
        }
      },
      {
        bgColor: "rgba(0,0,0,1)",
        blogText: "5 essential things to know about Dubai.",
        type: "blog",
        deepLinking: {
          link: "https://pickyourtrail.com/blog"
        }
      },
      {
        bgColor: "rgba(0,0,0,1)",
        blogText: "A local's guide to experience Turkey.",
        type: "guide",
        deepLinking: {
          link: "https://pickyourtrail.com/blog"
        }
      }
    ]
  }
];
