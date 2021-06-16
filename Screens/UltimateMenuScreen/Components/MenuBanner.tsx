import {ChevronRight} from '@pyt/icons';
import {Box, Button, Text} from '@pyt/micros';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SmartImageV2 from '../../../CommonComponents/SmartImage/SmartImageV2';
import {theme} from '../../../constants/colorPallete';
import {
  CONSTANT_fontPrimaryRegular,
  CONSTANT_fontPrimarySemiBold,
} from '../../../constants/fonts';
import {
  CONSTANT_GOLD_BANNER,
  CONSTANT_PLATINUM_BANNER,
  CONSTANT_SILVER_BANNER,
} from '../../../constants/imageAssets';
import LoyaltyCoins from '../../../mobx/LoyaltyCoins';
import {AboutLoyaltyCoinsModal} from './AboutLoyaltyCoinsModal';
import {BannerLineItem} from './BannerLineItem';
import Modal from 'react-native-modal';
import {getGlobalPriceWithoutSymbol} from '../../ExploreScreen/services/getPriceWithoutSymbol';

type UserLoayltyCreditResponseType = {
  domesticLoyaltyBalance: number;
  internationalLoyaltyBalance: number;
};

export type CardColorsType = {
  textColor: string;
  bgColors: string[];
  pillTextColor: string;
  bannerBgColor: string;
  bgImage: () => unknown;
};

const PLATINUM = 'Platinum';
const GOLD = 'Gold';
const SILVER = 'Silver';

const styles = StyleSheet.create({
  gradient: {
    height: '100%',
    width: '100%',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 24,
    display: 'flex',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    left: '55%',
    top: '-55%',
    bottom: 0,
  },
  modalContainer: {
    margin: 0,
    flex: 1,
    backgroundColor: theme.colors.neutral001,
  },
});

export const getLoyaltyCardColors = (tier, totalBookedAmount = 0) => {
  let memberType = '';
  let amountToSpendText = '🎉 Plan your first trip and earn coins';
  let level = 0;
  const cardColors: CardColorsType = {
    textColor: theme.colors.accent001,
    bgColors: ['#3B2390', '#5739C6'],
    pillTextColor: theme.colors.accent004,
    bannerBgColor: '#E8EAF3',
    bgImage: CONSTANT_SILVER_BANNER,
  };
  if (tier === PLATINUM) {
    memberType = `${PLATINUM} member`;
    level = 3;
    amountToSpendText = '';
    cardColors.textColor = theme.colors.red001;
    cardColors.bgColors = [theme.colors.red004, theme.colors.red002];
    cardColors.pillTextColor = theme.colors.red004;
    cardColors.bannerBgColor = '#FEF6F7';
    cardColors.bgImage = CONSTANT_PLATINUM_BANNER;
  } else if (tier === GOLD) {
    memberType = `${GOLD} member`;
    level = 2;
    amountToSpendText = `Spend ₹${getGlobalPriceWithoutSymbol({
      amount: 800000 - totalBookedAmount,
    })} to be a Platinum member`;
    cardColors.textColor = theme.colors.yellow001;
    cardColors.bgColors = [theme.colors.yellow002, '#D39F0D'];
    cardColors.pillTextColor = theme.colors.yellow004;
    cardColors.bannerBgColor = '#FFF7E0';
    cardColors.bgImage = CONSTANT_GOLD_BANNER;
  } else if (tier === SILVER) {
    cardColors.textColor = theme.colors.accent001;
    level = 1;
    memberType = `${SILVER} member`;
    amountToSpendText = `Spend ₹${getGlobalPriceWithoutSymbol({
      amount: 350000 - totalBookedAmount,
    })} to be a Gold member`;
    cardColors.textColor = theme.colors.accent002;
    cardColors.bgColors = ['#3B2390', '#5739C6'];
    cardColors.pillTextColor = theme.colors.accent004;
  }
  return {amountToSpendText, memberType, level, cardColors};
};

export const MenuBanner = ({
  name,
  loyaltyCoinsStore,
}: {
  name: string;
  loyaltyCoinsStore: LoyaltyCoins;
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => setModalVisible(prevState => !prevState);

  const {loyaltyCoins: loyalCredit = {}} = loyaltyCoinsStore;
  const totalCredits =
    (loyalCredit.domesticLoyaltyBalance || 0) +
    (loyalCredit.internationalLoyaltyBalance || 0);

  const {
    amountToSpendText,
    memberType,
    level,
    cardColors,
  } = getLoyaltyCardColors(loyalCredit.tier, loyalCredit.totalBookedAmount);

  return (
    <>
      <Box
        position="relative"
        width="100%"
        height={224}
        marginBottom={12}
        borderRadius={12}>
        <LinearGradient
          start={{x: 0.55, y: 1.0}}
          end={{x: 0.0, y: 0.35}}
          colors={cardColors.bgColors}
          style={[styles.gradient]}>
          <SmartImageV2
            source={cardColors.bgImage()}
            height={100}
            width={100}
            style={styles.image}
          />
          {/* <Box justifyContent="space-between"> */}
          <BannerLineItem
            title={name?.toUpperCase()}
            pillText={memberType}
            amount={totalCredits}
            subText="coins"
            cardColors={cardColors}
          />
          {amountToSpendText ? (
            <Box flexDirection="row" alignItems="center">
              {level ? (
                <Box
                  width={20}
                  height={20}
                  borderWidth={3}
                  borderRadius={20}
                  marginRight={8}
                  borderLeftColor={
                    level > 1 ? theme.colors.neutral002 : '#8470CB'
                  }
                  borderTopColor={
                    level > 2
                      ? theme.colors.neutral002
                      : level === 2
                      ? theme.colors.yellow003
                      : '#8470CB'
                  }
                  borderRightColor={theme.colors.neutral002}
                  borderBottomColor={theme.colors.neutral002}
                  transform={[{rotate: '-40deg'}]}
                />
              ) : null}
              <Text
                fontFamily={CONSTANT_fontPrimaryRegular}
                color={theme.colors.accent001}
                fontSize={14}
                lineHeight={18}>
                {amountToSpendText}
              </Text>
            </Box>
          ) : null}
          <Button
            width={168}
            paddingHorizontal={0}
            height={34}
            overflow="hidden"
            onPress={toggleModal}>
            <Box
              position="absolute"
              width={'100%'}
              height={'100%'}
              top={0}
              backgroundColor={theme.colors.neutral001}
              zIndex={0}
              opacity={level === 2 ? 0.22 : 0.1}
              paddingHorizontal={12}
            />
            <Text
              fontFamily={CONSTANT_fontPrimarySemiBold}
              color={theme.colors.neutral001}
              fontSize={14}>
              How to use PYT coins{' '}
              <ChevronRight fill={theme.colors.accent001} />
            </Text>
          </Button>
          {/* </Box> */}
        </LinearGradient>
      </Box>
      <Modal
        isVisible={modalVisible}
        style={styles.modalContainer}
        onBackButtonPress={toggleModal}
        // onSwipeComplete={toggleModal}
        // swipeDirection="left"
      >
        <AboutLoyaltyCoinsModal
          toggleModal={toggleModal}
          memberType={memberType}
          internationalCredit={loyalCredit.internationalLoyaltyBalance}
          domesticCredit={loyalCredit.domesticLoyaltyBalance}
          cardColors={cardColors}
          referralCode={loyalCredit.referralCode}
          level={level}
          amountToSpendText={amountToSpendText}
        />
      </Modal>
    </>
  );
};
