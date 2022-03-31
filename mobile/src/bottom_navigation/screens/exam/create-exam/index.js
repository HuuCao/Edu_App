import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import RNPickerSelect from 'react-native-picker-select';
import {FAB} from 'react-native-paper';
import Toast from 'react-native-toast-message';
//api
import axios from 'axios';
import Backend from '../../../../apis/backend';
import AsyncStorage from '@react-native-async-storage/async-storage';

//image
import goBackHeader from '../../../../assets/image/home/backblack.png';

const CreateExamScreen = ({navigation, route}) => {
  const [checkInput, setCheckInput] = useState(false);

  const [department, setDepartment] = useState('');
  const [school, setSchool] = useState('');

  const [itemSubject, setItemSubject] = useState(null);
  const [subjectName, setSubjectName] = useState([]);

  const [itemClass, setItemClass] = useState(null);
  const [dataClass, setDataClass] = useState([]);

  const [code, setCode] = useState('');
  const [examName, setExamname] = useState('');
  const [amount, setAmount] = useState('');

  const [itemCategory, setItemCategory] = useState(null);
  const [category, setCategory] = useState([]);

  const createExam = async () => {
    if (
      subjectName !== '' &&
      examName !== '' &&
      amount !== '' &&
      category !== ''
    ) {
      const getToken = await AsyncStorage.getItem('token');
      console.log(Backend.exam + 'createexam');
      axios
        .post(
          Backend.exam + 'createexam',
          {
            department: department,
            school: school,
            classID: itemClass,
            subjectID: itemSubject,
            code: code,
            examName: examName,
            amount: amount,
            // idCategory: itemCategory,
          },
          {
            headers: {
              Authorization: getToken,
            },
          },
        )
        .then(response => {
          navigation.navigate('BankQuestion', {
            data: response.data.data,
          });
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Vui lòng điền đầy đủ thông tin',
        visibilityTime: 2000,
        autoHide: true,
      });
      // setCheckInput(true);
    }
  };

  //getCategory
  const fetchCategory = async () => {
    const getToken = await AsyncStorage.getItem('token');
    axios
      .get(Backend.api + 'category', {
        headers: {
          Authorization: getToken,
        },
      })
      .then(response => {
        setCategory(response.data.data);
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
        var dataClass = [];
        response.data.data.map(e => {
          dataClass.push({
            label: e.className,
            value: e.classID,
          });
        });
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
        var dataSubject = [];
        response.data.data.map(e => {
          dataSubject.push({
            label: e.subjectName,
            value: e.subjectID,
          });
        });
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
  useEffect(() => {
    fetchSubject();
    fetchCategory();
    fetchClass();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{flex: 1, height: '90%'}}
        keyboardVerticalOffset={60}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => navigation.goBack()}>
          <Image source={goBackHeader} resizeMode="contain" />
          <Text style={{fontSize: 20, fontWeight: '600'}}> Tạo đề thi</Text>
        </TouchableOpacity>
        <ScrollView>
          <View style={styles.viewContainer}>
            <View>
              <Text style={styles.txtTitle}>Sở</Text>
              <View style={styles.txtInput}>
                <TextInput
                  style={styles.input}
                  placeholderTextColor="#9098B1"
                  autoCapitalize="none"
                  onChangeText={text => setDepartment(text)}
                  value={department}
                  onPressIn={e => {
                    // setCheckInput(false);
                  }}
                />
              </View>
              <Text style={styles.txtTitle}>Trường</Text>
              <View style={styles.txtInput}>
                <TextInput
                  style={styles.input}
                  placeholderTextColor="#9098B1"
                  autoCapitalize="none"
                  onChangeText={text => setSchool(text)}
                  value={school}
                  onPressIn={e => {
                    // setCheckInput(false);
                  }}
                />
              </View>

              <Text style={styles.txtTitle}>
                <Text style={{color: 'red'}}>{'*'}</Text>
                {' Môn học'}
              </Text>
              <View style={styles.txtInput}>
                <RNPickerSelect
                  style={pickerStyle}
                  placeholder={{label: 'Chọn môn học', value: null}}
                  placeholderTextColor="red"
                  onValueChange={value => {
                    setItemSubject(value);
                  }}
                  value={itemSubject}
                  items={subjectName}
                  onPressIn={e => {
                    setCheckInput(false);
                  }}
                />
              </View>

              <Text style={styles.txtTitle}>
                <Text style={{color: 'red'}}>{'*'}</Text>
                {' Lớp'}
              </Text>
              <View style={styles.txtInput}>
                <RNPickerSelect
                  style={pickerStyle}
                  placeholder={{label: 'Chọn lớp', value: null}}
                  placeholderTextColor="red"
                  onValueChange={value => {
                    setItemClass(value);
                  }}
                  value={itemClass}
                  items={dataClass}
                  onPressIn={e => {
                    setCheckInput(false);
                  }}
                />
              </View>

              <Text style={styles.txtTitle}>Mã đề</Text>
              <View style={styles.txtInput}>
                <TextInput
                  style={styles.input}
                  placeholderTextColor="#9098B1"
                  autoCapitalize="none"
                  keyboardType="numeric"
                  onChangeText={text => setCode(text)}
                  value={code}
                  onPressIn={e => {
                    // setCheckInput(false);
                  }}
                />
              </View>
              <Text style={styles.txtTitle}>
                <Text style={{color: 'red'}}>{'*'}</Text>
                {' Tên bộ đề trắc nghiệm'}
              </Text>
              <View style={styles.txtInput}>
                <TextInput
                  style={styles.input}
                  placeholderTextColor="#9098B1"
                  autoCapitalize="none"
                  onChangeText={text => setExamname(text)}
                  value={examName}
                  onPressIn={e => {
                    setCheckInput(false);
                  }}
                />
              </View>

              {/* <Text style={styles.txtTitle}>Bộ đề câu hỏi</Text>
              <View style={styles.txtInput}>
                <RNPickerSelect
                  style={pickerStyle}
                  placeholder={{label: 'Chọn bộ đề câu hỏi', value: null}}
                  placeholderTextColor="red"
                  onValueChange={value => {
                    setItemCategory(value);
                  }}
                  value={itemCategory}
                  items={category}
                  onPressIn={e => {
                    setCheckInput(false);
                  }}
                />
              </View> */}

              <Text style={styles.txtTitle}>
                <Text style={{color: 'red'}}>{'*'}</Text>
                {' Số câu'}
              </Text>
              <View style={styles.txtInput}>
                <TextInput
                  style={styles.input}
                  placeholderTextColor="#9098B1"
                  autoCapitalize="none"
                  keyboardType="numeric"
                  onChangeText={text => {
                    try {
                      var _int = parseInt(text);
                      setAmount(_int);
                      if (_int > 50) {
                        Toast.show({
                          text1: 'Quá 50 câu chưa hỗ trợ',
                          type: 'info',
                        });
                      }
                    } catch (e) {
                      Toast.show({
                        text1: 'Vui Lòng Nhập Số',
                        type: 'error',
                      });
                    }
                  }}
                  value={amount}
                  onPressIn={e => {
                    setCheckInput(false);
                  }}
                />
              </View>
              {/* 
              <Text style={styles.txtTitle}>Năm học</Text>
              <View style={styles.txtInput}>
                <TextInput
                  style={styles.input}
                  maxLength={25}
                  placeholderTextColor="#9098B1"
                  keyboardType="numeric"
                  autoCapitalize="none"
                  onChangeText={text => setYear(text)}
                  value={year}
                  onPressIn={e => {
                    setCheckInput(false);
                  }}
                />
              </View>
         */}
            </View>
          </View>
        </ScrollView>
        <FAB
          style={styles.btnSignIn}
          icon={'plus'}
          color="white"
          onPress={e => {
            createExam();
            // navigation.navigate('BankQuestion');
          }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateExamScreen;

const pickerStyle = {
  inputIOS: {
    color: '#000000',
    fontSize: 16,
    paddingTop: 8,
    paddingHorizontal: 10,
    paddingBottom: 7,
    width: 330,
  },
  inputAndroid: {
    color: '#000000',
    fontSize: 12,
    width: 340,
    marginTop: -8,
    marginBottom: -10,
  },
  placeholderColor: 'red',
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
    backgroundColor: '#FFFFFF',
  },

  viewContainer: {
    justifyContent: 'space-between',
    paddingHorizontal: '20@ms',
    paddingVertical: '20@ms',
  },

  txtTitle: {
    marginTop: '5@ms',
    fontSize: '16@ms',
  },
  txtInput: {
    borderWidth: 0.5,
    borderColor: '#6254B6',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: '5@ms',
    marginVertical: '8@ms',
    height: '40@ms',
  },
  input: {
    flex: 1,
    marginLeft: '10@ms',
    height: '40@ms',
    fontSize: '14@ms',
    color: '#000000',
  },

  btnSignIn: {
    position: 'absolute',
    margin: 10,
    right: 0,
    top: 0,
    backgroundColor: '#8275CE',
  },
  txtSignIn: {
    color: '#fff',
    fontWeight: '500',
    fontSize: '18@ms',
    textAlign: 'center',
  },
});
