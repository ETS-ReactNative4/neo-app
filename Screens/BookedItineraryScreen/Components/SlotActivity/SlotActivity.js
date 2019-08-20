import React from "react";
import PropTypes from "prop-types";
import constants from "../../../../constants/constants";
import { inject, observer } from "mobx-react/custom";
import forbidExtraProps from "../../../../Services/PropTypeValidation/forbidExtraProps";
import getSlotImage from "../../../../Services/getImageService/getSlotImage";
import CityCard from "../CityCard";
import moment from "moment";
import SectionHeader from "../../../../CommonComponents/SectionHeader/SectionHeader";
import _ from "lodash";
import { recordEvent } from "../../../../Services/analytics/analyticsService";
import BookingSectionComponent from "../../../../CommonComponents/BookingSectionComponent/BookingSectionComponent";
import resolveLinks from "../../../../Services/resolveLinks/resolveLinks";
import getTransferImage from "../../../../Services/getImageService/getTransferImage";

let internationalFlightKey, city;
const SlotActivity = inject("itineraries")(
  observer(
    ({ activity, navigation, itineraries, activityIndex, day, spinValue }) => {
      const {
        getActivityById,
        getCityById,
        cities,
        getFlightById,
        getTransferFromAllById,
        getCityOrderById,
        getRentalCarByCityOrder
      } = itineraries;
      let onClick = () => null;
      let imageObject;
      let currentCity, cityCardData, cityId;
      switch (activity.type) {
        case "INTERNATIONAL_ARRIVE":
          currentCity = itineraries.cities[0];
          cityId = currentCity.cityObject ? currentCity.cityObject.cityId : "";
          cityCardData = {
            cityImage: { uri: currentCity.cityObject.image },
            action: () =>
              navigation.navigate("ToolPlaces", {
                city: cityId
              }),
            cityName: currentCity.city,
            activityText: activity.arrivalSlotDetail.transferIndicatorText
          };
          break;

        case "INTERCITY_TRANSFER":
          currentCity = getCityById(
            activity.intercityTransferSlotDetailVO.toCity
          );
          city = _.find(cities, { city: currentCity.cityName });
          cityId = city.cityObject ? city.cityObject.cityId : "";
          cityCardData = {
            cityImage: {
              uri: currentCity.image
            },
            action: () =>
              navigation.navigate("ToolPlaces", {
                city: cityId
              }),
            cityName: currentCity.cityName,
            activityText:
              activity.intercityTransferSlotDetailVO.directTransferDetail
                .transferIndicatorText
          };
          break;

        case "ACTIVITY_WITH_TRANSFER":
          currentCity = getCityById(
            activity.intercityTransferSlotDetailVO.toCity
          );
          city = _.find(cities, { city: currentCity.cityName });
          cityId = city.cityObject ? city.cityObject.cityId : "";
          let transferIndicatorText;
          const {
            intercityTransferSlotDetailVO: interCityTransferDetail
          } = activity;
          if (_.toUpper(interCityTransferDetail.transferType) === "DIRECT") {
            transferIndicatorText =
              interCityTransferDetail.directTransferDetail
                .transferIndicatorText;
          } else if (
            _.toUpper(interCityTransferDetail.transferType) === "TRANSIT"
          ) {
            transferIndicatorText =
              interCityTransferDetail.transitTransferDetail
                .transferIndicatorText;
          }
          cityCardData = {
            cityImage: {
              uri: currentCity.image
            },
            action: () =>
              navigation.navigate("ToolPlaces", {
                city: cityId
              }),
            cityName: currentCity.cityName,
            activityText: transferIndicatorText
          };
          break;

        default:
          break;
      }

      const SlotRow = ({ containerStyle }) => {
        switch (activity.type) {
          case "INTERNATIONAL_ARRIVE":
            internationalFlightKey =
              activity.arrivalSlotDetail.flightCostingKey;
            imageObject = getSlotImage(internationalFlightKey, "FLIGHT");
            const flight = internationalFlightKey
              ? getFlightById(internationalFlightKey)
              : {};
            if (!internationalFlightKey) {
              return null;
            }
            onClick = () => {
              recordEvent(constants.BookedItinerary.event, {
                click: constants.BookedItinerary.click.voucher,
                type: constants.BookedItinerary.type.flight
              });
              resolveLinks(false, false, {
                voucherType: constants.flightVoucherType,
                costingIdentifier: flight.key
              });
            };
            return (
              <BookingSectionComponent
                containerStyle={[containerStyle, { marginHorizontal: 24 }]}
                title={activity.name}
                content={activity.arrivalSlotDetail.slotText}
                sectionImage={{ uri: imageObject.image }}
                isImageContain={true}
                onClick={onClick}
                contentNumberOfLines={3}
                defaultSource={constants.flightLogoPlaceholderIllus}
                isProcessing={!(flight.voucher && flight.voucher.booked)}
                spinValue={spinValue}
                isDataSkipped={_.get(flight, "voucher.skipVoucher")}
                voucherTitle={_.get(flight, "voucher.title")}
              />
            );

          case "LEISURE":
            onClick = city => {
              navigation.navigate("LeisureScreen", {
                city
              });
            };
            return (
              <BookingSectionComponent
                containerStyle={[containerStyle, { marginHorizontal: 24 }]}
                title={activity.name}
                content={activity.leisureSlotDetail.text}
                sectionImage={constants.leisureIcon}
                isProcessing={false}
                onClick={() => onClick(city)}
                defaultSource={constants.activityThumbPlaceholderIllus}
                contentNumberOfLines={3}
                isImageContain={true}
                spinValue={spinValue}
              />
            );

          case "ACTIVITY":
            const activityCosting = getActivityById(
              activity.activitySlotDetail.activityCostingIdentifier
            );
            const activityInfo = getActivityById(
              activity.activitySlotDetail.activityCostingIdentifier
            );
            onClick = () => {
              recordEvent(constants.BookedItinerary.event, {
                click: constants.BookedItinerary.click.voucher,
                type: constants.BookedItinerary.type.activity
              });
              resolveLinks(false, false, {
                voucherType: constants.activityVoucherType,
                costingIdentifier: activityInfo.costing.key
              });
            };
            return (
              <BookingSectionComponent
                containerStyle={[containerStyle, { marginHorizontal: 24 }]}
                title={activity.name}
                content={activityCosting.title}
                sectionImage={{ uri: activityCosting.mainPhoto }}
                onClick={onClick}
                contentNumberOfLines={3}
                defaultSource={constants.activityThumbPlaceholderIllus}
                isImageContain={false}
                isProcessing={
                  !(
                    activityInfo.voucher &&
                    (activityInfo.voucher.booked || activityInfo.free)
                  )
                }
                spinValue={spinValue}
                isDataSkipped={_.get(activityInfo, "voucher.skipVoucher")}
                voucherTitle={_.get(activityInfo, "voucher.title")}
              />
            );

          case "INTERCITY_TRANSFER":
            const {
              transferCostingIdenfier,
              transferMode,
              slotText
            } = activity.intercityTransferSlotDetailVO.directTransferDetail;
            const { fromCity, toCity } = activity.intercityTransferSlotDetailVO;
            imageObject = getSlotImage(transferCostingIdenfier, transferMode);
            let transfer = transferCostingIdenfier
              ? getTransferFromAllById(transferCostingIdenfier)
              : {};
            if (!transferCostingIdenfier) {
              if (transferMode === constants.rentalCarTransferMode) {
                const fromCityOrder = getCityOrderById(fromCity);
                const toCityOrder = getCityOrderById(toCity);
                transfer = getRentalCarByCityOrder({
                  fromCityOrder,
                  toCityOrder
                });
              }
            }
            onClick = () => {
              recordEvent(constants.BookedItinerary.event, {
                click: constants.BookedItinerary.click.voucher,
                type: constants.BookedItinerary.type.transfer
              });
              if (transferMode === constants.flightTransferMode) {
                resolveLinks(false, false, {
                  voucherType: constants.flightVoucherType,
                  costingIdentifier: transfer.key
                });
              } else {
                switch (transferMode) {
                  case constants.trainTransferMode:
                    resolveLinks(false, false, {
                      voucherType: constants.trainVoucherType,
                      costingIdentifier: transfer.key
                    });
                    break;
                  case constants.ferryTransferMode:
                    resolveLinks(false, false, {
                      voucherType: constants.ferryVoucherType,
                      costingIdentifier: transfer.key
                    });
                    break;
                  case constants.rentalCarTransferMode:
                    resolveLinks(false, false, {
                      voucherType: constants.rentalCarVoucherType,
                      costingIdentifier: transfer.key
                    });
                    break;
                  default:
                    resolveLinks(false, false, {
                      voucherType: constants.transferVoucherType,
                      costingIdentifier: transfer.key
                    });
                }
              }
            };
            return (
              <BookingSectionComponent
                containerStyle={[containerStyle, { marginHorizontal: 24 }]}
                title={activity.name}
                content={slotText}
                isImageContain={transferMode === "FLIGHT"}
                sectionImage={{ uri: imageObject.image }}
                onClick={onClick}
                contentNumberOfLines={3}
                defaultSource={
                  transferMode === "FLIGHT"
                    ? constants.flightLogoPlaceholderIllus
                    : { uri: getTransferImage(transferMode) }
                }
                isProcessing={!(transfer.voucher && transfer.voucher.booked)}
                spinValue={spinValue}
                isDataSkipped={_.get(transfer, "voucher.skipVoucher")}
                voucherTitle={_.get(transfer, "voucher.title")}
              />
            );

          case "INTERNATIONAL_DEPART":
            const departureFlight = internationalFlightKey
              ? getFlightById(internationalFlightKey)
              : null;
            if (!internationalFlightKey) {
              return null;
            }
            onClick = () => {
              recordEvent(constants.BookedItinerary.event, {
                click: constants.BookedItinerary.click.voucher,
                type: constants.BookedItinerary.type.flight
              });
              resolveLinks(false, false, {
                voucherType: constants.flightVoucherType,
                costingIdentifier: departureFlight.key
              });
            };
            imageObject = getSlotImage(internationalFlightKey, "FLIGHT");
            return (
              <BookingSectionComponent
                containerStyle={[containerStyle, { marginHorizontal: 24 }]}
                title={activity.name}
                content={
                  activity.departureSlotDetail
                    ? activity.departureSlotDetail.slotText
                    : ""
                }
                sectionImage={{ uri: imageObject.image }}
                isProcessing={false}
                contentNumberOfLines={3}
                isImageContain={true}
                onClick={onClick}
                defaultSource={constants.flightLogoPlaceholderIllus}
                isProcessing={
                  !(departureFlight.voucher && departureFlight.voucher.booked)
                }
                spinValue={spinValue}
                isDataSkipped={_.get(departureFlight, "voucher.skipVoucher")}
                voucherTitle={_.get(departureFlight, "voucher.title")}
              />
            );

          case "ACTIVITY_WITH_TRANSFER":
            const activityTransferInfo = getActivityById(
              activity.activitySlotDetail.activityCostingIdentifier
            );
            let withActivityTransferCostingIdentifier, withActivityTransferMode;
            const { intercityTransferSlotDetailVO } = activity;
            if (
              _.toUpper(intercityTransferSlotDetailVO.transferType) === "DIRECT"
            ) {
              const {
                transferCostingIdenfier: directTransferCostingIdenfier,
                transferMode: directTransferMode
              } = intercityTransferSlotDetailVO.directTransferDetail;
              withActivityTransferCostingIdentifier = directTransferCostingIdenfier;
              withActivityTransferMode = directTransferMode;
            } else if (
              _.toUpper(intercityTransferSlotDetailVO.transferType) ===
              "TRANSIT"
            ) {
              const {
                transitMode: directTransferMode,
                transferCostingIdenfier: directTransferCostingIdenfier
              } = intercityTransferSlotDetailVO.transitTransferDetail.arriveTransit;
              withActivityTransferCostingIdentifier = directTransferCostingIdenfier;
              withActivityTransferMode = directTransferMode;
            }
            imageObject = getSlotImage(
              withActivityTransferCostingIdentifier,
              withActivityTransferMode
            );
            const { mainPhoto } = activityTransferInfo;
            onClick = () => {
              recordEvent(constants.BookedItinerary.event, {
                click: constants.BookedItinerary.click.voucher,
                type: constants.BookedItinerary.type.activityWithTransfer
              });
              resolveLinks(false, false, {
                voucherType: constants.activityVoucherType,
                costingIdentifier: activityTransferInfo.costing.key
              });
            };
            return (
              <BookingSectionComponent
                containerStyle={[containerStyle, { marginHorizontal: 24 }]}
                title={activity.name}
                content={activityTransferInfo.title}
                sectionImage={{ uri: mainPhoto }}
                isProcessing={
                  !(
                    activityTransferInfo.voucher &&
                    (activityTransferInfo.voucher.booked ||
                      activityTransferInfo.free)
                  )
                }
                onClick={onClick}
                contentNumberOfLines={3}
                isImageContain={false}
                defaultSource={constants.activityThumbPlaceholderIllus}
                spinValue={spinValue}
                isDataSkipped={_.get(
                  activityTransferInfo,
                  "voucher.skipVoucher"
                )}
                voucherTitle={_.get(activityTransferInfo, "voucher.title")}
              />
            );

          default:
            return null;
        }
      };

      return [
        cityCardData
          ? [
              <CityCard
                key={0}
                {...cityCardData}
                containerStyle={{ marginTop: 24, marginBottom: 24 }}
              />,
              activityIndex === 0 ? (
                <SectionHeader
                  key={1}
                  sectionName={moment(day)
                    .format(constants.commonDateFormat)
                    .toUpperCase()}
                  containerStyle={{ marginHorizontal: 24 }}
                />
              ) : null
            ]
          : null,
        <SlotRow
          key={2}
          containerStyle={
            cityCardData && activityIndex !== 0 ? { marginTop: 16 } : {}
          }
        />
      ];
    }
  )
);

SlotActivity.propTypes = forbidExtraProps({
  activity: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  day: PropTypes.object.isRequired,
  activityIndex: PropTypes.number.isRequired,
  spinValue: PropTypes.object.isRequired
});

export default SlotActivity;
