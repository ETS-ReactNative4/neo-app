import React from "react";
import Modal, { ModalProps } from "react-native-modal";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  SafeAreaView
} from "react-native";
import { CONSTANT_closeIcon } from "../../constants/imageAssets";
import {
  CONSTANT_black1,
  CONSTANT_white,
  CONSTANT_shade5,
  CONSTANT_shade3,
  CONSTANT_shade1
} from "../../constants/colorPallete";
import Icon from "../Icon/Icon";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold,
  CONSTANT_primaryLight
} from "../../constants/fonts";

export interface IPickerOption {
  text: string;
  value: any;
}

export interface PickerProps {
  modalProps?: ModalProps;
  closeModal: () => any;
  onSelectOption: (option: IPickerOption) => any;
  isVisible: boolean;
  options: IPickerOption[];
  title: string;
}

const Picker = ({
  modalProps,
  closeModal = () => null,
  isVisible,
  options,
  title,
  onSelectOption = () => null
}: PickerProps) => {
  const {
    style: modalStyle,
    animationIn = "slideInUp",
    animationOut = "slideOutDown",
    ...otherModalProps
  } = modalProps || {};
  return (
    <Modal
      animationIn={animationIn}
      animationOut={animationOut}
      {...otherModalProps}
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}
      style={[styles.modalWrapper, modalStyle]}
      isVisible={isVisible}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={[styles.headerContainerStyle]}>
          <TouchableOpacity
            style={styles.closeIconStyle}
            activeOpacity={0.8}
            onPress={closeModal}
          >
            <Icon name={CONSTANT_closeIcon} size={24} color={CONSTANT_black1} />
          </TouchableOpacity>

          <Text style={styles.headerTextStyle}>{title}</Text>
        </View>
        <ScrollView>
          {options.map((option, optionIndex) => {
            const clickHandler = () => {
              onSelectOption(option);
              closeModal();
            };
            return (
              <TouchableOpacity
                key={optionIndex}
                onPress={clickHandler}
                style={styles.countryCodeTouchable}
              >
                <View style={styles.countryCodeItem}>
                  <Text style={styles.countryName}>{`${option.text}`}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: CONSTANT_white
  },
  modalWrapper: { margin: 0 },
  headerContainerStyle: {
    backgroundColor: CONSTANT_white,
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: CONSTANT_shade5
  },
  closeIconStyle: {
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
    width: 56,
    height: 56
  },
  headerTextStyle: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 18, 24)
  },
  countryCodeTouchable: {
    justifyContent: "center",
    paddingHorizontal: 24,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: CONSTANT_shade3
  },
  countryCodeItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16
  },
  countryName: {
    ...CONSTANT_fontCustom(CONSTANT_primaryLight, 20, 26),
    color: CONSTANT_shade1
  }
});

export default Picker;
