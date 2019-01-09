import React from "react";
import { storiesOf } from "@storybook/react-native";
import { View } from "react-native";
import WidgetTitle from "../../Screens/TripFeedScreen/Components/WidgetTitle/WidgetTitle";
import ToolTip from "../../Screens/TripFeedScreen/Components/ToolTip/ToolTip";
import constants from "../../constants/constants";
import TripView from "../../Screens/TripFeedScreen/Components/TripView/TripView";
import TripViewLite from "../../Screens/TripFeedScreen/Components/TripViewLite/TripViewLite";
import TripFeedCarousel from "../../Screens/TripFeedScreen/Components/TripFeedCarousel/TripFeedCarousel";
import InfoCard from "../../Screens/TripFeedScreen/Components/InfoCard/InfoCard";
import NotificationCard from "../../Screens/TripFeedScreen/Components/NotificationCard/NotificationCard";
import FeedBackSwiper from "../../Screens/TripFeedScreen/Components/FeedBackSwiper/FeedBackSwiper";
import BigImageCard from "../../Screens/TripFeedScreen/Components/BigImageCard/BigImageCard";
import DayAhead from "../../Screens/TripFeedScreen/Components/DayAhead/DayAhead";
import SimpleButton from "../../CommonComponents/SimpleButton/SimpleButton";
import InfoCardModal from "../../Screens/TripFeedScreen/Components/InfoCardModal/InfoCardModal";
import { inject, observer } from "mobx-react/custom";

const tripData = [
  {
    cityName: "Chennai",
    icon: "flight",
    period: "May 14-15",
    link: "",
    image: {
      uri:
        "https://www.larousse.fr/encyclopedie/data/images/1314562-Barcelone.jpg"
    },
    transferId: "",
    date: ""
  },
  {
    cityName: "Barcelona",
    icon: "car",
    period: "May 17-18",
    link: "",
    image: {
      uri:
        "https://www.larousse.fr/encyclopedie/data/images/1314562-Barcelone.jpg"
    },
    transferId: "",
    date: ""
  },
  {
    cityName: "Sevilla",
    icon: "bus",
    period: "May 17",
    link: "",
    image: {
      uri:
        "https://www.larousse.fr/encyclopedie/data/images/1314562-Barcelone.jpg"
    },
    transferId: "",
    date: ""
  },
  {
    cityName: "Sevilla",
    icon: "train",
    period: "May 17",
    link: "",
    image: {
      uri:
        "https://www.larousse.fr/encyclopedie/data/images/1314562-Barcelone.jpg"
    },
    transferId: "",
    date: ""
  },
  {
    cityName: "Sevilla",
    icon: "ferry",
    period: "May 18",
    link: "",
    image: {
      uri:
        "https://www.larousse.fr/encyclopedie/data/images/1314562-Barcelone.jpg"
    },
    transferId: "",
    date: ""
  },
  {
    cityName: "Sevilla",
    icon: "flight",
    period: "May19",
    link: "",
    image: {
      uri:
        "https://www.larousse.fr/encyclopedie/data/images/1314562-Barcelone.jpg"
    },
    transferId: "",
    date: ""
  }
];

const carousel = {
  title: "Trip HighLights",
  elements: [
    {
      title: "Barcelona",
      image: {
        uri:
          "https://www.larousse.fr/encyclopedie/data/images/1314562-Barcelone.jpg"
      },
      link: ""
    },
    {
      title: "Barcelona",
      image: {
        uri:
          "https://www.larousse.fr/encyclopedie/data/images/1314562-Barcelone.jpg"
      },
      link: ""
    },
    {
      title: "Barcelona",
      image: {
        uri:
          "https://www.larousse.fr/encyclopedie/data/images/1314562-Barcelone.jpg"
      },
      link: ""
    },
    {
      title: "Barcelona",
      image: {
        uri:
          "https://www.larousse.fr/encyclopedie/data/images/1314562-Barcelone.jpg"
      },
      link: ""
    }
  ]
};

const infoData = {
  title: "Royal plaza Eaplanade",
  content:
    "30 minutes from the Airport by car. Your transfer will be waiting for you outside the arrival hall.",
  image: {
    uri:
      "https://www.larousse.fr/encyclopedie/data/images/1314562-Barcelone.jpg"
  },
  link: ""
};

const notifyData = [
  {
    title: "Heads up!",
    message: "Your pick up is scheduled at 8:30am from your hotel lobby.",
    link: "",
    type: "info",
    modalData: {}
  },
  {
    title: "Heads up!",
    message: "Your pick up is scheduled at 8:30am from your hotel lobby.",
    link: "",
    type: "alert",
    modalData: {}
  }
];

const bigImageData = {
  title: "Memories from Samantha’s family vacation in July '18",
  type: "JOURNAL",
  image: {
    uri:
      "https://www.larousse.fr/encyclopedie/data/images/1314562-Barcelone.jpg"
  },
  link: "",
  icon: constants.starActive,
  iconText: 234,
  gradient: constants.thirdColorAlpha
};

