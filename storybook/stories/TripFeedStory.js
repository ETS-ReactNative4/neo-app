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
    return <WidgetTitle title={`This is a widget's title...`} />;
  })
  .add("Tool Tip default", () => {
    return (
      <ToolTip
        title="All aboard?"
        text="Invite your buddies. Everyone invited gets access to the vouchers and itinerary."
        buttonText="Invite Contacts"
        action={() => null}
      />
    );
  })
  .add("Tool Tip with icon left", () => {
    return (
      <ToolTip
        imageFirst
        imageSrc={constants.infoBoxIllus}
        title="All aboard?"
        text="Invite your buddies. Everyone invited gets access to the vouchers and itinerary."
        buttonText="Invite Contacts"
        action={() => null}
      />
    );
  })
  .add("Tool Tip with icon right", () => {
    return (
      <ToolTip
        imageSrc={constants.infoBoxIllus}
        title="All aboard?"
        text="Invite your buddies. Everyone invited gets access to the vouchers and itinerary."
        buttonText="Invite Contacts"
        action={() => null}
      />
    );
  })
  .add("Tool Tip with multiple options", () => {
    return (
      <ToolTip
        title="All aboard?"
        text="Invite your buddies. Everyone invited gets access to the vouchers and itinerary."
        imageSrc={constants.infoBoxIllus}
        options={[
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
            action: () => null
          }
        ]}
      />
    );
  })
  .add("Trip View default", () => {
    return <TripView data={tripData} />;
  })
  .add("Trip View Lite", () => {
    return <TripViewLite data={tripData} />;
  })
  .add("Carousel default", () => {
    return <TripFeedCarousel title={"Trip HighLights"} data={tripData} />;
  })
  .add("Carousel with backdrop", () => {
    return (
      <TripFeedCarousel title={"Trip HighLights"} data={tripData} hasBackdrop />
    );
  });
