import React, { useState } from "react";
import { storiesOf } from "@storybook/react-native";
import HelpSectionTile from "../../Screens/SupportCenterScreen/Components/HelpSectionTile";
import constants from "../../constants/constants";
import HelpDeskCategories from "../../Screens/SupportCenterScreen/Components/HelpDeskCategories";
import FaqAccordionTile from "../../Screens/SupportCenterScreen/Components/FaqAccordionTile";
import FaqAccordionList from "../../Screens/SupportCenterScreen/Components/FaqAccordionList";
import MessageInput from "../../Screens/SupportCenterScreen/Components/MessageInput";
import SupportTopBar from "../../Screens/SupportCenterScreen/Components/SupportTopBar";
import MessageBlob from "../../Screens/SupportCenterScreen/Components/MessageBlob";

const helpDeskSectionTitle = "Categories";

const helpDeskOptions = [
  {
    icon: constants.busIcon,
    title: "Payment Related",
    action: () => null
  },
  {
    icon: constants.busIcon,
    title: "Visa Related",
    action: () => null
  },
  {
    icon: constants.busIcon,
    title: "Itinerary Related",
    action: () => null
  },
  {
    icon: constants.busIcon,
    title: "Vouchers",
    action: () => null
  }
];

const faqAccordionData = [
  {
    title: "What’s my payment schedule?",
    content: `<p>Get in touch with our Finance team on <a href="mailto:financeteam@pickyourtrail.com?Subject=Hello%20again">PYT</a>. They‘ll be able to help you out on how to make the payment.</p>`
  },
  {
    title: "What’s my payment schedule?",
    content: `<p>Get in touch with our Finance team on <a href="mailto:financeteam@pickyourtrail.com?Subject=Hello%20again">PYT</a>. They‘ll be able to help you out on how to make the payment.</p>`
  },
  {
    title: "What’s my payment schedule?",
    content: `<p>Get in touch with our Finance team on <a href="mailto:financeteam@pickyourtrail.com?Subject=Hello%20again">PYT</a>. They‘ll be able to help you out on how to make the payment.</p>`
  },
  {
    title: "What’s my payment schedule?",
    content: `<p>Get in touch with our Finance team on <a href="mailto:financeteam@pickyourtrail.com?Subject=Hello%20again">PYT</a>. They‘ll be able to help you out on how to make the payment.</p>`
  },
  {
    title: "What’s my payment schedule?",
    content: `<p>Get in touch with our Finance team on <a href="mailto:financeteam@pickyourtrail.com?Subject=Hello%20again">PYT</a>. They‘ll be able to help you out on how to make the payment.</p>`
  }
];

const messageData = {
  name: "Adam",
  message:
    "I transferred the money but it’s not updated in the profile. Can you please check and help me out with this?",
  time: "5:00 PM - Jul 12"
};

const HandleMessageInput = ({ selectionInputMode = false }) => {
  const label = selectionInputMode ? "Select Category" : "Message Us",
    textPlaceholder = "Type here...";
  const [inputText, setInputText] = useState("");
  const [selectedOption, setSelectedOption] = useState("Select an option...");
  const [isSelectionMode, setSelectionMode] = useState(selectionInputMode);

  const options = [
    {
      label: "Payment Related",
      value: "Payment Related"
    },
    {
      label: "Booking Related",
      value: "Booking Related"
    },
    {
      label: "Voucher Related",
      value: "Voucher Related"
    },
    {
      label: "Sales Related",
      value: "Sales Related"
    },
    {
      label: "Others",
      value: "Others"
    }
  ];

  const onChangeText = text => setInputText(text);

  const onOptionsChange = option => {
    if (option === "Others") {
      setSelectionMode(false);
    }
    setSelectedOption(option);
  };

  const props = {
    label,
    textPlaceholder,
    text: inputText,
    onChangeText,
    isSelectionMode,
    options,
    selectedOption,
    onOptionsChange
  };
  console.log(props);

  return <MessageInput {...props} />;
};

storiesOf("Help Desk Story", module)
  .add("Help Section Tile", () => {
    const props = helpDeskOptions[0];
    console.log(props);
    return <HelpSectionTile {...props} />;
  })
  .add("Help Section Group", () => {
    const props = {
      categories: helpDeskOptions,
      categoryTitle: helpDeskSectionTitle
    };
    return <HelpDeskCategories {...props} />;
  })
  .add("Help Section Group without title", () => {
    const props = {
      categories: helpDeskOptions
    };
    return <HelpDeskCategories {...props} />;
  })
  .add("Faq Accordion Tile", () => {
    const props = {
      ...faqAccordionData[0]
    };
    return <FaqAccordionTile {...props} />;
  })
  .add("Faq Accordion List", () => {
    const props = {
      faqSections: faqAccordionData
    };
    console.log(props);
    return <FaqAccordionList {...props} />;
  })
  .add("Faq Accordion List with action cta", () => {
    const props = {
      supportCta: "VIEW STATUS",
      supportAction: () => null,
      faqSections: faqAccordionData
    };
    console.log(props);
    return <FaqAccordionList {...props} />;
  })
  .add("Message Input", () => {
    const props = {};
    return <HandleMessageInput {...props} />;
  })
  .add("Message Input", () => {
    const props = {
      selectionInputMode: true
    };
    return <HandleMessageInput {...props} />;
  })
  .add("Top Info Bar", () => {
    const props = {
      text:
        "Live chat will be enabled 3 days prior to your trip. Till then you can always message us. ",
      ctaText: "Message Us",
      ctaAction: () => null,
      nextAction: () => null
    };
    return <SupportTopBar {...props} />;
  })
  .add("User Message Blob", () => {
    const props = {
      ...messageData,
      isAdmin: false
    };
    return <MessageBlob {...props} />;
  })
  .add("Admin Message Blob", () => {
    const props = {
      ...messageData,
      isAdmin: true
    };
    return <MessageBlob {...props} />;
  });
