import React, {useEffect, useRef, useState} from 'react';

import {
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Image,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
//api
import axios from 'axios';
import Backend from '../../apis/backend';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import {UserConstants} from '../../persist/constants/UserConstants';
import {useSelector, useDispatch} from 'react-redux';

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

//modal
import {Modalize} from 'react-native-modalize';

//image
import imglogin from '../../assets/image/edu_mobile/bgEdu.jpg';
import student from '../../assets/image/edu_mobile/student.png';
import teacher from '../../assets/image/edu_mobile/teacher.png';
import cen from '../../assets/image/service/cen.png';

const SelectUser = ({navigation}) => {
  const dispatch = useDispatch();

  //modal
  const modalizeStudent = useRef(null);
  const modalizeTeacher = useRef(null);
  const onOpenStudent = () => {
    modalizeStudent.current?.open();
  };
  const onOpenTeacher = () => {
    modalizeTeacher.current?.open();
  };
  const [isLoading, setLoading] = useState(false);
  const [dataClass, setDataClass] = useState([]);
  const [dataPayment, setDataPayment] = useState([]);

  useEffect(() => {
    fetchClass();
    fetchPayment();
    fetchHistory();
  }, []);

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
        console.log(arr);
        arr = arr.slice(0, 4);
        dispatch({
          type: UserConstants.GET_HISTORY_REQUEST,
          data: arr,
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  const fetchClass = async () => {
    const getToken = await AsyncStorage.getItem('token');
    axios
      .get(Backend.api + 'class', {
        headers: {
          Authorization: getToken,
        },
      })
      .then(response => {
        setDataClass(response.data.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const fetchPayment = async () => {
    const getToken = await AsyncStorage.getItem('token');
    axios
      .get(Backend.api + 'payment', {
        headers: {
          Authorization: getToken,
        },
      })
      .then(response => {
        setDataPayment(response.data.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  //update role
  const updateRole = async function (params) {
    const getToken = await AsyncStorage.getItem('token');
    var user = jwt_decode(getToken);
    console.log(Backend.role + user.idUser);
    axios
      .patch(Backend.role + user.idUser, params, {
        headers: {
          Authorization: getToken,
        },
      })
      .then(response => {
        setLoading(false);
        console.log('updateRole', response.data);
      })
      .catch(e => {
        setLoading(false);
        console.log(e);
      });
  };

  //update class
  const updateClass = async function (params) {
    const getToken = await AsyncStorage.getItem('token');
    var user = jwt_decode(getToken);

    console.log(Backend.user + user.idUser);
    console.log('PARAMS', params);
    axios
      // .patch(Backend.user + user.idUser, params, {
      .patch(
        Backend.user + user.idUser,
        {
          classID: 12,
        },
        {
          headers: {
            Authorization: getToken,
          },
        },
      )
      .then(response => {
        setLoading(false);
        console.log('updateClass', response.data);
        dispatch({
          type: UserConstants.UPDATE_PROFILE,
          data: response.data.data,
        });
      })
      .catch(e => {
        setLoading(false);
        console.log(e);
      });
  };

  const AddId = async value => {
    try {
      await AsyncStorage.setItem('id', value + '');
    } catch (e) {}
  };

  const Item = ({item}) => (
    <View style={styles.viewModalService}>
      <TouchableOpacity
        style={[
          styles.btnService,
          {backgroundColor: item._id === 3 ? '#0480DF' : '#ED6D1C'},
        ]}
        onPress={() =>
          // navigation.navigate('Service')
          updateRole()
        }>
        <View style={styles.viewItemService}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text style={{color: 'white', fontSize: 18}}>{item.package}</Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: 24,
                  paddingVertical: 8,
                }}>
                {item.price}
              </Text>
            </View>
            <View>
              <Image source={item.icon} resizeMode={'contain'} />
            </View>
          </View>
          <View
            style={{
              height: 1,
              width: '98%',
              backgroundColor: '#FFFFFF',
              marginBottom: 10,
            }}
          />
          <Text style={{color: 'white'}}>{item.description}.</Text>
          <Text style={{color: 'white'}}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
  const renderItem = ({item}) => <Item item={item} />;

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
      <ImageBackground source={imglogin} style={styles.image}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={20}>
          <View style={{marginTop: 10}}>
            <Text
              style={{
                marginLeft: 10,
                fontSize: 20,
                fontWeight: '500',
                color: 'white',
              }}>
              Chọn người dùng
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <View style={styles.viewItem}>
                <TouchableOpacity
                  style={styles.btnTouch}
                  onPress={onOpenStudent}>
                  <Image
                    source={student}
                    resizeMode={'contain'}
                    style={styles.imgUser}
                  />
                </TouchableOpacity>
                <Text style={styles.txtNameItem}>Hoc sinh</Text>
              </View>

              <View style={styles.viewItem}>
                <TouchableOpacity
                  style={styles.btnTouch}
                  onPress={onOpenTeacher}>
                  <Image
                    source={teacher}
                    resizeMode={'contain'}
                    style={styles.imgUser}
                  />
                </TouchableOpacity>
                <Text style={styles.txtNameItem}>Giáo viên</Text>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>

      {/* modal student */}
      <Modalize ref={modalizeStudent} snapPoint={450}>
        <Text style={styles.txtModal}>Chọn lớp</Text>
        <View style={styles.viewModalClass}>
          {dataClass.map((item, index) => {
            return (
              <TouchableOpacity
                style={[styles.btnClass]}
                onPress={e => {
                  updateClass({
                    classID: item.classID,
                  });
                  navigation.navigate('Dashboard', {
                    classID: item.classID,
                  });
                  AddId(item.classID);
                  console.log(item.classID);
                }}>
                <Text style={{color: 'white', fontSize: 16}}>
                  {item.className}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Modalize>

      {/* modal teacher */}
      <Modalize ref={modalizeTeacher} snapPoint={400}>
        <Text style={styles.txtModal}>Chọn gói ứng dụng</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={{paddingVertical: 10}}
          data={dataPayment}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </Modalize>
    </SafeAreaView>
  );
};

export default SelectUser;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  txtModal: {
    marginVertical: '18@ms',
    marginLeft: '20@ms',
    fontSize: '20@ms',
  },
  viewModalClass: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: '20@ms',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnClass: {
    height: '40@ms',
    width: '46%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '15@ms',
    borderRadius: '30@ms',
    backgroundColor: '#6254B6',
  },
  viewModalService: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: '16@ms',
  },
  btnService: {
    width: '260@ms',
    height: '260@ms',
    borderRadius: '30@ms',
  },
  viewItemService: {
    padding: '15@ms',
  },

  viewItem: {
    marginTop: '50@ms',
    width: '150@ms',
    height: '150@ms',
  },
  btnTouch: {
    width: '150@ms',
    height: '100%',
    borderRadius: '15@ms',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgUser: {
    width: '100@ms',
    height: '100@ms',
  },
  txtNameItem: {
    fontSize: '15@ms',
    color: 'white',
    marginTop: '30@ms',
    textAlign: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
});
