import React from "react";
import { View, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";
import HelpDeskCategories from "../../SupportCenterScreen/Components/HelpDeskCategories";
import constants from "../../../constants/constants";
import SupportTopBar from "../../SupportCenterScreen/Components/SupportTopBar";
import CustomScrollView from "../../../CommonComponents/CustomScrollView/CustomScrollView";
import HomeHeader from "../../../CommonComponents/HomeHeader/HomeHeader";
import SimpleButton from "../../../CommonComponents/SimpleButton/SimpleButton";

const HelpDeskView = ({
  chatActivationMessage = "",
  navigation,
  faqSections,
  disableHeader = false,
  disableTopBar = true,
  disableIcons = false,
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

  const messageTextStyle = { marginTop: -0.5, marginRight: 4 };
  const messageButtonStyle = {
    alignSelf: "center",
    marginBottom: 24,
    marginTop: 0,
    borderRadius: 2
  };

  return (
    <View style={styles.helpDeskViewContainer}>
      {disableHeader ? null : Header}
      <CustomScrollView
        containerStyle={styles.scrollBackground}
        refreshing={refreshing}
        onRefresh={onRefresh}
      >
        {disableTopBar ? null : (
          <SupportTopBar
            ctaText={topBarCta}
            ctaAction={topBarCtaAction}
            text={topBarText}
            nextAction={writeMessage}
            isTitleBold={isTitleBold}
          />
        )}
        <HelpDeskCategories
          disableIcons={disableIcons}
          containerStyle={styles.helpDeskCategoriesContainer}
          categories={faqSections}
          categoryTitle={"Categories"}
        />
        <Text style={styles.infoText}>{chatActivationMessage}</Text>
        {chatActivationMessage ? (
          <SimpleButton
            text={"Send message"}
            textColor={constants.firstColor}
            textStyle={messageTextStyle}
            containerStyle={messageButtonStyle}
            icon={constants.arrowRight}
            color={"transparent"}
            iconSize={12}
            rightIcon={true}
            underlayColor={"transparent"}
            action={() =>
              navigation.navigate("ContactUs", {
                type: constants.defaultSupportType
              })
            }
          />
        ) : null}
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
    marginTop: 24,
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
  isTitleBold: PropTypes.bool,
  disableTopBar: PropTypes.bool,
  disableIcons: PropTypes.bool
};

export default HelpDeskView;
