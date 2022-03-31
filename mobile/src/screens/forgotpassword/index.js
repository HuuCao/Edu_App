import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ImageBackground,
  Image,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

//api
import axios from 'axios';
import Backend from '../../apis/backend';

//image
import imglogin from '../../assets/image/edu_mobile/bgEdu.jpg';
import goBackHeader from '../../assets/image/home/goBackHeader.png';

const ForgotPasswordScreen = ({navigation}) => {
  const [userName, setUsername] = useState('');
  const [check, setCheck] = useState(false);
  const [statusError, setStatusError] = useState(false);

  const onForgotPass = function () {
    userName === '' && setCheck(true);
    userName !== '' &&
      axios
        .post(Backend.auth + 'sendmail', {
          mail: userName,
        })
        .then(response => {
          navigation.navigate('ForgotPasswordOTPScreen', {
            data: userName,
          });
        })
        .catch(e => {
          console.log(e);
          Toast.show({
            type: 'error',
            text1: 'Vui lòng điền đầy đủ thông tin',
            visibilityTime: 2000,
            autoHide: true,
          });
        });
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
                Quên mật khẩu
              </Text>
            </View>
            <View style={styles.view}>
              <Text style={styles.txtTitle}>Email</Text>
              <View
                style={[
                  styles.txtInput,
                  {borderColor: check === false ? '#B1B1B1' : '#B61C1C'},
                ]}>
                <TextInput
                  style={styles.input}
                  placeholderTextColor="#9098B1"
                  autoCapitalize="none"
                  onChangeText={text => setUsername(text)}
                  value={userName}
                  onPressIn={e => {
                    setCheck(false);
                    setStatusError(false);
                  }}
                />
              </View>
            </View>

            <TouchableOpacity
              // onPress={() => navigation.navigate('ForgotPasswordOTPScreen')}
              onPress={e => {
                onForgotPass();
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

export default ForgotPasswordScreen;

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
    borderWidth: 1,
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
  labelButton: {
    fontSize: '20@ms',
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
  },

  iconViewPass: {
    marginRight: '20@ms',
    height: '20@ms',
    width: '20@ms',
  },
});
