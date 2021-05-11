import {Included} from '@pyt/icons';
import React, {useEffect} from 'react';
import {
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CONSTANT_fontPrimaryRegular} from '../../constants/fonts';
import {getGlobalPriceWithoutSymbol} from '../ExploreScreen/services/getPriceWithoutSymbol';
import {RoomCard} from '../TripFeedScreen/Components/RoomCard';
import getSymbolFromCurrency from 'currency-symbol-map';
import useSearchHotelRoomApi from '../StayHotelDetailScreen/hook/useSearchHotelRoomApi';
import {Box, Text} from '@pyt/micros';
import {getPaxConfigText} from '../StayHotelSearchScreen/util/getPaxConfigText';

const width = Dimensions.get('window').width;

export const StayHotelRoomList = ({
  route,
  navigation,
  displayCurrency = 'INR',
}) => {
  const {req, onSelect = () => null, currentSelectedRoom = {}, nightText} =
    route?.params ?? {};
  const [hotelRoomDetails, searchHotelRoom] = useSearchHotelRoomApi();
  useEffect(() => {
    searchHotelRoom(req);
  }, []);
  const {roomsData = {}, data = {}} =
    hotelRoomDetails?.successResponseData ?? {};
  console.log('room-->', route?.params, roomsData);

  const onRoomSelect = selectedRoom => {
    onSelect(selectedRoom);
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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
                  fontFamily={CONSTANT_fontPrimaryRegular}
                  marginBottom={20}
                  backgroundColor="#ffffff"
                  sliderProps={{
                    images: roomData[0].roomImages,
                  }}
                  dotSeparateList={[]}
                  rooms={roomData.map((room, index) => {
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
                      cardSelected:
                        room.identifier === currentSelectedRoom?.identifier,
                      onPress: () => {
                        onRoomSelect(room);
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
                        icon: (
                          <Included
                            fill={amenity.available ? '#EF435D' : '#555555'}
                          />
                        ),
                        text: amenity.text,
                      })),
                    };
                  })}
                  // footerRightElement={<></>}
                />
              );
            })
          )}
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  content: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});
