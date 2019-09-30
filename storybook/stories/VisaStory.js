import React, { useState } from "react";
import { storiesOf } from "@storybook/react-native";
import VisaWelcomeMessage from "../../Screens/VisaScreen/Components/VisaWelcomeMessage";
import VisaClickableTile from "../../Screens/VisaScreen/Components/VisaClickableTile";
import constants from "../../constants/constants";
import VisaWindowStatusWidget from "../../Screens/VisaScreen/Components/VisaWindowStatusWidget";
import VisaOnArrivalWidget from "../../Screens/VisaScreen/Components/VisaOnArrivalWidget";
import VisaCompanionInfo from "../../Screens/VisaScreen/Components/VisaCompanionInfo";
import VisaChecklistTile from "../../Screens/VisaScreen/Components/VisaChecklistTile";
import { LayoutAnimation, ScrollView } from "react-native";
import VisaStagesCard from "../../Screens/VisaScreen/Components/VisaStagesCard";
import PropTypes from "prop-types";
import VisaInfoCard from "../../Screens/VisaScreen/Components/VisaInfoCard/VisaInfoCard";
import DropDown from "../../CommonComponents/DropDown/DropDown";
import VisaStageHeader from "../../Screens/VisaScreen/Components/VisaInfoCard/Components/VisaStageHeader";
import VisaInfoSheet from "../../Screens/VisaScreen/Components/VisaInfoSheet";
import StickyActionBar from "../../Screens/VisaStatusScreen/Component/StickyActionBar";
import FabButton from "../../CommonComponents/FabButton/FabButton";
import VisaInfoWidget from "../../Screens/VisaScreen/Components/VisaInfoWidget";
import HelpDetailsBlock from "../../Screens/VisaHelpScreen/Components/HelpDetailsBlock";
import VisaRejectedActionBar from "../../Screens/VisaStatusScreen/Component/VisaRejectedActionBar";

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

const stickyActionBarData = {
  title: "Document Checklist",
  icon: constants.activityIcon,
  action: () => null,
  backgroundColor: constants.firstColor
};

const fabButtonData = {
  action: () => null,
  iconSize: 20,
  icon: constants.activityIcon,
  radius: 32
};

const helpQaData = {
  question: "<p>What is the visa process for Bali?</p>",
  answer:
    "<p>Bali provides Visa on arrival for all Indian citizens.Here are a few pointers to keep in mind for Bali’s visa process</p>"
};

const visaCardData = {
  isCardExpanded: true,
  isCardDisabled: false,
  title: "Initial Call",
  body: "Completed on Jul 30, 2019  |  1 Remark",
  color: constants.firstColor,
  stages: [
    {
      title: "Unassigned",
      body: "Visa appointment date",
      color: constants.secondColor,
      icon: constants.activityIcon,
      listCheckBox: [
        {
          text: "Cover Letter",
          color: constants.firstColor,
          icon: constants.activityIcon,
          notes: {
            title: "Courier the pending documents to",
            text:
              "No:59, Ground Floor, Vijaya Raghava Rd, Near Andhra Club, Parthasarathi Puram, T. Nagar, Chennai"
          }
        },
        {
          text: "Identification Proof",
          color: constants.secondColor,
          icon: constants.activityIcon,
          notes: {}
        },
        {
          text: "Financial Proofs",
          color: constants.thirdColor,
          notes: {}
        },
        {
          text: "Boarding Proofs",
          color: constants.thirdColor,
          icon: constants.busIcon,
          notes: {
            title: "Courier the pending documents to",
            text:
              "No:59, Ground Floor, Vijaya Raghava Rd, Near Andhra Club, Parthasarathi Puram, T. Nagar, Chennai"
          }
        }
      ]
    },
    {
      title: "Unassigned",
      body: "Visa appointment date",
      color: constants.secondColor,
      icon: constants.activityIcon,
      stageNotes:
        "No:59, Ground Floor, Vijaya Raghava Rd, Near Andhra Club, Parthasarathi Puram, T. Nagar, Chennai"
    }
  ],
  granted: {
    url: "mobile/visa/status",
    cta: "Granted",
    link: null
  },
  rejected: {
    url: "mobile/visa/status",
    cta: "Rejected",
    link: null
  },
  expedite: {
    url: null,
    cta: "Expedite",
    link:
      "mailto:les@ventureguitars.com?subject=Music%20Lessons&body=%2ADISCLAIMER%3A%20THIS%20IS%20JUST%20A%20TEMPLATE%2A%0A%0ATo%2C%0A%0AThe%20Visa%20officer%2C%0AEmbassy%20of%20%3CDestination%20name%3E%2C%0A%3CEmbassy%20location%3E%0A%0ADate%3A%3Cdate%3E%0A%0ASub%3A%20Request%20to%20expedite%20the%20visa%20process%20for%20%3Cdestination%20name%3E%0A%0ADear%20Sir%2FMadam%2C%0A%0AI%2FMy%20family%20and%20I%20had%20applied%20for%20%3Cdestination%20name%3E%20visa%20on%20%3Cdate%3E%20filed%20with%20VFS%20%3Coffice%20location%3E.%20Here%20are%20our%20application%20reference%20numbers%3A%0A%0APlease%20find%20below%20the%20passport%20numbers%20for%20all%2C%0A%28Name%20and%20Passport%20Number%29%0A%0AI%27ve%20been%20checking%20the%20status%20of%20the%20visa%20application%20on%20the%20VFS%20website%20and%20it%27s%20still%20in%20the%20%27Under%20Process%27%20stage.%20I%20also%20got%20in%20touch%20with%20officials%20in%20VFS%20%3COffice%20location%3E%20and%20was%20informed%20the%20same.%0A%0AIn%20this%20regard%2C%20I%20want%20to%20highlight%20that%20we%20are%20scheduled%20to%20travel%20to%20Italy%20on%2014%20March%202018.%20Further%2C%20the%20flight%20tickets%20from%20Delhi%20to%20Rome%2C%20Italy%20flight%20tickets%2C%20and%20hotel%20bookings%20have%20already%20been%20made.%20We%20are%20attaching%20the%20copy%20of%20the%20same%20for%20your%20reference.%20Having%20said%20that%2C%20if%20we%20are%20not%20able%20to%20travel%20to%20Italy%20%28as%20scheduled%29%2C%20it%20will%20result%20in%20a%20huge%20financial%20loss.%20Further%2C%20we%20will%20not%20be%20able%20to%20visit%20Italy%20for%20at%20least%20one%20year%20given%20the%20work%20schedule%2Fcommitments.%20Also%2C%20it%E2%80%99s%20our%20honeymoon%20trip%2C%20which%20also%20happens%20to%20be%20the%20first%20international%20trip%20for%20the%20two%20of%20us.%20We%20are%20very%20excited%20about%20the%20trip%20and%20we%27ve%20been%20planning%20it%20since%20our%20marriage.%20It%20would%20be%20very%20disappointing%20if%20the%20trip%20has%20to%20be%20cancelled%20on%20account%20of%20delay%20in%20the%20visa.%20May%20I%20request%20your%20immediate%20attention%20in%20the%20matter%2C%20so%20that%20the%20visa%20can%20be%20issued%20by%20the%20end%20of%20the%20day%2C%20basis%20which%20our%20further%20course%20of%20action%20can%20be%20planned.%20I%20would%20be%20obliged%20for%20your%20kind%20indulgence.%20Appreciate%20your%20good%20support.%0A%0A%0AMany%20Thanks%2C"
  }
};

