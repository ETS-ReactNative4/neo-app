import React from "react";
import { storiesOf } from "@storybook/react-native";
import VisaWelcomeMessage from "../../Screens/VisaScreen/Components/VisaWelcomeMessage";
import VisaClickableTile from "../../Screens/VisaScreen/Components/VisaClickableTile";
import constants from "../../constants/constants";
import VisaWindowStatusWidget from "../../Screens/VisaScreen/Components/VisaWindowStatusWidget";
import VisaOnArrivalWidget from "../../Screens/VisaScreen/Components/VisaOnArrivalWidget";
import VisaCompanionInfo from "../../Screens/VisaScreen/Components/VisaCompanionInfo";
import VisaChecklistTile from "../../Screens/VisaScreen/Components/VisaChecklistTile";
import { LayoutAnimation } from "react-native";
import VisaStagesCard from "../../Screens/VisaScreen/Components/VisaStagesCard";
import PropTypes from "prop-types";
import VisaInfoCard from "../../Screens/VisaScreen/Components/VisaInfoCard";

const userDetails = {
  name: "John",
  message: "Stay updated on your visa applications",
  numOfPax: 4,
  date: "12 July, 2019"
};

const countrySelectorData = {
  title: "Switzerland, Germany",
  subTitle: "& 2 more",
  infoText: "Schengen Visa - Initial call stage",
  longInfoText:
    "Passport, Visa application form, Round-trip air ticket, Proof of financial means, 4x6cm photograph",
  hasUnread: false
};

const visaWelcomeData = {
  welcomeText: "Your visa application window opens on",
  dateText: "Jul 30, 2019",
  count: 24,
  countText: "days left",
  fillPercentage: 75
};

const visaOnArrivalData = {
  title: "Get visa at Ngurah Rai Internation Airport",
  info: "You don’t have to apply for visa now. This is visa on-arrival."
};

const visaCompanionData = {
  profilePicUrl:
    "http://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/people19.png",
  title: "Your Visa Companion",
  name: "Sunil Dhandapani",
  tag: "VISA PRO",
  phoneNumber: "1999999999"
};

const visaChecklistData = {
  title: "Aadhar Card",
  desc:
    "Aadhaar is a 12-digit unique identity number that can be obtained voluntarily by residents of India, based on their biometric",
  ctaText: "Download Sample",
  downloadUrl: "http://www.africau.edu/images/default/sample.pdf"
};

const visaStagesCardData = {
  title: "Visa Application Stages",
  stages: [
    {
      stageText: "Initial Call",
      dateText: "Jul 30, 2019"
    },
    {
      stageText: "Documentation",
      dateText: "Aug 04, 2019"
    },
    {
      stageText: "Final Status",
      dateText: "Aug 29, 2019"
    }
  ]
};

const visaInfoCardData = {
  label: "Visa Type",
  visaType: "Visa on arrival",
  shortText:
    "The Indonesian visa can be obtained on arrival. All you have to do is send in scanned copies of your documents and we’ll do the rest."
};

class ChecklistComponent extends React.Component {
  static propTypes = {
    hideLink: PropTypes.bool
  };

  state = {
    isChecked: false,
    isExpanded: true
  };

  toggleSelection = () => {
    this.setState({
      isChecked: !this.state.isChecked
    });
  };

  toggleExpansion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      isExpanded: !this.state.isExpanded
    });
  };

  render() {
    const props = { ...visaChecklistData };
    if (this.props.hideLink) {
      delete props["ctaText"];
    }
    return (
      <VisaChecklistTile
        {...props}
        onToggleExpand={this.toggleExpansion}
        onToggleSelection={this.toggleSelection}
        isChecked={this.state.isChecked}
        isExpanded={this.state.isExpanded}
      />
    );
  }
}

storiesOf("Visa Story", module)
  .add("Welcome message", () => {
    const props = userDetails;
    console.log(props);
    return <VisaWelcomeMessage {...props} />;
  })
  .add("Visa Clickable Tile", () => {
    const props = { ...countrySelectorData };
    console.log(props);
    return <VisaClickableTile {...props} />;
  })
  .add("Visa Clickable Tile with notifications", () => {
    const props = { ...countrySelectorData, hasUnread: true };
    console.log(props);
    return <VisaClickableTile {...props} />;
  })
  .add("Visa Clickable Tile with icon", () => {
    const props = {
      ...countrySelectorData,
      tileIcon: constants.activityIcon,
      titleColor: constants.firstColor
    };
    delete props.subTitle;
    console.log(props);
    return <VisaClickableTile {...props} />;
  })
  .add("Visa Clickable Tile with icon & long text", () => {
    const props = {
      ...countrySelectorData,
      infoText: countrySelectorData.longInfoText,
      tileIcon: constants.activityIcon,
      titleColor: constants.firstColor
    };
    delete props.subTitle;
    console.log(props);
    return <VisaClickableTile {...props} />;
  })
  .add("Visa Window Status", () => {
    const props = { ...visaWelcomeData };
    console.log(props);
    return <VisaWindowStatusWidget {...props} />;
  })
  .add("Visa On Arrival Widget", () => {
    const props = { ...visaOnArrivalData };
    console.log(props);
    return <VisaOnArrivalWidget {...props} />;
  })
  .add("Visa Companion Info", () => {
    const props = { ...visaCompanionData };
    console.log(props);
    return <VisaCompanionInfo {...props} />;
  })
  .add("Visa Checklist Tile", () => {
    return <ChecklistComponent hideLink={true} />;
  })
  .add("Visa Checklist Tile with link", () => {
    return <ChecklistComponent />;
  })
  .add("Visa Stages Card", () => {
    const props = { ...visaStagesCardData };
    console.log(props);
    return <VisaStagesCard {...props} />;
  })
  .add("Visa Info Card", () => {
    const props = { ...visaInfoCardData };
    console.log(props);
    return <VisaInfoCard {...props} />;
  });
