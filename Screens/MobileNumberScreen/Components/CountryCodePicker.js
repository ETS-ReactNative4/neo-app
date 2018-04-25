import React, { Component } from "react";
import {
  Modal,
  View,
  ScrollView,
  Platform,
  Text,
  SectionList,
  TouchableHighlight,
  Image,
  TextInput,
  StyleSheet,
  SafeAreaView
} from "react-native";
import CountryData from "country-data";
import constants from "../../../constants/constants";
import SimpleButton from "../../../CommonComponents/SimpleButton/SimpleButton";
import PropTypes from "prop-types";
import SearchInput from "../../../CommonComponents/SearchInput/SearchInput";

class CountryCodePicker extends Component {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  };

  state = {
    search: "",
    countriesToDisplay: CountryData.countries.all
  };

  clearSearch = () => {
    this.setState({
      search: "",
      countriesToDisplay: CountryData.countries.all
    });
  };

  search = query => {
    this.setState(
      {
        search: query
      },
      () => {
        if (!query) this.clearSearch();
      }
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
                width: 56,
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
  }
});

export default CountryCodePicker;
