import {ChevronRight} from '@pyt/icons';
import {Button, Text} from '@pyt/micros';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SmartImageV2 from '../../../CommonComponents/SmartImage/SmartImageV2';
import {CONSTANT_referralText} from '../../../constants/appText';
import {theme} from '../../../constants/colorPallete';
import {
  CONSTANT_fontPrimaryRegular,
  CONSTANT_fontPrimarySemiBold,
} from '../../../constants/fonts';
import {CONSTANT_FLAG_BG} from '../../../constants/imageAssets';
import LoyaltyCoins from '../../../mobx/LoyaltyCoins';
import {share} from '../../../Services/shareService/share';
import {AboutLoyaltyCoinsModal} from './AboutLoyaltyCoinsModal';
import Modal from 'react-native-modal';

const styles = StyleSheet.create({
  gradient: {
    height: 182,
    width: '100%',
    borderRadius: 12,
    padding: 20,
    paddingTop: 28,
    marginBottom: 12,
  },
  image: {
    position: 'absolute',
    right: 0,
    top: 0,
    borderRadius: 12,
  },
  modalContainer: {
    margin: 0,
    flex: 1,
    backgroundColor: theme.colors.neutral001,
  },
});

export const ReferNowCard = ({
  referralCode,
  loyaltyCoinsStore,
}: {
  referralCode: string;
  loyaltyCoinsStore: LoyaltyCoins;
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => setModalVisible(prevState => !prevState);
  const onShare = () => {
    share({
      message: `${CONSTANT_referralText(referralCode)}`,
    });
  };
  const {loyaltyCoins: loyalCredit = {}} = loyaltyCoinsStore;

  return (
    <>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={[theme.colors.primary002, theme.colors.primary003]}
        style={styles.gradient}>
        <SmartImageV2
          source={CONSTANT_FLAG_BG()}
          height={100}
          width={100}
          style={styles.image}
        />
        <Text
          fontFamily={CONSTANT_fontPrimarySemiBold}
          fontWeight="700"
          color={theme.colors.neutral001}
          fontSize={20}
          lineHeight={24}>
          Refer & earn 500 coins
        </Text>
        <Text
          fontFamily={CONSTANT_fontPrimaryRegular}
          color={theme.colors.primary001}
          fontSize={14}
          lineHeight={18}
          marginTop={12}
          marginBottom={20}
          width={'80%'}>
          Earn coins immediately once your referral completes the trip.{' '}
          {/* <Text
            fontFamily={CONSTANT_fontPrimarySemiBold}
            color={theme.colors.neutral002}
            textDecorationLine="underline"
            onPress={toggleModal}
            fontSize={14}>
            Know more
          </Text> */}
        </Text>
        <Button
          width={113}
          height={36}
          backgroundColor={theme.colors.neutral001}
          opacity={0.8}
          onPress={onShare}>
          <Text
            fontFamily={CONSTANT_fontPrimarySemiBold}
            color={theme.colors.primary003}
            fontSize={14}>
            Refer Now <ChevronRight fill={theme.colors.primary003} />
          </Text>
        </Button>
      </LinearGradient>

      <Modal
        isVisible={modalVisible}
        style={styles.modalContainer}
        onBackButtonPress={toggleModal}
        // onSwipeComplete={toggleModal}
        // swipeDirection="left"
      >
        <AboutLoyaltyCoinsModal
          toggleModal={toggleModal}
          memberType={''}
          internationalCredit={loyalCredit.internationalLoyaltyBalance}
          domesticCredit={loyalCredit.domesticLoyaltyBalance}
          cardColors={{
            textColor: theme.colors.neutral001,
            bgColors: [theme.colors.primary002, theme.colors.primary003],
            pillTextColor: theme.colors.neutral001,
            bannerBgColor: '#E8EAF3',
            bgImage: CONSTANT_FLAG_BG,
          }}
          referralCode={loyalCredit.referralCode}
          referralCard={modalVisible}
        />
      </Modal>
    </>
  );
};
