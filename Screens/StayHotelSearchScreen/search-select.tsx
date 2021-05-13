import {ChevronRight, ChevronTop} from '@pyt/icons';
import {
  Box,
  Pressable,
  Text,
  TextProps,
  InputBox,
  Button,
  ButtonProps,
} from '@pyt/micros';
import React, {
  FunctionComponent,
  ReactElement,
  ReactNode,
  useCallback,
  useRef,
  useState,
} from 'react';
import {StyleEngineProps} from '@pyt/core/native';
import {
  Alert,
  Animated,
  LayoutChangeEvent,
  Modal,
  StyleSheet,
  ViewProps,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {AnimatedInputBox} from './animated-input-box';
import {SearchLineItem} from '../SearchV2/components/SearchLineItem';
import {
  CONSTANT_fontPrimaryRegular,
  CONSTANT_fontPrimarySemiBold,
} from '../../constants/fonts';

export interface SelectOptionProps {
  label: string;
  value: string | number;
  subLabel?: string;
  cityId?: number;
}

export interface SearchSelectProps extends StyleEngineProps {
  closeButtonProps?: ButtonProps;
  options: SelectOptionProps[];
  onSelect: (option: SelectOptionProps) => unknown;
  ItemSeparatorComponent?: ReactElement;
  //   fontFamily: string | number | symbol | (string | number | symbol)[];
  label?: string;
  value?: string | number;
  disabled?: boolean;
  RenderView?: React.ReactElement;
  isLoading?: boolean;
}

export const SearchSelect: FunctionComponent<SearchSelectProps> = ({
  fontFamily,
  closeButtonProps = {},
  label,
  value,
  disabled,
  options = [],
  onSelect = () => null,
  ItemSeparatorComponent,
  RenderView,
  isLoading,
  ...restProp
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => setIsModalVisible(!isModalVisible);

  const searchedOptions = searchQuery
    ? options.filter(each => {
        const labelVal = each.label.replace(/ /g, '').toUpperCase();
        const query = searchQuery.replace(/ /g, '').toUpperCase();
        return labelVal.includes(query);
      })
    : options;

  return (
    <Box>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={disabled ? () => null : toggleModal}>
        {RenderView ? (
          React.cloneElement(RenderView, {})
        ) : (
          <InputBox label="Search" value={searchQuery} />
        )}
      </TouchableOpacity>
      <Modal
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={toggleModal}>
        <SafeAreaView style={{flex: 1}}>
          <Box
            borderRadius={12}
            backgroundColor={'#FFFFFF'}
            padding={12}
            flex={1}
            {...restProp}>
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between">
              <InputBox
                label={label || 'Select'}
                value={value}
                fontFamily={CONSTANT_fontPrimaryRegular}
                onChangeText={setSearchQuery}
                containerProps={{flex: 1}}
                // showClear={true}
              />
              {/* <InputBox
              containerProps={{flex: 1}}
              onChangeText={setSearchQuery}
			  fontFamily={fontFamily}
            /> */}
              <Button
                text="Close"
                textProps={{
                  fontSize: 13,
                  fontWeight: '600',
                  color: '#888888',
                  textTransform: 'uppercase',
                  fontFamily: fontFamily,
                }}
                onPress={toggleModal}
                marginStart={14}
                {...closeButtonProps}
              />
            </Box>
            <Box flex={1} marginTop={18}>
              <FlatList
                data={searchedOptions}
                keyboardShouldPersistTaps={'handled'}
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => {
                        console.log('clicked');
                        onSelect(item);
                        toggleModal();
                      }}>
                      <Box paddingHorizontal={16}>
                        <Text
                          fontSize={16}
                          lineHeight={20}
                          color="#000000"
                          fontFamily={fontFamily}>
                          {item.label}
                        </Text>
                      </Box>
                    </TouchableOpacity>
                  );
                }}
                ItemSeparatorComponent={() => {
                  return ItemSeparatorComponent ? (
                    React.cloneElement(ItemSeparatorComponent)
                  ) : (
                    <Box
                      height={1}
                      width={'100%'}
                      backgroundColor="#F7F7F7"
                      marginVertical={16}
                    />
                  );
                }}
                ListEmptyComponent={
                  <Box justifyContent="center" alignItems="center">
                    <Text
                      fontFamily={CONSTANT_fontPrimarySemiBold}
                      color="#888888">
                      {options.length ? '' : 'Loading...'}
                    </Text>
                  </Box>
                }
              />
            </Box>
          </Box>
        </SafeAreaView>
      </Modal>
    </Box>
  );
};
