import React, { useEffect } from "react";
import Modal from "react-native-modal";
import { StyleSheet, Platform } from "react-native";
import compareVersion from "compare-versions";
import ModalContent from "./Components/ModalContent";
import useForceUpdateCheck from "./Components/hooks/useForceUpdateCheck";
import DeviceInfo from "react-native-device-info";
import { CONSTANT_platformIos } from "../../../../constants/stringConstants";
import openCustomTab from "../../../../Services/openCustomTab/openCustomTab";
import { observer, inject } from "mobx-react";
import ChatDetails from "../../../../mobx/ChatDetails";
import { chatLauncher } from "../../../../Services/freshchatService/freshchatService";

export interface ForceUpdateModalComponentProps {
  chatDetailsStore: ChatDetails;
}

const ForceUpdateModalComponent = ({
  chatDetailsStore
}: ForceUpdateModalComponentProps) => {
  const [{ successResponseData }, checkForForceUpdate] = useForceUpdateCheck();

  useEffect(() => {
    checkForForceUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const requiresForceUpdate = successResponseData
    ? compareVersion(
        DeviceInfo.getVersion(),
        Platform.OS === CONSTANT_platformIos
          ? successResponseData.iosVersion
          : successResponseData.androidVersion
      ) > -1
      ? false
      : true
    : false;

  const openAppStore = () => {
    openCustomTab(
      Platform.OS === CONSTANT_platformIos
        ? successResponseData?.iosUrl
        : successResponseData?.androidUrl
    );
  };

  const openSupport = () => {
    chatLauncher();
  };

  const { isChatActive } = chatDetailsStore;

  return (
    <Modal style={styles.modalWrapperStyle} isVisible={requiresForceUpdate}>
      <ModalContent
        title={"Your App is Outdated"}
        description={
          "We’ve made some changes to enhance your app experience. Please update to continue using the app."
        }
        buttonText={"Update now"}
        buttonClickAction={openAppStore}
        enableSupport={isChatActive}
        bottomText={"Having problem in updating the app?"}
        linkText={"Message us"}
        linkClickAction={openSupport}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalWrapperStyle: {
    margin: 0,
    paddingHorizontal: 16
  }
});

const ForceUpdateModal = inject("chatDetailsStore")(
  observer(ForceUpdateModalComponent)
);

export default ForceUpdateModal;
