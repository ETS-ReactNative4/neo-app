import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../../Services/PropTypeValidation/forbidExtraProps";
import SimpleButton from "../../../../CommonComponents/SimpleButton/SimpleButton";
import { responsiveWidth } from "react-native-responsive-dimensions";
import constants from "../../../../constants/constants";

const NewJournal = ({
  title,
  image,
  desc,
  buttonText,
  action = () => null
}) => {
  return (
    <View style={styles.newJournalContainer}>
      <Image
        resizeMode={"cover"}
        style={styles.newJournalIllustration}
        source={image}
      />
      <View style={styles.newJournalTextArea}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.descText}>{desc}</Text>
        <SimpleButton
          containerStyle={{
            borderRadius: 2,
            height: 45,
            width: 186,
            marginTop: 32
          }}
          textStyle={{ marginRight: 8 }}
          icon={constants.arrowRight}
          iconSize={12}
          rightIcon={true}
          underlayColor={constants.firstColorAlpha(0.8)}
          action={action}
          text={buttonText}
          textColor={"white"}
        />
      </View>
    </View>
  );
};

NewJournal.propTypes = forbidExtraProps({
  title: PropTypes.string.isRequired,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
  desc: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired
});

const styles = StyleSheet.create({
  newJournalContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white"
  },
  newJournalIllustration: {
    width: responsiveWidth(100),
    height: responsiveWidth(100)
  },
  newJournalTextArea: {
    alignItems: "center",
    marginHorizontal: 24
  },
  titleText: {
    ...constants.font24(constants.primarySemiBold),
    marginTop: 24,
    marginBottom: 16,
    color: constants.black1
  },
  descText: {
    ...constants.fontCustom(constants.primaryLight, 15, 26),
    textAlign: "center",
    color: constants.black1
  }
});

export default NewJournal;
