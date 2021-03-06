import React, {Component, Fragment} from 'react';
import {View, StyleSheet} from 'react-native';
import {toJS} from 'mobx';
import constants from '../../constants/constants';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ScrollableTabBar from '../../CommonComponents/ScrollableTabBar/ScrollableTabBar';
import EmergencyContactSection from './Components/EmergencyContactSection';
import CommonHeader from '../../CommonComponents/CommonHeader/CommonHeader';
import {inject, observer} from 'mobx-react';
import ErrorBoundary from '../../CommonComponents/ErrorBoundary/ErrorBoundary';
import DeepLinkHandler from '../../CommonComponents/DeepLinkHandler/DeepLinkHandler';
import _ from 'lodash';
import PrimaryHeader from '../../NavigatorsV2/Components/PrimaryHeader';

const emergencyContactLisOfIndia = {
  nationalEmergencyNumber: 112,
  policeNumber: 100,
  ambulanceNumber: 102,
};
@ErrorBoundary()
@DeepLinkHandler
@inject('itineraries')
@inject('emergencyContactsStore')
@observer
class EmergencyContacts extends Component {
  constructor(props) {
    super(props);

    props.navigation.setOptions({
      header: () =>
        PrimaryHeader({
          leftAction: () => props.navigation.goBack(),
          headerText: 'Emergency Contacts',
        }),
    });
  }

  componentDidMount() {
    const {cities} = this.props.itineraries;
    const {getEmergencyContacts} = this.props.emergencyContactsStore;
    getEmergencyContacts(cities);
  }

  render() {
    let {cities, selectedItinerary} = this.props.itineraries;
    cities = _.uniqBy(toJS(cities), 'cityObject.cityId');
    const {getEmergencyContactsByCity} = this.props.emergencyContactsStore;
    const cityDetails = getEmergencyContactsByCity(cities);
    const isIndiaTrip = selectedItinerary?.itinerary?.regionCode === 'ind';

    return (
      <View style={styles.emergencyContactsContainer}>
        <ScrollableTabView
          tabBarActiveTextColor={constants.black2}
          tabBarInactiveTextColor={constants.firstColor}
          tabBarUnderlineStyle={{
            height: 2,
            backgroundColor: constants.black2,
          }}
          tabBarTextStyle={{...constants.font13(constants.primarySemiBold)}}
          initialPage={0}
          prerenderingSiblingsNumber={Infinity}
          renderTabBar={() =>
            isIndiaTrip ? <Fragment /> : <ScrollableTabBar />
          }>
          {cityDetails.map((cityContactDetails, cityDetailIndex) => {
            if (cityContactDetails) {
              return (
                <EmergencyContactSection
                  key={cityDetailIndex}
                  cityContactDetails={cityContactDetails}
                  tabLabel={cityContactDetails.name.toUpperCase()}
                  isIndiaTrip={false}
                />
              );
            } else if (isIndiaTrip) {
              return (
                <EmergencyContactSection
                  key={cityDetailIndex}
                  cityContactDetails={emergencyContactLisOfIndia}
                  tabLabel={''}
                  isIndiaTrip={isIndiaTrip}
                />
              );
            }
            return null;
          })}
        </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  emergencyContactsContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default EmergencyContacts;
