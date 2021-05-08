// import { Checkbox } from '@pyt/micros';
import {Box, Text} from '@pyt/micros';
import React, {useState} from 'react';
import {Checkbox} from '../../StayHotelSearchScreen/Checkbox';
import Modal from 'react-native-modal';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {CONSTANT_white} from '../../../constants/colorPallete';
import FilterModalHeader from '../../ListingPageScreen/Components/FilterModalHeader';
import {StayHotelFooter} from './StayHotelFooter';
import _capitalize from 'lodash/capitalize';
import StaySection from './StaySection';
import Icon from '../../../CommonComponents/Icon/Icon';
import { CONSTANT_starActive } from '../../../constants/imageAssets';
import { CONSTANT_fontPrimaryRegular } from '../../../constants/fonts';

const starOptions = [
  {label: '1', value: 1},
  {label: '2', value: 2},
  {label: '3', value: 3},
  {label: '4', value: 4},
  {label: '5', value: 5},
];

const defaultData = {
    amenities: [],
    starRatings: [],
    types: [],
}
export const StayHotelListFilter = ({
  alternateHotelFilters,
  closeFilterPanel,
  isModalVisible,
  hotelSearchRequest,
  getHotelList,
  isLoading
}) => {
  const [hotelFilters, setHotelFilters] = useState({
    ...defaultData
  });
console.log('hotelFilters-->',hotelFilters)
  const updateFilters = (key: string, option: {}) => {
    let currentIndex = -1;
    console.log(' hotelFilters[key]', hotelFilters[key])
    hotelFilters[key].some((item, index) => {
      if (item.value === option.value) {
        currentIndex = index;
        return true;
      }
      return false;
    });
    if (currentIndex > -1) {
      hotelFilters[key].splice(currentIndex, 1);
    } else {
      hotelFilters[key].push(option);
    }
    setHotelFilters({
      ...hotelFilters,
    });
  };

  const onApply = () => {
    // const hotelSearchRequest = _get(data, 'hotelSearchRequest', {})
    const {starRatings, amenities} = hotelFilters;

    const filters = {
      starRatings: starRatings.map(e => e.value),
      types: types.map(e => e.value),
      amenities: amenities.map(e => e.value),
    //   minPrice: priceRange[0] !== 0 ? priceRange[0] : undefined,
    //   maxPrice: priceRange[1] !== 0 ? priceRange[1] : undefined,
    }
    hotelSearchRequest.filters = filters
    getHotelList(hotelSearchRequest)
  };
  const {amenities = [], types = []} = alternateHotelFilters;
  const amenitiesList = amenities?.map(amenity => ({
    label: _capitalize(amenity.name),
    value: amenity.code,
  }));
  const typesList = types?.map(type => ({label: type.name, value: type.code}));
  return (
    <Modal
      onBackButtonPress={closeFilterPanel}
      isVisible={isModalVisible}
      style={styles.modalContainer}>
      <SafeAreaView style={styles.filterContainer}>
        <FilterModalHeader title={'Filters'} closeAction={closeFilterPanel} />
        <ScrollView style={styles.scrollContainer}>
          <StaySection title="Amenities">
            <Checkbox
              options={amenitiesList}
              selectedOptions={hotelFilters.amenities}
              activeIconColor="#00774F"
              onSelect={item => {
                updateFilters('amenities', item);
              }}
              onUnSelect={item => {
                updateFilters('amenities', item);
              }}
            />
          </StaySection>
          <StaySection title="Star Category">
              <Box flexDirection='row'>
            {starOptions.map(star => {
                const isSelected = hotelFilters.starRatings?.some(item => item.value === star.value)
              return (
                <TouchableOpacity activeOpacity={0.8} onPress={()=>updateFilters('starRatings',star)}>
                  <Box
                    width={56}
                    height={52}
                    borderColor={isSelected ? "#00774F" :"#D4D4D4"}
                    justifyContent="center"
                    alignItems="center"
                    marginEnd={10}
                    borderRadius={4}
                    borderWidth={1}
                    flexDirection='row'
                    backgroundColor={ isSelected? '#00774F' : 'transparent'} 
                    >
                    <Text marginEnd={5} fontFamily={CONSTANT_fontPrimaryRegular} fontSize={17} color={isSelected ? '#ffffff' : '#000000'}>{star.label}</Text>
                    <Icon name={CONSTANT_starActive} color='#E5B52E'/>
                  </Box>

                </TouchableOpacity>
              )
            })}
            </Box>
          </StaySection>
          <StaySection title="Hotel Type">
            <Checkbox
              options={typesList}
              selectedOptions={hotelFilters.types}
              activeIconColor="#00774F"
              onSelect={item => {
                updateFilters('types', item);
              }}
              onUnSelect={item => {
                updateFilters('types', item);
              }}
            />
          </StaySection>
        </ScrollView>
        <StayHotelFooter
          leftButtonText="Clear all"
          buttonText={isLoading ? 'Applying..' : "Apply"}
          buttonProps={{width: 124}}
          rightButtonAction={onApply}
        />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  scrollContainer: {
    paddingVertical: 2,
  },
  bottomBar: {
    paddingBottom: 24,
  },
  modalContainer: {
    margin: 0,
  },
});
