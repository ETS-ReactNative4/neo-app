import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import forbidExtraProps from '../../../../Services/PropTypeValidation/forbidExtraProps';
import constants from '../../../../constants/constants';
import resolveLinks from '../../../../Services/resolveLinks/resolveLinks';
import {recordEvent} from '../../../../Services/analytics/analyticsService';
import SmartImageV2 from '../../../../CommonComponents/SmartImage/SmartImageV2';
import Video from 'react-native-video';

const InfoCard = props => {
  const {
    title,
    image,
    content,
    link,
    boxStyle = {},
    boxContentStyle = {},
    titleStyle = {},
    modalData,
    widgetName,
    videoLink,
  } = props ?? {};

  const [videoData, setVideoData] = useState({});

  useEffect(() => {
    if (videoLink?.vimeoId) {
      fetch(`https://player.vimeo.com/video/${videoLink.vimeoId}/config`)
        .then(res => res.json())
        .then(res => {
          setVideoData({
            previewImgUrl: res.video.thumbs.base,
            url:
              res.request.files.hls.cdns[res.request.files.hls.default_cdn].url,
          });
        });
    }
  }, [videoLink]);

  const action = () => {
    if (widgetName) {
      recordEvent(constants.TripFeed.event, {
        widget: widgetName,
      });
    }
    resolveLinks(link, modalData, {});
  };
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={action}
      style={[styles.box, boxStyle]}>
      <View style={styles.imageBackground1}>
        {videoLink && (videoData.url || videoLink.url) ? (
          <Video
            repeat={true}
            source={{
              uri: videoData.url || videoLink.url,
            }}
            style={styles.imageBackground}
            poster={videoData.previewImgUrl || videoLink.previewImgUrl}
            resizeMode="cover"
            posterResizeMode="cover"
            paused={false}
            muted
            playInBackground={false}
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
      </View>
      <View style={[styles.contentView, boxContentStyle]}>
        <View style={styles.header}>
          <Text style={[styles.boxTitle, titleStyle]} numberOfLines={2}>
            {title}
          </Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.bodyText}>{content}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

InfoCard.propTypes = forbidExtraProps({
  title: PropTypes.string.isRequired,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  content: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  boxStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  modalData: PropTypes.object,
  widgetName: PropTypes.string,
});

const styles = StyleSheet.create({
  box: {
    borderRadius: 5,
    marginTop: 8,
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  imageBackground: {
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
  },
  imageBackground1: {
    height: 160,
    overflow: 'hidden',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  contentView: {
    paddingVertical: 16,
  },
  header: {},
  body: {
    padding: 0,
  },
  bodyText: {
    ...constants.fontCustom(constants.primaryLight, 15, 18),
    color: constants.black1,
  },
  boxTitle: {
    marginBottom: 8,
    ...constants.fontCustom(constants.primaryRegular, 20, 24),
    color: constants.black1,
  },
  backgroundVideo: {
    width: 100,
    height: 100,
  },
});

export default InfoCard;
