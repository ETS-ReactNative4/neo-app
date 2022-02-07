import React, {useCallback, useEffect, useRef, useState} from 'react';
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
  const cameraRef = useRef<RNCamera>(null);
  const [cameraId, setCameraId] = useState<string>('');

  const getIds = useCallback(async () => {
    if (cameraRef.current) {
      const allCamIds = await cameraRef.current.getCameraIdsAsync();

      console.log({allCamIds});

      const cameraIds = allCamIds.filter(d => {
        return d.type === RNCamera.Constants.Type.back;
      });

      if (cameraIds.length) {
        setCameraId(cameraIds[0].id);
      }
    }
  }, [cameraRef, setCameraId]);

  useEffect(() => {
    getIds();
  }, [getIds]);

  const takePicture = useCallback(
    async (camera: RNCamera) => {
      const options = {};
      try {
        if (cameraId === '') {
          await getIds();
        }
        const data = await camera.takePictureAsync(options);
        onCapture(data.uri, 'image/jpeg');
      } catch (err) {
        console.log(err);
      }
    },
    [getIds, cameraId, onCapture],
  );

  return (
    <RNCamera
      ref={cameraRef}
      cameraId={cameraId}
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
