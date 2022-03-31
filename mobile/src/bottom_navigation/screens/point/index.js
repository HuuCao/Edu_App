import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  Modal,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

//api
import axios from 'axios';
import Backend from '../../../apis/backend';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Toast from 'react-native-toast-message';
import {ScaledSheet} from 'react-native-size-matters';
import jwt_decode from 'jwt-decode';
import _ from 'lodash';

const PointScreen = ({route, navigation}) => {
  const [dataPoint, setDataPoint] = useState([]);

  const [show, setShow] = useState(false);

  const [selectHK, setSelectHK] = useState();

  const [medium, setMedium] = useState('');
  const [value, setValue] = useState(null);

  //get point
  const fetchPoint = async value => {
    const getToken = await AsyncStorage.getItem('token');

    var query = '';

    // defaul = null
    if (value != undefined) {
      query += 'semester=' + value;
      setValue(value);
    }

    axios
      .get(Backend.api + 'point?' + query, {
        headers: {
          Authorization: getToken,
        },
      })
      .then(response => {
        for (let i in response.data.data) {
          response.data.data[i]['stt'] = parseInt(i) + 1;
        }

        caculMedium(response.data.data);
        setDataPoint(response.data.data);

        // setMedium(response.data);
      })
      .catch(err => {
        Toast.show({
          type: 'error',
          text1: 'Có lỗi xảy ra, vui lòng thử lại',
          visibilityTime: 2000,
          autoHide: true,
        });
        console.log('erro', err);
      });
  };
  // update point
  const onUpdatePoint = async () => {
    const getToken = await AsyncStorage.getItem('token');

    axios
      .post(
        Backend.api + 'point' + '/' + 'updatepoint',
        {data: dataPoint},
        {
          headers: {
            Authorization: getToken,
          },
        },
      )
      .then(response => {
        fetchPoint();
        console.log(response.data.data);
        Toast.show({
          type: 'success',
          text1: 'Cập nhật thành công',
          visibilityTime: 2000,
          autoHide: true,
        });
      })
      .catch(err => {
        Toast.show({
          type: 'error',
          text1: 'Có lỗi xảy ra, vui lòng thử lại',
          visibilityTime: 2000,
          autoHide: true,
        });
        console.log(err);
      });
  };

  const caculMedium = function (_points) {
    var ans = 0;
    var length = 0;
    for (let i in _points) {
      var _tb = mediumHeSo(_points[i]).avg;
      if (_tb != 0) {
        length++;
        ans += _tb;
      }
    }

    if (length != 0) {
      ans /= length;
    } else {
      ans = 0;
    }
    setMedium(ans.toFixed(2));
    // setTotal(ans);
  };

  let mediumHeSo = obj => {
    obj[`avg_1`] = 0;
    obj[`avg_2`] = 0;
    obj[`avg_3`] = 0;
    var sumLength = 0;

    if (obj.point1.length != 0) {
      var length = 0;
      for (let i in obj.point1) {
        length++;
        obj.avg_1 += parseFloat(obj.point1[i]);
      }
      if (length != 0) obj.avg_1 /= length;

      sumLength += length;
    }
    if (obj.point2.length != 0) {
      var length = 0;
      for (let i in obj.point2) {
        length++;
        obj.avg_2 += parseFloat(obj.point2[i]);
      }

      if (length != 0) obj.avg_2 /= length;
      sumLength += length;
    }
    if (obj.point3.length != 0) {
      var length = 0;
      for (let i in obj.point3) {
        length++;
        obj.avg_3 += parseFloat(obj.point3[i]);
      }
      if (length != 0) obj.avg_3 /= length;

      sumLength += length;
    }

    console.log(obj.avg_1);

    if (sumLength != 0) {
      obj[`avg`] = (obj.avg_1 + obj.avg_2 * 2 + obj.avg_3 * 3) / sumLength;
    } else {
      obj[`avg`] = 0;
    }

    return obj;
  };

  const Item = ({item}) => {
    return (
      <View
        style={{
          width: '100%',
        }}>
        <View>
          <TouchableOpacity
            onPress={e => {
              if (show != item._id) {
                setShow(item._id);
              } else {
                setShow(-1);
              }
            }}
            style={[styles.viewTable]}>
            <View style={{width: '20%', paddingHorizontal: 2}}>
              <Text style={styles.txttable}>{item.stt}</Text>
            </View>
            <View style={{width: '35%', paddingHorizontal: 2}}>
              <Text style={styles.txttable}>{item.nameSubject}</Text>
            </View>
            <View style={{width: '35%', paddingHorizontal: 2}}>
              <Text style={styles.txttable}>
                {item.avg == undefined ? 0 : item.avg.toFixed(1)}
              </Text>
            </View>
            <View style={{width: '25%', paddingHorizontal: 2}}>
              <Text style={[styles.txttable]}>{'>'}</Text>
            </View>
          </TouchableOpacity>
          {show == item._id && (
            <View
              style={{
                backgroundColor: '#AFA4F4',
                borderRadius: 10,
              }}>
              <View style={{padding: 15}}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <View style={{width: '20%'}}>
                    <Text>Hệ số 1</Text>
                  </View>
                  <View style={styles.viewPoint}>
                    {item.point1.map((e, i) => {
                      return (
                        <TouchableOpacity style={styles.viewInput}>
                          <TextInput
                            value={e}
                            onChangeText={txt => {
                              var data = Object.assign([], dataPoint);
                              var index = _.findIndex(data, o => {
                                if (o._id == item._id) return o;
                              });
                              if (txt == '') txt = '0';

                              var number = parseFloat(txt);
                              if (number > 10) number = 10;

                              data[index].point1[i] = number + '';
                              caculMedium(data);
                              setDataPoint(data);
                            }}
                            style={styles.input}
                            maxLength={4}
                            placeholderTextColor="#9098B1"
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="numeric"
                          />
                        </TouchableOpacity>
                      );
                    })}
                    <TouchableOpacity
                      onPress={e => {
                        var data = Object.assign([], dataPoint);
                        var index = _.findIndex(data, o => {
                          if (o._id == item._id) return o;
                        });

                        data[index].point1.push(0);
                        caculMedium(data);
                        setDataPoint(data);
                      }}
                      style={styles.insert}>
                      <Text style={{color: 'white'}}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={e => {
                        var data = Object.assign([], dataPoint);
                        var index = _.findIndex(data, o => {
                          if (o._id == item._id) return o;
                        });
                        data[index].point1.pop('');
                        caculMedium(data);
                        setDataPoint(data);
                      }}
                      style={styles.insert}>
                      <Text style={{color: 'white'}}>-</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={{padding: 15}}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <View style={{width: '20%'}}>
                    <Text>Hệ số 2</Text>
                  </View>
                  <View style={styles.viewPoint}>
                    {item.point2.map((e, i) => {
                      return (
                        <View style={styles.viewInput}>
                          <TextInput
                            value={e}
                            onChangeText={txt => {
                              var data = Object.assign([], dataPoint);
                              var index = _.findIndex(data, o => {
                                if (o._id == item._id) return o;
                              });
                              if (txt == '') txt = '0';
                              var number = parseFloat(txt);
                              if (number > 10) number = 10;
                              data[index].point2[i] = number + '';
                              caculMedium(data);
                              setDataPoint(data);
                            }}
                            style={styles.input}
                            maxLength={4}
                            placeholderTextColor="#9098B1"
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="numeric"
                          />
                        </View>
                      );
                    })}
                    <TouchableOpacity
                      onPress={e => {
                        var data = Object.assign([], dataPoint);
                        var index = _.findIndex(data, o => {
                          if (o._id == item._id) return o;
                        });
                        data[index].point2.push(0);
                        caculMedium(data);
                        setDataPoint(data);
                      }}
                      style={styles.insert}>
                      <Text style={{color: 'white'}}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={e => {
                        var data = Object.assign([], dataPoint);
                        var index = _.findIndex(data, o => {
                          if (o._id == item._id) return o;
                        });
                        data[index].point2.pop('');
                        caculMedium(data);
                        setDataPoint(data);
                      }}
                      style={styles.insert}>
                      <Text style={{color: 'white'}}>-</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={{padding: 15}}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <View style={{width: '20%'}}>
                    <Text>Hệ số 3</Text>
                  </View>
                  <View style={styles.viewPoint}>
                    {item.point3.map((e, i) => {
                      return (
                        <TouchableOpacity style={styles.viewInput}>
                          <TextInput
                            value={e}
                            onChangeText={txt => {
                              var data = Object.assign([], dataPoint);
                              var index = _.findIndex(data, o => {
                                if (o._id == item._id) return o;
                              });

                              if (txt == '') txt = '0';

                              var number = parseFloat(txt);
                              if (number > 10) number = 10;

                              data[index].point3[i] = number + '';
                              caculMedium(data);
                              setDataPoint(data);
                            }}
                            style={styles.input}
                            maxLength={4}
                            placeholderTextColor="#9098B1"
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="numeric"
                          />
                        </TouchableOpacity>
                      );
                    })}
                    <TouchableOpacity
                      onPress={e => {
                        // dataPoint: [
                        // {point3: []},{},{}
                        // ]
                        // Xu Li Them Phan Tu Cho item.point3
                        var data = Object.assign([], dataPoint);
                        var index = _.findIndex(data, o => {
                          if (o._id == item._id) return o;
                        });
                        data[index].point3.push(0);
                        caculMedium(data);
                        setDataPoint(data);
                      }}
                      style={styles.insert}>
                      <Text style={{color: 'white'}}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={e => {
                        var data = Object.assign([], dataPoint);
                        var index = _.findIndex(data, o => {
                          if (o._id == item._id) return o;
                        });
                        data[index].point3.pop('');
                        caculMedium(data);
                        setDataPoint(data);
                      }}
                      style={styles.insert}>
                      <Text style={{color: 'white'}}>-</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  };

  const renderItem = ({item}) => <Item item={item} />;

  useEffect(() => {
    fetchPoint(selectHK);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.viewContainer}>
          <View style={{paddingHorizontal: 19}}>
            <Text style={{fontSize: 20, fontWeight: '600'}}>{'Điểm số '}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 10,
            }}>
            <View style={styles.selectClass}>
              <RNPickerSelect
                value={selectHK}
                style={pickerStyle}
                onValueChange={value => {
                  fetchPoint(value);
                }}
                items={[
                  {label: 'Học kỳ 1', value: 1},
                  {label: 'Học kỳ 2', value: 2},
                ]}
              />
            </View>
            <TouchableOpacity
              onPress={e => {
                onUpdatePoint();
              }}
              style={{
                backgroundColor: '#FF7F2D',
                width: '30%',
                alignItems: 'center',
                padding: 7,
                borderRadius: 5,
              }}>
              <Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>
                Lưu điểm
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{marginTop: 15}}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                paddingHorizontal: 5,
              }}>
              <View style={{width: '20%'}}>
                <Text style={[styles.txtTitle]}>STT</Text>
              </View>

              <View style={{width: '30%'}}>
                <Text style={[styles.txtTitle]}>Môn học</Text>
              </View>
              <View style={{width: '30%'}}>
                <Text style={[styles.txtTitle]}>TBM</Text>
              </View>
            </View>
            <View
              style={{
                marginTop: 15,
                height: 1,
                alignSelf: 'center',
                width: '98%',
                backgroundColor: '#000000',
              }}
            />
            <View style={{marginBottom: 5}}>
              <Text
                style={{
                  fontSize: 20,
                  color: 'white',
                  paddingVertical: 10,
                  paddingLeft: 20,
                  backgroundColor: '#FAAC58',
                }}>
                {'Tổng trung bình: '}
                {medium}
              </Text>
            </View>
            <FlatList
              showsHorizontalScrollIndicator={true}
              data={dataPoint}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PointScreen;
