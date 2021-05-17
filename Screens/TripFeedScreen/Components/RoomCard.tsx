import React, {FunctionComponent, ReactNode} from 'react';
import {StyleEngineProps} from '@pyt/core/native';
import {MiniImageSlider, MiniImageSliderProps} from './ImageSlider';
import {
  Box,
  Text,
  Button,
  ButtonProps,
  BoxProps,
  TextProps,
  AmenitiesList,
} from '@pyt/micros';

import {ReadMoreCard} from '@pyt/widgets/dist/esm/read-more-card';
import {CONSTANT_fontPrimarySemiBold} from '../../../constants/fonts';
import Icon from '../../../CommonComponents/Icon/Icon';
import {CONSTANT_checkIcon} from '../../../constants/imageAssets';

type RoomOptionCardDataType = {
  strikedCost?: string;
  cost: string;
  costSubText?: string;
  cardSelected?: boolean;
  buttonText?: string;
  amenities?: [];
  onPress?: () => unknown;
  title: string;
  amenitiesProps?: BoxProps;
  costSubTextProps?: BoxProps;
};
export interface RoomCardProps extends StyleEngineProps {
  width?: number | string;

  footerRightElement?: React.ReactElement;
  footerElement?: React.ReactElement;
  sliderProps: MiniImageSliderProps;
  dotSeparateList?: ReactNode[];
  title: string;
  titleProps?: TextProps;
  buttonProps?: ButtonProps;
  footerContainerProps?: BoxProps;
  contentProps?: BoxProps;
  showViewLess?: boolean;
  isReviewCard?: boolean;
  rooms: RoomOptionCardDataType[];
}

export const RoomCard: FunctionComponent<RoomCardProps> = ({
  width,
  footerRightElement,
  sliderProps,
  title,
  titleProps = {},
  buttonProps = {},
  footerContainerProps = {},
  contentProps = {},
  footerElement,
  showViewLess,
  isReviewCard,
  fontFamily,
  rooms = [],
  ...props
}) => {
  return (
    <Box
      borderRadius={12}
      overflow="hidden"
      width={width}
      borderWidth={1}
      borderColor={'#F6F6F6'}
      {...props}>
      <Box
        flexDirection={isReviewCard ? 'row' : 'column'}
        alignItems={isReviewCard ? 'center' : 'flex-start'}>
        <MiniImageSlider
          height={148}
          width={'100%'}
          borderRadius={0}
          autoplay={false}
          {...sliderProps}
        />
      </Box>
      <Text
        color={'#333333'}
        fontSize={17}
        lineHeight={21}
        fontWeight={'600'}
        numberOfLines={2}
        ellipsizeMode={'tail'}
        fontFamily={fontFamily}
        paddingVertical={16}
        marginHorizontal={16}
        borderBottomWidth={1}
        borderColor={'#E5E5E5'}
        {...titleProps}>
        {title}
      </Text>

      {rooms?.map(room => (
        <Box
          marginHorizontal={16}
          paddingVertical={24}
          flexShrink={1}
          borderBottomWidth={1}
          borderColor={'#E5E5E5'}
          {...contentProps}>
          <Text
            color={'#888888'}
            fontSize={14}
            lineHeight={18}
            fontWeight={'700'}
            fontFamily={fontFamily}
            marginBottom={4}
            {...titleProps}>
            {room.title}
          </Text>
          <ReadMoreCard
            title=""
            data={room.amenities}
            defaultVisibleItemCount={4}
            fontFamily={fontFamily}
            showViewLess={showViewLess}
            RenderItem={
              <AmenitiesList
                data={[]}
                itemProp={{width: 'auto', marginEnd: 12}}
                {...room.amenitiesProps}
              />
            }
          />
          {footerElement || (
            <Box
              marginBottom={4}
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              {...footerContainerProps}>
              <Box>
                {room.strikedCost ? (
                  <Text
                    fontSize={15}
                    lineHeight={19}
                    fontWeight={'600'}
                    color="#777777"
                    textDecorationLine="line-through"
                    fontFamily={fontFamily}>
                    {room.strikedCost}
                  </Text>
                ) : null}
                {room.cost ? (
                  <Text
                    fontSize={20}
                    lineHeight={25}
                    fontWeight={'600'}
                    letterSpacing={-0.02}
                    color="#000000"
                    fontFamily={fontFamily}>
                    {room.cost}{' '}
                    {room.costSubText ? (
                      <Text
                        fontSize={13}
                        letterSpacing={-0.02}
                        color="#777777"
                        marginHorizontal={4}
                        fontFamily={fontFamily}
                        {...(room.costSubTextProps || {})}>
                        {room.costSubText}
                      </Text>
                    ) : null}
                  </Text>
                ) : null}
              </Box>
              {footerRightElement || (
                <Button
                  width={106}
                  height={40}
                  borderRadius={8}
                  icon={
                    room.cardSelected ? (
                      <Icon
                        name={CONSTANT_checkIcon}
                        color={'#ffffff'}
                        size={16}
                      />
                    ) : (
                      <></>
                    )
                  }
                  iconPosition="left"
                  borderWidth={1.5}
                  borderColor="#00C684"
                  activeProps={{
                    backgroundColor: '#00C684',
                  }}
                  active={room.cardSelected}
                  text={room.cardSelected ? ' Selected' : 'Select'}
                  textProps={{
                    color: room.cardSelected ? '#ffffff' : '#00C684',
                    fontFamily: CONSTANT_fontPrimarySemiBold,
                  }}
                  onPress={room.onPress}
                  alignItems="center"
                  {...buttonProps}
                />
              )}
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};
