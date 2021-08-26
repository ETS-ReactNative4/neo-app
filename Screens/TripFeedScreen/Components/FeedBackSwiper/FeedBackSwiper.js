import React, {Component} from 'react';
import {View, Text, StyleSheet, LayoutAnimation, Platform} from 'react-native';
import CardStack from '../../../../CommonComponents/CardStack/CardStack';
import constants from '../../../../constants/constants';
import SimpleButton from '../../../../CommonComponents/SimpleButton/SimpleButton';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import PropTypes from 'prop-types';
import FeedBackSwiperModal from './Components/FeedBackSwiperModal';
import apiCall from '../../../../Services/networkRequests/apiCall';
import storeService from '../../../../Services/storeService/storeService';
import {toastBottom, toastCenter} from '../../../../Services/toast/toast';
import {recordEvent} from '../../../../Services/analytics/analyticsService';

const NextCard = () => (
  <View
    style={[
      styles.feedBackCard,
      {
        position: 'absolute',
        bottom: 8,
        backgroundColor: constants.secondColorAlpha(0.65),
        transform: [{scale: 0.95}],
      },
    ]}
  />
);

const LastCard = () => (
  <View
    style={[
      styles.feedBackCard,
      {
        position: 'absolute',
        bottom: 0,
        backgroundColor: constants.secondColorAlpha(0.5),
        transform: [{scale: 0.9}],
      },
    ]}
  />
);

const EmptyPlaceHolder = () => {
  return (
    <View style={[styles.feedBackCard, styles.feedBackCleared]}>
      <Text style={styles.feedBackClearedText}>{'All caught up!'}</Text>
    </View>
  );
};

class FeedBackSwiper extends Component {
  static propTypes = {
    toggleScrollLock: PropTypes.func.isRequired,
    emitterComponent: PropTypes.object.isRequired,
    elements: PropTypes.array.isRequired,
    widgetName: PropTypes.string,
  };

  state = {
    isModalVisible: false,
    isNegative: false,
    activeCardIndex: 0,
    activeModalIndex: -1,
    dismissedCard: -1,
    disableDissmissApi: false,
    isFeedbackApiLoading: false,
    isFeedbackSubmitAttempted: false,
    review: '',
  };

  _cardStack = React.createRef();
  _feedBackInputFieldWrapper = React.createRef();

  openFeedBackModal = ({isNegative = false}) => {
    const {widgetName, callback} = this.props;
    if (widgetName) {
      recordEvent(constants.TripFeed.event, {
        widget: widgetName,
      });
    }
    callback?.();
    this.setState({
      isModalVisible: true,
      activeModalIndex: this.state.activeCardIndex,
      isNegative,
    });
  };

  swipedCard = nextCardIndex => {
    const {widgetName} = this.props;
    if (widgetName) {
      recordEvent(constants.TripFeed.event, {
        widget: `${widgetName}_DISMISSED`,
      });
    }
    if (!this.state.disableDissmissApi) {
      const activeElement = this.props.elements[this.state.activeCardIndex];
      const requestObject = {
        itineraryId: storeService.itineraries.selectedItineraryId,
        review: '',
        responseType: 'DISMISSED',
      };
      apiCall(activeElement.url, requestObject)
        .then(response => {
          if (response.status === 'SUCCESS') {
            // NO Action needed for dismiss
          }
        })
        .catch(err => {
          //TODO:  Handle error on dismiss card
        });
    }
    this.setState({
      dismissedCard: nextCardIndex - 1,
      activeCardIndex: nextCardIndex,
    });
  };

  closeFeedBackModal = () => {
    this.setState({
      isModalVisible: false,
    });
  };

  submitFeedBack = () => {
    const activeElement = this.props.elements[this.state.activeCardIndex];
    const requestObject = {
      itineraryId: storeService.itineraries.selectedItineraryId,
      review: this.state.review,
      responseType: this.state.isNegative ? 'NEGATIVE' : 'POSITIVE',
    };
    this.setState({
      isFeedbackApiLoading: true,
      isFeedbackSubmitAttempted: true,
    });
    apiCall(activeElement.url, requestObject)
      .then(response => {
        this.setState({
          isFeedbackApiLoading: false,
        });
        if (!this.state.review) {
          this._feedBackInputFieldWrapper.shake(800);
          toastBottom(constants.feedBackCollectionToastText.message);
        } else {
          if (response.status === 'SUCCESS') {
            toastCenter('Thanks for the feedback!');
            if (!this.state.isNegative) {
              this.props.emitterComponent &&
                this.props.emitterComponent.start();
            }
            this.setState(
              {
                review: '',
                isModalVisible: false,
                isFeedbackSubmitAttempted: false,
              },
              () => {
                this.setState(
                  {
                    disableDissmissApi: true,
                  },
                  () => {
                    setTimeout(() => {
                      this._cardStack.swipeRight &&
                        this._cardStack.swipeRight();
                      setTimeout(() => {
                        this.setState({
                          disableDissmissApi: false,
                        });
                      }, 500);
                    }, 300);
                  },
                );
              },
            );
          } else {
            this.setState({
              review: '',
              isModalVisible: false,
              isFeedbackSubmitAttempted: false,
            });
            toastBottom(
              'Unable to collect feedback. Please try after sometime...',
            );
          }
        }
      })
      .catch(err => {
        this.setState({
          isFeedbackApiLoading: false,
        });
        this.setState({
          review: '',
          isModalVisible: false,
          isFeedbackSubmitAttempted: false,
        });
        toastBottom('Unable to collect feedback. Please try after sometime...');
      });
  };

