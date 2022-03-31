import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
  Modal,
  StatusBar,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {ScaledSheet} from 'react-native-size-matters';
// import {FAB} from 'react-native-elements';
import {FAB} from 'react-native-paper';
import Toast from 'react-native-toast-message';

import Swiper from 'react-native-swiper';
//api
import axios from 'axios';
import Backend from '../../../apis/backend';
import AsyncStorage from '@react-native-async-storage/async-storage';
//image
import banner from '../../../assets/image/banner/baner.png';
import toan from '../../../assets/image/subjects/toan.png';
import nguvan from '../../../assets/image/subjects/nguvan.png';
import sinhhoc from '../../../assets/image/subjects/sinhhoc.png';
import vatly from '../../../assets/image/subjects/vatly.png';
import hoahoc from '../../../assets/image/subjects/hoahoc.png';
import lichsu from '../../../assets/image/subjects/lichsu.png';
import dialy from '../../../assets/image/subjects/dialy.png';
import tienganh from '../../../assets/image/subjects/tienganh.png';
import congnghe from '../../../assets/image/subjects/congnghe.png';
import tinhoc from '../../../assets/image/subjects/tinhoc.png';
const close = require('../../../assets/image/icons/close.png');
import {useSelector, useDispatch} from 'react-redux';
import {UserConstants} from '../../../persist/constants/UserConstants';
import {HistoryConstants} from '../../../persist/constants/HistoryConstant';
import jwt_decode from 'jwt-decode';

