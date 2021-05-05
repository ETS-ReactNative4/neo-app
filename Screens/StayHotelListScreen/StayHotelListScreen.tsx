import {AnimatedInputBox, Box, Button, Text} from '@pyt/micros';
import {HotelCard} from '@pyt/widgets/dist/esm/hotel-card';
import {inject, observer} from 'mobx-react';
import React from 'react';
import getSymbolFromCurrency from 'currency-symbol-map';
import {FlatList, ScrollView} from 'react-native';
import {
  CONSTANT_fontPrimaryRegular,
  CONSTANT_fontPrimarySemiBold,
} from '../../constants/fonts';
import {getGlobalPriceWithoutSymbol} from '../ExploreScreen/services/getPriceWithoutSymbol';
interface StayHotelListScreenProps {}
// @inject('otaHotel')
const StayHotelListScreen = inject('otaHotelStore')(
  observer(({otaHotelStore}) => {
    const {getHotelList, isLoading, hotelList} = otaHotelStore ?? {};
    const displayCurrency = 'IN';
    console.log(hotelList);
    return (
      <Box margin={12}>
        <ScrollView>
          {hotelList?.hotelCostingVOList.map(
            ({imageURL, otherImages = [], name, publishedCost}) => {
              const image = imageURL || otherImages?.[0];

              //  const cost =  getGlobalPriceWithoutSymbol({
              //     amount: parseInt((publishedCost as unknown) as string, 10),
              //     currency: displayCurrency
              //   })
              return (
                <HotelCard
                  width={'100%'}
                  title={name}
                  strikedCost="₹15,234"
                  cost={'809898' || `${getSymbolFromCurrency(displayCurrency)}`}
                  costSubText="2 nights & 2 adults"
                  marginBottom={20}
                  backgroundColor="#ffffff"
                  amenities={[
                    {icon: null, text: 'gkfjl'},
                    {icon: null, text: 'jgj'},
                  ]}
                  fontFamily={CONSTANT_fontPrimarySemiBold}
                  sliderProps={{
                    images: image ? [image] : [],
                    showArrow: true,
                  }}
                  dotSeparateList={[]}
                  footerRightElement={<></>}
                  onCardPress={() => null}
                />
              );
            },
          )}
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
      </Box>
    );
  }),
);

export default StayHotelListScreen;
