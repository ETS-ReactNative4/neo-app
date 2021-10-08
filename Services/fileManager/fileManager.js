import RNFetchBlob from 'rn-fetch-blob';
import {Platform} from 'react-native';
import constants from '../../constants/constants';
import getWriteFilePermissionAndroid from '../getWriteFilePermissionAndroid/getWriteFilePermissionAndroid';
import FileViewer from 'react-native-file-viewer';
import {logError} from '../errorLogger/errorLogger';
import {CONSTANT_platformAndroid} from '../../constants/stringConstants';

let dirs = RNFetchBlob.fs.dirs;

/**
 * Will download the file in the given url
 */
export const downloadFile = (url, fileName) => {
  return new Promise((resolve, reject) => {
    const downloadAction = () => {
      const filePath =
        Platform.OS === CONSTANT_platformAndroid
          ? `${dirs.DownloadDir}/${fileName}`
          : `${dirs.DocumentDir}/${fileName}`;
      const fileExt = url
        .split('.')
        .splice(-1)
        .pop();
      const configOptions = Platform.select({
        ios: {
          fileCache: true,
          path: filePath,
          appendExt: fileExt,
          notification: true,
          title: fileName,
        },
        android: {
          fileCache: true,
          appendExt: fileExt,
          addAndroidDownloads: {
            path: filePath,
            useDownloadManager: true,
            notification: true,
            mediaScannable: true,
            title: fileName,
          },
        },
      });
      RNFetchBlob.config(configOptions)
        .fetch('GET', url, {})
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    };
    /**
     * Only android requires requesting permissions
     * from the user.
     */
    if (Platform.OS === constants.platformAndroid) {
      getWriteFilePermissionAndroid(downloadAction, reject, () => null);
    } else {
      downloadAction();
    }
  });
};

export const openFile = fileName => {
  const path =
    Platform.OS === CONSTANT_platformAndroid
      ? `${dirs.DownloadDir}/${fileName}`
      : `${dirs.DocumentDir}/${fileName}`;
  return new Promise((resolve, reject) => {
    FileViewer.open(path)
      .then(() => {
        resolve();
      })
      .catch(error => {
        logError(error);
        reject();
      });
  });
};

/**
 * Will check if a file with the filename already exists in the downloads
 */
export const checkIfFileExists = fileName => {
  return new Promise((resolve, reject) => {
    const path =
      Platform.OS === CONSTANT_platformAndroid
        ? `${dirs.DownloadDir}/${fileName}`
        : `${dirs.DocumentDir}/${fileName}`;
    RNFetchBlob.fs
      .exists(path)
      .then(exist => {
        resolve(exist);
      })
      .catch(error => {
        logError(error);
        reject();
      });
  });
};
