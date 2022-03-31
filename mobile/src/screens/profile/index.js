import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  Platform,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from 'react-native';
import {Avatar, ListItem, Icon} from 'react-native-elements';
import {ScaledSheet} from 'react-native-size-matters';
import RNPickerSelect from 'react-native-picker-select';
import {Modalize} from 'react-native-modalize';
import Animated from 'react-native-reanimated';
import RNFS from 'react-native-fs';
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';

//api
import axios from 'axios';
import Backend from '../../apis/backend';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Toast from 'react-native-toast-message';
import imgbg from '../../assets/image/edu_mobile/bgEdu.jpg';
import imgProfile from '../../assets/image/home/imgprofile.png';
import keypass from '../../assets/image/profile/keypass.png';
import notify from '../../assets/image/profile/notify.png';
import note from '../../assets/image/profile/note.png';
import feedback from '../../assets/image/profile/feedback.png';
import bishare from '../../assets/image/profile/bishare.png';
import setting from '../../assets/image/profile/setting.png';
import logout from '../../assets/image/profile/logout.png';
import goBackHeader from '../../assets/image/home/goBackHeader.png';
import check from '../../assets/image/icons/checkGreen.png';
import edit from '../../assets/image/icons/edit.png';

import {UserConstants} from '../../persist/constants/UserConstants';
import jwt_decode from 'jwt-decode';

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

