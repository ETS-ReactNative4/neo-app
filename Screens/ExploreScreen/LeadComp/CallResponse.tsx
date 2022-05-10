import React, {
  useEffect,
  useState,
  useContext,
  useReducer,
  useMemo,
} from 'react';
import {Space, Input, Text} from '@pyt/micros';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Pressable,
  TextInput,
} from 'react-native';
import {responseContext} from '../Explore';
import dayjs from 'dayjs';
import Icon from '../../../CommonComponents/Icon/Icon';
import {Picker} from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import apiCall from '../../../Services/networkRequests/apiCall';
import constants from '../../../constants/constants';
import {
  CONSTANT_checkMarkCircle,
  CONSTANT_transferIcon,
  CONSTANT_dropDownArrowDarkIcon,
} from '../../../constants/imageAssets';
import {userContext} from '../../../App';
import {call} from 'react-native-reanimated';
import {dataContext} from '../../../App';

const fields = response => {
  debugger;
  switch (response.call_response) {
    case 1:
      if (response.move_to_nr) {
        return ['move_to_nr', 'cal_desc'];
      }
      return ['follow_up_date', 'follow_up_time', 'move_to_nr', 'cal_desc'];

    case 2:
      return ['follow_up_date', 'follow_up_time', 'cal_desc'];
    case 3:
      return ['reason_id', 'cal_desc'];
    case 4:
      return ['type_of_credential', 'cal_desc'];
    case 5:
      if ([8, 9, 14, 24].includes(response.trail_status?.id)) {
        return ['reason_id', 'trail_status', 'cal_desc'];
      }
      if (response.trail_status?.id === 7) {
        return [
          'reason_id',
          'hotel_cancellation_reason',
          'trail_status',
          'cal_desc',
        ];
      }
      if (response.trail_status?.id === 15) {
        return ['trail_status', 'cal_desc'];
      }
      return ['follow_up_date', 'follow_up_time', 'trail_status', 'cal_desc'];
    case 99:
      return ['follow_up_date', 'follow_up_time', 'trail_status', 'cal_desc'];
    default:
      return [];
  }
};
var finalStatus = [];
const getTrailStatuses = (currentStatus, masTrailStatus) => {
  const trailIds = masTrailStatus.map(({id}) => id);
  const currentTrailData = masTrailStatus.filter(
    (item, i) => item.id == currentStatus.id,
  );
  const cango = currentTrailData[0].can_go.split(',');
  const finalResults = cango.map((item, inx) => {
    const findIndexItems = trailIds.indexOf(parseInt(item));
    if (findIndexItems != -1) {
      return masTrailStatus[findIndexItems];
    }
  });
  return finalResults;
};