const modalData = {
  image: {
    uri:
      "https://media.istockphoto.com/vectors/colorful-welcome-word-vector-id645958690?k=6&m=645958690&s=612x612&w=0&h=CetH7H2_vmRKvvJ7NLK96glVvj49QT3Z5s1ifR1eLr4="
  },
  title: "What makes this app amazing?",
  content:
    "This app is packed with tons of content to help you throughout your vacation. If you need more, feel free to contact our live travel support!",
  bulletedList: [
    "Experience live concierge 24 hours prior to your travel",
    "Download links to your trip vouchers and other docs",
    "Regular travel updates on upcoming activities",
    "Handy tools to back you up during your travel"
  ],
  cta: "Awesome, got it!"
};

const InfoCardModalWrapper = inject("tripFeedStore")(
  observer(({ tripFeedStore, props }) => {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <SimpleButton
          text={"Open Modal"}
          action={() => tripFeedStore.openInfoCardModal(props)}
          textColor={"white"}
        />
        <InfoCardModal
          isVisible={tripFeedStore.infoCardModal.isVisible}
          {...tripFeedStore.infoCardModal.modalData}
          onClose={tripFeedStore.closeInfoCardModal}
        />
      </View>
    );
  })
);

storiesOf("Trip Feed Widgets", module)
  .add("widget title", () => {
    const props = {
      title: `This is a widget's title...`
    };
    console.log(props);
    return <WidgetTitle {...props} />;
  })
  .add("Tool Tip default", () => {
    const props = {
      title: "All aboard?",
      text:
        "Invite your buddies. Everyone invited gets access to the vouchers and itinerary."
    };
    console.log(props);
    return <ToolTip {...props} />;
  })
  .add("Tool Tip with action cta default", () => {
    const props = {
      title: "All aboard?",
      text:
        "Invite your buddies. Everyone invited gets access to the vouchers and itinerary.",
      options: [
        {
          title: "All abroad?",
          link: ""
        }
      ]
    };
    console.log(props);
    return <ToolTip {...props} />;
  })
  .add("Tool Tip with action cta multiple lines", () => {
    const props = {
      title: "All aboard?",
      text:
        "Invite your buddies. Everyone invited gets access to the vouchers and itinerary.",
      options: [
        {
          title: "All abroad?",
          text: "click here!",
          link: ""
        }
      ]
    };
    console.log(props);
    return <ToolTip {...props} />;
  })
  .add("Tool Tip with action cta custom color", () => {
    const props = {
      title: "All aboard?",
      text:
        "Invite your buddies. Everyone invited gets access to the vouchers and itinerary.",
      options: [
        {
          title: "All abroad?",
          link: "",
          color: constants.firstColor
        }
      ]
    };
    console.log(props);
    return <ToolTip {...props} />;
  })
  .add("Tool Tip with icon left", () => {
    const props = {
      imageFirst: true,
      image: constants.infoBoxIllus,
      title: "All aboard?",
      text:
        "Invite your buddies. Everyone invited gets access to the vouchers and itinerary.",
      options: [
        {
          title: "All abroad?",
          link: "",
          color: constants.firstColor
        }
      ]
    };
    console.log(props);
    return <ToolTip {...props} />;
  })
  .add("Tool Tip with icon right", () => {
    const props = {
      image: constants.infoBoxIllus,
      title: "All aboard?",
      text:
        "Invite your buddies. Everyone invited gets access to the vouchers and itinerary.",
      options: [
        {
          title: "All abroad?",
          link: "",
          color: constants.firstColor
        }
      ]
    };
    console.log(props);
    return <ToolTip {...props} />;
  })
  .add("Tool Tip with multiple action cta", () => {
    const props = {
      title: "All aboard?",
      text:
        "Invite your buddies. Everyone invited gets access to the vouchers and itinerary.",
      image: constants.infoBoxIllus,
      options: [
        {
          title: "Etihad A234",
          text: "Mar 23, Thu",
          link: ""
        },
        {
          title: "Etihad A234",
          text: "Mar 23, Thu",
          link: ""
        },
        {
          title: "Yep, all done!",
          link: "",
          color: constants.firstColor
        }
      ]
    };
    console.log(props);
    return <ToolTip {...props} />;
  })
  .add("Trip View default", () => {
    const props = { data: tripData };
    console.log(props);
    return <TripView {...props} />;
  })
  .add("Trip View with title", () => {
    const props = { title: "Trip Summary", data: tripData };
    console.log(props);
    return <TripView {...props} />;
  })
  .add("Trip View Lite", () => {
    const props = { data: tripData };
    console.log(props);
    return <TripViewLite {...props} />;
  })
  .add("Carousel default", () => {
    const props = {
      title: carousel.title,
      elements: carousel.elements
    };
    console.log(props);
    return <TripFeedCarousel {...props} />;
  })
  .add("Carousel with custom gradient color", () => {
    const props = {
      title: carousel.title,
      elements: carousel.elements.map(item => {
        return {
          ...item,
          gradientColor: constants.firstColor
        };
      })
    };
    console.log(props);
    return <TripFeedCarousel {...props} />;
  })
  .add("Carousel without title", () => {
    const props = {
      elements: carousel.elements
    };
    console.log(props);
    return <TripFeedCarousel {...props} />;
  })
  .add("Carousel with backdrop", () => {
    const props = {
      title: "Trip HighLights",
      elements: carousel.elements,
      backdrop: true
    };
    console.log(props);
    return <TripFeedCarousel {...props} />;
  })
  .add("Carousel with custom backdrop color", () => {
    const props = {
      title: "Trip HighLights",
      elements: carousel.elements.map(item => {
        return {
          ...item,
          backdropColor: constants.thirdColor
        };
      }),
      backdrop: true
    };
    console.log(props);
    return <TripFeedCarousel {...props} />;
  })
  .add("Info card default", () => {
    const props = infoData;
    console.log(props);
    return <InfoCard {...props} />;
  })
  .add("Info card with no Image", () => {
    const props = {
      title: infoData.title,
      content: infoData.content,
      link: infoData.link
    };
    console.log(props);
    return <InfoCard {...props} />;
  })
  .add("Notification Card Info default", () => {
    const props = {
      data: [notifyData[0]],
      toggleScrollLock: () => null
    };
    console.log(props);
    return <NotificationCard {...props} />;
  })
  .add("Notification Card Info dismissable", () => {
    const props = {
      data: [notifyData[0]],
      canDismiss: true,
      toggleScrollLock: () => null
    };
    console.log(props);
    return <NotificationCard {...props} />;
  })
  .add("Notification Card Info with cta", () => {
    const props = {
      data: [
        {
          ...notifyData[0],
          actionText: "Learn More"
        }
      ],
      toggleScrollLock: () => null
    };
    console.log(props);
    return <NotificationCard {...props} />;
  })
  .add("Notification Card Alert default", () => {
    const props = {
      data: [notifyData[1]],
      toggleScrollLock: () => null
    };
    console.log(props);
    return <NotificationCard {...props} />;
  })
  .add("Notification Card Alert dismissable", () => {
    const props = {
      data: [notifyData[1]],
      canDismiss: true,
      toggleScrollLock: () => null
    };
    console.log(props);
    return <NotificationCard {...props} />;
  })
  .add("Notification Card Alert with cta", () => {
    const props = {
      data: [
        {
          ...notifyData[1],
          actionText: "Learn More"
        }
      ],
      toggleScrollLock: () => null
    };
    console.log(props);
    return <NotificationCard {...props} />;
  })
  .add("Big Image card default", () => {
    const props = {
      title: bigImageData.title,
      image: bigImageData.image
    };
    console.log(props);
    return <BigImageCard {...props} />;
  })
  .add("Big Image card with type", () => {
    const props = {
      title: bigImageData.title,
      type: bigImageData.type,
      image: bigImageData.image
    };
    console.log(props);
    return <BigImageCard {...props} />;
  })
  .add("Big Image card with icon", () => {
    const props = {
      title: bigImageData.title,
      type: bigImageData.type,
      image: bigImageData.image,
      icon: bigImageData.icon
    };
    console.log(props);
    return <BigImageCard {...props} />;
  })
  .add("Big Image card with icon text", () => {
    const props = {
      title: bigImageData.title,
      type: bigImageData.type,
      image: bigImageData.image,
      icon: bigImageData.icon
    };
    console.log(props);
    return <BigImageCard {...props} />;
  })
  .add("Big Image card with custom gradient color", () => {
    const props = {
      title: bigImageData.title,
      type: bigImageData.type,
      image: bigImageData.image,
      icon: bigImageData.icon,
      gradient: bigImageData.gradient
    };
    console.log(props);
    return <BigImageCard {...props} />;
  })
  .add("Feedback swiper", () => {
    const props = {
      toggleScrollLock: () => null
    };
    console.log(props);
    return <FeedBackSwiper {...props} />;
  })
  .add("Info Card Modal default", () => {
    const props = modalData;
    console.log(props);
    return <InfoCardModalWrapper props={props} />;
  })
  .add("Info Card Modal with only List", () => {
    const props = { ...modalData };
    delete props["content"];
    console.log(props);
    return <InfoCardModalWrapper props={props} />;
  })
  .add("Info Card Modal with only Content", () => {
    const props = { ...modalData };
    delete props["bulletedList"];
    console.log(props);
    return <InfoCardModalWrapper props={props} />;
  })
  .add("Info Card Modal with no image", () => {
    const props = { ...modalData };
    delete props["image"];
    console.log(props);
    return <InfoCardModalWrapper props={props} />;
  })
  .add("The Day Ahead", () => {
    const props = {};
    console.log(props);
    return <DayAhead {...props} />;
  });
