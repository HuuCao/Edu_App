import React, {useState, useEffect} from 'react';
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
  Button,
  Platform,
  Modal,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import jwt_decode from 'jwt-decode';
//api
import axios from 'axios';
import Backend from '../../apis/backend';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {
  appleAuth,
  AppleButton,
} from '@invertase/react-native-apple-authentication';
//image
import imgregister from '../../assets/image/edu_mobile/bgEdu.jpg';
import logoEdu from '../../assets/image/edu_mobile/logoEdu.png';
const viewPass = require('../../assets/image/icons/viewPass.png');
const close = require('../../assets/image/icons/close.png');
const iconFalse = require('../../assets/image/icons/false.png');
import {useDispatch, useSelector} from 'react-redux';
import {
  onGoogleButtonPress,
  onFacebookButtonPress,
  onAppleButtonPress,
} from '../../auth/root';
import {LoginButton, AccessToken, LoginManager} from 'react-native-fbsdk';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import {UserConstants} from '../../persist/constants/UserConstants';

const LoginScreen = ({navigation}) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [checkboxState, setCheckboxState] = useState(false);
  const [hiddenPass, setHiddenPass] = useState(true);
  const [checkUserName, setCheckUserName] = useState(true);
  const [checkPassword, setCheckPassword] = useState(true);
  const [loading, setLoading] = useState(true);
  // TextInputLogin
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const loggedIn = useSelector(state => state.UserReducer.data.loggedIn);

  const onLogin = function (_user, _pass) {
    if (_user !== '' && _pass !== '') {
      // if (password.length >= 6) {
      axios
        .post(Backend.auth + 'login', {
          mail: _user,
          password: _pass,
        })
        .then(response => {
          setLoading(false);
          AddUseName(_user);
          AddPassword(_pass);
          response.data.success === false && setIsShowModal(true);

          AddToken(response.data.accessToken);
          AddIdUser(response.data.idUser);

          var user = jwt_decode(response.data.accessToken);
          console.log('User: ' + JSON.stringify(user));

          dispatch({type: UserConstants.SIGNIN_REQUEST, data: user});

          console.log('::', user.classID);
          if (user.classID === 0) {
            response.data.accessToken &&
              navigation.replace('SelectUser', {
                data: response.data.accessToken,
              });
          } else {
            response.data.accessToken &&
              navigation.replace('Dashboard', {
                data: response.data.accessToken,
              });
          }
        })
        .catch(e => {
          setLoading(false);
          console.log(e);
          // setIsShowModal(true);
          setCheckUserName(false);
          setCheckPassword(false);
        });
      // } else {
      //   setCheckPassword(false);
      // }
    } else {
      setCheckUserName(false);
      setCheckPassword(false);
    }
  };

  const onLoginSocial = function (_user, _pass) {
    console.log(_user);
    console.log(_pass);
    if (_user !== '' && _pass !== '') {
      // if (password.length >= 6) {
      axios
        .post(Backend.auth + 'login', {
          mail: _user,
          password: _pass,
        })
        .then(response => {
          AddUseName(_user);
          AddPassword(_pass);
          if (response.data.mail != undefined) {
            // response.data.success === false && setIsShowModal(true);
            // response.data.accessToken &&
            navigation.replace('SelectUser', {
              data: response.data.accessToken,
            });
            var decoded = jwt_decode(response.data.accessToken);
            console.log('Decode Token: ' + JSON.stringify(decoded));
            AddToken(response.data.accessToken);
            var user = jwt_decode(response.data.accessToken);
            console.log('user  ::', user);
            dispatch({type: UserConstants.SIGNIN_REQUEST, data: user});

            console.log('::', user.classID);
            if (user.classID === 0) {
              response.data.accessToken &&
                navigation.replace('SelectUser', {
                  data: response.data.accessToken,
                });
            } else {
              response.data.accessToken &&
                navigation.replace('Dashboard', {
                  data: response.data.accessToken,
                });
            }
            // addIdUser(response.data.idUser);
          } else {
            console.log('Logup');
            onSignUp(_user, _pass);
          }
        })
        .catch(e => {
          console.log(e);
          // setIsShowModal(true);
          setCheckUserName(false);
          setCheckPassword(false);
        });
      // } else {
      //   setCheckPassword(false);
      // }
    } else {
      setCheckUserName(false);
      setCheckPassword(false);
    }
  };

  const onSignUp = function (_user, _pass) {
    axios
      .post(Backend.auth + 'register', {
        fullname: 'Chưa cập nhật',
        mail: _user,
        password: _pass,
        birthday: '07/10/2000',
        phone: '',
      })
      .then(response => {
        if (response.data.success) {
          onLogin(_user, _pass);
        } else {
          alert(response.data.mess);
        }
      })
      .catch(e => {});
  };

  const AddIdUser = async value => {
    try {
      await AsyncStorage.setItem('idUser', JSON.stringify(value));
    } catch (e) {}
  };

  const AddToken = async value => {
    try {
      await AsyncStorage.setItem('token', value);
    } catch (e) {}
  };

  const AddPassword = async value => {
    try {
      await AsyncStorage.setItem('password', value);
    } catch (e) {}
  };
  const AddUseName = async value => {
    try {
      await AsyncStorage.setItem('username', value);
    } catch (e) {}
  };

  const GetPassword = async value => {
    try {
      var pass = await AsyncStorage.getItem('password');
      return pass;
    } catch (e) {
      return undefined;
    }
  };

  const GetUseName = async value => {
    try {
      var username = await AsyncStorage.getItem('username');
      return username;
    } catch (e) {
      return undefined;
    }
  };

  useEffect(async () => {
    var user = await GetUseName();
    var pass = await GetPassword();

    // Nếu có tài khoản trước đó, nghĩa là đã login trước đó
    // Thì Login vào luôn
    if (user != undefined && pass != undefined) {
      onLogin(user, pass);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (loggedIn == false) {
      // Log out Facebook
      LoginManager.logOut();
    }
  }, [loggedIn]);

  return (
    <SafeAreaView style={styles.container}>
      {loading && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'black',
          }}>
          <DotIndicator color="white" size={22} />
        </View>
      )}

      {!loading && (
        <ImageBackground source={imgregister} style={styles.image}>
          <KeyboardAvoidingView
            style={{flex: 1, height: '90%'}}
            keyboardVerticalOffset={60}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView>
              <View style={styles.viewContainer}>
                {/* <View style={styles.viewLogo}>
                  <Image
                    source={logoEdu}
                    resizeMode={'contain'}
                    style={styles.imgEdu}
                  />
                  <Text style={styles.txtSign}>ĐĂNG NHẬP</Text>
                </View> */}

                <View style={{paddingTop: 10}}>
                  <Text style={styles.txtTitle}>Email</Text>
                  <View
                    style={[
                      styles.txtInput,
                      {
                        borderColor:
                          checkUserName === true ? '#B1B1B1' : '#B61C1C',
                      },
                    ]}>
                    <TextInput
                      keyboardType="email-address"
                      style={styles.input}
                      placeholderTextColor="#9098B1"
                      autoCapitalize="none"
                      value={userName}
                      onChangeText={text => setUsername(text)}
                      onPressIn={e => {
                        setCheckUserName(true);
                      }}
                    />
                  </View>

                  <Text style={styles.txtTitle}>Mật khẩu</Text>
                  <View
                    style={[
                      styles.txtInput,
                      {
                        borderColor:
                          checkPassword === true ? '#B1B1B1' : '#B61C1C',
                      },
                    ]}>
                    <TextInput
                      style={styles.input}
                      secureTextEntry={hiddenPass}
                      placeholderTextColor="#9098B1"
                      autoCapitalize="none"
                      autoCorrect={false}
                      value={password}
                      onChangeText={text => setPassword(text)}
                      onPressIn={e => {
                        setCheckPassword(true);
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

                  <View style={styles.viewCheckSave}>
                    <Text
                      style={styles.txtForgotPass}
                      onPress={e => {
                        navigation.navigate('ForgotPasswordScreen');
                      }}>
                      {'Quên mật khẩu ?'}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={e => {
                    onLogin(userName, password);
                  }}
                  style={styles.buttonSignIn}>
                  <Text style={styles.txtFontsie}>ĐĂNG NHẬP</Text>
                </TouchableOpacity>
                <Text
                  style={{
                    color: 'white',
                    marginVertical: 10,
                    marginTop: 30,
                    textAlign: 'center',
                  }}>
                  ────── Đăng nhập bằng ──────
                </Text>
                <LoginButton
                  onLoginFinished={(error, result) => {
                    if (error) {
                      console.log('login has error: ' + result.error);
                    } else if (result.isCancelled) {
                      console.log('login is cancelled.');
                    } else {
                      AccessToken.getCurrentAccessToken().then(data => {
                        console.log(data);
                        onLoginSocial(data.userID, 'viesoftware');
                      });
                    }
                  }}
                  onLogoutFinished={() => console.log('logout.')}
                  style={styles.buttonFaceBook}
                />

                <TouchableOpacity
                  onPress={async () => {
                    onGoogleButtonPress()
                      .then(response => {
                        console.log(response.user);
                        if (response.user != undefined) {
                          onLoginSocial(response.user.email, 'viesoftware');
                        } else {
                          alert('Có Lỗi Xảy Ra, Vui Lòng Thử Lại');
                        }
                      })
                      .catch(e => {
                        console.log(e);
                        alert('Có Lỗi Xảy Ra, Vui Lòng Thử Lại');
                      });
                  }}
                  style={styles.buttonGoogle}>
                  <Text style={styles.txtFontsie}>GOOGLE</Text>
                </TouchableOpacity>
                {/* {Platform.OS == 'ios' && (
                  <AppleButton
                    buttonStyle={AppleButton.Style.WHITE}
                    buttonType={AppleButton.Type.SIGN_IN}
                    style={styles.btnApple}
                    onPress={async () => {
                      var token = await onAppleButtonPress();
                      console.log('appple::::', token);
                      onLoginSocial(token, 'viesoftware');
                    }}
                  />
                )} */}

                <TouchableOpacity
                  style={styles.btnRegister}
                  onPress={e => {
                    navigation.navigate('RegisterScreen');
                  }}>
                  <Text style={styles.txtFontsie}>ĐĂNG KÝ TÀI KHOẢN</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </ImageBackground>
      )}
      <Modal animationType="slide" transparent={true} visible={isShowModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.viewClose}>
              <TouchableOpacity
                onPress={e => {
                  setIsShowModal(!isShowModal);
                }}>
                <Image
                  source={close}
                  resizeMode={'contain'}
                  style={styles.iconClose}
                />
              </TouchableOpacity>
            </View>
            <Image
              source={iconFalse}
              resizeMode={'contain'}
              style={styles.imgStatus}
            />
            <Text style={styles.txtTitleModal}>
              {'Tài khoản đăng nhập sai. \n Vui lòng kiểm tra lại'}
            </Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  viewLogo: {
    marginTop: '10@ms',
    width: '100%',
    alignItems: 'center',
  },
  imgEdu: {
    height: '70@ms',
  },
  txtSign: {
    color: 'white',
    fontSize: '20@ms',
    marginTop: '10@ms',
  },
  viewContainer: {
    paddingTop: '20@ms',
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: '20@ms',
    paddingBottom: '20@ms',
  },
  txtForgotPass: {
    color: '#4CB1FF',
    fontSize: '15@ms',
    justifyContent: 'flex-end',
  },

  txtTitle: {
    color: '#FFFFFF',
    marginTop: '5@ms',
    fontSize: '16@ms',
  },
  txtInput: {
    borderWidth: 2,
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

  buttonSignIn: {
    width: '55%',
    height: '40@ms',
    borderColor: '#FF7F2D',
    backgroundColor: '#FF7F2D',
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
  },

  btnRegister: {
    marginVertical: '10@ms',
    height: '40@ms',
    width: '250@ms',
    alignSelf: 'center',
    borderBottomColor: '10@ms',
    backgroundColor: '#FF7F2D',
    borderRadius: '7@ms',
    justifyContent: 'center',
  },
  buttonFaceBook: {
    marginVertical: '10@ms',
    height: '40@ms',
    width: '250@ms',
    alignSelf: 'center',

    borderBottomColor: '10@ms',
    backgroundColor: '#4D7EFD',
    borderRadius: '7@ms',
    justifyContent: 'center',
  },
  btnApple: {
    marginVertical: '10@ms',
    height: '40@ms',
    width: '250@ms',
    alignSelf: 'center',
    borderBottomColor: '10@ms',
    borderRadius: '7@ms',
    justifyContent: 'center',
  },
  buttonGoogle: {
    marginVertical: '10@ms',
    height: '40@ms',
    width: '250@ms',
    alignSelf: 'center',
    borderBottomColor: '10@ms',
    backgroundColor: '#C24646',
    borderRadius: '7@ms',
    justifyContent: 'center',
  },
  txtFontsie: {
    color: '#fff',
    fontWeight: '500',
    fontSize: '14@ms',
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
  viewCheckSave: {
    marginBottom: '30@ms',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
});
