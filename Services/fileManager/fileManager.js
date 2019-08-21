import RNFetchBlob from "rn-fetch-blob";
import { Platform } from "react-native";
import constants from "../../constants/constants";
import getWriteFilePermissionAndroid from "../getWriteFilePermissionAndroid/getWriteFilePermissionAndroid";
import FileViewer from "react-native-file-viewer";
import { logError } from "../errorLogger/errorLogger";

let dirs = RNFetchBlob.fs.dirs;

/**
 * Will download the file in the given url
 */
export const downloadFile = (url, fileName) => {
  return new Promise((resolve, reject) => {
    const downloadAction = () => {
      RNFetchBlob.config({
        fileCache: true,
        path: dirs.DocumentDir + "/" + fileName
      })
        .fetch("GET", url, {})
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    };
    if (Platform.OS === constants.platformAndroid) {
      getWriteFilePermissionAndroid(downloadAction, reject, () => null);
    } else {
      downloadAction();
    }
  });
};

export const openFile = fileName => {
  const path = dirs.DocumentDir + "/" + fileName;
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
    const path = dirs.DocumentDir + "/" + fileName;
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
