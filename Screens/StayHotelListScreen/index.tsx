import React, {Fragment, FunctionComponent, ReactNode} from 'react';
import {StyleEngineProps} from '@pyt/core/native';
import {Box, Image, Text} from '@pyt/micros';
import {ChevronRight} from '@pyt/icons';
import {Pressable} from 'react-native';

export interface OfferCardProps extends StyleEngineProps {
  fontFamily: string;
  description?: string;
  title?: string;
  contentElement?: ReactNode;
  src?: string;
  onPress?: () => unknown;
}

export const OfferCard: FunctionComponent<OfferCardProps> = ({
  src,
  fontFamily,
  title,
  description,
  contentElement,
  onPress,
  ...restProps
}) => {
  const Wrapper = onPress ? Pressable : Fragment;
  return (
    <Wrapper onPress={onPress}>
      <Box
        height={120}
        borderRadius={12}
        justifyContent="center"
        overflow="hidden"
        paddingHorizontal={20}
        {...restProps}>
        {src && (
          <Image
            source={{image: src}}
            width={'100%'}
            height={'100%'}
            position="absolute"
            start={0}
          />
        )}
        {contentElement || (
          <Box>
            {title && (
              <Text
                fontSize={19}
                lineHeight={24}
                color={'#FFFFFF'}
                fontWeight={'600'}
                fontFamily={fontFamily}
                alignItems="center">
                {title} <ChevronRight fill={'#FFFFFF'} width={12} height={12} />
              </Text>
            )}
            {description && (
              <Text
                fontSize={13}
                lineHeight={21}
                color={'#D3C7FF'}
                fontWeight={'600'}
                fontFamily={fontFamily}
                marginTop={6}>
                {description}
              </Text>
            )}
          </Box>
        )}
      </Box>
    </Wrapper>
  );
};
