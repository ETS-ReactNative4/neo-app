import React from "react";
import { View } from "react-native";
import constants from "../../../../../constants/constants";
import { recordEvent } from "../../../../../Services/analytics/analyticsService";
import BookingSectionComponent from "../../../../../CommonComponents/BookingSectionComponent/BookingSectionComponent";
import Visa, * as VisaMobX from "../../../../../mobx/Visa";
import { observer, inject } from "mobx-react";
import { IVisaCosting } from "../../../../../TypeInterfaces/IItinerary";
import { NavigationStackProp } from "react-navigation-stack";

export interface VisaSectionProps {
  section: { items: IVisaCosting[] };
  navigation: NavigationStackProp;
  spinValue: object;
  visaStore: Visa;
}

const VisaSection = ({
  visaStore,
  navigation,
  spinValue
}: VisaSectionProps) => {
  const customStyle = {
    paddingBottom: 16
  };

  const {
    visaList,
    isSingleVisa,
    isVisaInitialized,
    isVisaAvailable
  } = visaStore;

  const openVoucher = () => {
    recordEvent(constants.Bookings.event, {
      click: constants.Bookings.click.accordionVoucher,
      type: constants.Bookings.type.visa
    });
    VisaMobX.default.visaOpener({
      navigation,
      isVisaInitialized,
      isSingleVisa,
      visaList,
      isVisaAvailable
    });
  };

  let content = "",
    title = "";

  if (visaList.length === 1) {
    title = visaList[0].visaStr;
    content = visaList[0].title;
  } else if (visaList.length > 1) {
    title = "MULTIPLE VISAS";
    content = `${visaList[0].title} & ${visaList.length - 1} more`;
  } else {
    title = "Visa Processing";
    content = "Let’s initiate your visa!";
  }

  return (
    <View>
      <BookingSectionComponent
        spinValue={spinValue}
        containerStyle={customStyle}
        sectionImage={constants.visaThumbnailIllus}
        isProcessing={false}
        onClick={openVoucher}
        content={content}
        title={title}
        isImageContain={false}
      />
    </View>
  );
};

// export interface IVisaSectionProps {
//   visaStore: Visa;
//   isLast: boolean;
//   navigation: NavigationStackProp;
//   spinValue: object;
//   visa: IVisaCosting;
// }

// const VisaComponentElement = ({
//   visaStore,
//   visa,
//   isLast,
//   navigation,
//   spinValue
// }: IVisaSectionProps) => {
//   let customStyle = {};
//   if (isLast) {
//     customStyle = {
//       // borderBottomWidth: StyleSheet.hairlineWidth,
//       paddingBottom: 16
//     };
//   }
//
//   const openVoucher = () => {
//     recordEvent(constants.Bookings.event, {
//       click: constants.Bookings.click.accordionVoucher,
//       type: constants.Bookings.type.visa
//     });
//     const {
//       isVisaInitialized,
//       isSingleVisa,
//       visaList,
//       isVisaAvailable
//     } = visaStore;
//     VisaMobX.default.visaOpener({
//       navigation,
//       isVisaInitialized,
//       isSingleVisa,
//       visaList,
//       isVisaAvailable
//     });
//   };
//
//   const isSchengen = visa.schengen;
//
//   return (
//     <BookingSectionComponent
//       spinValue={spinValue}
//       containerStyle={customStyle}
//       sectionImage={constants.visaThumbnailIllus}
//       isProcessing={false}
//       onClick={openVoucher}
//       content={visa.country}
//       title={isSchengen ? "Schengen" : ""}
//       isImageContain={false}
//       hideTitle={!isSchengen}
//     />
//   );
// };

// const VisaComponent = inject("visaStore")(observer(VisaComponentElement));

export default inject("visaStore")(observer(VisaSection));
