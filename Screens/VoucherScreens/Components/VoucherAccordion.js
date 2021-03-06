import React, {Component} from 'react';
import {Text, View, StyleSheet, Animated, Easing} from 'react-native';
import _ from 'lodash';
import constants from '../../../constants/constants';
import Icon from '../../../CommonComponents/Icon/Icon';
import PropTypes from 'prop-types';
import Accordion from 'react-native-collapsible/Accordion';
import forbidExtraProps from '../../../Services/PropTypeValidation/forbidExtraProps';

class VoucherAccordion extends Component {
  static propTypes = forbidExtraProps({
    sections: PropTypes.array.isRequired,
    containerStyle: PropTypes.object,
    openFirstSection: PropTypes.bool,
    openAllSections: PropTypes.bool,
    expandMultiple: PropTypes.bool,
    activeSections: PropTypes.arrayOf(PropTypes.number),
  });

  state = {
    wasActiveIndex: [],
    activeSections: [],
  };

  shouldComponentUpdate(nextProps) {
    return this.props === nextProps;
  }

  _renderHeader = (section, index, isActive, sections) => {
    const {wasActiveIndex} = this.state;
    const {amenitySectionStyle = {}, amenityTextStyle = {}} = this.props || {};
    const customStyle = {};

    if (isActive) {
      customStyle.borderBottomWidth = 0;

      // if (wasActiveIndex !== index) {
      //   this.setState({
      //     wasActiveIndex: index
      //   });
      // }
    }

    const iconContainer = {};
    const spinValue = new Animated.Value(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
    }).start();

    if (isActive) {
      if (!wasActiveIndex.includes(index)) {
        const spin = spinValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '180deg'],
        });
        iconContainer.transform = [{rotate: spin}];
      } else {
        iconContainer.transform = [{rotate: '180deg'}];
      }
    } else if (wasActiveIndex.includes(index)) {
      const reverseSpin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['180deg', '0deg'],
      });
      iconContainer.transform = [{rotate: reverseSpin}];
    }

    return (
      <View style={[styles.amenitiesSection, customStyle, amenitySectionStyle]}>
        <Text style={[styles.amenitiesText, amenityTextStyle]}>
          {section.name}
        </Text>
        <Animated.View style={iconContainer}>
          <Icon name={constants.arrowDown} color={constants.shade2} size={16} />
        </Animated.View>
      </View>
    );
  };

  _renderContent = (section, index, isActive, sections) => {
    return section.component;
  };

  _updateActiveSections = activeSections => {
    this.setState(
      {
        wasActiveIndex: this.state.activeSections,
      },
      () => {
        this.setState({
          activeSections,
        });
      },
    );
  };

  componentDidMount() {
    const {
      openFirstSection,
      openAllSections,
      sections,
      activeSections,
    } = this.props;
    if (openFirstSection) {
      this.setState({
        activeSections: [0],
      });
    }
    if (openAllSections) {
      const activeSections = [...Array(_.compact(sections).length).keys()];
      this.setState({
        activeSections,
      });
    }
    if (activeSections && activeSections.length) {
      this.setState({
        activeSections,
      });
    }
  }

  render() {
    let {containerStyle, expandMultiple} = this.props;
    if (!containerStyle) containerStyle = {};
    let otherProps = {};
    if (expandMultiple) {
      otherProps = {
        expandMultiple: true,
        ...otherProps,
      };
    }

    return (
      <View style={[containerStyle]}>
        <Accordion
          sections={_.compact(this.props.sections)} // ignore null values in the accordion section
          activeSections={this.state.activeSections}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          onChange={this._updateActiveSections}
          underlayColor={constants.shade5}
          {...otherProps}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  amenitiesSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 24,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: constants.shade4,
  },
  amenitiesText: {
    ...constants.font20(constants.primaryLight),
    color: constants.black2,
  },
});

export default VoucherAccordion;
