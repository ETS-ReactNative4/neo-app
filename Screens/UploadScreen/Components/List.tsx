import {Box, Text} from '@pyt/micros';
import React from 'react';
import {SectionList} from 'react-native';
import {theme} from '../../../constants/colorPallete';
import {CONSTANT_primarySemiBold} from '../../../constants/fonts';
import PendingItem, {OnCancel, OnUpload} from './PendingItem';
import UploadItem, {OnDelete} from './UploadItem';

export type File = {
  id: string;
  name: string;
  upload_at: string;
  uri: string;
  type: string;
};

export type ListData = {
  title: string;
  type: string;
  data: File[];
}[];

type ListProps = {
  data: ListData;
  onUpload: OnUpload;
  onCancel: OnCancel;
  onDelete: OnDelete;
};

const List = ({data, onUpload, onCancel, onDelete}: ListProps) => {
  return (
    <Box flex={1} margin={16}>
      <SectionList
        sections={data}
        keyExtractor={(item, index) => item.id + index}
        renderItem={({item, index, section: {type}}) =>
          type === 'pending' ? (
            <PendingItem
              item={item}
              index={index}
              onUpload={onUpload}
              onCancel={onCancel}
            />
          ) : (
            <UploadItem item={item} onDelete={onDelete} />
          )
        }
        renderSectionHeader={({section: {title}}) => (
          <Text
            color={theme.colors.neutral007}
            fontFamily={CONSTANT_primarySemiBold}
            fontSize={15}
            lineHeight={16}>
            {title}
          </Text>
        )}
      />
    </Box>
  );
};

export default List;
