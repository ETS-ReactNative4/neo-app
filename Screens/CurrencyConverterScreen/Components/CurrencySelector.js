import React, {
  Component,
} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Modal,
  TouchableHighlight,
  Image,
  Text,
} from 'react-native';
import {
  SafeAreaView,
} from 'react-navigation';
import PropTypes from 'prop-types';
import { isIphoneX } from 'react-native-iphone-x-helper';
import constants from "../../../constants/constants";
import SectionHeader from "../../../CommonComponents/SectionHeader/SectionHeader";

const CurrencyRow = ({image, text, action}) => {
  return (
    <TouchableHighlight underlayColor={'transparent'} action={()=>{}} style={styles.currencyRowTouchable}>
      <View style={styles.currencyRowContainer}>
        <Image style={styles.currencyRowFlagImage} source={constants.starterBackground}/>
        <Text style={styles.currencyName}>{`EUR - EURO`}</Text>
      </View>
    </TouchableHighlight>
  );
};

// CurrencyRow.propTypes = {
//   image: PropTypes.oneOfType([
//     PropTypes.number,
//     PropTypes.object,
//   ]).isRequired,
//   text: PropTypes.string.isRequired,
//   action: PropTypes.func.isRequired,
// };

class CurrencySelector extends Component {

  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  render() {
    return(
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.isVisible}
        onRequestClose={() => {
          console.log('modal closed!');
        }}>
        <SafeAreaView style={{flex: 1}}>
          <View style={styles.container}>
            <View style={styles.header}>
              <TouchableHighlight style={styles.icon} underlayColor={'transparent'} onPress={this.props.onClose}>
                <Image
                  style={styles.icon}
                  source={constants.notificationIcon}
                />
              </TouchableHighlight>
              <View style={styles.headingArea}>
                <Text style={styles.headingText}>Output Currency</Text>
              </View>
              <TouchableHighlight style={styles.icon}>
                <Image
                  style={styles.icon}
                  source={constants.notificationIcon}
                />
              </TouchableHighlight>
            </View>
            <ScrollView style={[styles.optionsContainer, {marginBottom: isIphoneX() ?30: 0}]}>

              <CurrencyRow/>
              <CurrencyRow/>
              <CurrencyRow/>

              <SectionHeader sectionName={'MORE CURRENCIES'} containerStyle={{marginTop: 40, marginBottom: 0}}/>

              <CurrencyRow/>
              <CurrencyRow/>
              <CurrencyRow/>

            </ScrollView>
          </View>
        </SafeAreaView>
      </Modal>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    height: 32,
    marginVertical: 32,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headingArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingText: {
    ...constants.font20(constants.primarySemiBold),
  },
  icon: {
    height: 24,
    width: 24,
  },
  optionsContainer: {
  },
  flagImage: {
    height: 20,
    width: 30,
  },
  currencyRowTouchable: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: constants.shade4,
  },
  currencyRowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencyRowFlagImage: {
    height: 20,
    width: 30,
    marginRight: 8,
  },
  currencyName: {
    ...constants.font17(constants.primaryLight),
    marginTop: 8,
    color: constants.black2,
  },
});

export default CurrencySelector;
