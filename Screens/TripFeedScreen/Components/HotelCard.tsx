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
import {ReadMoreCard} from './ReadMoreCard'

export interface HotelCardProps extends StyleEngineProps {
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
    <Box flexDirection="row" flexWrap="wrap" marginTop={12} marginBottom={4}>
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
              marginStart={item.icon ? 8 :0}>
              {item.text}
            </Text>
          </Box>
        ),
      )}
    </Box>
  );
};

export const HotelCard: FunctionComponent<HotelCardProps> = ({
  width = '100%',
  strikedCost,
  cost,
  costSubText,
  buttonText,
  cardSelected,
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
  ...props
}) => {
  const Wrapper = onPress ? Pressable : Fragment;
  const wrapperProps = onPress ? {onPress} : {};
  const titleSection = (
    <Box flexShrink={1}>
      <Text
        color={'#333333'}
        fontSize={17}
        lineHeight={21}
        fontWeight={'600'}
        numberOfLines={2}
        ellipsizeMode={'tail'}
        fontFamily={fontFamily}
        {...titleProps}>
        {title}
      </Text>
      {dotSeparateList?.length ? (
        <DotSeparateList list={dotSeparateList} marginTop={9} />
      ) : null}
    </Box>
  );
  return (
    <Wrapper {...wrapperProps}>
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
          {isReviewCard ? titleSection : null}
        </Box>

        <Box
          paddingHorizontal={12}
          paddingVertical={12}
          flexShrink={1}
          {...contentProps}>
          {!isReviewCard ? titleSection : null}
          <ReadMoreCard
            title="gj"
            data={amenities}
            defaultVisibleItemCount={4}
            fontFamily={fontFamily}
            showViewLess={showViewLess}
            RenderItem={<AmenitiesList data={[]} fontFamily={fontFamily} />}
          />
          {footerElement || (
            <Box
              borderTopWidth={1}
              borderColor={'#F0F0F0'}
              paddingTop={16}
              marginTop={15}
              marginBottom={4}
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              {...footerContainerProps}>
              <Box>
                {strikedCost ? (
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
                {cost ? (
                  <Text
                    fontSize={20}
                    lineHeight={25}
                    fontWeight={'600'}
                    letterSpacing={-0.02}
                    color="#000000"
                    fontFamily={fontFamily}>
                    {cost}{' '}
                    {costSubText ? (
                      <Text
                        fontSize={13}
                        letterSpacing={-0.02}
                        color="#777777"
                        marginHorizontal={4}
                        fontFamily={fontFamily}>
                        {costSubText}
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
                    cardSelected ? (
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
                  active={cardSelected}
                  {...buttonProps}>
                  <Text
                    fontSize={14}
                    lineHeight={18}
                    fontWeight={'600'}
                    color={cardSelected ? '#ffffff' : '#00C684'}
                    fontFamily={fontFamily}>
                    {buttonText || cardSelected ? 'Selected' : 'Select'}
                  </Text>
                </Button>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Wrapper>
  );
};