const CallResponse = ({trail, saving, reload, handleTab}) => {
  const {
    trail_status,
    trail_id,
    nr_by_so_count,
    departure: currentDepartureDate,
    spoke_calls_count,
  } = trail;
  const [loading, setLoading] = useState(false);
  const [departure, setDeparture] = useState(currentDepartureDate);
  const {dispatch, users} = useContext(userContext);
  const {dataApi, dispatchRes} = useContext(dataContext);
  const [trailStatuses, callRes, reasons] = [...dataApi.master];
  const [isPress, setPress] = useState(false);
  // var TouchableSetActive = require('react-native-touchable-set-active');

  const cancelReason = reasons.filter((item, i) => {
    return item.stage === 8;
  });
  const credentialTypes = [
    {
      name: 'Mobile',
      key: 1,
    },
    {
      name: 'E-mail',
      key: 2,
    },
    {
      name: 'Both',
      key: 3,
    },
  ];
  const defaultResponse = useMemo(
    () => ({
      call_response: null,
      move_to_nr: false,
      follow_up_date: dayjs().format('YYYY-MM-DD'),
      follow_up_time: null,
      trail_status: trail_status,
      type_of_credential: null,
      reason_id: [null],
      hotel_cancellation_reason: null,
      cal_desc: '',
    }),
    [trail_status],
  );
  const [response, setResponse] = useReducer(
    (state, diff) => ({...state, ...diff}),
    defaultResponse,
  );
  const {
    call_response,
    move_to_nr,
    follow_up_date,
    follow_up_time,
    trail_status: new_trail_status,
    type_of_credential,
    reason_id,
    cal_desc,
    hotel_cancellation_reason,
  } = useMemo(() => response, [response]);

  const visibleFields = useMemo(() => {
    debugger;
    console.log('call anita');
    return fields(response);
  }, [call_response, new_trail_status, move_to_nr]);

  const defaultFeedback = {
    call_response: 'default',
    follow_up_date: 'default',
    follow_up_time: 'default',
    trail_status: 'default',
    type_of_credential: 'default',
    cal_desc: 'default',
    reason_id: ['default'],
    hotel_cancellation_reason: 'default',
  };
  const [feedback, setFeedback] = useState(defaultFeedback);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDeptDateVisible, setDeptDateVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [deptDate, setDeptDate] = useState();
  const [followTime, setfollowTime] = useState();
  const [followDate, setfollowDate] = useState();
  const hideDatePicker = () => {
    setDeptDateVisible(false);
    setTimePickerVisibility(false);
    setDatePickerVisibility(false);
  };
  var dateNew;
  const handleFollwDate = date => {
    dateNew = dayjs(new Date(date)).format('YYYY-MM-DD');
    setfollowDate(dateNew);
    setResponse({follow_up_date: dateNew});
    hideDatePicker();
  };
  const handleDeptDate = date => {
    dateNew = dayjs(new Date(date)).format('YYYY-MM-DD');
    setDeparture(dateNew);
    setDeptDateVisible(false);
  };

  const handleTimeConfim = date => {
    console.log('selected time', date);
    dateNew = dayjs(new Date(date)).format('hh:mm A');
    setfollowTime(dateNew);
    setResponse({
      follow_up_time: dateNew,
    });
    hideDatePicker();
  };
  useEffect(() => {
    setResponse({
      ...defaultResponse,
      call_response: call_response,
    });
  }, [call_response]);

  // useEffect(()=>{
  //     callRes.push({id: 99,name: "Itinerary Shared"})
  //     console.log(callRes);
  // },[])

  const submit = () => {
    saving(true);
    setLoading(true);
    apiCall(
      `${constants.callNotesUpdate}`,
      {
        type: 'sales',
        trail_id,
        call_response: call_response === 99 ? 5 : call_response,
        follow_on: visibleFields.includes('follow_up_date')
          ? dayjs(`${followDate} ${followTime}`).format('YYYY-MM-DD HH:mm:ss')
          : undefined,
        is_itinerary_shared: call_response === 99 ? 1 : undefined,
        trail_status: visibleFields.includes('trail_status')
          ? response.trail_status
          : undefined,
        type_of_credential: visibleFields.includes('type_of_credential')
          ? response.type_of_credential
          : undefined,
        reason_id: visibleFields.includes('reason_id') ? reason_id : undefined,
        move_to_nr: visibleFields.includes('move_to_nr')
          ? move_to_nr
          : undefined,
        hotel_cancellation_reason: visibleFields.includes(
          'hotel_cancellation_reason',
        )
          ? hotel_cancellation_reason?.id
          : undefined,
        cal_desc: cal_desc,
      },
      'PUT',
      false,
      null,
      {
        Authorization: 'Bearer ' + users.tokens.access_token,
      },
    )
      .then(() => {
        setFeedback(defaultFeedback);
        Alert.alert('Response Saved !!');
        reload(true);
        handleTab('Call Logs', 'log');
      })
      .catch(() => {})
      .finally(() => {
        saving(false);
        setLoading(false);
      });
  };

  return (
    <View>
      <Space direction={'column'}>
        <Space direction={'column'}>
          <Text style={styles.title}>Call response (Add New Call Note)</Text>
        </Space>

        {/* <TouchableSetActive
                    setActive={(isActive) => {
                        setPress(isActive)
                    }}
                    style={[
                        !isPress&& styles.button,
                       isPress && styles.active,
                    ]}
                >
                    <Text
                        style={isPress && styles.active}
                    >
                        Example Button
                    </Text>
                </TouchableSetActive> */}
        <Space flexWrap={'wrap'}>
          {[
            ...callRes,
            {
              name: 'Itinerary Shared',
              id: 99,
            },
          ].map(res => {
            return (
              <Pressable
                style={({pressed}) => [
                  {
                    borderColor: pressed ? '#6FCF97' : '#E5E5E5',
                  },
                  {
                    backgroundColor: pressed ? '#6FCF97' : 'transparent',
                  },

                  styles.button,
                ]}
                onPressOut={() => {
                  setPress(res.name);
                  setResponse({
                    call_response: res.id,
                  });
                }}>
                <Text style={styles.res}>{res.name} </Text>
              </Pressable>
            );
          })}
        </Space>
        <Space>
          <Text color={'#6FCF97'}>{isPress}</Text>
        </Space>

        {call_response === 5 && spoke_calls_count == 0 ? (
          <Space direction="column">
            <Text style={styles.inputLabel}>Departure Date</Text>
            <Space style={styles.semiblock}>
              <TextInput
                style={styles.dropInp}
                // defaultValue={deptDate}
                placeholderTextColor="#9DA4B2"
                value={departure}></TextInput>
              <TouchableOpacity onPress={() => setDeptDateVisible(true)}>
                <Icon
                  name={CONSTANT_transferIcon}
                  key={1}
                  size={16}
                  color={'#9DA4B2'}
                />
              </TouchableOpacity>
            </Space>
            <DateTimePickerModal
              date={departure ? new Date(departure) : new Date()}
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleDeptDate}
              onCancel={hideDatePicker}
            />
          </Space>
        ) : null}

        {visibleFields.includes('type_of_credential') ? (
          <Space direction="column">
            <Space.Item flexDirection="row" alignItems="center">
              <Text style={styles.inputLabel}>Credential Type</Text>
            </Space.Item>
            <Space.Item width={150} style={styles.dropDown}>
              <Picker
                mode="dropdown"
                dropdownIconColor="#B3B3B3"
                selectedValue={type_of_credential}
                onValueChange={(itemValue, itemIndex) => {
                  console.log(itemValue);
                  setResponse({
                    type_of_credential: itemValue,
                  });
                }}>
                {credentialTypes.map((item, i) => {
                  return (
                    <Picker.Item
                      label={item.name}
                      value={item.key}
                      style={styles.drop}
                    />
                  );
                })}
              </Picker>
            </Space.Item>
          </Space>
        ) : (
          <></>
        )}

        {visibleFields.includes('follow_up_date') ? (
          <Space flexWrap={'wrap'}>
            <Space direction="column">
              <Text style={styles.inputLabel}>Follow Up</Text>
              <Space style={styles.semiblock}>
                <TextInput
                  style={styles.dropInp}
                  // defaultValue={deptDate}
                  placeholderTextColor="#9DA4B2"
                  value={followDate}
                  editable={false}></TextInput>
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
                date={followDate ? new Date(followDate) : new Date()}
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleFollwDate}
                onCancel={hideDatePicker}
              />
            </Space>

            <Space direction="column">
              <Text style={styles.inputLabel}>Follow Time</Text>
              <Space style={styles.semiblock} justifyContent={'space-between'}>
                <TextInput
                  style={styles.dropInp}
                  placeholderTextColor="#9DA4B2"
                  value={followTime}
                  editable={false}></TextInput>
                <TouchableOpacity onPress={() => setTimePickerVisibility(true)}>
                  <Icon
                    name={CONSTANT_dropDownArrowDarkIcon}
                    key={1}
                    size={16}
                    color={'#9DA4B2'}
                  />
                </TouchableOpacity>

                <DateTimePickerModal
                  isVisible={isTimePickerVisible}
                  mode="time"
                  onConfirm={handleTimeConfim}
                  onCancel={hideDatePicker}
                />
              </Space>
            </Space>
          </Space>
        ) : (
          <></>
        )}

        {visibleFields.includes('trail_status') ? (
          <Space.Item width="100%">
            <Space direction="column">
              <Text style={styles.inputLabel}>Trail Status</Text>
              <Space.Item width={150} style={styles.dropDown}>
                <Picker
                  mode="dropdown"
                  dropdownIconColor="#B3B3B3"
                  selectedValue={new_trail_status}
                  onValueChange={(itemValue, itemIndex) => {
                    console.log('test new trail statsu', new_trail_status);

                    setResponse({
                      trail_status: itemValue,
                    });
                  }}>
                  {getTrailStatuses(trail_status, trailStatuses).map(
                    (item, i) => {
                      if (i != 4) {
                        return (
                          <Picker.Item
                            label={item.name}
                            value={item.id}
                            style={styles.drop}
                          />
                        );
                      }
                    },
                  )}
                </Picker>
              </Space.Item>
              )
            </Space>
            <Space direction={'row'} justifyContent={'flex-start'}></Space>
          </Space.Item>
        ) : (
          <></>
        )}

        {visibleFields.includes('reason_id') ? (
          <Space.Item width="100%">
            <Space direction="column">
              <Text style={styles.inputLabel}>Reason</Text>
              <Space.Item width={150} style={styles.dropDown}>
                <Picker
                  mode="dropdown"
                  dropdownIconColor="#B3B3B3"
                  selectedValue={reason_id}
                  onValueChange={(itemValue, itemIndex) => {
                    setResponse({
                      reason_id: itemValue,
                    });
                    visibleFields;
                  }}>
                  {cancelReason.map((item, i) => {
                    return (
                      <Picker.Item
                        label={item.name}
                        value={item.id}
                        style={styles.drop}
                      />
                    );
                  })}
                </Picker>
              </Space.Item>
              )
            </Space>
          </Space.Item>
        ) : (
          <></>
        )}
        {visibleFields.includes('cal_desc') ? (
          <Space direction="column">
            <Space.Item flexDirection="row" alignItems="center">
              <Text style={styles.inputLabel}>More Info</Text>
            </Space.Item>
            <TextInput
              style={styles.textarea}
              multiline={true}
              numberOfLines={8}
              onChangeText={value =>
                setResponse({
                  cal_desc: value,
                })
              }
            />
          </Space>
        ) : (
          <></>
        )}
        <Space style={styles.bottomBtns}>
          <Space.Item width="35%">
            <TouchableOpacity
              onPress={() => Alert.alert('Cancel')}
              style={styles.cancelBtn}>
              <Text style={styles.btnTxt}> Cancel</Text>
            </TouchableOpacity>
          </Space.Item>
          <Space.Item width="35%">
            <TouchableOpacity
              onPress={() => !loading && submit()}
              disabled={loading}
              style={styles.updateBtn}>
              <Text style={styles.btnTxt}>Update calls</Text>
            </TouchableOpacity>
          </Space.Item>
        </Space>
      </Space>
    </View>
  );
};
const styles = StyleSheet.create({
  modalText: {
    marginBottom: 15,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 5,
  },
  res: {
    fontSize: 12,
    color: '#E5E5E5',
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
  dropDownIcon: {
    marginTop: 15,
    marginRight: 8,
  },
  inputField: {
    borderColor: '#B3B3B3',
    borderStyle: 'solid',
    borderWidth: 1,
    height: 40,
    width: 130,
    marginBottom: 10,
    borderRadius: 5,
    color: '#B3B3B3',
    paddingLeft: 10,
  },
  inputLabel: {
    color: '#B3B3B3',
    fontWeight: 'bold',
  },
  textarea: {
    borderColor: '#B3B3B3',
    borderStyle: 'solid',
    borderWidth: 1,
    height: 40,
    width: 270,
    marginBottom: 10,
    borderRadius: 5,
    color: '#B3B3B3',
    paddingLeft: 10,
    height: 100,
    textAlignVertical: 'top',
  },
  title: {
    color: '#B3B3B3',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  updateBtn: {
    backgroundColor: '#6FCF97',
    padding: 8,
    borderRadius: 5,
  },
  cancelBtn: {
    backgroundColor: '#65656B',
    padding: 8,
    borderRadius: 5,
  },
  btnTxt: {
    color: '#fff',
    textAlign: 'center',
  },
  bottomBtns: {
    position: 'relative',
    bottom: 0,
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
    height: 40,
  },
  active: {
    backgroundColor: '#6FCF97',
  },
});

export default CallResponse;
