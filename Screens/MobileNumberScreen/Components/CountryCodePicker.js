import React, { Component } from "react";
import {
  Modal,
  View,
  Platform,
  Text,
  SectionList,
  TouchableHighlight,
  StyleSheet,
  SafeAreaView
} from "react-native";
import CountryData from "country-data";
import constants from "../../../constants/constants";
import SimpleButton from "../../../CommonComponents/SimpleButton/SimpleButton";
import PropTypes from "prop-types";
import _ from "lodash";
import SearchInput from "../../../CommonComponents/SearchInput/SearchInput";
import SectionHeader from "../../../CommonComponents/SectionHeader/SectionHeader";

const countriesList = [
  {
    title: "Default",
    data: CountryData.countries.all.filter(
      each => each.alpha2 === "US" || each.alpha2 === "IN"
    )
  },
  {
    title: "All Countries",
    data: _.orderBy(CountryData.countries.all, "name", "asc")
  }
];

class CountryCodePicker extends Component {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    selectCountryCode: PropTypes.func.isRequired
  };

  state = {
    search: "",
    countriesToDisplay: countriesList
  };

  clearSearch = () => {
    this.setState({
      search: "",
      countriesToDisplay: countriesList
    });
  };

  updateResults = () => {
    this.setState({
      countriesToDisplay: [
        {
          title: "Default",
          data: this.state.search
            ? []
            : CountryData.countries.all.filter(
                each => each.alpha2 === "US" || each.alpha2 === "IN"
              )
        },
        {
          title: "All Countries",
          data: _.orderBy(
            CountryData.countries.all.filter(country => {
              const name = country.name.replace(/ /g, "").toUpperCase();
              const countryCode = country.alpha2
                .replace(/ /g, "")
                .toUpperCase();
              const searchQuery = this.state.search
                .replace(/ /g, "")
                .toUpperCase();

              if (
                name.includes(searchQuery) ||
                countryCode.includes(searchQuery)
              ) {
                return true;
              }
              return false;
            }),
            "name",
            "asc"
          )
        }
      ]
    });
  };

  search = query => {
    this.setState(
      {
        search: query
      },
      () => {
        if (!query) this.clearSearch();
        else this.updateResults();
      }
    );
  };

  selectCountry = countryCode => {
    this.props.selectCountryCode(countryCode);
    this.props.onClose();
  };

  sectionHeader = ({ section: { title } }) => {
    if (this.state.search) return null;
    if (title === "Default")
      return <View style={{ height: 24, backgroundColor: "white" }} />;
    else
      return (
        <SectionHeader
          sectionName={title}
          containerStyle={{ marginTop: 0, paddingTop: 24, height: 56 }}
        />
      );
  };

  sectionFooter = () => {
    if (this.state.countriesToDisplay[1].data.length === 0) {
      return (
        <Text style={styles.notFoundText}>
          {"No countries matching your search criteria."}
        </Text>
      );
    }
    return null;
  };

  sectionItem = ({ item, index, section }) => {
    if (!item.countryCallingCodes[0]) return null;

    const clicked = () => {
      this.selectCountry(item.countryCallingCodes[0]);
    };

    return (
      <TouchableHighlight
        key={index}
        underlayColor={"transparent"}
        onPress={clicked}
        style={styles.countryCodeTouchable}
      >
        <View style={styles.countryCodeItem}>
          <Text style={styles.countryName}>{`${item.name}`}</Text>
          <Text style={styles.countryCode}>{`${
            item.countryCallingCodes[0]
          }`}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  render() {
    const { isVisible, onClose } = this.props;

    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={isVisible}
        onRequestClose={onClose}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
          <View style={styles.searchContainer}>
            <SearchInput
              onSearch={this.search}
              onClearSearch={this.clearSearch}
              value={this.state.search}
            />

            <SimpleButton
              containerStyle={{
                height: 24,
                width: null,
                alignSelf: "center",
                marginLeft: 8
              }}
              textStyle={{
                fontFamily: constants.primaryLight,
                fontWeight: "normal",
                fontSize: 16,
                lineHeight: 16
              }}
              text={"Cancel"}
              action={onClose}
              textColor={constants.firstColor}
              color={"white"}
            />
          </View>

          <SectionList
            showsVerticalScrollIndicator={false}
            style={{ marginHorizontal: 24 }}
            renderSectionHeader={this.sectionHeader}
            renderItem={this.sectionItem}
            sections={this.state.countriesToDisplay}
            ListFooterComponent={this.sectionFooter}
            keyExtractor={(item, index) => index}
            stickySectionHeadersEnabled={true}
          />
        </SafeAreaView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  searchContainer: {
    ...Platform.select({
      ios: {
        height: 32
      },
      android: {
        height: 40
      }
    }),
    marginHorizontal: 24,
    marginTop: 16,
    flexDirection: "row"
  },
  countryCodeTouchable: {
    height: 56,
    justifyContent: "center"
  },
  countryCodeItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  countryCode: {
    width: 64,
    ...constants.fontCustom(constants.primaryLight, 20),
    textAlign: "right",
    color: constants.shade3
  },
  countryName: {
    ...constants.fontCustom(constants.primaryLight, 20),
    color: constants.shade1
  },
  notFoundText: {
    ...constants.font17(constants.primaryLight),
    marginTop: 24,
    color: constants.shade1
  }
});

export default CountryCodePicker;
