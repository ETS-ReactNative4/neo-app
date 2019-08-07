import React from "react";
import { storiesOf } from "@storybook/react-native";
import HelpSectionTile from "../../Screens/SupportCenterScreen/Components/HelpSectionTile";
import constants from "../../constants/constants";
import HelpDeskCategories from "../../Screens/SupportCenterScreen/Components/HelpDeskCategories";
import FaqAccordionTile from "../../Screens/SupportCenterScreen/Components/FaqAccordionTile";
import FaqAccordionList from "../../Screens/SupportCenterScreen/Components/FaqAccordionList";

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
  });