const Profile = ({navigation}) => {
  useEffect(() => {
    fetchClass();
    getInfoUser();
  }, []);

  const modalizeUploadPhoto = useRef(null);

  const onOpenUploadPhoto = () => {
    modalizeUploadPhoto.current?.open();
  };

  const onCloseUploadPhoto = () => {
    modalizeUploadPhoto.current?.close();
  };

  const [itemClass, setItemClass] = useState(null);
  const [dataClass, setDataClass] = useState([]);

  const [image, setImage] = useState('');
  const [editName, setEditName] = useState(false);
  const [userName, setUsername] = useState('');
  const [dataUser, setDataUser] = useState();
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  //camera
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      setLoading(true);
      ConvertUriToLink(image);
      setImage(image.path);
    });
  };

  //album
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      setLoading(true);
      ConvertUriToLink(image);
      setImage(image.path);
    });
  };

  const ConvertUriToLink = async function (e) {
    let file = {
      name: 'files',
      filename: e.filename,
      originalname: e.size,
      filetype: e.mime,
      filepath:
        Platform.OS === 'ios'
          ? e.path.replace('file://', '')
          : e.path.slice(7, e.path.length),
    };

    var files = [];
    files.push(file);
    console.log(JSON.stringify(files));

    RNFS.uploadFiles({
      toUrl:
        'https://workroom.viesoftware.vn:6060/api/uploadfile/google/multifile',
      files: files,
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    })
      .promise.then(result => {
        onCloseUploadPhoto();
        var link = JSON.parse(result.body);
        console.log(link.data[0]);
        updateProfile({
          avatar: link.data[0],
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  //get info user
  const getInfoUser = async function () {
    const getToken = await AsyncStorage.getItem('token');
    axios
      .get(Backend.user, {
        headers: {
          Authorization: getToken,
        },
      })
      .then(response => {
        dispatch({
          type: UserConstants.UPDATE_PROFILE,
          data: response.data.data,
        });
        setDataUser(response.data);
        setImage(response.data.data.avatar);
        setUsername(response.data.data.fullname);
        setItemClass(response.data.data.classID);
      })
      .catch(e => {
        console.log(e);
        navigation.replace('LoginScreen');
      });
  };

  //change
  const updateProfile = async function (params) {
    const getToken = await AsyncStorage.getItem('token');
    var user = jwt_decode(getToken);

    axios
      .patch(Backend.user + user.idUser, params, {
        headers: {
          Authorization: getToken,
        },
      })
      .then(response => {
        setLoading(false);
        // Toast.show({
        //   type: 'success',
        //   text1: 'Cập Nhật Thành Công !',
        //   visibilityTime: 1500,
        // });
      })
      .catch(e => {
        setLoading(false);
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
        console.log(e);
      });
  };

  const AddId = async value => {
    try {
      await AsyncStorage.setItem('id', value + '');
    } catch (e) {}
  };

  // const fetchInfoUser = async () => {
  //   const getToken = await AsyncStorage.getItem('token');
  //   const getId = await AsyncStorage.getItem('id');

  //   console.log(Backend.auth + 'profile?idUser='+user.idUser);

  //   axios
  //     .get(Backend.auth + 'profile?idUser='+user.idUser, {
  //       headers: {
  //         Authorization: getToken,
  //       },
  //     })
  //     .then(response => {
  //       console.log("Response: "+response.data);
  //       navigation.goBack();
  //       dispatch({type: UserConstants.UPDATE_PROFILE, data: response.data});
  //     })
  //     .catch(err =>{
  //       console.log(err);
  //       navigation.goBack();
  //     })
  // };

  //logout
  const onLogout = function () {
    dispatch({type: UserConstants.SIGNOUT_REQUEST, data: 'something'});
    AddPassword('');
    AddUseName('');
    AddToken('');
    navigation.navigate('LoginScreen');
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

  const AddToken = async value => {
    try {
      await AsyncStorage.setItem('token', value);
    } catch (e) {}
  };
  return (
    <SafeAreaView style={styles.container}>
      {isLoading && (
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'black',
            opacity: 0.5,
            position: 'absolute',
            zIndex: 100,
          }}>
          <BarIndicator
            size={45}
            color={'white'}
            style={{alignSelf: 'center'}}
          />
        </View>
      )}
      <ImageBackground source={imgbg} style={styles.imgBg}>
        <ScrollView>
          <ImageBackground
            overlayContainerStyle={{backgroundColor: 'blue'}}
            source={imgProfile}
            style={styles.imgProfile}>
            <TouchableOpacity
              onPress={() => {
                getInfoUser();
                navigation.goBack();
              }}>
              <Image
                source={goBackHeader}
                resizeMode="contain"
                style={{
                  with: 50,
                  height: 45,
                  marginTop: 4,
                  marginLeft: 17,
                }}
              />
            </TouchableOpacity>
          </ImageBackground>
          <View style={styles.viewProfile}>
            <View style={styles.header}>
              <Avatar
                overlayContainerStyle={{backgroundColor: 'blue'}}
                onPress={onOpenUploadPhoto}
                size="large"
                activeOpacity={0.7}
                rounded
                source={{
                  uri: image != undefined ? image : '',
                }}
              />
              <View style={{marginLeft: 10}}>
                <View style={styles.viewNames}>
                  <View>
                    {editName === false ? (
                      <Text style={styles.txtName}>{userName}</Text>
                    ) : (
                      <View style={styles.txtInputName}>
                        <TextInput
                          onChangeText={text => setUsername(text)}
                          value={userName}
                          style={styles.inputName}
                          placeholderTextColor="white"
                          autoCapitalize="none"
                          onPressIn={e => {
                            // setIsConnection(false);
                          }}
                        />
                        <TouchableOpacity
                          style={styles.btnApplyName}
                          onPress={e => {
                            setEditName(false);
                            updateProfile({
                              fullname: userName,
                            });
                          }}>
                          <Image
                            source={check}
                            resizeMode={'contain'}
                            style={{width: 10, height: 10}}
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                  <TouchableOpacity
                    onPress={e => {
                      setEditName(!editName);
                    }}>
                    <Image
                      source={note}
                      resizeMode={'contain'}
                      style={{width: 23, height: 23}}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.selectClass}>
                  <RNPickerSelect
                    style={pickerStyle}
                    placeholder={{label: 'Chọn lớp', value: 'lop'}}
                    placeholderTextColor="red"
                    onValueChange={value => {
                      setItemClass(value);
                      if (Platform.OS == 'android')
                        updateProfile({
                          classID: value,
                        });
                    }}
                    onDonePress={e => {
                      console.log(itemClass);
                      updateProfile({
                        classID: itemClass,
                      });
                    }}
                    value={itemClass}
                    items={dataClass}
                  />
                </View>
              </View>
            </View>
            <View style={styles.hr}></View>
            <View style={styles.viewDetail}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPasswordScreen')}
                style={styles.button}>
                <Image source={keypass} resizeMode="contain" />
                <Text style={styles.labelButton}>Đặt lại mật khẩu</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.hr}></View>
            <View style={styles.viewDetail}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Notify')}
                style={styles.button}>
                <Image source={notify} resizeMode="contain" />
                <Text style={styles.labelButton}>Thông báo</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.hr}></View>
            {/* <View style={styles.viewDetail}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ExamDone')}
                style={styles.button}>
                <Image source={note} resizeMode="contain" />
                <Text style={styles.labelButton}>Bài thi đã làm</Text>
              </TouchableOpacity>
            </View> */}
            {/* <View style={styles.hr}></View>
            <View style={styles.viewDetail}>
              <TouchableOpacity
                onPress={() => navigation.navigate('FeedBack')}
                style={styles.button}>
                <Image source={feedback} resizeMode="contain" />
                <Text style={styles.labelButton}>Góp ý</Text>
              </TouchableOpacity>
            </View> */}
            <View style={styles.hr}></View>
            <View style={styles.viewDetail}>
              <TouchableOpacity
                onPress={() => navigation.navigate('SelectUser')}
                style={styles.button}>
                <Image source={bishare} resizeMode="contain" />
                <Text style={styles.labelButton}>Nâng cấp tài khoản</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.hr}></View>
            <View style={styles.viewDetail}>
              <TouchableOpacity
                // onPress={() => navigation.navigate('LoginScreen')}
                style={styles.button}>
                <Image source={setting} resizeMode="contain" />
                <Text style={styles.labelButton}>Cài đặt</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.hr}></View>
            <View style={styles.viewDetail}>
              <TouchableOpacity
                onPress={e => {
                  onLogout();
                }}
                // onPress={() => navigation.navigate('LoginScreen')}
                style={styles.button}>
                <Image source={logout} resizeMode="contain" />
                <Text style={styles.labelButton}>Đăng xuất</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.hr}></View>
          </View>
        </ScrollView>
      </ImageBackground>
      <Modalize ref={modalizeUploadPhoto} snapPoint={270}>
        <View style={styles.panel}>
          <View style={{alignItems: 'center', marginTop: 15}}>
            <Text style={styles.panelTitle}>{'Tải ảnh lên'}</Text>
            <TouchableOpacity
              style={styles.panelButton}
              onPress={takePhotoFromCamera}>
              <Text style={styles.panelButtonTitle}>{'Camera'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.panelButton}
              onPress={choosePhotoFromLibrary}>
              <Text style={styles.panelButtonTitle}>
                {'Chọn ảnh từ thư viện'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modalize>
    </SafeAreaView>
  );
};
export default Profile;

