import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  StyleProp,
  ViewStyle,
  Platform,
  TouchableOpacity
} from "react-native";

import {
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular
} from "../../constants/fonts";
import {
  CONSTANT_white1,
  CONSTANT_white,
  CONSTANT_shade2,
  CONSTANT_shade3,
  CONSTANT_black1,
  CONSTANT_shade5
} from "../../constants/colorPallete";
import Icon from "../../CommonComponents/Icon/Icon";
import {
  CONSTANT_searchIcon,
  CONSTANT_closeIcon
} from "../../constants/imageAssets";

interface SearchBoxProps {
  containerStyle?: StyleProp<ViewStyle>;
  onChangeText: (text: string) => any;
  text: string;
  textPlaceholder: string;
  onClear: () => any;
}

const SearchBox = ({
  containerStyle,
  onChangeText,
  text,
  textPlaceholder,
  onClear
}: SearchBoxProps) => {
  return (
    <View style={[styles.searchBoxContainer, containerStyle]}>
      <View style={styles.searchBoxInner}>
        <View style={styles.searchIconStyle}>
          <Icon name={CONSTANT_searchIcon} size={16} color={CONSTANT_shade2} />
        </View>

        <View style={styles.searchInputWrapper}>
          <TextInput
            onChangeText={onChangeText}
            placeholderTextColor={CONSTANT_shade2}
            value={text}
            placeholder={textPlaceholder}
            style={styles.searchInputStyle}
          />
        </View>

        {text ? (
          <TouchableOpacity activeOpacity={0.8} onPress={onClear}>
            <View style={styles.closeIconStyle}>
              <Icon
                name={CONSTANT_closeIcon}
                size={12}
                color={CONSTANT_white}
              />
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBoxContainer: {
    backgroundColor: CONSTANT_white1,
    padding: 16
  },
  searchBoxInner: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: CONSTANT_shade5,
    paddingHorizontal: 12,
    height: 40
  },
  searchIconStyle: {
    marginRight: 8
  },
  closeIconStyle: {
    backgroundColor: CONSTANT_shade3,
    borderRadius: 50,
    padding: 4,
    marginLeft: 8
  },
  searchInputWrapper: {
    flex: 1
  },
  searchInputStyle: {
    color: CONSTANT_black1,
    backgroundColor: "transparent",
    ...Platform.select({
      ios: {
        marginTop: 2,
        ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 16)
      },
      android: {
        ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 14)
      }
    }),
    lineHeight: undefined // Please Don't add line-height for this field
  }
});

export default SearchBox;
