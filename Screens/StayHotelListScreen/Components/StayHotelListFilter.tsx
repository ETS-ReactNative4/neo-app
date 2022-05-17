import {Box, Text} from '@pyt/micros';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
// import FilterModalHeader from '../../ListingPageScreen/Components/FilterModalHeader';
import {StayHotelFooter} from './StayHotelFooter';
import _capitalize from 'lodash/capitalize';
import StaySection from './StaySection';
import Icon from '../../../CommonComponents/Icon/Icon';
import {CONSTANT_starActive} from '../../../constants/imageAssets';
import {CONSTANT_fontPrimaryRegular} from '../../../constants/fonts';

// import {
//   price as priceINR,
//   priceUAE,
//   priceUK,
//   priceUSD,
// } from '../../ListingPageScreen/filterOptions/filterOptions';
import storeService from '../../../Services/storeService/storeService';
import _toLower from 'lodash/toLower';
import {
  Checkbox,
  CheckboxOptionProps,
  Radiobox,
  RadioOptionProps,
} from '@pyt/micros';
import {StayHotelSearcRequestType} from '../../StayHotelSearchScreen/StayHotelSearchScreen';

const starOptions = [
  {label: '1', value: 1},
  {label: '2', value: 2},
  {label: '3', value: 3},
  {label: '4', value: 4},
  {label: '5', value: 5},
];

interface HotelFilterType {
  amenities: CheckboxOptionProps[] | [];
  starRatings: CheckboxOptionProps[] | [];
  types: CheckboxOptionProps[] | [];
  price: RadioOptionProps | {};
}

export const StayHotelListFilter = ({
  closeFilterPanel,
  isModalVisible,
  isLoading,
  hotelSearchRequest,
  getHotelList,
  alternateHotelFilters,
}: {
  closeFilterPanel: () => unknown;
  isModalVisible: boolean;
  isLoading: boolean;
  hotelSearchRequest: StayHotelSearcRequestType;
  getHotelList: () => unknown;
  alternateHotelFilters: {};
}) => {
  const [hotelFilters, setHotelFilters] = useState<HotelFilterType>({
    amenities: [],
    starRatings: [],
    types: [],
    price: {},
  });

  const getPriceFilter = () => {
    let price = priceINR;

    switch (_toLower(storeService.deviceLocaleStore.deviceLocale)) {
      case 'ae':
        price = priceUAE;
        break;
      case 'gb':
        price = priceUK;
        break;
      case 'us':
        price = priceUSD;
        break;
      default:
        break;
    }

    return price?.options?.map(priceOption => ({
      label: priceOption.text,
      value: priceOption.value,
    }));
  };
  const [applyClicked, setApplyClicked] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setApplyClicked(true);
    }
    if (applyClicked && !isLoading) {
      setApplyClicked(false);
      closeFilterPanel();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const updateFilters = (
    key: 'amenities' | 'starRatings' | 'types',
    option: CheckboxOptionProps,
  ) => {
    let currentIndex = -1;
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

  const onPriceUpdate = (costOption: RadioOptionProps) => {
    if (hotelFilters.price?.value === costOption.value) {
      hotelFilters.price = {};
    } else {
      hotelFilters.price = costOption;
    }
    setHotelFilters({
      ...hotelFilters,
    });
  };

  const onApply = () => {
    const {starRatings, amenities, types, price} = hotelFilters;

    const filters: {
      starRatings: (number | string)[];
      types: (number | string)[];
      amenities: (number | string)[];
      minPrice?: number;
      maxPrice?: number;
    } = {
      starRatings: starRatings.map((item: CheckboxOptionProps) =>
        item.value === 5 ? 4 : item.value,
      ), // used 4 star value for 5 star hotel to avoid the empty result since five star hotel not available
      types: types.map((item: CheckboxOptionProps) => item.value),
      amenities: amenities.map((item: CheckboxOptionProps) => item.value),
    };

    if (price.value) {
      const costArray = price.value?.split('_');
      const minPrice = parseInt(costArray[0] || 0, 10);
      const maxPrice = parseInt(costArray[1] || 0, 10);
      if (minPrice > -1) {
        filters.minPrice = minPrice;
      }
      if (maxPrice) {
        filters.maxPrice = maxPrice;
      }
    }

    hotelSearchRequest.filters = {...filters};
    getHotelList({...hotelSearchRequest});
  };

  const clearAll = () => {
    setHotelFilters({amenities: [], starRatings: [], types: [], price: {}});
  };

  const {amenities = [], types = []} = alternateHotelFilters ?? {};
  const amenitiesList = amenities?.map(
    (amenity: {name: string; code: number}) => ({
      label: _capitalize(amenity.name),
      value: amenity.code,
    }),
  );
  const typesList = types?.map((type: {name: string; code: number}) => ({
    label: type.name,
    value: type.code,
  }));

  const priceList = getPriceFilter();

  return (
    <Modal
      onBackButtonPress={closeFilterPanel}
      isVisible={isModalVisible}
      style={styles.modalContainer}>
      <SafeAreaView style={styles.filterContainer}>
        {/* <FilterModalHeader title={'Filters'} closeAction={closeFilterPanel} /> */}
        <ScrollView style={styles.scrollContainer}>
          <StaySection title="Amenities">
            <Checkbox
              options={amenitiesList}
              fontFamily={CONSTANT_fontPrimaryRegular}
              selectedOptions={hotelFilters.amenities}
              labelProps={{fontSize: 17}}
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
            <Box flexDirection="row">
              {starOptions.map(star => {
                const isSelected = hotelFilters.starRatings?.some(
                  item => item.value === star.value,
                );
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => updateFilters('starRatings', star)}>
                    <Box
                      width={56}
                      height={52}
                      borderColor={isSelected ? '#00774F' : '#D4D4D4'}
                      justifyContent="center"
                      alignItems="center"
                      marginEnd={10}
                      borderRadius={4}
                      borderWidth={1}
                      flexDirection="row"
                      backgroundColor={isSelected ? '#00774F' : 'transparent'}>
                      <Text
                        marginEnd={5}
                        fontFamily={CONSTANT_fontPrimaryRegular}
                        fontSize={17}
                        color={isSelected ? '#ffffff' : '#000000'}>
                        {star.label}
                      </Text>
                      <Icon name={CONSTANT_starActive} color="#E5B52E" />
                    </Box>
                  </TouchableOpacity>
                );
              })}
            </Box>
          </StaySection>
          <StaySection title="Price">
            <Radiobox
              options={priceList}
              selectedOption={hotelFilters.price}
              fontFamily={CONSTANT_fontPrimaryRegular}
              labelProps={{fontSize: 17}}
              activeIconColor="#00774F"
              onSelect={item => {
                onPriceUpdate(item);
              }}
              onUnSelect={item => {
                onPriceUpdate(item);
              }}
            />
          </StaySection>
          <StaySection title="Hotel Type">
            <Checkbox
              options={typesList}
              selectedOptions={hotelFilters.types}
              activeIconColor="#00774F"
              fontFamily={CONSTANT_fontPrimaryRegular}
              labelProps={{fontSize: 17}}
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
          buttonText={isLoading ? 'Applying..' : 'Apply'}
          buttonProps={{width: 124}}
          rightButtonAction={onApply}
          leftButtonAction={clearAll}
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
