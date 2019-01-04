import React from "react";
import { storiesOf } from "@storybook/react-native";
import WidgetTitle from "../../Screens/TripFeedScreen/Components/WidgetTitle/WidgetTitle";
import ToolTip from "../../Screens/TripFeedScreen/Components/ToolTip/ToolTip";
import constants from "../../constants/constants";
import TripView from "../../Screens/TripFeedScreen/Components/TripView/TripView";
import TripViewLite from "../../Screens/TripFeedScreen/Components/TripViewLite/TripViewLite";
import TripFeedCarousel from "../../Screens/TripFeedScreen/Components/TripFeedCarousel/TripFeedCarousel";

const tripData = [
  {
    title: "Chennai",
    icon: "FLIGHT",
    period: "May 14-15",
    action: () => {},
    image: {
      uri:
        "https://www.larousse.fr/encyclopedie/data/images/1314562-Barcelone.jpg"
    }
  },
  {
    title: "Barcelona",
    icon: "FLIGHT",
    period: "May 17-18",
    action: () => {},
    image: {
      uri:
        "https://www.larousse.fr/encyclopedie/data/images/1314562-Barcelone.jpg"
    }
  },
  {
    title: "Sevilla",
    icon: "CAR",
    period: "May 17",
    action: () => {},
    image: {
      uri:
        "https://www.larousse.fr/encyclopedie/data/images/1314562-Barcelone.jpg"
    }
  },
  {
    title: "Sevilla",
    icon: "TRAIN",
    period: "May 17",
    action: () => {},
    image: {
      uri:
        "https://www.larousse.fr/encyclopedie/data/images/1314562-Barcelone.jpg"
    }
  },
  {
    title: "Sevilla",
    icon: "FERRY",
    period: "May 18",
    action: () => {},
    image: {
      uri:
        "https://www.larousse.fr/encyclopedie/data/images/1314562-Barcelone.jpg"
    }
  },
  {
    title: "Sevilla",
    icon: "BUS",
    period: "May19",
    action: () => {},
    image: {
      uri:
        "https://www.larousse.fr/encyclopedie/data/images/1314562-Barcelone.jpg"
    }
  }
];

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
          action: () => null
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
          action: () => null
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
          action: () => null,
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
      imageSrc: constants.infoBoxIllus,
      title: "All aboard?",
      text:
        "Invite your buddies. Everyone invited gets access to the vouchers and itinerary.",
      options: [
        {
          title: "All abroad?",
          action: () => null,
          color: constants.firstColor
        }
      ]
    };
    console.log(props);
    return <ToolTip {...props} />;
  })
  .add("Tool Tip with icon right", () => {
    const props = {
      imageSrc: constants.infoBoxIllus,
      title: "All aboard?",
      text:
        "Invite your buddies. Everyone invited gets access to the vouchers and itinerary.",
      options: [
        {
          title: "All abroad?",
          action: () => null,
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
      imageSrc: constants.infoBoxIllus,
      options: [
        {
          title: "Etihad A234",
          text: "Mar 23, Thu",
          action: () => null
        },
        {
          title: "Etihad A234",
          text: "Mar 23, Thu",
          action: () => null
        },
        {
          title: "Yep, all done!",
          action: () => null,
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
  .add("Trip View Lite", () => {
    const props = { data: tripData };
    console.log(props);
    return <TripViewLite {...props} />;
  })
  .add("Carousel default", () => {
    const props = {
      title: "Trip HighLights",
      data: tripData
    };
    console.log(props);
    return <TripFeedCarousel {...props} />;
  })
  .add("Carousel with backdrop", () => {
    const props = {
      title: "Trip HighLights",
      data: tripData,
      hasBackdrop: true
    };
    console.log(props);
    return <TripFeedCarousel {...props} />;
  });
