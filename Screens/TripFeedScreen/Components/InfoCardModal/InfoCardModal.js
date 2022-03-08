import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import constants from '../../../../constants/constants';
import SimpleButton from '../../../../CommonComponents/SimpleButton/SimpleButton';
import FastImage from 'react-native-fast-image';
import forbidExtraProps from '../../../../Services/PropTypeValidation/forbidExtraProps';
import Icon from '../../../../CommonComponents/Icon/Icon';
import resolveLinks from '../../../../Services/resolveLinks/resolveLinks';
import SmartImageV2 from '../../../../CommonComponents/SmartImage/SmartImageV2';
import Video from 'react-native-video';
import {SafeAreaView} from 'react-native-safe-area-context';

const singleButtonWidth = responsiveWidth(100) - 48 - 48;

const InfoCardModal = ({
  image,
  title,
  content,
  quote,
  bulletedList,
  cta,
  isVisible,
  onClose,
  actions,
  modalLink,
  videoLink,
}) => {
  const [videoData, setVideoData] = useState({});
  const [loading, setLoading] = useState(
    videoLink?.vimeoId || videoLink?.url ? true : false,
  );

  useEffect(() => {
    if (videoLink?.vimeoId) {
      setLoading(true);
      fetch(`https://player.vimeo.com/video/${videoLink.vimeoId}/config`)
        .then(res => res.json())
        .then(res => {
          setVideoData({
            previewImgUrl: res.video.thumbs.base,
            url:
              res.request.files.hls.cdns[res.request.files.hls.default_cdn].url,
          });
        })
        .catch()
        .finally(() => {
          setLoading(false);
        });
    }
  }, [videoLink]);
  const isVideoAvailable = useMemo(
    () => !!Object.keys(videoLink || {}).length,
    [videoLink],
  );
  return (
    <Modal
      style={[styles.modalContainer]}
      isVisible={isVisible}
      animationInTiming={600}
      animationIn={'zoomIn'}
      animationOutTiming={600}
      animationOut={'zoomOut'}
      onBackButtonPress={onClose}
      useNativeDriver={true}
      hasBackdrop={false}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.modalView}>
          <ScrollView>
            {loading ? (
              <ActivityIndicator animating style={styles.indicator} />
            ) : null}
            {videoLink && (videoData.url || videoLink.url) ? (
              <Video
                repeat={true}
                source={{
                  uri: videoData.url || videoLink.url,
                }}
                style={[styles.video]}
                poster={videoData.previewImgUrl || videoLink.previewImgUrl}
                resizeMode="cover"
                posterResizeMode="cover"
                paused={false}
                // onBuffer
                // muted
                playInBackground={false}
                // controls
              />
            ) : null}
            {image ? (
              <SmartImageV2
                style={styles.imageBackground}
                resizeMode={'cover'}
                source={image}
                useFastImage={true}
              />
            ) : null}
            <View
              style={[
                styles.contentView,
                isVideoAvailable ? styles.hideContentView : null,
              ]}>
              <View style={styles.header}>
                <Text style={styles.boxTitle}>{title}</Text>
              </View>

              <Text style={styles.bodyText}>{content}</Text>
              {quote ? (
                <Text
                  style={[
                    styles.bodyTextQuote,
                    content ? {marginTop: 12} : {},
                  ]}>
                  <Text>{'    '}</Text>
                  <Image
                    source={constants.quotationMarkImage}
                    style={styles.quotationImage}
                  />
                  <Text>{`  ${quote}`}</Text>
                </Text>
              ) : null}
              {bulletedList && bulletedList.length
                ? bulletedList.map((item, itemIndex) => {
                    return (
                      <View key={itemIndex} style={styles.bodyList}>
                        <View style={styles.iconWrapper}>
                          <Icon
                            name={constants.infoIcon}
                            size={12}
                            color={constants.shade2}
                          />
                        </View>
                        <View style={styles.messageWrapper}>
                          <Text style={styles.messageStyle}>{item}</Text>
                        </View>
                      </View>
                    );
                  })
                : null}
              {modalLink && modalLink.text ? (
                <TouchableOpacity
                  onPress={() => {
                    //Delay close to prevent freezing due to transition
                    setTimeout(() => {
                      onClose();
                    }, 500);
                    if (modalLink.link) {
                      resolveLinks(
                        modalLink.link,
                        modalLink.screenProps ? modalLink.screenProps : {},
                      );
                    } else {
                      if (modalLink.deepLink) {
                        resolveLinks(false, false, modalLink.deepLink);
                      }
                    }
                  }}>
                  <Text style={[styles.messageStyle, styles.textLink]}>
                    {modalLink.text}
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </ScrollView>
          {isVideoAvailable ? null : (
            <View style={styles.footer}>
              {cta || !actions || actions.length === 0 ? ( // display cta if no actions are present in the modal
                <SimpleButton
                  hasBorder
                  color={'transparent'}
                  text={cta || 'Okay!'}
                  action={onClose}
                  textColor={constants.firstColor}
                  textStyle={{
                    marginLeft: 0,
                    marginTop: 0,
                  }}
                  containerStyle={{
                    width: singleButtonWidth,
                  }}
                />
              ) : null}
              <View style={styles.actionBar}>
                {actions && actions.length
                  ? actions.map((action, actionIndex) => {
                      return (
                        <SimpleButton
                          key={actionIndex}
                          hasBorder
                          color={'white'}
                          text={action.text}
                          icon={action.icon}
                          iconSize={16}
                          action={() => {
                            //Delay close to prevent freezing due to transition
                            setTimeout(() => {
                              onClose();
                            }, 500);
                            if (action.link) {
                              resolveLinks(
                                action.link,
                                action.screenProps ? action.screenProps : {},
                              );
                            } else {
                              if (action.deepLink) {
                                resolveLinks(false, false, action.deepLink);
                              }
                            }
                          }}
                          textColor={constants.firstColor}
                          textStyle={{
                            marginLeft: 0,
                            marginTop: 0,
                          }}
                          containerStyle={{
                            width:
                              actions.length > 1
                                ? singleButtonWidth / 2 - 16
                                : responsiveWidth(100) - 48 - 48,
                            ...(actions.length > 1
                              ? {marginHorizontal: 4}
                              : {}),
                          }}
                        />
                      );
                    })
                  : null}
              </View>
            </View>
          )}
          {(videoLink?.vimeoId || videoLink?.url) && loading ? null : (
            <TouchableOpacity
              onPress={onClose}
              activeOpacity={0.8}
              style={styles.closeIconTouchable}>
              <View style={styles.closeIconContainer}>
                <Icon name={constants.closeIcon} color={'white'} size={16} />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

InfoCardModal.propTypes = forbidExtraProps({
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  quote: PropTypes.string,
  bulletedList: PropTypes.arrayOf(PropTypes.string),
  cta: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  actions: PropTypes.array,
  modalLink: PropTypes.object,
});

const styles = StyleSheet.create({
  modalContainer: {
    margin: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalView: {
    width: responsiveWidth(100) - 48,
    maxHeight: responsiveHeight(100) - 80,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  safeAreaView: {width: responsiveWidth(100), alignItems: 'center'},
  imageBackground: {
    height: 144,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  video: {
    borderRadius: 5,
    aspectRatio: 0.5,
  },
  contentView: {
    padding: 24,
  },
  hideContentView: {display: 'none'},
  header: {},
  body: {
    // marginBottom: 24
  },
  bodyText: {
    ...constants.fontCustom(constants.primaryLight, 15, 18),
    color: constants.black1,
  },
  bodyTextQuote: {
    ...constants.fontCustom(constants.primaryLight, 17, 22),
    color: constants.shade1,
    fontStyle: 'italic',
  },
  quotationImage: {
    height: 20,
    width: 20,
  },
  boxTitle: {
    marginVertical: 8,
    marginTop: 0,
    ...constants.fontCustom(constants.primaryRegular, 20, 24),
    color: constants.black1,
  },
  bodyList: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  iconWrapper: {
    height: 18,
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 2,
    paddingRight: 8,
  },
  messageWrapper: {
    flex: 1,
  },
  messageStyle: {
    ...constants.fontCustom(constants.primaryLight, 15, 18),
    color: constants.black1,
  },
  textLink: {
    textDecorationLine: 'underline',
    color: constants.firstColor,
  },
  closeIconTouchable: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: -18,
    right: -18,
    padding: 8,
  },
  closeIconContainer: {
    height: 25,
    width: 25,
    borderRadius: 12.5,
    backgroundColor: 'rgba(0,0,0,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    height: 25,
    width: 25,
  },
  actionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  indicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    alignSelf: 'center',
  },
});

export default InfoCardModal;
