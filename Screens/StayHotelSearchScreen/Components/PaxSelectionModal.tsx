import {Box, Button, Text} from '@pyt/micros';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from '../../../CommonComponents/Icon/Icon';
import {
  CONSTANT_fontPrimaryLight,
  CONSTANT_fontPrimaryRegular,
  CONSTANT_fontPrimarySemiBold,
} from '../../../constants/fonts';
import {
  CONSTANT_addIcon,
  CONSTANT_lineBreakIcon,
} from '../../../constants/imageAssets';
import {PaxConfig} from './PaxConfig';

export const PaxSelectionModal = () => {
  const [roomConfig, setRoomConfig] = useState([
    {
      adultCount: 1,
      childAges: [],
    },
  ]);
  return (
    <Box>
      <PaxConfig label="Adults" />
      <PaxConfig label="Children - " subText="0 to 17 yrs" />
      <PaxConfig label="Rooms" count={roomConfig.length} />
      <Button
        text={'Continue'}
        textProps={{
          color: 'white',
          fontSize: 15,
          fontFamily: CONSTANT_fontPrimarySemiBold,
        }}
        backgroundColor="#00C684"
        height={48}
        marginTop={20}
        onPress={() => null}
        opacity={1}
      />
    </Box>
  );
};
