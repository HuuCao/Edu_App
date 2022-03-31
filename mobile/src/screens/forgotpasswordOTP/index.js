/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {ScaledSheet} from 'react-native-size-matters';

//api
import axios from 'axios';
import Backend from '../../apis/backend';

//image
import imglogin from '../../assets/image/edu_mobile/bgEdu.jpg';
import goBackHeader from '../../assets/image/home/goBackHeader.png';

const ForgotPasswordOTPScreen = ({navigation, route}) => {
  const [isConnection, setIsConnection] = useState(false);
  let textInput = useRef(null);
  const lengthInput = 4;
  const [internalVal, setInternalVal] = useState('');
  const onChangeText = val => {
    setInternalVal(val);
  };

  const onVetifyOTP = function () {
    if (internalVal.length === 4) {
      axios
        .post(Backend.auth + 'verifyotp', {
          mail: route.params.data,
          code: internalVal,
        })
        .then(response =>
          navigation.replace('ChangePasswordScreen', {
            data: route.params.data,
          }),
        )
        .catch(e => {
          console.log(e);
        });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Mã OTP không chính xác!',
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
                Xác thực OTP
              </Text>
            </View>
            <View style={styles.view}>
              <Text style={styles.txtContentCenter}>
                {
                  'Vui lòng nhập mã OTP được gửi đến email mà bạn đã đăng ký với chúng tôi'
                }
              </Text>
              <TextInput
                autoFocus={true}
                ref={input => (textInput = input)}
                onChangeText={onChangeText}
                style={styles.txtInputOTP}
                value={internalVal}
                keyboardType="numeric"
                onPressIn={e => {
                  setIsConnection(false);
                }}
              />
              <View style={styles.containerInput}>
                {Array(lengthInput)
                  .fill()
                  .map((data, index) => (
                    <View
                      key={index}
                      style={[
                        styles.cellView,
                        {
                          borderBottomColor:
                            index === internalVal.length
                              ? '#C9CFDF'
                              : '#274293',
                        },
                      ]}>
                      <Text
                        style={styles.cellText}
                        onPress={() => textInput.focus()}>
                        {internalVal && internalVal.length > 0
                          ? internalVal[index]
                          : ''}
                      </Text>
                    </View>
                  ))}
              </View>
            </View>
            {isConnection === true && (
              <Text style={styles.txtWarning}>
                {'Mã OTP không chính xác vui lòng kiểm tra lại'}
              </Text>
            )}
            <TouchableOpacity
              onPress={e => {
                onVetifyOTP();
              }}
              style={styles.btnForgot}>
              <Text style={styles.labelButton}>XÁC NHẬN</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default ForgotPasswordOTPScreen;

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
    paddingHorizontal: '50@ms',
  },
  viewContainer: {
    paddingTop: '20@ms',
    justifyContent: 'space-between',
    marginVertical: '10@ms',
    paddingHorizontal: '20@ms',
    paddingBottom: '0@ms',
  },

  textInput: {
    flex: 1,
    paddingLeft: '18@ms',
    fontSize: '19@ms',
    height: '40@ms',
    color: '#000000',
  },
  txtInputOTP: {
    width: 0,
    height: 0,
  },
  btnForgot: {
    width: '60%',
    height: '40@ms',
    borderColor: '#FF7F2D',
    backgroundColor: '#FF7F2D',
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
  },
  labelButton: {
    fontSize: '20@ms',
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
  },

  txtInputOTP: {
    width: 0,
    height: 0,
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  txtContentCenter: {
    color: '#FFFFFF',
    textAlign: 'center',
    paddingTop: '80@ms',
    paddingHorizontal: '10@ms',
    fontSize: '14@ms',
  },
  txtWarning: {
    marginHorizontal: '80@ms',
    textAlign: 'center',
    fontSize: '16@ms',
    color: 'red',
  },

  cellView: {
    borderColor: '#ACACAC',
    borderBottomWidth: 2,
    textAlign: 'center',
    height: '40@ms',
    paddingTop: '8@ms',
    width: '25@ms',
    margin: '5@ms',
  },
  cellText: {
    textAlign: 'center',
    fontSize: '18@ms',
    color: 'white',
  },
});
