import React, {useCallback, useEffect, useState} from 'react';
import {Box, Text} from '@pyt/micros';
import * as Progress from 'react-native-progress';
import {
  CONSTANT_primaryRegular,
  CONSTANT_primarySemiBold,
} from '../../../constants/fonts';
import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {theme} from '../../../constants/colorPallete';
import {Checkmark, Close} from '../Icons/Icons';
import {File as FileType} from './List';

export type OnUpload = (file: any, index: any) => Promise<boolean>;
export type OnCancel = (item: FileType) => void;

type Props = {
  item: FileType;
  index: number;
  onUpload: OnUpload;
  onCancel: OnCancel;
};

const PendingItem = ({item, index, onUpload, onCancel}: Props) => {
  const [file, setFile] = useState<FileType>(item);
  const [name, onChangeText] = useState<string>(
    item.name.replace(/\.[^/.]+$/, ''),
  );
  const [isUploading, setIsUploading] = useState<boolean>(false);

  useEffect(() => {
    let fileName = '';

    if (name.trim() === '') {
      fileName = file.uri.split('/').pop() as string;
    } else {
      fileName =
        item.name === ''
          ? `${name.trim()}.jpg`
          : `${name.trim()}.${item.name.split('.').pop()}`;
    }

    setFile(state => ({
      ...state,
      name: fileName,
    }));
  }, [setFile, name, item]);

  const upload = useCallback(
    async (recivedfile, fileIndex) => {
      setIsUploading(true);
      try {
        await onUpload(recivedfile, fileIndex);
        onCancel(item);
      } catch {
        setIsUploading(false);
      }
    },
    [onUpload, setIsUploading, onCancel, item],
  );

  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      paddingVertical={20}
      borderBottomColor={theme.colors.neutral009}
      borderBottomWidth={1}>
      <Box flexDirection="row" flex={1}>
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
            {file.type.split('/').pop()}
          </Text>
        </Box>
        <Box flexDirection="column" flex={1} marginHorizontal={12}>
          {!isUploading ? (
            <TextInput
              style={styles.fileInput}
              onChangeText={onChangeText}
              value={name}
              defaultValue={name}
              placeholder="Enter file name"
            />
          ) : (
            <>
              <Text
                marginBottom={10}
                color={theme.colors.neutral007}
                fontFamily={CONSTANT_primaryRegular}
                fontSize={17}
                lineHeight={21}>
                {name}
              </Text>
              <Progress.Bar
                indeterminate
                borderColor={theme.colors.neutral009}
                color={theme.colors.neutral009}
                height={2}
                width={null}
              />
            </>
          )}
        </Box>
      </Box>
      <Box
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        marginRight={13}>
        {!isUploading && (
          <TouchableOpacity onPress={() => upload(file, index)}>
            <Checkmark fill={theme.colors.neutral004} width={25} height={25} />
          </TouchableOpacity>
        )}
        <Box marginHorizontal={10} />
        <TouchableOpacity onPress={() => onCancel(item)}>
          <Close fill={theme.colors.neutral004} width={20} height={20} />
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

export default PendingItem;

const styles = StyleSheet.create({
  fileInput: {
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: theme.colors.neutral009,
    width: '100%',
  },
});
