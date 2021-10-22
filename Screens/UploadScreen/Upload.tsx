import React, {useCallback, useEffect, useState} from 'react';
import {Box, Text} from '@pyt/micros';
import {inject, observer} from 'mobx-react';
import {TouchableOpacity, Modal, StyleSheet, Image} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import * as Progress from 'react-native-progress';
import {theme} from '../../constants/colorPallete';
import {
  CONSTANT_primaryRegular,
  CONSTANT_primarySemiBold,
} from '../../constants/fonts';
import User from '../../mobx/User';
import ErrorBoundary from '../../CommonComponents/ErrorBoundary/ErrorBoundary';
import {IMobileServerResponse} from '../../TypeInterfaces/INetworkResponse';
import {CONSTANT_uploadAssets} from '../../constants/apiUrls';
import fetchCall from '../../Services/networkRequests/fetchCall';
import {
  Camera as CameraIcon,
  Document,
  Plus,
  Image as ImageIcon,
} from './Icons/Icons';
import Camera from './Components/Camera';
import moment from 'moment';
import List, {ListData, File} from './Components/List';
import {useNavigation} from '@react-navigation/native';
import useListFilesApi from './hooks/useListFilesApi';
import {CONSTANT_NoFilesUploads} from '../../constants/imageAssets';

export interface UploadScreenProps {
  userStore: User;
  itineraryId?: string;
  source?: string;
}

