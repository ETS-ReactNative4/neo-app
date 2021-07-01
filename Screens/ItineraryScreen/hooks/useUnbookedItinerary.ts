import { useLocalStore } from "mobx-react";
import {
  ItineraryInitializerType,
  IUnbookedIterSlotWithActivity
} from "../ItineraryStore/UnbookedItinerary";
import {
  IItinerary,
  IItineraryDay,
  IIterSlotByKey,
  IActivityDetail,
  ICity
} from "../../../TypeInterfaces/IItinerary";
import { logError } from "../../../Services/errorLogger/errorLogger";
import {
  getJsDateFromItineraryDateObject,
  IActivityCombinedInfo,
  IItineraryCityDetail
} from "../../../mobx/Itineraries";
import _ from "lodash";
import { toJS } from "mobx";
import { createTransformer } from "mobx-utils";

const useUnbookedItinerary = (itinerary: ItineraryInitializerType) => {
  const store = useLocalStore(() => {
    return {
      get isItineraryLoaded() {
        return !_.isEmpty(this._selectedItinerary);
      },
      _selectedItinerary: itinerary,
      updateItinerary: (newItinerary: IItinerary) => {
        store._selectedItinerary = newItinerary;
      },
      get sortedDays(): IItineraryDay[] {
        if (_.isEmpty(store._selectedItinerary)) {
          return [];
        }

        try {
          const itineraryDayByKey = toJS(store._selectedItinerary.iterDayByKey);
          const days = Object.values(itineraryDayByKey);
          return _.sortBy(days, "dayNum");
        } catch (e) {
          logError(e);
          return [];
        }
      },
      get days(): Date[] {
        if (_.isEmpty(store._selectedItinerary)) {
          return [];
        }

        try {
          return store.sortedDays.map(day => {
            return getJsDateFromItineraryDateObject(day);
          });
        } catch (e) {
          logError(e);
          return [];
        }
      },
      get slots(): (IUnbookedIterSlotWithActivity | IIterSlotByKey)[][] {
        if (_.isEmpty(store._selectedItinerary)) {
          return [];
        }

        try {
          return store.sortedDays.reduce((slots, day) => {
            return slots.concat([
              // @ts-ignore
              day.allSlotKeys.map(
                (slotKey): IIterSlotByKey => {
                  const slot: IIterSlotByKey = toJS(
                    store._selectedItinerary.iterSlotByKey[slotKey]
                  );
                  if (slot.type === "ACTIVITY") {
                    slot.activitySlotDetail = Object.assign(
                      {},
                      slot.activitySlotDetail,
                      store.getActivityById(slot.activitySlotDetail.activityId)
                    );
                  }
                  return slot;
                }
              )
            ]);
          }, []);
        } catch (e) {
          logError(e);
          return [];
        }
      },
      get activities(): IActivityDetail[] {
        if (_.isEmpty(store._selectedItinerary)) {
          return [];
        }

        try {
          let activities: IActivityCombinedInfo[];
          try {
            // PT TODO: Returned activities without costing info
            const activitiesList: IActivityDetail[] = store._selectedItinerary
              .activityById
              ? Object.values(toJS(store._selectedItinerary.activityById))
              : [];
            return activitiesList;
          } catch (e) {
            logError(e);
            activities = [];
          }
          return activities;
        } catch (e) {
          logError(e);
          return [];
        }
      },
      getActivityById: createTransformer((id: number): IActivityDetail | {} => {
        if (_.isEmpty(store._selectedItinerary)) {
          return {};
        }

        try {
          return (
            store.activities.find(activity => id === activity.planningToolId) ||
            {}
          );
        } catch (e) {
          logError(e);
          return {};
        }
      }),
      getCityByDayNum: createTransformer((dayNum: number):
        | ICity
        | undefined => {
        const iterDayByKey = toJS(
          Object.entries(store._selectedItinerary.iterDayByKey)
        );
        const dayNumByDayKeyMap: {
          [index: number]: string;
        } = iterDayByKey.reduce((accumulator, each) => {
          accumulator = {
            ...accumulator,
            [each[1].dayNum]: each[0]
          };
          return accumulator;
        }, {});

        const targetDayKey = dayNumByDayKeyMap[dayNum];

        const citiesList = toJS(
          Object.values(store._selectedItinerary.iterCityByKey)
        );

        for (let i = 0; i < citiesList.length; i++) {
          if (citiesList[i].allDayKeys.includes(targetDayKey)) {
            return store.getCityById(citiesList[i].cityId);
          }
        }
      }),
      get cities(): IItineraryCityDetail[] {
        if (_.isEmpty(store._selectedItinerary)) {
          return [];
        }
        try {
          /**
           * PT TODO: cities order needs to be set properly
           */
          const cityKeys = Object.keys(store._selectedItinerary.iterCityByKey);
          return cityKeys.map(key => {
            const cityKeyObject = store._selectedItinerary.iterCityByKey[key];
            const cityId = cityKeyObject.cityId;
            const startDayId = cityKeyObject.allDayKeys[0];
            const endDayId =
              cityKeyObject.allDayKeys[cityKeyObject.allDayKeys.length - 1];

            const cityObject = store._selectedItinerary.cityById[cityId];
            const startDayObject =
              store._selectedItinerary.iterDayByKey[startDayId];
            const endDayObject =
              store._selectedItinerary.iterDayByKey[endDayId];

            const city = cityObject.cityName;
            const startDay = getJsDateFromItineraryDateObject(startDayObject);
            const endDay = getJsDateFromItineraryDateObject(endDayObject);
            const image = cityObject.image;
            const cityName = cityObject.cityName;

            return { city, startDay, endDay, cityObject, image, cityName };
          });
        } catch (e) {
          logError(e);
          return [];
        }
      },
      getCityById: createTransformer(
        (id: number): ICity => {
          if (_.isEmpty(store._selectedItinerary)) {
            return {} as ICity;
          }
          if (!id) {
            return {} as ICity;
          }

          try {
            // City Object needs to be modified hence the observable should be converted to plain JS
            const cityObject: ICity = toJS(
              store._selectedItinerary.cityById[id]
            );
            const cityList = store.cities;
            const requiredCity = cityList.find(city => {
              return city.cityObject.cityId === id;
            });
            // @ts-ignore - cityObject must be a new type that extends `ICity` and will be used in this class
            cityObject.startDay = requiredCity.startDay;
            // @ts-ignore
            cityObject.endDay = requiredCity.endDay;
            return toJS(cityObject);
          } catch (e) {
            logError(e);
            return {} as ICity;
          }
        }
      ),
      get costingConfig() {
        if (_.isEmpty(store._selectedItinerary)) {
          return null;
        }

        try {
          return toJS(store._selectedItinerary.costingConfiguration);
        } catch (e) {
          logError(e);
          return null;
        }
      },
      get itineraryMeta() {
        if (_.isEmpty(store._selectedItinerary)) {
          return null;
        }

        try {
          return toJS(store._selectedItinerary.itinerary);
        } catch (e) {
          logError(e);
          return null;
        }
      }
    };
  });

  if (store._selectedItinerary) {
    return store;
  } else {
    return {
      updateItinerary: store.updateItinerary
    } as typeof store; // PT TODO: workaround till null value is handled
  }
};

export default useUnbookedItinerary;