  onEditText = review => this.setState({review});

  render() {
    const {elements} = this.props;
    if (!elements || !elements.length) return null;
    const activeElement = this.props.elements[this.state.activeCardIndex]; // data of the element visible to the user in the swiper
    return [
      <CardStack
        key={0}
        setRef={cardStack => (this._cardStack = cardStack)}
        NextCard={NextCard}
        LastCard={LastCard}
        EmptyPlaceHolder={EmptyPlaceHolder}
        onSwipeStart={() => this.props.toggleScrollLock(false)}
        onSwipeEnd={() => this.props.toggleScrollLock(true)}
        onCardSwiped={nextCardIndex => this.swipedCard(nextCardIndex)}
        containerStyle={styles.feedBackSwiperContainer}
        verticalSwipe={false}
        hideEmptyWidget={true}>
        {elements.map((feedBack, feedBackIndex) => {
          return (
            <View key={feedBackIndex} style={styles.feedBackCard}>
              <Text style={styles.feedBackTitle}>{feedBack.title}</Text>
              <Text style={styles.feedBackDay}>{feedBack.text}</Text>
              <View style={styles.actionBar}>
                <SimpleButton
                  text={'Meh.'}
                  action={() => this.openFeedBackModal({isNegative: true})}
                  textColor={'rgba(255,87,109,1)'}
                  hasBorder={false}
                  icon={constants.thumbsDownIcon}
                  textStyle={{
                    ...constants.fontCustom(constants.primarySemiBold, 21),
                  }}
                  iconSize={20}
                  underlayColor={'transparent'}
                  containerStyle={{
                    backgroundColor: 'transparent',
                    marginHorizontal: 8,
                    height: 42,
                    width: 80,
                  }}
                />
                <SimpleButton
                  text={'Yey!'}
                  action={() => this.openFeedBackModal({isNegative: false})}
                  textColor={constants.firstColor}
                  hasBorder={false}
                  icon={constants.thumbsUpIcon}
                  textStyle={{
                    ...constants.fontCustom(constants.primarySemiBold, 21),
                  }}
                  iconSize={20}
                  underlayColor={'transparent'}
                  containerStyle={{
                    backgroundColor: 'transparent',
                    marginHorizontal: 8,
                    height: 42,
                    width: 80,
                  }}
                />
              </View>
            </View>
          );
        })}
      </CardStack>,
      <FeedBackSwiperModal
        key={1}
        isVisible={this.state.isModalVisible}
        data={{}}
        title={activeElement ? activeElement.title : ''}
        onEditText={this.onEditText}
        review={this.state.review}
        emitterComponent={this.props.emitterComponent}
        isNegative={this.state.isNegative}
        submit={this.submitFeedBack}
        setFeedBackInputFieldWrapperRef={inputRef =>
          (this._feedBackInputFieldWrapper = inputRef)
        }
        isFeedbackApiLoading={this.state.isFeedbackApiLoading}
        isFeedbackSubmitAttempted={this.state.isFeedbackSubmitAttempted}
      />,
    ];
  }
}

const styles = StyleSheet.create({
  feedBackSwiperContainer: {
    marginHorizontal: 24,
    height: 120,
    marginVertical: 8,
  },
  feedBackCard: {
    backgroundColor: constants.secondColor,
    height: 104,
    width: responsiveWidth(100) - 48,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  feedBackCleared: {
    backgroundColor: 'transparent',
  },
  feedBackClearedText: {
    ...constants.fontCustom(constants.primarySemiBold, 21),
    color: constants.black1,
  },
  feedBackTitle: {
    ...constants.fontCustom(constants.primarySemiBold, 16, 24),
    color: constants.black1,
  },
  feedBackDay: {
    ...constants.fontCustom(constants.primaryLight, 15, 18),
    color: constants.black1,
  },
  actionBar: {
    ...Platform.select({
      android: {
        marginTop: 4,
      },
      ios: {
        marginTop: 2,
      },
    }),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FeedBackSwiper;
