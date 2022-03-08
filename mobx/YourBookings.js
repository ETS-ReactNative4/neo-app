import {observable, computed, action, toJS} from 'mobx';
import {persist} from 'mobx-persist';
import apiCall from '../Services/networkRequests/apiCall';
import constants from '../constants/constants';
import DebouncedAlert from '../CommonComponents/DebouncedAlert/DebouncedAlert';
import _ from 'lodash';
import hydrate from '../Services/hydrate/hydrate';
import {logError} from '../Services/errorLogger/errorLogger';

class YourBookings {
  static hydrator = storeInstance => {
    hydrate('_upcomingItineraries', storeInstance)
      .then(() => {})
      .catch(err => {
        logError(err);
      });
    hydrate('_completedItineraries', storeInstance)
      .then(() => {})
      .catch(err => {
        logError(err);
      });
    hydrate('_cancelledItineraries', storeInstance)
      .then(() => {})
      .catch(err => {
        logError(err);
      });
  };

  @persist('list')
  @observable
  _upcomingItineraries = [];

  @persist('list')
  @observable
  _completedItineraries = [];

  @persist('list')
  @observable
  _cancelledItineraries = [];

  @observable _isLoading = false;
  @observable _loadingError = false;

  @action
  reset = () => {
    this._upcomingItineraries = [];
    this._completedItineraries = [];
    this._cancelledItineraries = [];
    this._isLoading = false;
    this._loadingError = false;
  };

  @action
  getUpcomingItineraries = () => {
    return new Promise((resolve, reject) => {
      this._isLoading = true;
      const requestBody = {};
      apiCall(constants.getYourTrips, requestBody)
        .then(response => {
          this._isLoading = false;
          if (response.status === 'SUCCESS') {
            const completedItineraries = (response.data.COMPLETED || []).map(
              itinerary => {
                itinerary.completed = true;
                return itinerary;
              },
            );
            const cancelledItineraries = (response.data.CANCELLED || []).map(
              itinerary => {
                itinerary.cancelled = true;
                return itinerary;
              },
            );
            this._upcomingItineraries = response.data.UNCOMPLETED;
            this._completedItineraries = completedItineraries;

            this._cancelledItineraries = cancelledItineraries;
            this._loadingError = false;
            resolve([
              ..._.get(response, 'data.UNCOMPLETED', []),
              ...completedItineraries,
              ...cancelledItineraries,
            ]);
          } else {
            this._loadingError = true;
            DebouncedAlert('Error!', 'Unable to get Itinerary Details...');
            reject();
          }
        })
        .catch(() => {
          this._isLoading = false;
          this._loadingError = true;
          DebouncedAlert('Error!', 'Internal Server Error...');
          reject();
        });
    });
  };

  @computed
  get upcomingItineraries() {
    /**
     * TODO: Until the trip completed flow is created we need to show
     * the completed itineraries in the upcoming section.
     *
     * - Also requires a change in payment screen.
     */
    return [
      ...toJS(this._upcomingItineraries || []),
      ...toJS(this._completedItineraries || []),
    ];
  }

  @computed
  get itineraries() {
    return [
      ...toJS(this._upcomingItineraries || []),
      ...toJS(this._completedItineraries || []),
      ...toJS(this._cancelledItineraries || []),
    ];
  }

  @computed
  get hasUpcomingItineraries() {
    return !!this._upcomingItineraries.length;
  }

  @computed
  get hasItineraries() {
    return !!(
      this._upcomingItineraries.length ||
      this._completedItineraries?.length ||
      this._cancelledItineraries?.length
    );
  }

  @computed
  get completedItineraries() {
    return toJS(this._completedItineraries);
  }

  @computed
  get isLoading() {
    return this._isLoading;
  }

  @computed
  get hasError() {
    return this._loadingError;
  }
}

export default YourBookings;
