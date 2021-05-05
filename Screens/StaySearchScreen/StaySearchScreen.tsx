import {AnimatedInputBox, Box, Button, Text} from '@pyt/micros';
import {inject, observer} from 'mobx-react';
import React from 'react';
import {
  CONSTANT_fontPrimaryRegular,
  CONSTANT_fontPrimarySemiBold,
} from '../../constants/fonts';

interface StaySearchScreenProps {}
// @inject('otaHotel')
const StaySearchScreen = inject('otaHotelStore')(
  observer(({otaHotelStore}) => {
    const {getHotelList, isLoading, hotelList} = otaHotelStore ?? {};
    console.log('getHotelList', isLoading, hotelList);
    const callHotelList = () => {
      getHotelList();
    };
    return (
      <Box
        borderRadius={12}
        backgroundColor={'#FFFFFF'}
        margin={16}
        padding={16}>
        <Box borderBottomWidth={1} borderColor="#F7F7F7" paddingBottom={16}>
          <Text
            fontFamily={CONSTANT_fontPrimarySemiBold}
            fontSize={18}
            lineHeight={22}
            fontWeight={'600'}
            color={'#777777'}>
            Destination city
          </Text>
          <Text
            fontFamily={CONSTANT_fontPrimarySemiBold}
            fontSize={24}
            lineHeight={30}
            fontWeight={'600'}
            color={'#333333'}
            marginTop={8}>
            Bali
          </Text>
        </Box>

        <Box flexDirection="row" justifyContent="space-between" marginTop={16}>
          <AnimatedInputBox
            label="Check-in"
            flex={1}
            marginEnd={8}
            value="29th Jun 2020"
          />
          <AnimatedInputBox
            label="Check-out"
            flex={1}
            marginStart={8}
            value="5th Jul 2020"
          />
        </Box>
        <AnimatedInputBox
          label="No. of persons"
          value={'4 adults - 2 rooms'}
          marginTop={16}
        />
        <Button
          text="Search"
          textProps={{
            color: 'white',
            fontSize: 15,
            fontFamily: CONSTANT_fontPrimaryRegular,
          }}
          backgroundColor="#00C684"
          height={48}
          marginTop={20}
          onPress={callHotelList}
        />
      </Box>
    );
  }),
);

export default StaySearchScreen;
