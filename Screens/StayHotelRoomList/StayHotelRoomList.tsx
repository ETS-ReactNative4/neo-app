import {Included} from '@pyt/icons';
import React, {useEffect, useRef} from 'react';
import {
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
  CONSTANT_fontPrimaryRegular,
  CONSTANT_fontPrimarySemiBold,
} from '../../constants/fonts';
import {getGlobalPriceWithoutSymbol} from '../ExploreScreen/services/getPriceWithoutSymbol';
import {RoomCard} from '../TripFeedScreen/Components/RoomCard';
import getSymbolFromCurrency from 'currency-symbol-map';
import useSearchHotelRoomApi, {
  SearchHotelRoomRequestType,
} from '../StayHotelDetailScreen/hook/useSearchHotelRoomApi';
import {Box} from '@pyt/micros';
import {getPaxConfigText} from '../StayHotelSearchScreen/util/getPaxConfigText';
import {CONSTANT_closeIcon} from '../../constants/imageAssets';
import Icon from '../../CommonComponents/Icon/Icon';
import {AppNavigatorProps} from '../../NavigatorsV2/AppNavigator';
import {SCREEN_STAY_HOTEL_ROOM_LIST} from '../../NavigatorsV2/ScreenNames';
import {RoomDataType} from '../StayHotelDetailScreen/StayHotelDetailScreen';
import {Text} from '@pyt/micros/src/text';
import PrimaryHeader from '../../NavigatorsV2/Components/PrimaryHeader';

type StayHotelDetailScreenNavType = AppNavigatorProps<
  typeof SCREEN_STAY_HOTEL_ROOM_LIST
>;
export interface StayHotelRoomListParamType {
  title: string;
  req: SearchHotelRoomRequestType;
  currentSelectedRoom: RoomDataType;
  onSelect: (room: RoomDataType) => unknown;
  nightText: string;
  displayCurrency: string;
}

const width = Dimensions.get('window').width;

export const StayHotelRoomList = ({
  route,
  navigation,
}: StayHotelDetailScreenNavType) => {
  const {
    req,
    onSelect = () => null,
    currentSelectedRoom = {},
    nightText,
    displayCurrency,
    title,
  } = route?.params ?? {};

  const [hotelRoomDetails, searchHotelRoom] = useSearchHotelRoomApi();
  useEffect(() => {
    searchHotelRoom(req);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {roomsData = {}} = hotelRoomDetails?.successResponseData ?? {};

  const onRoomSelect = (selectedRoom: RoomDataType) => {
    onSelect(selectedRoom);
    navigation.goBack();
  };

  const onPressBack = () => {
    navigation.goBack();
  };
  const header = useRef(
    PrimaryHeader({
      leftAction: onPressBack,
      headerElement: (
        <Text
          fontFamily={CONSTANT_fontPrimarySemiBold}
          fontSize={15}
          lineHeight={19}>
          {title}
        </Text>
      ),
    }),
  ).current;

  return (
    <ScrollView style={styles.container}>
      {header}
      <Box style={styles.content}>
        {hotelRoomDetails.isLoading ? (
          <ActivityIndicator size="small" color="#AAAAAA" />
        ) : (
          Object.keys(roomsData).map(roomName => {
            const roomData = roomsData[roomName];

            return (
              <RoomCard
                width={width - 32}
                title={roomData[0].name}
                titleProps={{fontFamily: CONSTANT_fontPrimarySemiBold}}
                fontFamily={CONSTANT_fontPrimarySemiBold}
                marginBottom={20}
                backgroundColor="#ffffff"
                sliderProps={{
                  images: roomData[0].roomImages,
                }}
                dotSeparateList={[]}
                rooms={roomData.map((room: RoomDataType, index: number) => {
                  const cost = getGlobalPriceWithoutSymbol({
                    amount: parseInt(
                      (room.publishedCost as unknown) as string,
                      10,
                    ),
                    currency: displayCurrency,
                  });
                  const costSymbol = getSymbolFromCurrency(displayCurrency);

                  return {
                    title: `Option ${index < 10 ? '0' : ''}${index + 1}`,
                    cost: `${costSymbol}${cost}`,
                    costSubText: `${nightText} & ${getPaxConfigText(
                      [room.roomConfiguration],
                      false,
                    )}`,
                    costSubTextProps: {
                      fontFamily: CONSTANT_fontPrimaryRegular,
                    },
                    cardSelected:
                      room.identifier === currentSelectedRoom.identifier,
                    onPress: () => {
                      onRoomSelect(room);
                    },

                    amenitiesProps: {
                      fontFamily: CONSTANT_fontPrimaryRegular,
                    },
                    amenities: [
                      {
                        text: 'Free WiFi',
                        available: room.freeWireless,
                      },
                      {
                        text: 'Breakfast included',
                        available: room.freeBreakfast,
                      },
                      {
                        text: 'Ac available',
                        available: room.acAvailable,
                      },
                      {text: 'Free cancellation', available: room.refundable},
                    ].map(amenity => ({
                      icon: amenity.available ? (
                        <Included fill={'#555555'} />
                      ) : (
                        <Icon name={CONSTANT_closeIcon} color="#EF435D" />
                      ),
                      text: amenity.text,
                    })),
                  };
                })}
              />
            );
          })
        )}
      </Box>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  content: {
    padding: 16,
  },
});
