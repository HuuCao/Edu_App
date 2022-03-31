import React, {useState, useEffect} from 'react';

import {
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Toast from 'react-native-toast-message';
import RNPickerSelect from 'react-native-picker-select';
import {useSelector, useDispatch} from 'react-redux';

//api
import axios from 'axios';
import Backend from '../../../apis/backend';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {isLength} from 'lodash';

const ExamScreen = ({navigation, route}) => {
  const [itemSubject, setItemSubject] = useState(null);
  const [subjectName, setSubjectName] = useState([]);

  const [itemClass, setItemClass] = useState(null);
  const [dataClass, setDataClass] = useState([]);

  //const [dataExam, setDataExam] = useState([]);
  const dispatch = useDispatch();

  const dataExam = useSelector(state => state.ExamReducer.dataExam);

  //getExam
  const fetchAllExam = async () => {
    const getToken = await AsyncStorage.getItem('token');
    var query = '';

    // defaul = null
    if (itemClass != 1000 && itemClass != null) {
      query += 'classID=' + itemClass + '&';
    }

    if (itemSubject != null && itemSubject != 1000) {
      query += 'subjectID=' + itemSubject + '&';
    }

    axios
      .get(Backend.api + 'exam?' + query, {
        headers: {
          Authorization: getToken,
        },
      })
      .then(response => {
       dispatch({type: 'reload_exam', data: response.data.data});
       // setDataExam([...response.data.data]);
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

  //getSubject
  const fetchSubject = async () => {
    const getToken = await AsyncStorage.getItem('token');
    axios
      .get(Backend.api + 'subject', {
        headers: {
          Authorization: getToken,
        },
      })
      .then(response => {
        var dataSubject = [
          {
            label: 'Tất Cả Môn',
            value: 1000,
          },
        ];

        response.data.data.map(e => {
          dataSubject.push({
            label: e.subjectName,
            value: e.subjectID,
          });
        });
        setItemSubject(1000);

        setSubjectName(dataSubject);
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

  //get class
  const fetchClass = async () => {
    const getToken = await AsyncStorage.getItem('token');
    axios
      .get(Backend.api + 'class', {
        headers: {
          Authorization: getToken,
        },
      })
      .then(response => {
        var dataClass = [
          {
            label: 'Tất Cả Lớp',
            value: 1000,
          },
        ];
        response.data.data.map(e => {
          dataClass.push({
            label: e.className,
            value: e.classID,
          });
        });
        setItemClass(1000);
        setDataClass(dataClass);
      })
      .catch(e => {
        Toast.show({
          type: 'error',
          text1: 'Có lỗi xảy ra, vui lòng thử lại',
          visibilityTime: 2000,
          autoHide: true,
        });
        console.log(e);
      });
  };

  useEffect(() => {
    if (dataExam.length == undefined) fetchAllExam();
  }, [dataExam]);

  useEffect(() => {
    fetchAllExam();
    fetchSubject();
    fetchClass();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={20}>
          <View style={{marginTop: 10}}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginVertical: 12,
                marginHorizontal: 17,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                }}>
                Đề trắc nghiệm
              </Text>
              <TouchableOpacity
                style={styles.btnCreateTest}
                onPress={() => navigation.navigate('CreateExamScreen')}>
                <Text
                  style={{
                    fontSize: 12,
                    color: 'white',
                  }}>
                  + TẠO BỘ ĐỀ
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}>
                 
              <View style={styles.selectClass}>
                <RNPickerSelect
                  style={pickerStyle}
                  placeholderTextColor="red"
                  onValueChange={value => {
                    setItemClass(value);
                    fetchAllExam();
                  }}
                  value={itemClass}
                  items={dataClass}
                />
              </View>
           
              <View style={styles.selectClass}>
                <RNPickerSelect
                  style={pickerStyle}
                  //placeholder={{label: 'Chọn môn học', value: null}}
                  placeholderTextColor="red"
                  onValueChange={value => {
                    fetchAllExam();
                    setItemSubject(value);
                  }}
                  value={itemSubject}
                  items={subjectName}
                />
              </View>
             
            </View>
            <View>
              {dataExam.length != undefined &&
                dataExam.map(item => {
                  return (
                    <View style={{alignItems: 'center'}}>
                      <View style={styles.itemExam}>
                        <Text
                          style={{
                            fontWeight: '400',
                            fontSize: 13,
                            color: '#1D2563',
                          }}>
                          MĐ:{item.code} | {item.examName}
                        </Text>
                        <Text
                          style={{
                            fontSize: 11,
                            color: 'rgba(0, 0, 0, 0.5)',
                          }}>
                          {item.department}
                        </Text>
                        <Text style={{fontSize: 10, color: '#FF7F2D'}}>
                          {'Số câu: '}
                          {item.amount}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                          }}>
                          <TouchableOpacity
                            onPress={e =>
                              navigation.navigate('PracticeScreen', {
                                data: item,
                              })
                            }
                            key={item.key}
                            style={{
                              backgroundColor: '#FF7F2D',
                              marginLeft: 10,
                              padding: 7,
                              paddingHorizontal: 15,
                              borderRadius: 9,
                            }}>
                            <Text style={{color: 'white'}}>Làm đề</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  );
                })}
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExamScreen;

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
  btnCreateTest: {
    backgroundColor: '#FF7F2D',
    width: '91@ms',
    height: '25@ms',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '5@ms',
  },
  itemExam: {
    width: '90%',
    height: '120@ms',
    justifyContent: 'space-around',
    paddingHorizontal: '12@ms',
    paddingVertical: '10@ms',
    borderRadius: '10@ms',
    backgroundColor: '#FFFFFF',
    marginVertical: '10@ms',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 6,
  },
  selectClass: {
    color: '#FFFFFF',
    backgroundColor: '#6F5FCD',
    borderRadius: '5@ms',
    width: '150@ms',
  },
});
