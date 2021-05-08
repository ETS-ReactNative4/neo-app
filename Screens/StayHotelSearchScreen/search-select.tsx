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
  TouchableOpacity
} from 'react-native';
import {AnimatedInputBox} from './animated-input-box';
import { SearchLineItem } from '../SearchV2/components/SearchLineItem';

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
}

export const SearchSelect: FunctionComponent<SearchSelectProps> = ({
  fontFamily,
  closeButtonProps = {},
  label,
  value,
  disabled,
  options = [
    {label: 'Chennai', value: 'chennai'},
    {label: 'Chennai', value: 'chennai'},
    {label: 'Chennai', value: 'chennai'},
  ],
  onSelect = () => null,
  ItemSeparatorComponent,
  RenderView,
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
  console.log('isModalVisible', isModalVisible);
  return (
    <SafeAreaView>
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={disabled ? () => null : toggleModal}>
      {RenderView ? (
        React.cloneElement(RenderView, {})
      ) : (
        <AnimatedInputBox
          label={label || 'Select'}
          value={value}
          editable={false}
          zIndex={0}
        />
      )}
       </TouchableOpacity>
      <Modal
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={toggleModal}>
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
            <AnimatedInputBox
              label={label || 'Select'}
              value={value}
              onChangeText={setSearchQuery}
              containerProps={{flex: 1}}
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
                    onPress={() => {   console.log('clicked');
                      onSelect(item);
                      toggleModal()
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
            />
          </Box>
        </Box>
      </Modal>
   
    </SafeAreaView>
  );
};