class ChecklistComponent extends React.Component {
  static propTypes = {
    hideLink: PropTypes.bool,
    noBody: PropTypes.bool
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
    if (this.props.noBody) {
      delete props["desc"];
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

class DropDownComponent extends React.Component {
  state = {
    selectedValue: "option1",
    options: [
      {
        label: "option1",
        value: "option1"
      },
      {
        label: "option2",
        value: "option2"
      },
      {
        label: "option3",
        value: "option3"
      }
    ]
  };

  render() {
    return (
      <DropDown
        containerStyle={{ alignSelf: "center", paddingVertical: 16 }}
        dropDownOptions={this.state.options}
        selectedValue={this.state.selectedValue}
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
  .add("Visa Checklist Tile without body", () => {
    return <ChecklistComponent noBody={true} />;
  })
  .add("Visa Stages Card", () => {
    const props = { ...visaStagesCardData };
    console.log(props);
    return <VisaStagesCard {...props} />;
  })
  .add("Visa Info Card", () => {
    const props = { ...visaInfoCardData };
    console.log(props);
    return <VisaInfoWidget {...props} />;
  })
  .add("Visa Drop Down Options", () => {
    return <DropDownComponent />;
  })
  .add("Visa Card", () => {
    const props = {
      ...visaCardData
    };
    console.log(props);
    return (
      <ScrollView>
        <VisaInfoCard {...props} />
      </ScrollView>
    );
  })
  .add("Visa Card disabled", () => {
    const props = {
      isCardExpanded: true,
      isCardDisabled: true,
      title: "Initial Call",
      body: "Completed on Jul 30, 2019  |  1 Remark",
      color: constants.firstColor
    };
    console.log(props);
    return (
      <ScrollView>
        <VisaInfoCard {...props} />
      </ScrollView>
    );
  })
  .add("Visa Info Sheet", () => {
    const props = {
      title: "Documents must-knows",
      content: `<p><ul><li>Supporting documents for all applications should be scanned in high resolution and in color</li><li>No notarization (either self, agent or through a notary) required for any supporting document, including the passport</li><li>Scanned soft copy of documents are only required - Maximum size of each file/ attachment should not exceed 5 MB</li></ul></p>`
    };
    console.log(props);
    return <VisaInfoSheet {...props} />;
  })
  .add("Visa Info Sheet with Paragraphs", () => {
    const props = {
      title: "Documents must-knows",
      content: `<p>Supporting documents for all applications should be scanned in high resolution and in color</p><p>No notarization (either self, agent or through a notary) required for any supporting document, including the passport</p><p>Scanned soft copy of documents are only required - Maximum size of each file/ attachment should not exceed 5 MB</p>`
    };
    console.log(props);
    return <VisaInfoSheet {...props} />;
  })
  .add("Visa Info Sheet with line breaks", () => {
    const props = {
      title: "Documents must-knows",
      content: `<p>Supporting documents for all applications should be scanned in high resolution and in color<br><br> No notarization (either self, agent or through a notary) is required for any supporting document, including the passport<br><br> Only scanned soft copy of documents are required,<br><br>The maximum size of each file/ attachment should not exceed 5 MB</p>`
    };
    console.log(props);
    return <VisaInfoSheet {...props} />;
  })
  .add("Sticky Action Bar", () => {
    const props = {
      ...stickyActionBarData
    };
    console.log(props);
    return <StickyActionBar />;
  })
  .add("Fab Call Button", () => {
    const props = {
      ...fabButtonData
    };
    console.log(props);
    return <FabButton {...props} />;
  })
  .add("Help QA Block", () => {
    const props = {
      ...helpQaData
    };
    console.log(props);
    return <HelpDetailsBlock {...props} />;
  })
  .add("Visa Rejected Action Bar", () => {
    const props = {
      action: () => null
    };
    console.log(props);
    return <VisaRejectedActionBar {...props} />;
  });
