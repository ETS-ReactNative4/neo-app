import React from 'react';
import {RNCamera} from 'react-native-camera';
import {Box} from '@pyt/micros';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Camera as CameraIcon} from '../Icons/Icons';
import {theme} from '../../../constants/colorPallete';

const PendingView = () => (
  <Box
    flex={1}
    width="100%"
    backgroundColor={theme.colors.primary001}
    justifyContent="center"
    alignItems="center">
    <Box
      alignItems="center"
      justifyContent="center"
      padding={25}
      borderRadius={20}
      backgroundColor={theme.colors.primary006}>
      <CameraIcon fill={theme.colors.primary003} width={40} height={40} />
    </Box>
  </Box>
);

const Camera = ({
  onCapture,
}: {
  onCapture: (uri: string, type: string) => void;
}) => {
  const takePicture = async (camera: RNCamera) => {
    const options = {};
    const data = await camera.takePictureAsync(options);
    onCapture(data.uri, 'image/jpeg');
  };
  return (
    <RNCamera
      style={styles.preview}
      captureAudio={false}
      flashMode={RNCamera.Constants.FlashMode.auto}
      androidCameraPermissionOptions={{
        title: 'Permission to use camera',
        message: 'We need your permission to use your camera',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }}>
      {({camera, status}) => {
        if (status !== 'READY') {
          return <PendingView />;
        }

        return (
          <Box flex={0} flexDirection="row" justifyContent="center">
            <TouchableOpacity
              onPress={() => takePicture(camera)}
              style={styles.capture}>
              <CameraIcon
                fill={theme.colors.primary003}
                width={35}
                height={35}
              />
            </TouchableOpacity>
          </Box>
        );
      }}
    </RNCamera>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: theme.colors.primary006,
    borderRadius: 20,
    padding: 15,
    alignSelf: 'center',
    margin: 20,
  },
});

export default Camera;
