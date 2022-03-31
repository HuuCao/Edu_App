import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Toast from 'react-native-toast-message';

//api
import axios from 'axios';
import Backend from '../../apis/backend';

//image
import imglogin from '../../assets/image/edu_mobile/bgEdu.jpg';
import goBackHeader from '../../assets/image/home/goBackHeader.png';
const viewPass = require('../../assets/image/icons/viewPass.png');

const ChangePasswordScreen = ({navigation, route}) => {
  console.log(route.params.data);
  const [hiddenPass, setHiddenPass] = useState(true);
  const [hiddenRePass, setHiddenRePass] = useState(true);
  const [statusError, setStatusError] = useState(false);

  // TextInput
  const [Password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const onChangPass = function () {
    if (Password.length >= 6 || rePassword.length >= 6) {
      if (Password === rePassword) {
        axios
          .post(Backend.auth + 'changepass', {
            mail: route.params.data,
            password: Password,
          })
          .then(response => {
            if (response.data.success)
              navigation.navigate('ForgotPasswordSuccessScreen');
            else {
            }
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Xác nhận mật khẩu không đúng, vui lòng thử lại',
          visibilityTime: 2000,
          autoHide: true,
        });
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Mật khẩu phải hơn 6 ký tự, vui lòng thử lại',
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  };
  //go_back
  function renderHeader() {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{
            width: 20,
            justifyContent: 'center',
          }}
          onPress={() => navigation.goBack()}>
          <Image
            source={goBackHeader}
            resizeMode="contain"
            style={{
              with: 40,
              height: 15,
              marginTop: 4,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={imglogin} style={styles.image}>
        <KeyboardAvoidingView
          style={{flex: 1, height: '90%'}}
          keyboardVerticalOffset={60}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.viewContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {renderHeader()}
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 20,
                  fontWeight: '500',
                  color: 'white',
                }}>
                Thay đổi mật khẩu
              </Text>
            </View>
            <View style={styles.view}>
              <Text style={styles.txtTitle}>Mật khẩu mới</Text>
              <View style={styles.txtInput}>
                <TextInput
                  style={styles.input}
                  maxLength={25}
                  placeholderTextColor="#9098B1"
                  autoCapitalize="none"
                  secureTextEntry={hiddenPass}
                  onChangeText={text => setPassword(text)}
                  value={Password}
                  onPressIn={e => {
                    setStatusError(false);
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
              <Text style={styles.txtTitle}>Xác nhận mật khẩu mới</Text>

              <View style={styles.txtInput}>
                <TextInput
                  style={styles.input}
                  maxLength={25}
                  onChangeText={text => setRePassword(text)}
                  value={rePassword}
                  secureTextEntry={hiddenRePass}
                  placeholderTextColor="#9098B1"
                  autoCapitalize="none"
                  onPressIn={e => {
                    // setIsConnection(false);
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

              {/* {statusError === true && (
                <Text
                  style={{
                    textAlign: 'center',
                    marginTop: 15,
                    fontSize: 15,
                    color: '#B61C1C',
                  }}>
                  {'Mật khẩu mới không hợp lệ!'}
                </Text>
              )} */}
            </View>

            <TouchableOpacity
              style={styles.btnForgot}
              onPress={e => {
                onChangPass();
              }}
              // onPress={() =>
              //   navigation.navigate('ForgotPasswordSuccessScreen')
              // }
            >
              <Text style={styles.txtSignIn}>THAY ĐỔI MẬT KHẨU</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },

  image: {
    flex: 1,
    resizeMode: 'cover',
  },

  view: {
    paddingVertical: '50@ms',
  },
  viewContainer: {
    paddingTop: '20@ms',
    justifyContent: 'space-between',
    marginVertical: '10@ms',
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
  btnForgot: {
    width: '70%',
    height: '40@ms',
    borderColor: '#FF7F2D',
    backgroundColor: '#FF7F2D',
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
  },
  txtSignIn: {
    fontSize: '20@ms',
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
  },
  txtWarning: {
    paddingHorizontal: '25@ms',
    lineHeight: '20@ms',
    textAlign: 'center',
    fontSize: '14@ms',
    color: 'red',
    alignSelf: 'center',
  },
  iconViewPass: {
    marginRight: '20@ms',
    height: '20@ms',
    width: '20@ms',
  },
});
