import React, { Component } from "react";
import {
  View,
  Text,
  Clipboard,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import { inject, observer } from "mobx-react/custom";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import FastImage from "react-native-fast-image";
import { responsiveWidth } from "react-native-responsive-dimensions";
import constants from "../../constants/constants";
import SimpleButton from "../../CommonComponents/SimpleButton/SimpleButton";
import Icon from "../../CommonComponents/Icon/Icon";
import { logError } from "../../Services/errorLogger/errorLogger";
import { toastCenter } from "../../Services/toast/toast";
import Share from "react-native-share";
import { share, singleShare } from "../../Services/shareService/share";

@ErrorBoundary()
@inject("journalStore")
@observer
class JournalShare extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <CommonHeader
          leftAction={() => {
            navigation.goBack();
          }}
          title={"Share"}
          navigation={navigation}
        />
      )
    };
  };

  copyToClipboard = () => {
    try {
      const { journalUrl } = this.props.journalStore;
      Clipboard.setString(journalUrl);
      toastCenter("Text copied to clipboard");
    } catch (e) {
      toastCenter("Something went wrong...");
      logError("Failed to copy string to clipboard", { e });
    }
  };

  shareFacebook = () => {
    const { journalTitle, journalUrl } = this.props.journalStore;
    const shareOptions = {
      message: journalTitle,
      url: journalUrl,
      social: Share.Social.FACEBOOK
    };
    singleShare(shareOptions);
  };

  shareTwitter = () => {
    const { journalTitle, journalUrl } = this.props.journalStore;
    const shareOptions = {
      message: journalTitle,
      url: journalUrl,
      social: Share.Social.TWITTER
    };
    singleShare(shareOptions);
  };

  share = () => {
    const { journalTitle, journalUrl } = this.props.journalStore;
    const shareOptions = {
      message: `${journalTitle} ${journalUrl}`,
      url: journalUrl
    };
    share(shareOptions);
  };

  render() {
    const { journalUrl, shareIllustration } = this.props.journalStore;

    const imageSource = { uri: shareIllustration };

    return (
      <FastImage
        style={styles.journalShareContainer}
        resizeMode={FastImage.resizeMode.cover}
        source={imageSource}
      >
        <Text style={styles.shareScreenTitle}>
          {"The gateway to your world"}
        </Text>
        <View style={styles.urlContainer}>
          <Text numberOfLines={1} ellipsizeMode={"tail"} style={styles.urlText}>
            {journalUrl}
          </Text>
        </View>
        <SimpleButton
          text={"Copy to Clipboard"}
          textColor={"white"}
          textStyle={{
            ...constants.fontCustom(constants.primaryRegular, 14)
          }}
          containerStyle={{
            borderRadius: 2,
            marginTop: 24
          }}
          action={this.copyToClipboard}
          underlayColor={constants.firstColorAlpha(0.8)}
        />
        <View style={styles.shareIconRow}>
          <TouchableOpacity
            onPress={this.shareFacebook}
            style={[styles.iconContainer, styles.fbBackground]}
          >
            <Icon name={constants.facebookIcon} size={12} color={"white"} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.shareTwitter}
            style={[styles.iconContainer, styles.twitterBackground]}
          >
            <Icon name={constants.twitterIcon} size={12} color={"white"} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.share}
            style={[styles.iconContainer, styles.shareBackground]}
          >
            <Icon name={constants.shareIcon} size={12} color={"white"} />
          </TouchableOpacity>
        </View>
      </FastImage>
    );
  }
}

const styles = StyleSheet.create({
  journalShareContainer: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center"
  },
  shareScreenTitle: {
    ...constants.fontCustom(constants.primarySemiBold, 24),
    color: constants.black1,
    marginTop: 24
  },
  urlContainer: {
    width: responsiveWidth(100) - 48,
    backgroundColor: "white",
    marginTop: 24,
    padding: 8,
    ...constants.elevationFive,
    borderWidth: 1,
    borderColor: "transparent",
    alignItems: "center",
    justifyContent: "center"
  },
  urlText: {
    ...constants.fontCustom(constants.primaryRegular, 12, 23),
    color: constants.black1
  },
  shareIconRow: {
    marginTop: 24,
    flexDirection: "row"
  },
  iconContainer: {
    height: 24,
    width: 24,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
    borderRadius: 12
  },
  fbBackground: {},
  twitterBackground: {},
  shareBackground: {}
});

export default JournalShare;
