import React, {ReactNode, FunctionComponent} from 'react';
import {StyleEngineProps} from '@pyt/core/native';
import {Box, Text, Pill, BoxProps} from '@pyt/micros';
import {Insurance} from '@pyt/icons';
import {TextProps} from 'react-native';
export interface AssuranceCardProps extends StyleEngineProps {
  title: string;
  content?: string | ReactNode;
  list?: string[];
  fontFamily: string;
  titleProps?: TextProps;
  contentProps?: TextProps;
  pillTextProps?: TextProps;
  containerProps?: BoxProps;
  icon?: ReactNode;
}

export const AssuranceCard: FunctionComponent<AssuranceCardProps> = ({
  title,
  icon,
  content,
  list = [],
  fontFamily,
  titleProps = {},
  contentProps = {},
  pillTextProps = {},
  containerProps = {},
}) => {
  return (
    <Box
      backgroundColor="#ECE7FE"
      paddingHorizontal={20}
      paddingVertical={24}
      {...containerProps}>
      <Box
        borderBottomWidth={1}
        borderColor="#D3C7FF"
        flexDirection="row"
        paddingBottom={16}>
        {icon ? icon : <Insurance fill="#3E2598" width={20} height={20} />}
        <Text
          color={'#3E2598'}
          marginHorizontal={4}
          fontSize={17}
          lineHeight={21}
          fontWeight={'600'}
          fontFamily={fontFamily}
          {...titleProps}>
          {title}
        </Text>
      </Box>
      <Text
        color={'#333333'}
        marginTop={14}
        marginBottom={22}
        fontFamily={fontFamily}
        {...contentProps}>
        {content}
      </Text>
      <Box flexDirection="row" flexWrap="wrap">
        {list.map((text, index) => (
          <Pill
            text={text}
            marginBottom={8}
            marginEnd={8}
            key={`pill-${index}`}
            textProps={{fontFamily, ...pillTextProps}}
          />
        ))}
      </Box>
    </Box>
  );
};