const Upload = ({userStore, itineraryId, source}: UploadScreenProps) => {
  const naviagtion = useNavigation();
  const [openCamera, setOpenCamera] = useState<boolean>(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [
    {successResponseData, isSuccess, isLoading},
    getFiles,
  ] = useListFilesApi();

  useEffect(() => {
    naviagtion.setOptions({
      headerTitleAlign: 'center',
      title: 'File Uploads',
    });
  }, [naviagtion]);

  useEffect(() => {
    if (userStore.userDisplayDetails.userId) {
      getFiles(userStore.userDisplayDetails.userId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userStore]);

  useEffect(() => {
    if (isSuccess) {
      if (successResponseData?.data?.length) {
        setUploadedFiles(
          successResponseData.data.map(item => {
            const fileName = item.fileKey.split('/').pop() as string;
            const [name, type] = fileName.split('.');
            return {
              id: item.id,
              name: name,
              type,
              uri: item.fileUrl,
              upload_at: moment(item.uploadedAt).format('Do MMM YYYY'),
            };
          }),
        );
      }
    }
  }, [isSuccess, successResponseData, setUploadedFiles]);

  const upload = useCallback(
    async (file: File) => {
      const body = new FormData();

      body.append('file', {
        uri: file.uri,
        type: file.type,
        name: file.name,
      });

      if (userStore.userDisplayDetails.userId) {
        body.append('userId', userStore.userDisplayDetails.userId);
      }
      if (itineraryId) {
        body.append('itineraryId', itineraryId);
      }
      if (source) {
        body.append('prefix', source);
      }

      return await fetchCall(CONSTANT_uploadAssets, 'PUT', body);
    },
    [userStore, itineraryId, source],
  );

  const onCapture = useCallback(
    (uri: string, type: string) => {
      setOpenCamera(false);
      setPendingFiles(state => {
        return [
          ...state,
          {
            id: `${state.length}`,
            name: '',
            type,
            uri,
            upload_at: moment().format('Do MMM YYYY'),
          },
        ];
      });
    },
    [setOpenCamera, setPendingFiles],
  );

  const pickFile = useCallback(async type => {
    try {
      const res = await DocumentPicker.pickSingle({
        type,
      });

      setPendingFiles(state => {
        return [
          ...state,
          {
            id: `${state.length}`,
            name: res.name,
            type: res.type as string,
            uri: res.uri,
            upload_at: moment().format('Do MMM YYYY'),
          },
        ];
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
        //console.log(err);
      } else {
        //console.log(err);
      }
    }
  }, []);

  const onUpload = useCallback(
    (file: File): Promise<boolean> => {
      return new Promise(async (resolve, reject) => {
        try {
          const respose: IMobileServerResponse = await upload(file);
          console.log({respose});
          resolve(true);
          getFiles(userStore.userDisplayDetails.userId);
        } catch (err) {
          console.log(err);
          reject(false);
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [upload, userStore],
  );

  const onCancel = useCallback(
    async item => {
      const pending = pendingFiles.filter(file => file.id !== item.id);
      setPendingFiles(pending);
    },
    [pendingFiles, setPendingFiles],
  );

  const onDelete = useCallback(
    async item => {
      try {
        await fetchCall(`${CONSTANT_uploadAssets}/${item.id}`, 'DELETE');
      } catch {}

      getFiles(userStore.userDisplayDetails.userId);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userStore],
  );

  let data: ListData = [];

  if (pendingFiles.length) {
    data = [
      {
        title: 'Pending uploads',
        type: 'pending',
        data: pendingFiles,
      },
    ];
  }

  if (uploadedFiles.length) {
    data = [
      ...data,
      {
        title: 'Your files',
        type: 'saved',
        data: uploadedFiles,
      },
    ];
  }

  return (
    <Box flex={1} backgroundColor={theme.colors.neutral001}>
      <Modal
        animationType="slide"
        visible={openCamera}
        onRequestClose={() => {
          setOpenCamera(!openCamera);
        }}>
        <Camera onCapture={onCapture} />
      </Modal>
      <Box flex={1} backgroundColor={theme.colors.neutral001}>
        {data.length ? (
          <List
            data={data}
            onUpload={onUpload}
            onCancel={onCancel}
            onDelete={onDelete}
          />
        ) : (
          <Box alignItems="center">
            <Image
              source={CONSTANT_NoFilesUploads}
              style={styles.uploadProgress}
              resizeMode="contain"
            />
            {isLoading ? (
              <Progress.Bar
                indeterminate
                borderColor={theme.colors.primary006}
                color={theme.colors.primary006}
                height={2}
                width={100}
              />
            ) : (
              <Text paddingHorizontal={20}>
                You haven’t uploaded any files till now
              </Text>
            )}
          </Box>
        )}
      </Box>
      <Box
        backgroundColor={theme.colors.primary001}
        paddingVertical={24}
        paddingHorizontal={16}>
        <Text
          fontFamily={CONSTANT_primarySemiBold}
          fontSize={15}
          lineHeight={16}>
          Upload your files here
        </Text>
        <Box paddingTop={16} flexDirection="row" justifyContent="space-between">
          <Box flexDirection="column" marginRight={20} alignItems="center">
            <TouchableOpacity
              onPress={() => {
                setOpenCamera(true);
              }}>
              <Box
                alignItems="center"
                justifyContent="center"
                padding={25}
                borderRadius={20}
                marginBottom={8}
                backgroundColor={theme.colors.primary006}>
                <CameraIcon
                  fill={theme.colors.primary003}
                  width={25}
                  height={25}
                />
              </Box>
            </TouchableOpacity>
            <Text
              fontFamily={CONSTANT_primaryRegular}
              fontSize={14}
              lineHeight={18}>
              Camera
            </Text>
          </Box>

          <Box flexDirection="column" marginRight={20} alignItems="center">
            <TouchableOpacity
              onPress={() => {
                pickFile([DocumentPicker.types.images]);
              }}>
              <Box
                alignItems="center"
                justifyContent="center"
                padding={25}
                borderRadius={20}
                marginBottom={8}
                backgroundColor={theme.colors.primary006}>
                <ImageIcon
                  fill={theme.colors.primary003}
                  width={25}
                  height={25}
                />
              </Box>
            </TouchableOpacity>
            <Text
              fontFamily={CONSTANT_primaryRegular}
              fontSize={14}
              lineHeight={18}>
              Gallery
            </Text>
          </Box>

          <Box flexDirection="column" marginRight={20} alignItems="center">
            <TouchableOpacity
              onPress={() => {
                pickFile([
                  DocumentPicker.types.doc,
                  DocumentPicker.types.docx,
                  DocumentPicker.types.pdf,
                ]);
              }}>
              <Box
                alignItems="center"
                justifyContent="center"
                padding={25}
                borderRadius={20}
                marginBottom={8}
                backgroundColor={theme.colors.primary006}>
                <Document
                  fill={theme.colors.primary003}
                  width={25}
                  height={25}
                />
              </Box>
            </TouchableOpacity>
            <Text
              fontFamily={CONSTANT_primaryRegular}
              fontSize={14}
              lineHeight={18}>
              Document
            </Text>
          </Box>

          <Box flexDirection="column" marginRight={20} alignItems="center">
            <TouchableOpacity
              onPress={() => {
                pickFile([DocumentPicker.types.allFiles]);
              }}>
              <Box
                alignItems="center"
                justifyContent="center"
                padding={22}
                borderRadius={20}
                marginBottom={8}
                borderStyle="dashed"
                borderColor={theme.colors.primary003}
                borderWidth={3}>
                <Plus fill={theme.colors.primary003} width={25} height={25} />
              </Box>
            </TouchableOpacity>
            <Text
              fontFamily={CONSTANT_primaryRegular}
              fontSize={14}
              lineHeight={18}>
              Others
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ErrorBoundary()(inject('userStore')(observer(Upload)));

const styles = StyleSheet.create({
  uploadProgress: {
    width: 200,
  },
});
