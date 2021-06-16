import {Box, Button, Text} from '@pyt/micros';
import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from '../../../CommonComponents/Icon/Icon';
import SmartImageV2 from '../../../CommonComponents/SmartImage/SmartImageV2';
import {CONSTANT_referralText} from '../../../constants/appText';
import {theme} from '../../../constants/colorPallete';
import {
  CONSTANT_fontPrimaryRegular,
  CONSTANT_fontPrimarySemiBold,
} from '../../../constants/fonts';
import {CONSTANT_closeIcon} from '../../../constants/imageAssets';
import {share} from '../../../Services/shareService/share';
import {BannerLineItem} from './BannerLineItem';
import {ListSection} from './ListSection';
import {CardColorsType} from './MenuBanner';
import {SeeBenefitsCard} from './SeeBenefitsCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.screenBgColor,
    margin: 0,
    paddingBottom: 40,
  },
  contentContainer: {
    flex: 1,
  },
  gradient: {
    height: '100%',
    width: '100%',
    padding: 20,
    paddingTop: 48,
    paddingBottom: 41,
    display: 'flex',
    justifyContent: 'space-between',
  },
  image: {
    position: 'absolute',
    bottom: 0,
    top: 36,
    right: 0,
  },
  closeIcon: {
    zIndex: 1,
  },
});
export const AboutLoyaltyCoinsModal = ({
  toggleModal,
  memberType,
  internationalCredit,
  domesticCredit,
  referralCode,
  cardColors,
  level,
  amountToSpendText,
  referralCard,
}: {
  toggleModal: () => unknown;
  memberType: string;
  internationalCredit: number;
  domesticCredit: number;
  cardColors: CardColorsType;
  referralCode?: string;
  level?: number;
  amountToSpendText?: string;
  referralCard?: boolean;
}) => {
  const onShare = () => {
    share({
      message: `${CONSTANT_referralText(referralCode)}`,
    });
  };
  const referralText = referralCode
    ? [
        <>
          For every{' '}
          <Text
            fontFamily={CONSTANT_fontPrimarySemiBold}
            color={theme.colors.primary003}
            textDecorationLine="underline"
            onPress={onShare}>
            successful referral
          </Text>{' '}
          earn 500 coins
        </>,
      ]
    : [];
  return (
    <ScrollView>
      <Box height={referralCard ? 282 : 389}>
        <LinearGradient
          start={{x: 0.55, y: 1.0}}
          end={{x: 0.0, y: 0.35}}
          colors={cardColors.bgColors}
          style={styles.gradient}>
          <TouchableOpacity
            style={styles.closeIcon}
            activeOpacity={0.8}
            onPress={toggleModal}>
            <Icon
              name={CONSTANT_closeIcon}
              size={24}
              color={cardColors.textColor}
              style={styles.closeIcon}
            />
          </TouchableOpacity>
          <SmartImageV2
            source={cardColors.bgImage()}
            height={100}
            width={100}
            style={styles.image}
          />
          <BannerLineItem
            title="International PYT Coins"
            pillText={memberType}
            amount={internationalCredit || 0}
            cardColors={cardColors}
          />
          <BannerLineItem
            title="Domestic PYT Coins"
            amount={domesticCredit || 0}
            cardColors={cardColors}
          />

          {referralCard ? null : (
            <Button
              paddingHorizontal={0}
              paddingVertical={0}
              overflow="hidden"
              height={60}
              width={'75%'}>
              <Box
                position="absolute"
                width={'100%'}
                height={'100%'}
                top={0}
                backgroundColor={
                  level === 2 ? '#FFD24A' : level === 3 ? '#FF5674' : '#7056CD'
                }
                zIndex={0}
                paddingHorizontal={10}
                paddingVertical={10}
              />
              <Text
                fontFamily={CONSTANT_fontPrimaryRegular}
                color={
                  level === 3
                    ? theme.colors.neutral001
                    : level === 2
                    ? theme.colors.yellow004
                    : theme.colors.accent002
                }
                fontSize={13}
                paddingHorizontal={10}>
                No limits on usage! You can even travel for{' '}
                <Text fontFamily={CONSTANT_fontPrimarySemiBold}>FREE</Text> with
                your coins 🎉
              </Text>
            </Button>
          )}
        </LinearGradient>
      </Box>

      <Box backgroundColor={theme.colors.screenBgColor} flex={1}>
        {referralCard ? null : (
          <SeeBenefitsCard
            memberType={memberType}
            amountToSpendText={amountToSpendText}
          />
        )}
        {referralCard ? null : (
          <ListSection
            title="Earn more coins"
            list={[
              <>
                For every{' '}
                <Text
                  fontFamily={CONSTANT_fontPrimarySemiBold}
                  color={theme.colors.neutral008}>
                  international booking
                </Text>{' '}
                earn upto 4000 coins
              </>,
              <>
                For every{' '}
                <Text
                  fontFamily={CONSTANT_fontPrimarySemiBold}
                  color={theme.colors.neutral008}>
                  domestic booking
                </Text>{' '}
                earn upto 1500 coins
              </>,
              ...referralText,
              '1 Coin = 1 Rupee 🤯',
            ]}
          />
        )}
        <ListSection
          title="Terms & conditions"
          list={
            referralCard
              ? [
                  'A referral is qualified when the referred person downloads the Pickyourtrail app through the referral link and signs up through app.',
                  'The referred person should be a new user, meaning the user signs up on Pickyourtrail platform (both web and app) for the first time.',
                  'Pickyourtrail reserves the right to determine if a Referrer’s and Referred’s user account is valid based on criteria that includes, but is not limited to, Pickyourtrail account activity, probable misuse of the program, etc.',
                  'For every qualified referral, the referrer will receive 50 PYT Coins.',
                  'For every 5 qualified referrals made, first 4 will in 50 International Coins each and fifth will be 50 Domestic coins.',
                  'Coins may only be used for designated Pickyourtrail products and services and may never be redeemed for cash.',
                ]
              : [
                  'Coins cannot be encashed or transferred',
                  'Coins can’t be applied along with any other promotional coupons.',
                  'Coins can be applied only for online transactions not for booked transaction.',
                  'International coins can be applied only on international vacations and domestic coins can be applied only on domestic vacations',
                ]
          }
        />
      </Box>
    </ScrollView>
  );
};
