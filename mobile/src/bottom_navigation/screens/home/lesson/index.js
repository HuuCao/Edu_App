import React, {useState, useEffect} from 'react';
import {
  Text,
  Image,
  FlatList,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Toast from 'react-native-toast-message';
//api
import axios from 'axios';
import Backend from '../../../../apis/backend';
import AsyncStorage from '@react-native-async-storage/async-storage';

import goBackHeader from '../../../../assets/image/home/backblack.png';
const arrow = require('../../../../assets/image/icons/arrow.png');

import {useDispatch} from 'react-redux';
import {UserConstants} from '../../../../persist/constants/UserConstants';
import {HistoryConstants} from '../../../../persist/constants/HistoryConstant';
import jwt_decode from 'jwt-decode';

const LessonScreen = ({navigation, route}) => {
  const {data} = route.params;
  console.log('LessonScreen', data);
  const [show, setShow] = useState(false);
  const [dataChapter, setDataChapter] = useState([]);
  const dispatch = useDispatch();

  const fetchChapter = async subjectID => {
    const getToken = await AsyncStorage.getItem('token');
    console.log(Backend.api + 'chapter?subjectID=' + subjectID);
    axios
      .get(Backend.api + 'chapter?subjectID=' + subjectID, {
        headers: {
          Authorization: getToken,
        },
      })
      .then(response => {
        console.log('fetchChapter', response.data.data);
        setDataChapter(response.data.data);
        // var listLesson = [];
        // console.log('fetchChapter', response.data.data.lstLesson);
        // response.data.data.lstLesson.map(e => {
        //   listLesson.push({lessonName});
        // });
      })
      .catch(err => {
        console.log(err);
      });
  };

  // Create History
  const createHistory = async item => {
    const getToken = await AsyncStorage.getItem('token');
    //var user = jwt_decode(getToken);
    axios
      .patch(
        Backend.api + 'history' + '/' + 'insert',
        {
          lessonID: item.lessonID,
        },
        {
          headers: {
            Authorization: getToken,
          },
        },
      )
      .then(response => {
        // Cập nhật item này vào Storage
        // Không cần gọi API load Profile làm gì cả
        dispatch({type: HistoryConstants.ADD_HISTORY, data: item});

        navigation.navigate('DetailLesson', {
          data: item,
        });
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

  const Item = ({item}) => (
    <View
      style={[
        styles.viewItem,
        // {height: show === item._id ? item.dataLesson.length * 30 + 55 : 37},
      ]}>
      <TouchableOpacity
        onPress={e => {
          if (show != item._id) {
            setShow(item._id);
          } else {
            setShow(-1);
          }
        }}
        style={[styles.viewItemShow]}>
        <Text style={styles.txtTitle}>{item.chapterName}</Text>
        <Image
          source={arrow}
          resizeMode={'contain'}
          style={styles.iconTextInput}
        />
      </TouchableOpacity>

      {show === item._id && (
        <View>
          {item.lstLesson.map(item => {
            return (
              <View style={styles.viewShow}>
                <TouchableOpacity
                  style={styles.viewStudy}
                  onPress={e =>
                    // navigation.navigate('DetailLesson', {
                    //   data: item,
                    // }),
                    createHistory(item)
                  }>
                  <Text style={styles.txtStudy}>{item.lessonName}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );

  const renderItem = ({item}) => <Item item={item} />;

  useEffect(() => {
    fetchChapter(data.subjectID);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => navigation.goBack()}>
          <Image source={goBackHeader} resizeMode="contain" />
          <Text style={{fontSize: 20, fontWeight: '600'}}>Bài học</Text>
        </TouchableOpacity>

        <FlatList
          data={dataChapter}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default LessonScreen;
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
    backgroundColor: '#FFFFFF',
    paddingHorizontal: '15@ms',
    paddingVertical: '20@ms',
  },

  viewItem: {
    alignSelf: 'center',
    width: '96%',
    marginTop: '10@ms',
    borderRadius: '5@ms',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  viewItemShow: {
    backgroundColor: '#6F5FCD',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '10@ms',
    height: '37@ms',
    borderRadius: '5@ms',
  },

  txtTitle: {
    fontSize: '13@ms',
    color: '#FFFFFF',
    width: '90%',
  },

  viewShow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '30@ms',
    width: '100%',
  },
  viewStudy: {
    paddingLeft: '15@ms',
    width: '100%',
  },
  txtStudy: {
    fontSize: '13@ms',
  },
  viewSearch: {
    alignSelf: 'center',
    height: '37@ms',
    width: '96%',
    borderWidth: '0.5@ms',
    borderColor: '#9098B1',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: '10@ms',
    paddingHorizontal: '5@ms',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 6,
  },
  iconTextInput: {
    marginHorizontal: '10@ms',
    height: '10@ms',
    width: '10@ms',
  },
  input: {
    flex: 1,
    color: '#000000',
    fontSize: '12@ms',
  },
  selectClass: {
    marginHorizontal: '10@ms',
    color: '#FFFFFF',
    backgroundColor: '#6F5FCD',
    borderRadius: '5@ms',
    width: '150@ms',
  },
});
