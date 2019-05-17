import React from "react";
import { storiesOf } from "@storybook/react-native";
import PayNowCard from "../../Screens/PaymentSummaryScreen/Components/PayNowCard";
import PaymentInfoText from "../../Screens/PaymentSummaryScreen/Components/PaymentInfoText";
import CompletedPaymentCard from "../../Screens/PaymentSummaryScreen/Components/CompletedPayments/Components/CompletedPaymentCard";
import PlatoPaymentsCard from "../../Screens/PaymentSummaryScreen/Components/UpcomingPayments/Components/PlatoPaymentsCard";

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
  })
  .add("Completed Payment Card", () => {
    const props = {
      date: "25/07/2019",
      referenceId: "PYT421531194",
      mode: "Paid by Netbanking",
      amount: "₹ 10,04,521",
      action: () => null
    };
    console.log(props);
    return <CompletedPaymentCard {...props} />;
  })
  .add("Plato Payments Card", () => {
    const props = {
      payments: [
        {
          amount: "₹ 15,454.00",
          dueBy: "May 20, 2019"
        },
        {
          amount: "₹ 45,673.00",
          dueBy: "Jun 20, 2019"
        },
        {
          amount: "₹ 54,525.00",
          dueBy: "Jul 20, 2019"
        },
        {
          amount: "₹ 15,445.00",
          dueBy: "Aug 20, 2019"
        }
      ]
    };
    console.log(props);
    return <PlatoPaymentsCard {...props} />;
  })
  .add("Plato Payments Card Expired", () => {
    const props = {
      payments: [
        {
          amount: "₹ 15,454.00",
          dueBy: "May 20, 2019",
          isExpired: true,
          action: () => null
        },
        {
          amount: "₹ 45,673.00",
          dueBy: "Jun 20, 2019"
        },
        {
          amount: "₹ 54,525.00",
          dueBy: "Jul 20, 2019"
        },
        {
          amount: "₹ 15,445.00",
          dueBy: "Aug 20, 2019"
        }
      ]
    };
    console.log(props);
    return <PlatoPaymentsCard {...props} />;
  });
