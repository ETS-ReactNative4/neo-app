import {Box, Text} from '@pyt/micros';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from '../../../CommonComponents/Icon/Icon';
import {
  CONSTANT_fontPrimaryRegular,
  CONSTANT_fontPrimarySemiBold,
} from '../../../constants/fonts';
import {CONSTANT_arrowRight} from '../../../constants/imageAssets';
import {SCREEN_STAY_SEARCH} from '../../../NavigatorsV2/ScreenNames';
import StaySection from '../../StayHotelListScreen/Components/StaySection';
import {getPaxConfigText} from '../../StayHotelSearchScreen/util/getPaxConfigText';

export const TripDetails = ({
  navigation,
  nightText,
  checkInDateDisplay,
  checkInMonthDisplay,
  checkOutDateDisplay,
  checkOutMonthDisplay,
  hotelGuestRoomConfiguration = [],
}) => {
  const onPress = () => navigation.navigate(SCREEN_STAY_SEARCH);
  const paxText = getPaxConfigText(hotelGuestRoomConfiguration)
  return (
    <StaySection title="Trip details">
      {[
        {
          label: 'Dates',
          text: `${checkInDateDisplay} ${checkInMonthDisplay} - ${checkOutDateDisplay} ${checkOutMonthDisplay}, ${nightText}`,
        },
        {
          label: paxText.includes('Adults') ? 'Travellers' : 'Traveller',
          text: `${paxText}`,
        },
      ].map((item, index) => (
        <>
          <Box flexDirection="row" justifyContent="space-between">
            <Text
              fontSize={15}
              lineHeight={19}
              color="#555555"
              fontFamily={CONSTANT_fontPrimaryRegular}>
              {item.label}:{' '}
              <Text
                fontSize={15}
                lineHeight={19}
                color="#333333"
                fontFamily={CONSTANT_fontPrimarySemiBold}>
                {item.text}
              </Text>
            </Text>
            <TouchableOpacity onPress={onPress}>
              <Text
                fontFamily={CONSTANT_fontPrimaryRegular}
                fontSize={15}
                lineHeight={19}
                color="#777777">
                Edit
                <Icon name={CONSTANT_arrowRight} color={'#777777'} size={12} />
              </Text>
            </TouchableOpacity>
          </Box>
          {!index ? (
            <Box height={1} backgroundColor="#F0F0F0" marginVertical={20} />
          ) : null}
        </>
      ))}
    </StaySection>
  );
};
