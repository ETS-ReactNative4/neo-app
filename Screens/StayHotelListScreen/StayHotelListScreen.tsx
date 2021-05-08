import {AnimatedInputBox, Box, Button, Text} from '@pyt/micros';
import {HotelCard} from '@pyt/widgets/dist/esm/hotel-card';
import {inject, observer} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import getSymbolFromCurrency from 'currency-symbol-map';
import {FlatList, ScrollView, TouchableOpacity} from 'react-native';
import {
  CONSTANT_fontPrimaryRegular,
  CONSTANT_fontPrimarySemiBold,
  CONSTANT_fontPrimaryLight,
} from '../../constants/fonts';
import {getGlobalPriceWithoutSymbol} from '../ExploreScreen/services/getPriceWithoutSymbol';
import {identity} from 'lodash';
import {Included, Bed} from '@pyt/icons';
import {SCREEN_STAY_HOTEL_DETAIL} from '../../NavigatorsV2/ScreenNames';
import Icon from '../../CommonComponents/Icon/Icon';
import {
  CONSTANT_dropDownArrowDarkIcon,
  CONSTANT_filterIcon,
} from '../../constants/imageAssets';
import _orderBy from 'lodash/orderBy';
import { StayHotelListFilter } from './Components/StayHotelListFilter';
import Modal from "react-native-modal";
interface StayHotelListScreenProps {}
// @inject('otaHotel')
const StayHotelListScreen = inject('otaHotelStore')(
  observer(({otaHotelStore, navigation}) => {
    const {getHotelList, isLoading, hotelList, hotelSearchRequest} = otaHotelStore ?? {};
    const displayCurrency = 'INR';
    console.log('hotelList-->hotelList', hotelList);
    const onPress = hotelData => {
      console.log('press');
      navigation.navigate(SCREEN_STAY_HOTEL_DETAIL, {...hotelData,searchIdentifier: hotelList.searchIdentfier});
    };

    const [allHotelData, setAllHotelData] = useState([]);
    const [sort, setSort] = useState(false);
    const [openFilter, setOpenFilter] = useState<boolean>(false);

    useEffect(() => {
      if (hotelList?.hotelCostingVOList) {
        setAllHotelData([...hotelList.hotelCostingVOList]);
      }
    }, []);

    useEffect(()=>{
      if(isLoading && openFilter){
        
        if (hotelList?.hotelCostingVOList) {console.log('checking-->')
          setAllHotelData([...hotelList.hotelCostingVOList]);
        }
        setOpenFilter(false)
      }
    },[isLoading])

    const applySort = () => {
      let currentAllItems = [...allHotelData];
      if (sort) {
        setSort(false);
        currentAllItems = _orderBy(allHotelData, ['publishedCost'], ['asc']);
      } else {
        setSort(true);
        currentAllItems = _orderBy(allHotelData, ['publishedCost'], ['desc']);
      }
      setAllHotelData(currentAllItems);
    };
    const openFilterPanel = () => {
      console.log('open fileter')
      setOpenFilter(true);
    };
    const closeFilterPanel = () => {
      setOpenFilter(false);
    };
    const applyFilter = () => {
      closeFilterPanel();
    };
    return (
      <Box backgroundColor="#E5E5E5" flex={1}>
        <ScrollView>
          {allHotelData.map(item => {
            const {
              imageURL,
              otherImages = [],
              name,
              publishedCost,
              strikedCost,
              distanceFromCityCenter,
              stars,
              amenitiesList,
              breakFastAvailable,
              refundable,
              amenities,
            } = item;
            const image = imageURL || otherImages?.[0];

            const cost = getGlobalPriceWithoutSymbol({
              amount: parseInt((publishedCost as unknown) as string, 10),
              currency: displayCurrency,
            });
            const costSymbol = getSymbolFromCurrency(displayCurrency);

            const dotSeparateList = [
              `${parseInt(distanceFromCityCenter || 0, 10)} from city center`,
              `${stars} star hotel`,
            ].map((list, index) => (
              <Text
                fontFamily={CONSTANT_fontPrimaryRegular}
                fontSize={13}
                color={'#333333'}
                key={index}>
                {list}
              </Text>
            ));

            return (
              <HotelCard
                width={'100%'}
                title={name}
                strikedCost={strikedCost ? `${costSymbol}${strikedCost}` : ''}
                cost={`${costSymbol}${cost}`}
                costSubText="2 nights & 2 adults"
                marginBottom={20}
                backgroundColor="#ffffff"
                amenities={[
                  {
                    text: 'Free WiFi',
                    available: amenitiesList?.includes('Free WiFi'),
                  },
                  {
                    text: 'Breakfast included',
                    available: breakFastAvailable,
                  },
                  {text: 'Free cancellation', available: refundable},
                  {
                    text: 'Air condition',
                    available: amenities?.some(
                      ({name}) => name.toUpperCase() === 'AIR CONDITIONING',
                    ),
                  },
                ].reduce((amenities, amenity) => {
                  if (amenity.available) {
                    amenities.push({
                      text: amenity.text,
                      icon: <Included fill="red" />,
                    });
                  }
                  return amenities;
                }, [])}
                // fontFamily={CONSTANT_fontPrimaryLight}
                sliderProps={{
                  images: image ? [image] : [],
                  showArrow: true,
                }}
                dotSeparateList={dotSeparateList}
                footerRightElement={<></>}
                onPress={() => onPress(item)}
              />
            );
          })}
        </ScrollView>
        {/* <FlatList
        data={hotelList?.hotelCostingVOList}
        keyExtractor={(item, index) => `${item?.toString()}-${index}`}
        renderItem={({item})=>{
        const image = item.imageURL || item.otherImages?.[0]
        console.log('item-->',item,item.imageURL,image)
        return  <HotelCard
		width={'100%'}
		title={item.name}
		strikedCost="₹15,234"
		cost="₹11,234"
		costSubText="2 nights & 2 adults"
		marginEnd={12}
    backgroundColor='#ffffff'
		amenities={[{icon:null,text:'gkfjl'},{icon:null,text:'jgj'}]}
    fontFamily={CONSTANT_fontPrimarySemiBold}
		sliderProps={{
			images: image ? [image] : [],
			showArrow: true,
		}}
		dotSeparateList={[]}
		footerRightElement={<></>}
		onCardPress={() => null}
	/>
        }}
     /> */}

  <StayHotelListFilter 
       closeFilterPanel={closeFilterPanel}
       isModalVisible={openFilter}
       hotelSearchRequest={hotelSearchRequest}
       alternateHotelFilters={hotelList.alternateHotelFilters}
       getHotelList={getHotelList}
       isLoading={openFilter && isLoading}
  />
      
   
        <Box
          height={52}
          backgroundColor="#FFFFFF"
          flexDirection="row"
          justifyContent="center"
          alignItems="center">
          <TouchableOpacity style={{flex: 1}} onPress={openFilterPanel}>
            <Box
              flex={1}
              justifyContent="center"
              alignItems="center"
              flexDirection="row"
              borderRightWidth={1}
              height={51}
              borderColor={'#F7F8FB'}>
              <Icon name={CONSTANT_filterIcon} size={16} color="#777777" />
              <Text
                fontSize={15}
                fontFamily={CONSTANT_fontPrimarySemiBold}
                color="#555555"
                marginStart={8}>
                Filter
              </Text>
            </Box>
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 1}} onPress={applySort}>
            <Box
              flex={1}
              justifyContent="center"
              alignItems="center"
              flexDirection="row"
              height={51}>
              <Icon
                name={CONSTANT_dropDownArrowDarkIcon}
                size={16}
                color="#777777"
                style={{transform: [{rotate: sort ? '180deg' : '0deg'}]}}
              />
              <Text
                fontSize={15}
                fontFamily={CONSTANT_fontPrimarySemiBold}
                color="#555555"
                marginStart={8}>
                Sort
              </Text>
            </Box>
          </TouchableOpacity>
        </Box>
      </Box>
    );
  }),
);

export default StayHotelListScreen;
