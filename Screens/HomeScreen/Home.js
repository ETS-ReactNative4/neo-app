import React, { Component } from "react";
import { View, BackHandler, Platform, StyleSheet } from "react-native";
import HomeHeader from "../../CommonComponents/HomeHeader/HomeHeader";
import constants from "../../constants/constants";
import { isIphoneX } from "react-native-iphone-x-helper";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import NoInternetIndicator from "../../CommonComponents/NoInternetIndicator/NoInternetIndicator";
import CustomScrollView from "../../CommonComponents/CustomScrollView/CustomScrollView";
import { inject, observer } from "mobx-react/custom";
import PackageCarousel from "./Components/PackageCarousel";
import SimpleButton from "../../CommonComponents/SimpleButton/SimpleButton";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { recordEvent } from "../../Services/analytics/analyticsService";
import openCustomTab from "../../Services/openCustomTab/openCustomTab";
import changeColorAlpha from "../../Services/changeColorAlpha/changeColorAlpha";
import HomePageCustomTripWidget from "./Components/HomePageCustomTripWidget";

/**
 * Converts package type key to readable package name
 * "holiday-vacations" to "Holiday vacations"
 * @param packageType
 * @returns {string}
 */
const getReadablePackageName = packageType => {
  const name = packageType.split("-").join(" ");
  return name.charAt(0).toUpperCase() + name.slice(1);
};

/**
 * Todo: New color schemes (needs proper place in color palate
 */
const packageColors = [
  "rgba(34,213,255,1)", // blue
  "rgba(255,201,51,1)", // gold
  "rgba(239,67,93,1)" // pink
];
const cityNameTriangles = [
  constants.packageTriangleBlue,
  constants.packageTriangleGold,
  constants.packageTrianglePink
];

@ErrorBoundary({ isRoot: true })
@inject("packagesStore")
@observer
class Home extends Component {
  static navigationOptions = HomeHeader;

  state = {
    canGoBack: false,
    injectedJavascript: ""
  };
  _didFocusSubscription;
  _willBlurSubscription;

  constructor(props) {
    super(props);

    this._didFocusSubscription = props.navigation.addListener(
      "didFocus",
      () => {
        BackHandler.addEventListener("hardwareBackPress", this.goBack);
      }
    );
  }

  goBack = () => {
    const { navigation } = this.props;
    if (navigation.isFocused()) {
      BackHandler.exitApp();
    }
    return false;
  };

  componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener(
      "willBlur",
      () => {
        BackHandler.removeEventListener("hardwareBackPress", this.goBack);
      }
    );
    const { getPackages } = this.props.packagesStore;
    getPackages();
  }

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }

  render() {
    const { packages, getPackages, isLoading } = this.props.packagesStore;
    const packagesList = [];
    for (let packageType in packages) {
      if (packages.hasOwnProperty(packageType)) {
        /**
         * Set uniform color values and triangle color for a single section
         */
        const colorIndex = (packagesList.length + 1) % 3;
        const color = packageColors[colorIndex];
        const triangle = cityNameTriangles[colorIndex];
        packagesList.push({
          title: getReadablePackageName(packageType),
          packages: packages[packageType].map(packageData => {
            return {
              image: { uri: packageData.image },
              title: packageData.title,
              price: packageData.itineraryCost,
              region: packageData.regionName,
              slug: packageData.slug,
              color,
              triangle
            };
          })
        });
      }
    }
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white"
        }}
      >
        <NoInternetIndicator />
        <CustomScrollView
          style={styles.homeScrollContainer}
          showsVerticalScrollIndicator={true}
          refreshing={isLoading}
          onRefresh={getPackages}
        >
          {packagesList.map((packages, packagesIndex) => {
            if (packagesIndex === 2) {
              return [
                <HomePageCustomTripWidget
                  navigation={this.props.navigation}
                  key={packagesIndex + "section"}
                />,
                <PackageCarousel key={packagesIndex} {...packages} />
              ];
            }
            return <PackageCarousel key={packagesIndex} {...packages} />;
          })}
        </CustomScrollView>
        <View style={styles.actionBarWrapper}>
          <View style={styles.actionBar}>
            <SimpleButton
              containerStyle={{ height: 40, width: responsiveWidth(100) - 48 }}
              underlayColor={constants.firstColorAlpha(0.7)}
              text={"Start planning now"}
              action={() => {
                recordEvent(constants.homeStartPlanningNowClick);
                openCustomTab(
                  `${constants.productUrl}${constants.productCustomizePage}`
                );
              }}
              textColor={"white"}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  homeScrollContainer: {
    flex: 1
  },
  actionBar: {
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(0,0,0,.3)",
    marginBottom: isIphoneX() ? constants.xSensorAreaHeight : 0
  },
  actionBarWrapper: {
    backgroundColor: isIphoneX()
      ? "white"
      : changeColorAlpha(constants.black1, 0.9)
  }
});

export default Home;
