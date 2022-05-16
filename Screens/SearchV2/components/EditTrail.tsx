import React, {
  useEffect,
  useState,
  useMemo,
  useContext,
  useReducer,
} from 'react';
import {Pressable, Space, Input, Text} from '@pyt/micros';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Modal,
  Alert,
  TextInput,
} from 'react-native';
import {DatePicker, Select} from '@pyt/macros';
import Accordion from 'react-native-collapsible/Accordion';
import {responseContext} from '../Search';
import apiCall from '../../../Services/networkRequests/apiCall';
import {isEqual} from 'lodash';
import {
  CONSTANT_checkMarkCircle,
  CONSTANT_transferIcon,
  CONSTANT_dropDownArrowDarkIcon,
} from '../../../constants/imageAssets';
import constants from '../../../constants/constants';
import Icon from '../../../CommonComponents/Icon/Icon';
import {Picker} from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';
import {userContext} from '../../../App';

const SECTIONS = [
  {
    title: 'Customer Details',
  },
  {
    title: 'Trail Details',
  },
];
const EditTrail = ({
  trail,
  reload,
  reloading,
  saving,
  setSaving,
  handleTab,
}) => {
  const resContext = useContext(responseContext);
  const [trailStatus, callres, reasons, cities, allUsers] = [
    ...resContext.resState.master,
  ];
  const [activeSections, setActiveSections] = useState([0]);
  const {
    sales_owner,
    trail_id,
    departure,
    flying_from,
    customer,
    attachment,
  } = trail;
  const {dispatch, users} = useContext(userContext);

  const salesOwners = allUsers.filter((item, id) => {
    return (
      item.role_id.startsWith('sales_') ||
      item.role_id.startsWith('curator_') ||
      (item.role_id.startsWith('fr_') && item.status === 1) ||
      (item.role_id.startsWith('franchise') && item.status === 1)
    );
  });

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [deptDate, setDeptDate] = useState();
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  var dateNew;
  const handleConfirm = date => {
    dateNew = dayjs(new Date(date)).format('YYYY-MM-DD');
    setDeptDate(dateNew);
    setTrailDetails({
      departure_date: dayjs(new Date(dateNew)).format('YYYY-MM-DD'),
    });
    console.log(dateNew);
    hideDatePicker();
  };

  const originalTrailDetails = useMemo(() => {
    return {
      sales_owner,
      departure_date: departure,
      departure_city:
        cities.filter(({city}) => city === flying_from)[0] || flying_from,
    };
  }, [trail, cities]);

  const [trailDetails, setTrailDetails] = useReducer(
    (state, diff) => ({...state, ...diff}),
    originalTrailDetails,
  );

  const originalCustomerDetails = useMemo(() => {
    return {
      first_name: customer.name,
      last_name: customer.last_name,
      mobile: customer.mobile,
      email: customer.email,
      country_code: customer.country_code,
      pan_number: customer.pan_number,
      pan_name: customer.pan_name,
    };
  }, [customer]);

  const [customerDetails, setCustomerDetails] = useReducer(
    (state, diff) => ({...state, ...diff}),
    originalCustomerDetails,
  );

  useEffect(() => {
    setSaving(true);
    const body = {};
    Object.keys(trailDetails).forEach(key => {
      if (!isEqual(trailDetails[key], originalTrailDetails[key])) {
        switch (key) {
          case 'sales_owner':
            body['owner_id'] = trailDetails[key].user_id;
            break;
          case 'departure_city':
            body[key] = trailDetails[key].city;
            break;

          default:
            body[key] = trailDetails[key];
            break;
        }
      }
    });
    const requestObj = {
      id: trail_id,
      ...body,
    };
    apiCall(`${constants.trailUpdate}`, requestObj, 'PATCH', false, null, {
      Authorization: 'Bearer ' + users.tokens.access_token,
    })
      .then(res => {
        //  if(res.status =='success'){
        //   reload(true)
        //   handleTab('Edit Logs','editlog')
        //  }
        reload(true);
      })

      .catch(() => {
        // Alert.alert('Error!')
      })
      .finally(() => {
        setSaving(false);
      });
  }, [trailDetails]);

  const updateCustomer = request => {
    setSaving(true);
    apiCall(
      `${constants.customerUpdate}`,
      {
        id: customer.id,
        ...request,
      },
      'PATCH',
      false,
      null,
      {
        Authorization: 'Bearer ' + users.tokens.access_token,
      },
    )
      .then(res => {
        // handleTab('Edit Logs','editlog')
        reload(true);
        console.log('customer', res);
      })

      .catch(() => {
        Alert.alert('Error!');
      })
      .finally(() => {
        setSaving(false);
      });
  };

  const updateSections = sec => {
    setActiveSections(sec);
  };
  const renderHeader = section => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title} </Text>
        <Icon style={styles.headerIcon} name={CONSTANT_dropDownArrowDarkIcon} />
      </View>
    );
  };
  const renderContent = section => {
    return (
      <View style={styles.content}>
        {activeSections[0] === 0 ? (
          <Space flexWrap={'wrap'}>
            <Space direction="column">
              <Space.Item
                flexDirection="row"
                alignItems="center"
                justifyContent={'space-between'}>
                <Text style={styles.inputLabel}>E-mail ID</Text>
                {!reloading &&
                !saving &&
                !isEqual(
                  originalCustomerDetails.email,
                  customerDetails.email,
                ) ? (
                  <Icon
                    name={CONSTANT_checkMarkCircle}
                    style={styles.save}
                    onPress={() =>
                      updateCustomer({
                        email: customerDetails.email,
                      })
                    }
                  />
                ) : null}
              </Space.Item>
              <TextInput
                defaultValue={trail.customer.email}
                style={styles.inputField}
                onChangeText={text =>
                  setCustomerDetails({
                    email: text,
                  })
                }
              />
            </Space>
            <Space direction="column">
              <Space.Item
                flexDirection="row"
                alignItems="center"
                justifyContent={'space-between'}>
                <Text style={styles.inputLabel}>Mobile</Text>
                {!reloading &&
                !saving &&
                !isEqual(
                  originalCustomerDetails.mobile,
                  customerDetails.mobile,
                ) ? (
                  <Icon
                    name={CONSTANT_checkMarkCircle}
                    style={styles.save}
                    onPress={() =>
                      updateCustomer({
                        mobile: customerDetails.mobile,
                      })
                    }
                  />
                ) : null}
              </Space.Item>
              <TextInput
                defaultValue={trail.customer.mobile}
                style={styles.inputField}
                onChangeText={text =>
                  setCustomerDetails({
                    mobile: text,
                  })
                }
              />
            </Space>
            <Space direction="column">
              <Space.Item
                flexDirection="row"
                alignItems="center"
                justifyContent={'space-between'}>
                <Text style={styles.inputLabel}>Country Code</Text>
                {!reloading &&
                !saving &&
                !isEqual(
                  originalCustomerDetails.country_code,
                  customerDetails.country_code,
                ) ? (
                  <Icon
                    name={CONSTANT_checkMarkCircle}
                    style={styles.save}
                    onPress={() =>
                      updateCustomer({
                        country_code: customerDetails.country_code,
                      })
                    }
                  />
                ) : null}
              </Space.Item>
              <TextInput
                defaultValue={trail.customer.country_code}
                style={styles.inputField}
                onChangeText={text =>
                  setCustomerDetails({
                    country_code: text,
                  })
                }
              />
            </Space>
            <Space direction="column">
              <Space.Item
                flexDirection="row"
                alignItems="center"
                justifyContent={'space-between'}>
                <Text style={styles.inputLabel}>First Name</Text>
                {!reloading &&
                !saving &&
                !isEqual(
                  originalCustomerDetails.first_name,
                  customerDetails.first_name,
                ) ? (
                  <Icon
                    name={CONSTANT_checkMarkCircle}
                    style={styles.save}
                    onPress={() =>
                      updateCustomer({
                        first_name: customerDetails.first_name,
                      })
                    }
                  />
                ) : null}
              </Space.Item>
              <TextInput
                defaultValue={trail.customer.name}
                style={styles.inputField}
                onChangeText={text =>
                  setCustomerDetails({
                    first_name: text,
                  })
                }
              />
            </Space>
            <Space direction="column">
              <Space.Item
                flexDirection="row"
                alignItems="center"
                justifyContent={'space-between'}>
                <Text style={styles.inputLabel}>Pan Number</Text>
                {!reloading &&
                !saving &&
                !isEqual(
                  originalCustomerDetails.pan_number,
                  customerDetails.pan_number,
                ) ? (
                  <Icon
                    name={CONSTANT_checkMarkCircle}
                    style={styles.save}
                    onPress={() =>
                      updateCustomer({
                        pan_number: customerDetails.pan_number,
                      })
                    }
                  />
                ) : null}
              </Space.Item>
              <TextInput
                defaultValue={trail.customer.pan_number}
                style={styles.inputField}
                onChangeText={text =>
                  setCustomerDetails({
                    pan_number: text,
                  })
                }
              />
            </Space>
            <Space direction="column">
              <Space.Item
                flexDirection="row"
                alignItems="center"
                justifyContent={'space-between'}>
                <Text style={styles.inputLabel}>Pan Name</Text>
                {!reloading &&
                !saving &&
                !isEqual(
                  originalCustomerDetails.pan_name,
                  customerDetails.pan_name,
                ) ? (
                  <Icon
                    name={CONSTANT_checkMarkCircle}
                    style={styles.save}
                    onPress={() =>
                      updateCustomer({
                        pan_name: customerDetails.pan_name,
                      })
                    }
                  />
                ) : null}
              </Space.Item>
              <TextInput
                defaultValue={trail.customer.pan_name}
                style={styles.inputField}
                onChangeText={text =>
                  setCustomerDetails({
                    pan_name: text,
                  })
                }
              />
            </Space>
          </Space>
        ) : activeSections[0] === 1 ? (
          <Space flexWrap={'wrap'}>
            <Space direction="column">
              <Space.Item flexDirection="row" alignItems="center">
                <Text style={styles.inputLabel}>Departure City</Text>
              </Space.Item>
              <Space.Item width={150} style={styles.dropDown}>
                <Picker
                  mode="dropdown"
                  dropdownIconColor="#B3B3B3"
                  selectedValue={trailDetails.departure_city}
                  onValueChange={(itemValue, itemIndex) =>
                    setTrailDetails({
                      departure_city: itemValue,
                    })
                  }>
                  {cities.map((item, i) => {
                    return (
                      <Picker.Item
                        label={item.city}
                        value={item.city}
                        style={styles.drop}
                      />
                    );
                  })}
                </Picker>
              </Space.Item>
            </Space>

            <Space direction="column">
              <Text style={styles.inputLabel}>Departure Date</Text>
              <Space style={styles.semiblock}>
                <TextInput
                  style={styles.dropInp}
                  // defaultValue={deptDate}
                  placeholderTextColor="#9DA4B2"
                  value={deptDate}></TextInput>
                <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
                  <Icon
                    name={CONSTANT_transferIcon}
                    key={1}
                    size={16}
                    color={'#9DA4B2'}
                  />
                </TouchableOpacity>
              </Space>
              <DateTimePickerModal
                date={deptDate ? new Date(deptDate) : new Date()}
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </Space>
            <Space direction="column">
              <Space.Item flexDirection="row" alignItems="center">
                <Text style={styles.inputLabel}>Sales Owner</Text>
              </Space.Item>
              <Space.Item width={150} style={styles.dropDown}>
                <Picker
                  mode="dropdown"
                  dropdownIconColor="#B3B3B3"
                  dropdownIconRippleColor="#B3B3B3"
                  selectedValue={trailDetails.sales_owner}
                  onValueChange={(itemValue, itemIndex) =>
                    setTrailDetails({
                      sales_owner: itemValue,
                    })
                  }>
                  {salesOwners.map((item, i) => {
                    return (
                      <Picker.Item
                        label={item.username}
                        value={item.username}
                        style={styles.drop}
                      />
                    );
                  })}
                </Picker>
              </Space.Item>
            </Space>
          </Space>
        ) : null}
      </View>
    );
  };
  return (
    <View style={styles.centeredView}>
      <Text style={styles.title}>Edit Trail</Text>
      <Accordion
        sections={SECTIONS}
        activeSections={activeSections}
        // renderSectionTitle={(section)=>renderSectionTitle(section)}
        renderHeader={section => renderHeader(section)}
        renderContent={section => renderContent(section)}
        onChange={sec => updateSections(sec)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#2B2B3D',
    padding: 10,
    width: 300,
    marginBottom: 5,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#B3B3B3',
  },
  headerIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    color: '#B3B3B3',
  },
  content: {
    padding: 5,
    backgroundColor: 'transparent',
  },
  active: {
    backgroundColor: 'green',
  },
  inputField: {
    borderColor: '#B3B3B3',
    borderStyle: 'solid',
    borderWidth: 1,
    height: 40,
    width: 150,
    marginBottom: 10,
    borderRadius: 5,
    color: '#B3B3B3',
    paddingLeft: 10,
  },
  inputLabel: {
    color: '#B3B3B3',
    fontWeight: 'bold',
  },
  title: {
    color: '#B3B3B3',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  save: {
    color: '#6FCF97',
    fontWeight: 'bold',
    fontSize: 22,
  },
  dropDown: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#B3B3B3',
    padding: 0,
    borderRadius: 5,
    height: 40,
    alignContent: 'center',
    justifyContent: 'center',
  },
  semiblock: {
    width: 130,
    paddingLeft: 10,
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 10,
    borderColor: '#B3B3B3',
    borderStyle: 'solid',
    borderWidth: 1,
    height: 40,
  },
  drop: {
    color: '#B3B3B3',
    padding: 0,
    margin: 0,
  },
  dropInp: {
    width: 80,
    color: '#B3B3B3',
    fontSize: 12,
  },
});

export default EditTrail;
