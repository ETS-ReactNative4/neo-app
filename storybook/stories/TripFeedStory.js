import React from "react";
import { storiesOf } from "@storybook/react-native";
import WidgetTitle from "../../Screens/TripFeedScreen/Components/WidgetTitle/WidgetTitle";
import ToolTip from "../../Screens/TripFeedScreen/Components/ToolTip/ToolTip";
import constants from "../../constants/constants";

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
  .add("carousal widget", () => {
    return null;
  });
