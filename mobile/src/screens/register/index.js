import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ImageBackground,
  Image,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import DatePicker from 'react-native-datepicker';
import CalendarPicker from 'react-native-calendar-picker';
import Toast from 'react-native-toast-message';

//api
import axios from 'axios';
import Backend from '../../apis/backend';

//image
import imgregister from '../../assets/image/edu_mobile/bgEdu.jpg';
import goBackHeader from '../../assets/image/home/goBackHeader.png';
const viewPass = require('../../assets/image/icons/viewPass.png');

const RegisterScreen = ({navigation}) => {
  const [hiddenPass, setHiddenPass] = useState(true);
  const [hiddenRePass, setHiddenRePass] = useState(true);
  const [status, setStatus] = useState(null); // Status Sign-Up
  const [checkInput, setCheckInput] = useState(false);
  const [errorApi, setErrorApi] = useState(false);
  const [checkboxState, setCheckboxState] = useState(false);

  //Text Input Register
  const [name, setName] = useState('');
  const [email, setMail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState('');
  const [password, setPassword] = useState('');
  const [rePass, setRePassword] = useState('');

  const onSignUp = function () {
    if (
      name !== '' &&
      email !== '' &&
      rePass !== '' &&
      birthday !== '' &&
      phone !== ''
    ) {
      if (rePass.length >= 6 || password.length >= 6) {
        if (rePass === password) {
          axios
            .post(Backend.auth + 'register', {
              fullname: name,
              mail: email,
              password: rePass,
              birthday: birthday,
              phone: phone,
            })
            .then(response => {
              navigation.navigate('RegisterSuccessScreen');
            })
            .catch(e => {
              console.log(e);
              Toast.show({
                type: 'error',
                text1: 'Có lỗi xảy ra, vui lòng thử lại',
                visibilityTime: 2000,
                autoHide: true,
              });
            });
        } else {
          Toast.show({
            type: 'error',
            text1: 'Mật khẩu không trùng khớp',
            visibilityTime: 2000,
            autoHide: true,
          });
        }
      } else {
        Toast.show({
          type: 'error',
          text1: 'Mật khẩu phải từ 6 kí tự trở lên',
          visibilityTime: 2000,
          autoHide: true,
        });
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Vui lòng điền đầy đủ thông tin',
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={imgregister} style={styles.image}>
        <KeyboardAvoidingView
          style={{flex: 1, height: '90%'}}
          keyboardVerticalOffset={60}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 20,
              paddingTop: 10,
            }}
            onPress={() => navigation.goBack()}>
            <Image source={goBackHeader} resizeMode="contain" />
            <Text
              style={{
                fontSize: 20,
                marginLeft: 10,
                fontWeight: '600',
                color: 'white',
              }}>
              Thông tin đăng ký
            </Text>
          </TouchableOpacity>
          <ScrollView>
            <View style={styles.viewContainer}>
              <View style={{paddingBottom: 30}}>
                <Text style={styles.txtTitle}>Họ và tên</Text>
                <View style={styles.txtInput}>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor="#9098B1"
                    autoCapitalize="none"
                    onChangeText={text => setName(text)}
                    value={name}
                    onPressIn={e => {
                      setCheckInput(false);
                      setErrorApi(false);
                    }}
                  />
                </View>
                <Text style={styles.txtTitle}>Số điện thoại</Text>
                <View style={styles.txtInput}>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor="#9098B1"
                    autoCapitalize="none"
                    keyboardType="numeric"
                    onChangeText={text => setPhone(text)}
                    value={phone}
                    onPressIn={e => {
                      setCheckInput(false);
                      setErrorApi(false);
                    }}
                  />
                </View>
                <Text style={styles.txtTitle}>Ngày sinh</Text>
                {/* <DatePicker
                  style={styles.textInputDate}
                  mode="date"
                  format="DD-MM-YYYY"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      right: 10,
                      height: 20,
                      width: 20,
                      marginLeft: 0,
                    },
                    dateInput: {
                      fontSize: 40,
                      paddingRight: '71%',
                      borderColor: '#C5C2C2',
                      borderRadius: 5,
                      color: 'black',
                    },
                  }}
                  date={birthday}
                  onDateChange={birthday => {
                    setBirthday(birthday);
                  }}
                  onPressIn={e => {
                    setCheckInput(false);
                    setErrorApi(false);
                  }}
                /> */}
                <View style={styles.txtInput}>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor="#9098B1"
                    autoCapitalize="none"
                    onChangeText={text => setBirthday(text)}
                    value={birthday}
                    onPressIn={e => {
                      setCheckInput(false);
                      setErrorApi(false);
                    }}
                  />
                </View>

                <Text style={styles.txtTitle}>Email</Text>
                <View style={styles.txtInput}>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor="#9098B1"
                    autoCapitalize="none"
                    onChangeText={text => setMail(text)}
                    value={email}
                    onPressIn={e => {
                      setCheckInput(false);
                      setErrorApi(false);
                    }}
                  />
                </View>
                <Text style={styles.txtTitle}>Mật khẩu</Text>
                <View style={styles.txtInput}>
                  <TextInput
                    style={styles.input}
                    secureTextEntry={hiddenPass}
                    placeholderTextColor="#9098B1"
                    autoCapitalize="none"
                    onChangeText={text => setPassword(text)}
                    value={password}
                    onPressIn={e => {
                      setCheckInput(false);
                      setErrorApi(false);
                    }}
                  />
                  <TouchableOpacity
                    onPress={e => {
                      setHiddenPass(!hiddenPass);
                    }}>
                    <Image
                      source={viewPass}
                      resizeMode={'contain'}
                      style={styles.iconViewPass}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.txtTitle}>Nhập lại Mật khẩu</Text>
                <View style={styles.txtInput}>
                  <TextInput
                    style={styles.input}
                    secureTextEntry={hiddenRePass}
                    placeholderTextColor="#9098B1"
                    autoCapitalize="none"
                    onChangeText={text => setRePassword(text)}
                    value={rePass}
                    onPressIn={e => {
                      setCheckInput(false);
                      setErrorApi(false);
                    }}
                  />
                  <TouchableOpacity
                    onPress={e => {
                      setHiddenRePass(!hiddenRePass);
                    }}>
                    <Image
                      source={viewPass}
                      resizeMode={'contain'}
                      style={styles.iconViewPass}
                    />
                  </TouchableOpacity>
                </View>
                {/* <View style={styles.viewCenter1}>
                  <BouncyCheckbox
                    style={styles.btnCheckbox}
                    size={16}
                    unfillColor="#FFFFFF"
                    iconStyle={styles.btnIconCheckBox}
                    isChecked={checkboxState}
                    onPress={() => setCheckboxState(!checkboxState)}
                  />
                  <Text style={styles.txtCheck}>
                    {'Tôi đã đọc và đồng ý với '}
                  </Text>
                  <Text style={styles.txtRules}>
                    {'điều khoản dịch vụ Edu'}
                  </Text>
                </View> */}
              </View>
              <TouchableOpacity
                style={styles.btnSignIn}
                onPress={e => {
                  onSignUp();
                }}
                // onPress={e => {
                //   navigation.navigate('RegisterSuccessScreen');
                // }}
              >
                <Text style={styles.txtSignIn}>ĐĂNG KÝ TÀI KHOẢN</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  viewContainer: {
    paddingTop: '15@ms',
    flex: 1,
    justifyContent: 'space-between',
    marginVertical: '0@ms',
    paddingHorizontal: '20@ms',
    paddingBottom: '0@ms',
  },

  txtTitle: {
    color: '#FFFFFF',
    marginTop: '5@ms',
    fontSize: '16@ms',
  },
  txtInput: {
    borderWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: '5@ms',
    height: '38@ms',
    marginVertical: '8@ms',
    marginBottom: '15@ms',
  },
  input: {
    flex: 1,
    width: '343@ms',
    height: '39@ms',
    fontSize: '14@ms',
    paddingLeft: '17@ms',
    color: '#000000',
    fontFamily: 'Helvetica',
  },
  textInputDate: {
    width: '100%',
    height: '40@ms',
    borderWidth: 0.5,
    backgroundColor: '#FFFFFF',
    borderRadius: '5@ms',
    marginVertical: '8@ms',
    color: 'black',
  },

  viewCenter1: {
    paddingBottom: '60@ms',
    marginTop: '10@ms',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  txtCheck: {
    fontSize: '14@ms',
    color: '#FFFFFF',
  },
  txtRules: {
    fontSize: '14@ms',
    color: '#4FB2C2',
  },

  btnSignIn: {
    marginVertical: '5@ms',
    width: '200@ms',
    height: '40@ms',
    alignSelf: 'center',
    borderBottomColor: '10@ms',
    backgroundColor: '#FF7F2D',
    borderRadius: '7@ms',
    justifyContent: 'center',
  },
  txtSignIn: {
    color: '#fff',
    fontWeight: '500',
    fontSize: '18@ms',
    textAlign: 'center',
  },
  btnIconCheckBox: {
    borderRadius: 0,
    borderColor: '#CECECE',
  },
  btnCheckbox: {
    width: '20@ms',
  },
  txtStatusSuc: {
    color: '#00FF00',
    fontSize: '18@ms',
    textAlign: 'center',
    marginVertical: '5@ms',
  },
  txtStatusErr: {
    color: '#FF0000',
    fontSize: '18@ms',
    textAlign: 'center',
    marginVertical: '5@ms',
  },
  iconViewPass: {
    marginRight: '20@ms',
    height: '20@ms',
    width: '20@ms',
  },
  txtStatusErr: {
    color: '#FF0000',
    fontSize: '18@ms',
    textAlign: 'center',
    marginVertical: '5@ms',
  },
  txtTitleError: {
    fontSize: '15@ms',
    color: '#B61C1C',
    textAlign: 'center',
    marginBottom: '5@ms',
  },
});