const HomeScreen = ({route, navigation}) => {
  const [isData, setIsData] = useState([]);
  const [dataBlog, setDataBlog] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [dataExam, setDataExam] = useState([]);
  const dispatch = useDispatch();
  const dataProfile = useSelector(state => state.UserReducer.data.user);

  const dataHistory = useSelector(state => state.HistoryReducer.dataHistory);

  //get subject
  const fetchSubject = async classID => {
    const getToken = await AsyncStorage.getItem('token');
    axios
      .get(Backend.api + 'subject?classID=' + classID, {
        headers: {
          Authorization: getToken,
        },
      })
      .then(response => {
        setIsData(response.data.data);
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

  //get blog
  const fetchBlog = async () => {
    const getToken = await AsyncStorage.getItem('token');
    axios
      .get(Backend.api + 'blogs', {
        headers: {
          Authorization: getToken,
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        var data = Object.assign([], response.data.data);
        setDataBlog(data);
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

  //getExam
  const fetchAllExam = async () => {
    const getToken = await AsyncStorage.getItem('token');
    axios
      .get(Backend.api + 'exam', {
        headers: {
          Authorization: getToken,
        },
      })
      .then(response => {
        let arr = response.data.data;
        arr = arr.slice(0, 3);
        setDataExam(arr);
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

  const fetchHistory = async () => {
    const getToken = await AsyncStorage.getItem('token');
    var user = jwt_decode(getToken);
    axios
      .get(Backend.api + 'history?idUser=' + user.idUser, {
        headers: {
          Authorization: getToken,
        },
      })
      .then(response => {
        let arr = response.data.data[0].lessonID;
        console.log('History: ' + JSON.stringify(arr));

        arr = arr.slice(0, 4);
        dispatch({
          type: HistoryConstants.GET_HISTORY_REQUEST,
          data: arr,
        });
        // dispatch({
        //   type: 'reload_history',
        //   data: arr,
        // });
      })
      .catch(e => {
        console.log(e);
      });
  };

  const Img = input => {
    switch (input) {
      case 'Toán':
        return toan;
      case 'Vật Lý':
        return vatly;
      case 'Hóa Học':
        return hoahoc;
      case 'Ngữ Văn':
        return nguvan;
      case 'Sinh Học':
        return sinhhoc;
      case 'Lịch Sử':
        return lichsu;
      case 'Địa Lý':
        return dialy;
      case 'Tiếng Anh':
        return tienganh;
      case 'Công Nghệ':
        return congnghe;
      case 'Tin Học':
        return tinhoc;
    }
  };

  useEffect(() => {
    fetchBlog();
    fetchAllExam();
    fetchHistory();
  }, []);

  useEffect(() => {
   

    if (dataHistory == undefined){
      fetchHistory();
    } else
    {
      console.log('History: ' + dataHistory.length);
    }
  }, [dataHistory]);

  useEffect(() => {
    fetchSubject(dataProfile.classID);
  }, [dataProfile]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{flex: 1, height: '90%'}}
        keyboardVerticalOffset={60}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView>
          <View style={{marginVertical: 15}}>
            <View style={styles.viewContainer}>
              <Text style={{fontSize: 20, fontWeight: '700'}}>Trang chủ</Text>
              <Avatar
                size="medium"
                onPress={() => navigation.navigate('ProfileScreen')}
                activeOpacity={0.7}
                overlayContainerStyle={{backgroundColor: 'blue'}}
                rounded
                source={{
                  uri:
                    dataProfile.avatar != undefined ? dataProfile.avatar : '',
                }}
              />
            </View>
            <View style={styles.sliderContainer}>
              <Swiper
                autoplay={true}
                horizontal={true}
                height={200}
                autoplayTimeout={2.5}
                activeDotColor="#FF6347">
                {dataBlog.map((item, index) => {
                  return (
                    <>
                      <TouchableOpacity
                        onPress={e => {
                          navigation.navigate('BlogDetailScreen', {
                            data: item,
                          });
                        }}
                        style={[styles.slide]}>
                        <Image
                          source={{uri: item.image}}
                          resizeMode="contain"
                          style={styles.sliderImage}
                        />
                      </TouchableOpacity>
                    </>
                  );
                })}
              </Swiper>
            </View>

            <Text style={styles.txtTitle}>Các môn học</Text>

            <View style={styles.viewSubject}>
              <View style={styles.row1}>
                {isData.map((item, index) => {
                  return (
                    <View style={styles.viewBtnItem}>
                      <TouchableOpacity
                        style={[styles.btnsubject]}
                        onPress={e => {
                          navigation.navigate('LessonScreen', {
                            data: item,
                          });
                        }}>
                        <Image
                          source={Img(item.subjectName)}
                          style={styles.imgsubject}
                        />
                      </TouchableOpacity>
                      <Text style={styles.txtname}>{item.subjectName}</Text>
                    </View>
                  );
                })}
              </View>
            </View>

            <Text style={styles.txtTitle}>Lịch sử xem</Text>
            <View style={styles.viewhistory}>
              {dataHistory != undefined &&
                dataHistory.map(item => {
                  return (
                    <View>
                      <TouchableOpacity
                        onPress={e => {
                          navigation.navigate('DetailLesson', {
                            data: item,
                          });
                        }}
                        style={{
                          paddingHorizontal: 10,
                          paddingVertical: 17,
                          borderRadius: 10,
                        }}>
                        <Text style={{color: 'white'}}>{item.lessonName}</Text>
                      </TouchableOpacity>
                      <View style={styles.hr} />
                    </View>
                  );
                })}
            </View>
          </View>
        </ScrollView>
        <FAB
          style={styles.fab}
          color="white"
          icon={require('../../../assets/image/icons/book.png')}
          onPress={() => setIsShowModal(true)}
        />
      </KeyboardAvoidingView>
      <Modal animationType="slide" transparent={true} visible={isShowModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.viewClose}>
              <Text style={{fontSize: 20, color: '#9F81F7', fontWeight: '600'}}>
                Bộ câu hỏi mới
              </Text>
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
            <View>
              {dataExam.map((item, index) => {
                return (
                  <View style={{alignItems: 'center'}}>
                    <View style={[styles.itemExam]}>
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

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={{fontSize: 10, color: '#FF7F2D'}}>
                          {'Số câu: '}
                          {item.amount}
                        </Text>
                        <TouchableOpacity
                          onPress={e =>
                            navigation.navigate(
                              'PracticeScreen',
                              {
                                data: item,
                              },
                              setIsShowModal(!isShowModal),
                            )
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
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '10@ms',
    backgroundColor: 'white',
  },
  viewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '10@ms',
  },

  input: {
    flex: 1,
    color: '#000000',
    fontSize: '12@ms',
  },

  txtTitle: {
    fontSize: '15@ms',
    fontWeight: '600',
    marginTop: '20@ms',
    paddingHorizontal: '12@ms',
    color: '#1D2563',
  },
  viewSubject: {
    alignSelf: 'center',
  },
  row1: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  btnsubject: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20@ms',
    width: '65@ms',
    height: '65@ms',
    borderRadius: '10@ms',
    backgroundColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 6,
  },
  txtname: {
    alignSelf: 'center',
    marginTop: 7,
    color: '#6254B6',
  },

  viewhistory: {
    marginTop: '20@ms',
    backgroundColor: '#8275CE',
    borderRadius: '10@ms',
    marginHorizontal: '10@ms',
  },
  hr: {
    height: 1,
    alignSelf: 'center',
    width: '94%',
    backgroundColor: '#DDDDDD',
  },
  viewBtnItem: {
    height: '110@ms',
    width: '22%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    padding: '15@ms',
    width: '86%',
    // height: '247@ms',
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
    flexDirection: 'row',

    justifyContent: 'space-between',
  },
  iconClose: {
    height: '13@ms',
    width: '13@ms',
  },
  sliderContainer: {
    height: '190@ms',
    width: '100%',
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
  },

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  sliderImage: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
  },
  fab: {
    position: 'absolute',
    margin: 30,
    right: 0,
    bottom: 0,
    backgroundColor: '#8275CE',
  },
  txt: {
    fontSize: '15@ms',
    fontWeight: '600',
    paddingTop: '5@ms',
  },
  itemExam: {
    width: '100%',
    height: '100@ms',
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
});
