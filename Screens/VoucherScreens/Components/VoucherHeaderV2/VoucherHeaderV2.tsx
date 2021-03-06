import React from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  ImageStyle,
  Image,
  Text,
  TextStyle,
  TouchableOpacity,
  ImageSourcePropType
} from "react-native";
//@ts-ignore
import { responsiveWidth } from "react-native-responsive-dimensions";
import SmartImageV2 from "../../../../CommonComponents/SmartImage/SmartImageV2";
import constants from "../../../../constants/constants";
import Icon from "../../../../CommonComponents/Icon/Icon";
import { isIphoneX } from "react-native-iphone-x-helper";
import { CONSTANT_defaultPlaceImage } from "../../../../constants/imageAssets";

const xHeight: number = isIphoneX() ? constants.xNotchHeight : 0;

export interface VoucherHeaderV2Props {
  containerStyle?: ImageStyle;
  icon?: string;
  title: string;
  backAction: () => void;
  coverImage: ImageSourcePropType;
}

const VoucherHeaderV2 = ({
  containerStyle = StyleSheet.create({}),
  icon,
  title,
  backAction,
  coverImage
}: VoucherHeaderV2Props) => {
  return (
    <SmartImageV2
      source={coverImage}
      style={[styles.voucherHeaderV2Container, containerStyle]}
      fallbackSource={{ uri: CONSTANT_defaultPlaceImage }}
    >
      <View style={styles.imageBackdrop}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={backAction}
          style={styles.backArrowContainer}
        >
          <Icon name={constants.closeIcon} size={20} color={"white"} />
        </TouchableOpacity>
        {icon ? <Icon name={icon} size={20} color={"white"} /> : null}
        <Text style={styles.titleText}>{title}</Text>
        <Image
          style={styles.circleSpace}
          source={constants.semiCircleShape}
          resizeMode={"contain"}
        />
        <View style={styles.placeHolderLeft} />
        <View style={styles.placeHolderRight} />
      </View>
    </SmartImageV2>
  );
};

export interface VoucherHeaderV2Styles {
  voucherHeaderV2Container: ImageStyle;
  imageBackdrop: ViewStyle;
  backArrowContainer: ViewStyle;
  titleText: TextStyle;
  circleSpace: ImageStyle;
  placeHolderLeft: ViewStyle;
  placeHolderRight: ViewStyle;
}

const styles = StyleSheet.create<VoucherHeaderV2Styles>({
  voucherHeaderV2Container: {
    width: responsiveWidth(100),
    height: 214 + xHeight
  },
  imageBackdrop: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.6)"
  },
  backArrowContainer: {
    position: "absolute",
    top: xHeight,
    left: 0,
    padding: 20
  },
  titleText: {
    ...constants.fontCustom(constants.primarySemiBold, 18, 25),
    color: "white",
    paddingTop: 12,
    marginHorizontal: 24,
    textAlign: "center"
  },
  circleSpace: {
    position: "absolute",
    bottom: 0,
    left: responsiveWidth(50) - 20
  },
  placeHolderLeft: {
    height: 16,
    width: responsiveWidth(50) - 18.3,
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "white"
  },
  placeHolderRight: {
    height: 16,
    width: responsiveWidth(50) - 20,
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "white"
  }
});

export default VoucherHeaderV2;
