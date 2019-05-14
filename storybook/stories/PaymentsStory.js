import React from "react";
import { storiesOf } from "@storybook/react-native";
import PayNowCard from "../../Screens/PaymentSummaryScreen/Components/PayNowCard";
import PaymentInfoText from "../../Screens/PaymentSummaryScreen/Components/PaymentInfoText";

storiesOf("Payments Story", module)
  .add("Pay Now Card", () => {
    const props = {
      cardInfo: [
        {
          title: "First Installment",
          text: "₹ 45,230"
        },
        {
          title: "Due by",
          text: "Jun 20"
        }
      ],
      actionText: "Pay Now",
      action: () => null
    };
    console.log(props);
    return <PayNowCard {...props} />;
  })
  .add("Pay Now minimized", () => {
    const props = {
      cardInfo: [
        {
          title: "First Installment",
          text: "₹ 45,230"
        }
      ],
      action: () => null
    };
    console.log(props);
    return <PayNowCard {...props} />;
  })
  .add("Payment Info Text", () => {
    const props = {};
    console.log(props);
    return (
      <PaymentInfoText
        title={"Complete 25% of trip cost"}
        text={"₹ 15,14,230"}
      />
    );
  });
