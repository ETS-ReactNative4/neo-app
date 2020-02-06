import React, { Fragment, useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleProp,
  ViewStyle,
  StyleSheet,
  Platform,
  TouchableOpacity,
  TextInputProps
} from "react-native";
import {
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular
} from "../../../constants/fonts";
import { CONSTANT_shade1 } from "../../../constants/colorPallete";
import LottieView from "lottie-react-native";
import { CONSTANT_visaSuccessAnimation } from "../../../constants/imageAssets";
import CountryCodePicker from "../../MobileNumberScreen/Components/CountryCodePicker";

export interface PhoneNumberInputProps extends TextInputProps {
  placeholder: string;
  phoneNumber: string;
  countryCode: string;
  emoji: string;
  containerStyle?: StyleProp<ViewStyle>;
  onChangeText: (text: string) => any;
  isLoading: boolean;
  onCountryCodeChange: (ccode: string, emoji: string) => any;
}

export interface ICountryCodeData {
  alpha2: string;
  alpha3: string;
  countryCallingCodes: string[];
  currencies: string[];
  emoji: string;
  ioc: string;
  languages: string[];
  name: string;
  status: string;
}

const PhoneNumberInput = ({
  placeholder = "",
  phoneNumber = "",
  countryCode = "",
  emoji = "🇮🇳",
  onChangeText,
  isLoading = false,
  onCountryCodeChange,
  ...otherProps
}: PhoneNumberInputProps) => {
  const [isPickerActive, setPickerActiveStatus] = useState<boolean>(false);

  const openPicker = () => setPickerActiveStatus(true);

  const closePicker = () => setPickerActiveStatus(false);

  const onSelectCountryCode = (
    selectedCountryCode: string,
    item: ICountryCodeData
  ) => onCountryCodeChange(selectedCountryCode, item.emoji);

  return (
    <Fragment>
      <CountryCodePicker
        isVisible={isPickerActive}
        onClose={closePicker}
        selectCountryCode={onSelectCountryCode}
      />
      <View style={styles.phoneNumberContainer}>
        <TouchableOpacity
          onPress={openPicker}
          style={styles.countryCodeWrapper}
        >
          <Text style={styles.emojiText}>{emoji}</Text>
          <Text style={styles.countryCodeText}>{countryCode}</Text>
        </TouchableOpacity>
        <View style={styles.textInputWrapper}>
          <TextInput
            keyboardType="phone-pad"
            style={styles.textInput}
            placeholder={placeholder}
            value={phoneNumber}
            onChangeText={onChangeText}
            returnKeyType="done"
            {...otherProps}
          />
        </View>
        <View style={styles.animationSection}>
          {isLoading ? (
            <LottieView
              source={CONSTANT_visaSuccessAnimation()}
              autoPlay
              loop
            />
          ) : null}
        </View>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  phoneNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 4,
    borderBottomColor: CONSTANT_shade1,
    borderBottomWidth: 1,
    ...Platform.select({
      ios: {
        height: 36
      }
    })
  },
  countryCodeWrapper: {
    flexDirection: "row",
    alignItems: "center"
  },
  emojiText: {
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 18),
    color: CONSTANT_shade1,
    ...Platform.select({
      ios: {
        lineHeight: undefined,
        marginBottom: 1
      }
    })
  },
  countryCodeText: {
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 18),
    color: CONSTANT_shade1,
    marginHorizontal: 8,
    marginTop: 2
  },
  textInputWrapper: {
    flex: 1
  },
  textInput: {
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 18),
    color: CONSTANT_shade1,
    ...Platform.select({
      ios: {
        height: 36,
        paddingLeft: 8
      }
    }),
    lineHeight: undefined
  },
  animationSection: {
    height: 48,
    width: 48
  }
});

export default PhoneNumberInput;
