import {ChevronRight} from '@pyt/icons';
import {Box, Button, Text} from '@pyt/micros';
import React, {useState} from 'react';
import {CONSTANT_fileDownload} from '../../../constants/appText';
import {theme} from '../../../constants/colorPallete';
import {
  CONSTANT_fontPrimaryRegular,
  CONSTANT_fontPrimarySemiBold,
} from '../../../constants/fonts';
import {logError} from '../../../Services/errorLogger/errorLogger';
import {
  downloadFile,
  openFile,
} from '../../../Services/fileManager/fileManager';
import {toastBottom} from '../../../Services/toast/toast';
import {CONSTANT_pytClubBenefits} from '../../../constants/apiUrls';

const Circle = ({disable}: {disable: boolean}) => (
  <Box
    width={16}
    height={16}
    borderRadius={16}
    borderWidth={1.5}
    borderColor={disable ? '#AAAAAA' : theme.colors.primary003}
    justifyContent="center"
    alignItems="center">
    <Box
      width={6}
      height={6}
      borderRadius={6}
      backgroundColor={disable ? '#AAAAAA' : theme.colors.primary003}
    />
  </Box>
);

const Bar = ({lineFilledWidth = 0}: {lineFilledWidth: number}) => (
  <Box height={6} borderWidth={0} flex={1} backgroundColor={'#F0F0F0'}>
    <Box
      width={`${lineFilledWidth}%`}
      height={6}
      backgroundColor={theme.colors.primary003}
      borderBottomEndRadius={lineFilledWidth > 60 ? 0 : 6}
      borderTopEndRadius={lineFilledWidth > 60 ? 0 : 6}
    />
  </Box>
);
export const SeeBenefitsCard = ({
  memberType,
  amountToSpendText,
}: {
  memberType: string;
  amountToSpendText: string;
}) => {
  const [fileLoading, setFileLoading] = useState(false);
  const member = memberType.split(' ');
  const level = ['Silver', 'Gold', 'Platinum'].indexOf(member[0]);

  const onPress = () => {
    const fileName = 'pytClub .pdf';
    setFileLoading(true);
    downloadFile(CONSTANT_pytClubBenefits, fileName)
      .then(() => {
        openFile(fileName);
        setFileLoading(false);
      })
      .catch(error => {
        if (error) {
          logError(CONSTANT_fileDownload, {error});
        }
        setFileLoading(false);
        toastBottom(CONSTANT_fileDownload);
      });
  };

  return (
    <Box
      paddingHorizontal={20}
      paddingTop={36}
      paddingBottom={24}
      backgroundColor={theme.colors.neutral001}
      alignItems="center">
      <Box flexDirection="row">
        {['Silver', 'Gold', 'Platinum'].map((text, index) => (
          <Text
            fontFamily={CONSTANT_fontPrimarySemiBold}
            fontSize={15}
            lineHeight={19}
            marginBottom={10}
            flex={index === 1 ? 1 : 2}
            textAlign={index ? 'right' : 'left'}
            paddingEnd={index === 1 ? 16 : 0}>
            {text}
          </Text>
        ))}
      </Box>
      <Box flexDirection="row" alignItems="center">
        {['Silver', 'Gold'].map((text, index) => {
          let width = 0;
          if (index < level) {
            width = 100;
          } else if (index === level && index !== 2) {
            width = 60;
          } else if (level === 2) {
            width = 100;
          }
          return (
            <Box flexDirection="row" alignItems="center" flex={1}>
              <Circle disable={!width} />
              <Bar lineFilledWidth={width} />
              {index === 1 && <Circle disable={width < 100} />}
            </Box>
          );
        })}
      </Box>

      <Text
        fontFamily={CONSTANT_fontPrimaryRegular}
        fontSize={15}
        lineHeight={20}
        color={theme.colors.neutral007}
        alignItems="flex-start"
        marginVertical={20}>
        {level > -1 ? (
          <>
            Book for{' '}
            <Text
              fontFamily={CONSTANT_fontPrimarySemiBold}
              color={theme.colors.neutral008}>
              {amountToSpendText.split(' ')[1]}
            </Text>{' '}
            to become {level === 1 ? 'Platinum member' : 'Gold member'}
          </>
        ) : (
          amountToSpendText
        )}
      </Text>

      <Button
        width={140}
        height={44}
        backgroundColor={theme.colors.primary002}
        onPress={onPress}
        paddingVertical={12}
        loading={fileLoading}>
        <Text
          fontFamily={CONSTANT_fontPrimarySemiBold}
          color={theme.colors.neutral001}
          fontSize={14}>
          {fileLoading ? 'Loading..' : 'See benefits'}{' '}
          {!fileLoading ? (
            <ChevronRight fill={theme.colors.neutral001} />
          ) : null}
        </Text>
      </Button>
    </Box>
  );
};
