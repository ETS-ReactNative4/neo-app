import React, {useCallback, useState} from 'react';
import {Box, Text} from '@pyt/micros';
import * as Progress from 'react-native-progress';
import {
  CONSTANT_primaryRegular,
  CONSTANT_primarySemiBold,
} from '../../../constants/fonts';
import {theme} from '../../../constants/colorPallete';
import {Delete} from '../Icons/Icons';
import {File} from './List';
import {Alert, TouchableOpacity} from 'react-native';
import deepLink from '../../../Services/deepLink/deepLink';

export type OnDelete = (item: File) => void;

type Props = {
  item: File;
  onDelete: OnDelete;
};

const UploadItem = ({item, onDelete}: Props) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const handlePress = useCallback(async () => {
    deepLink({
      link: item.uri,
    });
  }, [item]);
  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      paddingVertical={20}
      borderBottomColor={theme.colors.neutral009}
      borderBottomWidth={1}>
      <Box flex={1} marginRight={50}>
        <TouchableOpacity onPress={handlePress}>
          <Box flexDirection="row">
            <Box
              paddingVertical={12}
              paddingHorizontal={9}
              borderRadius={8}
              justifyContent="center"
              alignItems="center"
              backgroundColor={theme.colors.neutral009}>
              <Text
                fontFamily={CONSTANT_primarySemiBold}
                fontSize={14}
                lineHeight={21}
                textTransform="uppercase"
                color={theme.colors.neutral004}>
                {item.type}
              </Text>
            </Box>
            <Box flexDirection="column" marginHorizontal={12}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                marginBottom={4}
                color={theme.colors.neutral007}
                fontFamily={CONSTANT_primaryRegular}
                fontSize={17}
                lineHeight={21}>
                {item.name}
              </Text>
              {!isDeleting ? (
                <Text
                  width="100%"
                  color={theme.colors.neutral004}
                  fontFamily={CONSTANT_primaryRegular}
                  fontSize={13}
                  lineHeight={16}>
                  Added on {item.upload_at}
                </Text>
              ) : (
                <Progress.Bar
                  indeterminate
                  borderColor={theme.colors.neutral009}
                  color={theme.colors.neutral009}
                  height={2}
                  width={null}
                />
              )}
            </Box>
          </Box>
        </TouchableOpacity>
      </Box>
      <Box justifyContent="center" alignItems="center">
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Delete', 'Are you sure?', [
              {
                text: 'Cancel',
                onPress: () => {},
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => {
                  setIsDeleting(true);
                  onDelete(item);
                },
              },
            ]);
          }}>
          <Delete fill={theme.colors.neutral004} width={25} height={25} />
        </TouchableOpacity>
      </Box>
    </Box>
  );
};
export default UploadItem;
