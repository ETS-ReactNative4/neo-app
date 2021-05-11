import React, {Fragment, FunctionComponent, ReactNode} from 'react';
import {StyleEngineProps} from '@pyt/core/native';
import {MiniImageSlider, MiniImageSliderProps} from './ImageSlider';
import {
  Box,
  Text,
  Button,
  DotSeparateList,
  ButtonProps,
  BoxProps,
  Pressable,
  TextProps,
} from '@pyt/micros';
import {Included} from '@pyt/icons';
// import {ReadMoreCard} from '@pyt/widgets/dist/esm/read-more-card';
// import { Bed, Included } from '@pyt/icons'
// import { ReadMoreCard } from '../read-more-card'
import {ReadMoreCard} from './ReadMoreCard';

export interface RoomCardProps extends StyleEngineProps {
  width?: number | string;
  strikedCost?: string;
  cost: string;
  costSubText?: string;
  cardSelected?: boolean;
  buttonText?: string;
  amenities?: [];
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
  onPress?: () => unknown;
}

const AmenitiesList = ({data, fontFamily}: {data: []; fontFamily: string}) => {
  return (
    <Box flexDirection="row" flexWrap="wrap" marginTop={12}
     marginBottom={4}
     >
      {data.map(
        (
          item: {
            icon: React.ReactElement | null;
            text: string;
          },
          index: number,
        ) => (
          <Box
            flexDirection="row"
            marginBottom={8}
            marginEnd={12}
            alignItems="center"
            key={`${index}-${item.text}`}>
            {item.icon ? <Text>{item.icon}</Text> : null}

            <Text
              fontFamily={fontFamily}
              fontSize={14}
              lineHeight={18}
              color="#333333"
              marginStart={item.icon ? 8 : 0}>
              {item.text}
            </Text>
          </Box>
        ),
      )}
    </Box>
  );
};

export const RoomCard: FunctionComponent<RoomCardProps> = ({
  width = '100%',
  strikedCost,
  cost,
  costSubText,
  buttonText,
  footerRightElement,
  amenities,
  sliderProps,
  dotSeparateList,
  title,
  titleProps = {},
  buttonProps = {},
  footerContainerProps = {},
  contentProps = {},
  footerElement,
  showViewLess,
  isReviewCard,
  fontFamily,
  onPress,
  rooms=[],
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
              RenderItem={<AmenitiesList data={[]} fontFamily={fontFamily} />}
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
                      {strikedCost}
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
                          fontFamily={fontFamily}>
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
                        <Included fill={'#ffffff'} style={{marginRight: 5}} />
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
                    text={buttonText || room.cardSelected ? 'Selected' : 'Select'}
                    textProps={{
                      color: room.cardSelected ? '#ffffff' : '#00C684'
                    }}
                    onPress={room.onPress}
                    {...buttonProps} />
                )}
              </Box>
            )}
          </Box>
        ))}
      </Box>
  );
};
