import React, { Fragment } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";
import CommonHeader from "../../../CommonComponents/CommonHeader/CommonHeader";
import HelpDeskCategories from "../../SupportCenterScreen/Components/HelpDeskCategories";
import constants from "../../../constants/constants";
import SupportTopBar from "../../SupportCenterScreen/Components/SupportTopBar";

const HelpDeskView = ({
  chatActivationMessage = "",
  navigation,
  faqSections
}) => {
  const writeMessage = () => {
    navigation.navigate("ContactUs", {
      type: constants.defaultSupportType
    });
  };

  return (
    <View style={styles.helpDeskViewContainer}>
      <CommonHeader title={"Help Desk"} navigation={navigation} />
      <SupportTopBar
        ctaText={"New Message"}
        ctaAction={() => writeMessage()}
        text={chatActivationMessage}
        nextAction={() => writeMessage()}
      />
      <ScrollView>
        <HelpDeskCategories
          containerStyle={styles.helpDeskCategoriesContainer}
          categories={faqSections}
          categoryTitle={"Categories"}
        />
        <Text style={styles.infoText}>{chatActivationMessage}</Text>
      </ScrollView>
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
  }
});

HelpDeskView.propTypes = {
  chatActivationMessage: PropTypes.string
};

export default HelpDeskView;
