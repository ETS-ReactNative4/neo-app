import React from "react";
import {
  View,
  ViewStyle,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";
import {
  CONSTANT_primarySemiBold,
  CONSTANT_fontCustom
} from "../../../constants/fonts";
import {
  CONSTANT_black1,
  CONSTANT_firstColor,
  CONSTANT_shade5
} from "../../../constants/colorPallete";
import { CONSTANT_backIcon } from "../../../constants/imageAssets";
import Icon from "../../../CommonComponents/Icon/Icon";

interface TravellerProfileDetailsTitleProps {
  containerStyle?: ViewStyle;
  title: string;
  editProfile?: boolean;
  editProfileAction?: () => any;
}

const TravellerProfileDetailsTitle = ({
  containerStyle,
  title,
  editProfile = false,
  editProfileAction = () => {}
}: TravellerProfileDetailsTitleProps) => {
  return (
    <View style={[styles.TitleTextWrapper, containerStyle]}>
      <Text style={styles.TitleText}>{title}</Text>
      {editProfile ? (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={editProfileAction}
          style={styles.editProfileWrapper}
        >
          <Text style={styles.editProfileText}>EDIT PROFILE</Text>

          <View style={styles.backIconStyle}>
            <Icon
              name={CONSTANT_backIcon}
              color={CONSTANT_firstColor}
              size={14}
            />
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  profileDetailsContainer: {
    padding: 24,
    marginBottom: 4,
    backgroundColor: CONSTANT_shade5
  },
  TitleTextWrapper: {
    flexDirection: "row",
    marginBottom: 24
  },
  TitleText: {
    flex: 1,
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 16)
  },
  editProfileWrapper: {
    flexDirection: "row",
    alignItems: "center"
  },
  editProfileText: {
    color: CONSTANT_firstColor,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 14),
    textTransform: "uppercase",
    textDecorationLine: "underline"
  },
  backIconStyle: {
    marginTop: -2,
    transform: [{ scaleX: -1 }]
  }
});

export default TravellerProfileDetailsTitle;
