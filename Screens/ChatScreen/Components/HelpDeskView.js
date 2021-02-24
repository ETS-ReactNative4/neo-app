import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import HelpDeskCategories from '../../SupportCenterScreen/Components/HelpDeskCategories';
import constants from '../../../constants/constants';
import SupportTopBar from '../../SupportCenterScreen/Components/SupportTopBar';
import CustomScrollView from '../../../CommonComponents/CustomScrollView/CustomScrollView';
import HomeHeader from '../../../CommonComponents/HomeHeader/HomeHeader';
import SimpleButton from '../../../CommonComponents/SimpleButton/SimpleButton';
import dialer from '../../../Services/dialer/dialer';
import {CONSTANT_sosNumber} from '../../../constants/stringConstants';

const ticketOptionList = [
  {label: 'Itinerary related', value: 'Itinerary related'},
  {label: 'Cancellation request', value: 'Cancellation request'},
  {label: 'Refund related', value: 'Refund related'},
  {label: 'Voucher related', value: 'Voucher related'},
  {label: 'Other', value: 'Other'},
];

const HelpDeskView = ({
  chatActivationMessage = '',
  navigation,
  faqSections,
  disableHeader = false,
  disableTopBar = true,
  disableIcons = false,
  topBarText = '',
  topBarCta = '',
  topBarCtaAction = () => null,
  refreshing = false,
  onRefresh = () => null,
  isTitleBold = false,
  enableCall = false,
}) => {
  const writeMessage = () => {
    navigation.navigate('ContactUs', {
      type: constants.defaultSupportType,
    });
  };

  const makeCall = () => dialer('+918047180963');
  const Header = HomeHeader({navigation}).header;

  const messageTextStyle = {marginTop: -0.5, marginRight: 4};
  const messageButtonStyle = {
    alignSelf: 'center',
    marginBottom: 24,
    marginTop: 0,
    borderRadius: 2,
  };

  return (
    <View style={styles.helpDeskViewContainer}>
      {disableHeader ? null : Header}
      <CustomScrollView
        containerStyle={styles.scrollBackground}
        refreshing={refreshing}
        onRefresh={onRefresh}>
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
          categoryTitle={'Categories'}
        />
        {enableCall ? null : (
          <Text style={styles.infoText}>{chatActivationMessage}</Text>
        )}
        {enableCall ? (
          <View style={styles.callTextContainer}>
            <Text style={styles.callText}>Call us at </Text>
            <TouchableOpacity onPress={makeCall}>
              <View>
                <Text style={[styles.callText, styles.firstColor]}>
                  {CONSTANT_sosNumber}
                </Text>
              </View>
            </TouchableOpacity>
            <Text style={styles.callText}> for any of the queries</Text>
          </View>
        ) : null}
        {chatActivationMessage && !enableCall ? (
          <SimpleButton
            text={'Send message'}
            textColor={constants.firstColor}
            textStyle={messageTextStyle}
            containerStyle={messageButtonStyle}
            icon={constants.arrowRight}
            color={'transparent'}
            iconSize={12}
            rightIcon={true}
            underlayColor={'transparent'}
            action={() =>
              navigation.navigate('ContactUs', {
                type: 'Other',
                optionList: ticketOptionList,
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
    flex: 1,
  },
  helpDeskCategoriesContainer: {
    marginTop: 16,
  },
  infoText: {
    marginTop: 24,
    marginHorizontal: 24,
    ...constants.fontCustom(constants.primaryRegular, 13, 19),
    color: constants.black1,
    textAlign: 'center',
  },
  scrollBackground: {backgroundColor: constants.white1},
  callTextContainer: {
    marginTop: 24,
    marginHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  callText: {
    ...constants.fontCustom(constants.primaryRegular, 14, 24),
    color: constants.black1,
    textAlign: 'center',
  },
  firstColor: {
    color: constants.firstColor,
  },
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
  disableIcons: PropTypes.bool,
  enableCall: PropTypes.bool,
};

export default HelpDeskView;
