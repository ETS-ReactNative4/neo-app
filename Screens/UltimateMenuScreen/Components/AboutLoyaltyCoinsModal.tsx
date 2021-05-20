import {Box, Button, Pill, Text} from '@pyt/micros';
import {stubFalse} from 'lodash';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import Icon from '../../../CommonComponents/Icon/Icon';
import SmartImageV2 from '../../../CommonComponents/SmartImage/SmartImageV2';
import TranslucentStatusBar from '../../../CommonComponents/TranslucentStatusBar/TranslucentStatusBar';
import {theme} from '../../../constants/colorPallete';
import {
  CONSTANT_fontPrimaryRegular,
  CONSTANT_fontPrimarySemiBold,
} from '../../../constants/fonts';
import {
  CONSTANT_closeIcon,
  CONSTANT_MENU_BANNER,
} from '../../../constants/imageAssets';
import {BannerLineItem} from './BannerLineItem';
import {ListSection} from './ListSection';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.neutral001,
    margin: 0,
    paddingBottom: 40,
  },
  contentContainer: {
    flex: 1,
  },
  gradient: {
    height: '100%',
    width: '100%',
    // flex: 1,
    padding: 20,
    paddingTop: 48,
    paddingBottom: 41,
    display: 'flex',
    justifyContent: 'space-between',

    // display: 'flex',
    // flexDirection: 'row'
    // justifyContent: 'center',
    // position: 'relative'
  },
  image: {
    position: 'absolute',
    // left: '30%',
    // right: -10,
    bottom: 0,
    top: 0,
    right: 0,
    // width: 100,
    // height: 100
  },
  closeIcon: {
    zIndex: 1,
    opacity: 0.4,
  },
});
export const AboutLoyaltyCoinsModal = ({isVisible, toggleModal}) => {
  return (
    <>
      <Modal isVisible={isVisible} style={styles.container}>
        <Box height={361}>
          <LinearGradient
            start={{x: 1.3, y: 1}}
            end={{x: 0, y: 0}}
            colors={['#3B2390', '#5739C6']}
            style={styles.gradient}>
            <TouchableOpacity
              style={styles.closeIcon}
              activeOpacity={0.8}
              onPress={toggleModal}>
              <Icon
                name={CONSTANT_closeIcon}
                size={24}
                color={theme.colors.neutral001}
                style={styles.closeIcon}
              />
            </TouchableOpacity>
            <SmartImageV2
              source={CONSTANT_MENU_BANNER()}
              height={100}
              width={100}
              style={styles.image}
            />
            <BannerLineItem
              title="International PYT Coins"
              pillText="Silver member"
              text="1,700"
            />
            <BannerLineItem title="Domestic PYT Coins" text="1,300" />

            <Button
              paddingHorizontal={0}
              paddingVertical={0}
              overflow="hidden"
              //   marginTop={38}
              height={60}
              width={'75%'}>
              <Box
                position="absolute"
                width={'100%'}
                height={'100%'}
                top={0}
                backgroundColor={theme.colors.neutral001}
                zIndex={0}
                opacity={0.1}
                paddingHorizontal={10}
                paddingVertical={10}
              />
              <Text
                fontFamily={CONSTANT_fontPrimaryRegular}
                color={theme.colors.accent002}
                fontSize={13}>
                No limits on usage! You can even travel for{' '}
                <Text fontFamily={CONSTANT_fontPrimarySemiBold}>FREE</Text> with
                your coins 🎉
              </Text>
            </Button>
          </LinearGradient>
        </Box>
        <ScrollView>
          <ListSection title="Earn more coins" />
          <ListSection title="ETerms & conditions" />
        </ScrollView>
        {/* </SafeAreaView> */}
      </Modal>
    </>
  );
};
