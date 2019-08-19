import React, { Fragment } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";
import CommonHeader from "../../../CommonComponents/CommonHeader/CommonHeader";
import HelpDeskCategories from "../../SupportCenterScreen/Components/HelpDeskCategories";
import constants from "../../../constants/constants";
import SupportTopBar from "../../SupportCenterScreen/Components/SupportTopBar";
import CustomScrollView from "../../../CommonComponents/CustomScrollView/CustomScrollView";
import HomeHeader from "../../../CommonComponents/HomeHeader/HomeHeader";

const HelpDeskView = ({
  chatActivationMessage = "",
  navigation,
  faqSections,
  disableHeader = false,
  topBarText = "",
  topBarCta = "",
  topBarCtaAction = () => null,
  refreshing = false,
  onRefresh = () => null,
  isTitleBold = false
}) => {
  const writeMessage = () => {
    navigation.navigate("ContactUs", {
      type: constants.defaultSupportType
    });
  };

  const Header = HomeHeader({ navigation }).header;
  return (
    <View style={styles.helpDeskViewContainer}>
      {disableHeader ? null : Header}
      <CustomScrollView
        containerStyle={styles.scrollBackground}
        refreshing={refreshing}
        onRefresh={onRefresh}
      >
        <SupportTopBar
          ctaText={topBarCta}
          ctaAction={topBarCtaAction}
          text={topBarText}
          nextAction={writeMessage}
          isTitleBold={isTitleBold}
        />
        <HelpDeskCategories
          containerStyle={styles.helpDeskCategoriesContainer}
          categories={faqSections}
          categoryTitle={"Categories"}
        />
        <Text style={styles.infoText}>{chatActivationMessage}</Text>
      </CustomScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  helpDeskViewContainer: {
    backgroundColor: constants.white1,
    flex: 1
  },
  helpDeskCategoriesContainer: {
    marginTop: 16
  },
  infoText: {
    marginVertical: 24,
    marginHorizontal: 24,
    ...constants.fontCustom(constants.primaryRegular, 13, 19),
    color: constants.black1,
    textAlign: "center"
  },
  scrollBackground: { backgroundColor: constants.white1 }
});

HelpDeskView.propTypes = {
  chatActivationMessage: PropTypes.string,
  navigation: PropTypes.object,
  faqSections: PropTypes.array,
  disableHeader: PropTypes.bool,
  topBarText: PropTypes.string,
  topBarCta: PropTypes.string,
  topBarCtaAction: PropTypes.func,
  refreshing: PropTypes.bool,
  onRefresh: PropTypes.func,
  isTitleBold: PropTypes.bool
};

export default HelpDeskView;
