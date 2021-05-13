import React, {ReactNode, FunctionComponent} from 'react';
import {Box, BoxProps} from '@pyt/micros';

export interface TripAdvisorProps extends BoxProps {
  stars: number;
  iconSize: number;
  totalCount: number;
  color?: string;
}

export const TripAdvisor: FunctionComponent<TripAdvisorProps> = ({
  stars,
  iconSize = 14,
  totalCount = 5,
  color,
  ...restProps
}: TripAdvisorProps) => {
  const wholeStar = Math.floor(stars);

  const Circle = ({children, index}: {children: ReactNode; index: number}) => (
    <Box
      width={iconSize}
      height={iconSize}
      alignItems="center"
      justifyContent="center"
      borderWidth={1.5}
      borderRadius={iconSize}
      borderColor={color || '#00C684'}
      key={`star-${index}`}>
      {children}
    </Box>
  );
  return (
    <Box flexDirection="row" {...restProps}>
      {Array.from([...Array(totalCount)], (_, index) => (
        <Circle index={index}>
          {index + 1 <= wholeStar ? (
            <Box
              backgroundColor={color || '#00c684'}
              width={iconSize / 2}
              height={iconSize / 2}
              borderRadius={iconSize}
              opacity={0.8}
            />
          ) : Math.ceil(stars) === index + 1 ? (
            <Box
              backgroundColor={color || '#00c684'}
              width={iconSize / 2}
              height={iconSize / 2}
              borderRadius={iconSize}
              position="relative">
              <Box
                backgroundColor={'#ffffff'}
                width={Math.floor(iconSize / 4)}
                height={Math.round(iconSize / 2)}
                borderBottomRightRadius={iconSize}
                borderTopRightRadius={iconSize}
                start={'60%'}
                position="absolute"
              />
            </Box>
          ) : null}
        </Circle>
      ))}
    </Box>
  );
};
