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
        imageUrl: "",
        deepLinking: {
          link: "ListingPage",
          screenData: {}
        }
      },
      {
        type: "MALDIVES_CARD",
        imageUrl: "",
        deepLinking: {
          link: "ListingPage",
          screenData: {}
        }
      },
      {
        type: "ITALY_CARD",
        imageUrl: "",
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
    apiUrl: "api/userprofile/country"
  },
  {
    type: "ITINERARY_CARDS",
    title: "Pocket-friendly destinations",
    color: "rgba(0,0,0,1)",
    subTitle: "Holidays that are budgeted for the best",
    apiUrl: "api/packages",
    httpMethod: "POST",
    requestPayload: {
      key: "packages",
      budgets: ["0_50000"],
      testimonials: 10,
      limit: 50,
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
        imageUrl: "",
        text: "All inclusive offers starting from",
        cost: "75000",
        deepLinking: {
          link: "ListingPage",
          screenData: {}
        }
      },
      {
        type: "AUSTRALIA",
        imageUrl: "",
        text: "The best trips #DownUnder",
        cost: "1,45,000",
        deepLinking: {
          link: "ListingPage",
          screenData: {}
        }
      },
      {
        type: "BEACH",
        imageUrl: "",
        text: "Exclusive for Beach Bums",
        cost: "45,500",
        deepLinking: {
          link: "ListingPage",
          screenData: {}
        }
      }
    ]
  },
  {
    type: "ITINERARY_CARDS",
    title: "On-going holidays",
    color: "rgba(0,0,0,1)",
    subTitle: "Check out where our other travellers are!",
    httpMethod: "GET",
    apiUrl: "api/itinerary/ongoingitineraries"
  },
  {
    type: "ITINERARY_CARDS",
    title: "VISA-ON-ARRIVAL",
    color: "",
    subTitle: "Pick, Pack and Gooo",
    apiUrl: "api/packages",
    httpMethod: "POST",
    requestPayload: {
      key: "visa-on-arrival-packages",
      testimonials: 10,
      limit: 50,
      journalTestimonials: false
    }
  },
  {
    type: "ITINERARY_CARDS",
    title: "For the love birds",
    color: "",
    subTitle: "Create memories of a lifetime.",
    apiUrl: "/api/packages",
    httpMethod: "POST",
    requestPayload: {
      key: "honeymoon-packages",
      testimonials: 10,
      limit: 50,
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
        bgColor: "",
        blogText: "10 amazing things to do in Europe.",
        deepLinking: {
          link: "https://pickyourtrail.com/blog"
        }
      },
      {
        bgColor: "",
        blogText: "5 essential things to know about Dubai.",
        deepLinking: {
          link: "https://pickyourtrail.com/blog"
        }
      },
      {
        bgColor: "",
        blogText: "A local's guide to experience Turkey.",
        deepLinking: {
          link: "https://pickyourtrail.com/blog"
        }
      }
    ]
  }
];
