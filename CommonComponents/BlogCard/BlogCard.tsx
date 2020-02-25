import React from "react";
import {
  StyleSheet,
  ViewStyle,
  StyleProp,
  Text,
  TouchableOpacity
} from "react-native";

import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold
} from "../../constants/fonts";
import { CONSTANT_white, CONSTANT_black2 } from "../../constants/colorPallete";

interface BlogCardProps {
  containerStyle?: StyleProp<ViewStyle>;
  smallTitle: string;
  title: string;
  bgColor?: string;
  action: () => any;
}

const BlogCard = ({
  containerStyle,
  smallTitle,
  title,
  bgColor = CONSTANT_black2,
  action = () => null
}: BlogCardProps) => {
  const boxColor = { backgroundColor: bgColor };
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={action}
      style={[styles.blogCardContainer, boxColor, containerStyle]}
    >
      <Text style={styles.smallTitleStyle}>{smallTitle}</Text>
      <Text style={styles.titleStyle} numberOfLines={3} ellipsizeMode={"tail"}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  blogCardContainer: {
    width: 146,
    height: 172,
    padding: 16,
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: 8,
    marginRight: 12
  },
  smallTitleStyle: {
    color: CONSTANT_white,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 11),
    textTransform: "uppercase"
  },
  titleStyle: {
    color: CONSTANT_white,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 16, 20)
  }
});

export default BlogCard;