const pickerStyle = {
  inputIOS: {
    color: 'white',
    fontSize: 16,
    width: 160,
    paddingTop: 7,
    paddingHorizontal: 10,
    paddingBottom: 7,
  },
  inputAndroid: {
    color: 'white',
    fontSize: 12,
    width: 170,
    marginTop: -10,
    marginBottom: -10,
  },
  placeholderColor: 'white',
  underline: {borderTopWidth: 0},
  icon: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderTopWidth: 5,
    borderTopColor: '#00000099',
    borderRightWidth: 5,
    borderRightColor: 'transparent',
    borderLeftWidth: 5,
    borderLeftColor: 'transparent',
    width: 0,
    height: 0,
    top: 20,
    right: 15,
  },
};
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  viewContainer: {
    marginTop: '10@ms',
    marginHorizontal: '17@ms',
    paddingBottom: '30@ms',
  },
  txtTitle: {
    color: '#6254B6',
    fontWeight: '700',
    fontSize: '12@ms',
    alignSelf: 'center',
  },
  txttable: {
    fontSize: '15@ms',
    textAlign: 'center',
  },

  viewTable: {
    marginVertical: '15@ms',
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    textAlign: 'center',
  },
  viewInput: {
    width: '50@ms',
    height: '34@ms',
    backgroundColor: 'white',
    borderRadius: '6@ms',
    margin: '5@ms',
  },
  input: {
    flex: 1,
    fontSize: '13@ms',
    width: '48@ms',
    height: '35@ms',
    color: '#000000',
    paddingHorizontal: '5@ms',
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'Helvetica',
  },
  insert: {
    marginLeft: '5@ms',
    backgroundColor: 'red',
    height: '18@ms',
    width: '17@ms',
    alignItems: 'center',
    borderRadius: '2@ms',
  },
  viewPoint: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '88%',
    paddingHorizontal: '10@ms',
  },
  centeredView: {
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '86%',
    height: '247@ms',
    backgroundColor: 'white',
    borderRadius: '10@ms',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  viewClose: {
    paddingRight: '25@ms',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: '40@ms',
    marginTop: '10@ms',
  },
  iconClose: {
    height: '15@ms',
    width: '15@ms',
  },
  imgStatus: {
    marginTop: '15@ms',
    alignSelf: 'center',
    height: '75@ms',
    width: '75@ms',
  },
  txtTitleModal: {
    marginTop: '20@ms',
    color: '#000000',
    fontSize: '18@ms',
    textAlign: 'center',
  },
  selectClass: {
    color: '#FFFFFF',
    backgroundColor: '#FF7F2D',
    borderRadius: '5@ms',
    width: '150@ms',
  },
});