const pickerStyle = {
  inputIOS: {
    color: 'white',
    fontSize: 16,
    width: 110,
    paddingTop: 7,
    paddingHorizontal: 10,
    paddingBottom: 7,
  },
  inputAndroid: {
    color: 'white',
    fontSize: 12,
    width: 130,
    marginTop: -10,
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
  },
  imgBg: {
    resizeMode: 'cover',
    flex: 2,
  },
  imgProfile: {
    resizeMode: 'cover',
    height: '125@ms',
    width: '100%',
  },
  viewProfile: {
    paddingHorizontal: '10@ms',
  },
  header: {
    // backgroundColor: 'blue',
    flexDirection: 'row',
    position: 'relative',
    top: '-25@ms',
  },
  txtTitle: {
    color: 'white',
    fontSize: '15@ms',
    fontWeight: '600',
  },
  hr: {
    height: 1,
    alignSelf: 'center',
    width: '94%',
    backgroundColor: '#DDDDDD',
  },
  viewDetail: {
    paddingVertical: '18@ms',
    paddingHorizontal: '13@ms',
  },
  button: {
    flexDirection: 'row',
  },
  labelButton: {
    color: 'white',
    fontWeight: '600',
    marginLeft: '10@ms',
  },
  selectClass: {
    marginTop: '5@ms',
    color: '#FFFFFF',
    backgroundColor: '#FF7F2D',
    borderRadius: '5@ms',
    width: '120@ms',
  },
  txtInputName: {
    borderWidth: 1,
    height: '38@ms',
    width: '140@ms',
    borderColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: '5@ms',
  },
  viewNames: {
    alignItems: 'center',
    // width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewInfor: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '68@ms',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },
  txtName: {
    height: '25@ms',
    fontWeight: 'bold',
    fontSize: '19@ms',
    color: 'white',
    marginBottom: '5@ms',
  },
  inputName: {
    color: 'white',
    fontWeight: '500',
    paddingLeft: '10@ms',
    flex: 1,
    fontSize: '15@ms',
    height: '38@ms',
  },
  btnApplyName: {
    width: '36@ms',
    height: '36@ms',
    borderRadius: '3@ms',
    alignItems: 'center',
    justifyContent: 'center',
  },
  panelButton: {
    marginTop: '20@ms',
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
    width: '80%',
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  panelHeader: {
    alignItems: 'center',
  },

  panelTitle: {
    fontSize: '27@ms',
    height: '35@ms',
    marginBottom: '10@ms',
  },
});
