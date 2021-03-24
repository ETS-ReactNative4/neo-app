import React from 'react';
import {StyleSheet} from 'react-native';
import {CONSTANT_shade3} from '../../../constants/colorPallete';
import AlertCard from '../../TripFeedScreen/Components/AlertCard/AlertCard';
import AlertCardV2 from '../../TripFeedScreen/Components/AlertCardV2/AlertCardV2';
import BigImageCard from '../../TripFeedScreen/Components/BigImageCard/BigImageCard';
import DayAhead from '../../TripFeedScreen/Components/DayAhead/DayAhead';
import DayAheadLite from '../../TripFeedScreen/Components/DayAheadLite/DayAheadLite';
import InfoCard from '../../TripFeedScreen/Components/InfoCard/InfoCard';
import ToolTip from '../../TripFeedScreen/Components/ToolTip/ToolTip';
import TripFeedCarousel from '../../TripFeedScreen/Components/TripFeedCarousel/TripFeedCarousel';
import TripView from '../../TripFeedScreen/Components/TripView/TripView';
import TripViewLite from '../../TripFeedScreen/Components/TripViewLite/TripViewLite';

type WidgetType = {
  type: string;
  data: {} | [];
  widgetName?: string;
};
export const getWidgets = ({
  widget,
  widgetIndex,
}: {
  widget: WidgetType;
  widgetIndex: number;
}) => {
  switch (widget.type) {
    case 'TOOL_TIP':
      return (
        <ToolTip
          key={widgetIndex}
          {...widget.data}
          widgetName={widget.widgetName}
          containerStyle={styles.tooltipContainer}
        />
      );
    case 'INFO_CARD':
      return (
        <InfoCard
          key={widgetIndex}
          {...widget.data}
          widgetName={widget.widgetName}
          boxStyle={styles.infoCardBox}
          boxContentStyle={styles.infoCardBoxContent}
        />
      );
    case 'CAROUSEL':
      return (
        <TripFeedCarousel
          key={widgetIndex}
          {...widget.data}
          widgetName={widget.widgetName}
          containerStyle={styles.carouselContainer}
        />
      );
    case 'TRIP_VIEW':
      return (
        <TripView
          key={widgetIndex}
          {...widget.data}
          widgetName={widget.widgetName}
          containerStyle={styles.tripViewContainer}
        />
      );
    case 'TRIP_VIEW_LITE':
      return (
        <TripViewLite
          key={widgetIndex}
          {...widget.data}
          widgetName={widget.widgetName}
        />
      );
    case 'BIG_IMAGE_CARD':
      return (
        <BigImageCard
          key={widgetIndex}
          {...widget.data}
          widgetName={widget.widgetName}
          containerStyle={styles.bigImageCardConatiner}
        />
      );
    case 'ALERT_CARD':
      return (
        <AlertCard
          key={widgetIndex}
          {...widget.data}
          toggleScrollLock={() => null}
          widgetName={widget.widgetName}
          cardWidth={32}
          containerStyle={styles.alertCardContainer}
        />
      );
    case 'ALERT_CARD_2':
      return (
        <AlertCardV2
          key={widgetIndex}
          {...widget.data}
          widgetName={widget.widgetName}
          containerStyle={styles.alertCardV2Container}
        />
      );
    case 'DAY_AHEAD':
      return (
        <DayAhead
          key={widgetIndex}
          {...widget.data}
          widgetName={widget.widgetName}
          containerStyle={styles.dayAheadContainer}
        />
      );
    case 'DAY_AHEAD_LITE':
      return (
        <DayAheadLite
          key={widgetIndex}
          {...widget.data}
          widgetName={widget.widgetName}
          containerStyle={styles.dayAheadLiteContainer}
        />
      );
    default:
      return null;
  }
};

const styles = StyleSheet.create({
  tooltipContainer: {
    marginTop: 0,
    paddingVertical: 0,
    paddingHorizontal: 16,
  },
  infoCardBox: {paddingTop: 0, paddingHorizontal: 0},
  infoCardBoxContent: {
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: CONSTANT_shade3,
    marginBottom: 10,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  carouselContainer: {
    paddingVertical: 0,
    marginLeft: -8,
    marginTop: 0,
  },
  tripViewContainer: {
    marginLeft: -8,
    paddingVertical: 0,
    marginTop: 0,
  },
  bigImageCardConatiner: {
    marginHorizontal: 4,
    marginTop: 0,
    marginVertical: 0,
  },
  alertCardContainer: {marginVertical: -18},
  alertCardV2Container: {
    marginTop: 0,
    marginHorizontal: 16,
    paddingVertical: 16,
  },
  dayAheadContainer: {marginTop: 0, paddingVertical: 0, marginLeft: -8},
  dayAheadLiteContainer: {marginTop: 0, paddingVertical: 0, marginLeft: -8},
});
