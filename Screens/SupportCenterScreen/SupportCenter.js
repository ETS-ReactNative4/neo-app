import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  RefreshControl
} from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import FaqSectionTile from "./Components/FaqSectionTile";
import ContactUsTile from "./Components/ContactUsTile";
import TicketTile from "./Components/TicketTile";
import constants from "../../constants/constants";
import {
  responsiveHeight,
  responsiveWidth
} from "react-native-responsive-dimensions";
import { inject, observer } from "mobx-react/custom";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import CustomScrollView from "../../CommonComponents/CustomScrollView/CustomScrollView";

@ErrorBoundary()
@inject("itineraries")
@inject("supportStore")
@observer
class SupportCenter extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CommonHeader title={"Support Center"} navigation={navigation} />
    };
  };

  contactSupport = () => {
    this.props.navigation.navigate("ContactUs", {
      type: constants.defaultSupportType
    });
  };

  componentDidMount() {
    const { loadConversation } = this.props.supportStore;
    setTimeout(() => {
      loadConversation();
    }, 1000);
  }

  render() {
    const { navigation } = this.props;
    const {
      faqDetails,
      getConversationsByItineraryId,
      loadConversation,
      isConversationLoading
    } = this.props.supportStore;

    const { selectedItineraryId } = this.props.itineraries;

    const conversations = getConversationsByItineraryId(selectedItineraryId);

    const faqSections = Object.keys(faqDetails).map(faqSection => {
      return {
        sectionName: faqSection,
        onClick: () => navigation.navigate("FAQ", { title: faqSection })
      };
    });

    return (
      <View style={styles.supportCenterContainer}>
        <CustomScrollView
          refreshing={isConversationLoading}
          onRefresh={() => loadConversation()}
          style={styles.supportScroll}
        >
          <Image
            source={constants.helpSupportIllus}
            resizeMode={"contain"}
            style={styles.supportIllustration}
          />
          {conversations.length ? (
            <TicketTile
              containerStyle={{ marginHorizontal: 24 }}
              action={() => navigation.navigate("YourTickets")}
            />
          ) : null}
          {faqSections.map((faqSection, faqIndex) => {
            return (
              <FaqSectionTile
                containerStyle={{ marginHorizontal: 24 }}
                onClick={faqSection.onClick}
                key={faqIndex}
                sectionName={faqSection.sectionName}
              />
            );
          })}
        </CustomScrollView>
        <ContactUsTile contactAction={this.contactSupport} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  supportCenterContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  supportScroll: {},
  supportIllustration: {
    height: responsiveHeight(40),
    width: responsiveWidth(100) - 48,
    marginHorizontal: 24
  }
});

export default SupportCenter;
