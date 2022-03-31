import React, {useState, useEffect} from 'react';
import {
  Text,
  FlatList,
  Image,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import RenderHtml from 'react-native-render-html';
import Toast from 'react-native-toast-message';

import _ from 'lodash';
//api
import axios from 'axios';
import Backend from '../../../../apis/backend';
import AsyncStorage from '@react-native-async-storage/async-storage';
import goBackHeader from '../../../../assets/image/home/backblack.png';
import {useDispatch, useSelector} from 'react-redux';
const ContentQuestionScreen = ({navigation, route}) => {
  const {data} = route.params;
  useEffect(() => {
    fetchExam();
  }, []);

  const dispatch = useDispatch();

  const [dataExam, setDataExam] = useState([]);

  const fetchExam = async () => {
    setDataExam(data.lstQuestion);
  };

  const onAddQuestion = async () => {
    const getToken = await AsyncStorage.getItem('token');
    axios
      .post(
        Backend.exam + 'addquestion?examID=' + data.examID,
        {
          lstQuestion: dataExam.map(e => {
            return {
              questionID: e.questionID,
              answer: e.answer,
              correct: e.correct,
            };
          }),
        },
        {
          headers: {
            Authorization: getToken,
          },
        },
      )
      .then(response => {
        dispatch({type: 'reload', data: response.data.data});
        // dispatch({...state, isReload: !state.isReload});
        navigation.navigate('ExamScreen');

        Toast.show({
          type: 'success',
          text1: 'Tạo thành công',
          visibilityTime: 2000,
          autoHide: true,
        });
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

  const handleShuffeQuestion = () => {
    var dataNew = _.shuffle(dataExam);

    var dataQues = dataNew.map(e => {
      var corect = e.answer[+e.correct - 1];
      e.answer = _.shuffle(e.answer);

      e.correct = e.answer.indexOf(corect) + 1;
      return e;
    });

    setDataExam(dataQues);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center'}}
        onPress={() => navigation.goBack()}>
        <Image source={goBackHeader} resizeMode="contain" />
        <Text style={{fontSize: 16, fontWeight: '600'}}>ĐỀ TRẮC NGHIỆM</Text>
      </TouchableOpacity>
      <ScrollView>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              paddingVertical: 10,
            }}>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.txt}>{data.department}</Text>
              <Text style={styles.txt}>{data.school}</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.txt}>{data.examName}</Text>
              <Text style={styles.txt}>{'MÔN HỌC: ' + data.subjectName}</Text>
              <Text style={styles.txt}> {'MÃ ĐỀ:' + data.code}</Text>
            </View>
          </View>

          {dataExam.map((e, index) => {
            return (
              <>
                <View
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 5,
                  }}>
                  <View>
                    <RenderHtml
                      baseFontStyle={{fontSize: 13, fontWeight: '600'}}
                      source={{html: e.questionName}}
                      enableExperimentalMarginCollapsing={true}
                    />
                  </View>

                  <View style={{paddingLeft: 10, paddingVertical: 5}}>
                    <RenderHtml
                      baseFontStyle={{fontSize: 12}}
                      source={{html: e.answer[0]}}
                      enableExperimentalMarginCollapsing={true}
                    />
                  </View>
                  <View style={{paddingLeft: 10, paddingVertical: 5}}>
                    <RenderHtml
                      baseFontStyle={{fontSize: 12}}
                      source={{html: e.answer[1]}}
                      enableExperimentalMarginCollapsing={true}
                    />
                  </View>
                  <View style={{paddingLeft: 10, paddingVertical: 5}}>
                    <RenderHtml
                      baseFontStyle={{fontSize: 12}}
                      source={{html: e.answer[2]}}
                      enableExperimentalMarginCollapsing={true}
                    />
                  </View>
                  <View style={{paddingLeft: 10, paddingVertical: 5}}>
                    <RenderHtml
                      baseFontStyle={{fontSize: 12}}
                      source={{html: e.answer[3]}}
                      enableExperimentalMarginCollapsing={true}
                    />
                  </View>
                </View>
              </>
            );
          })}
        </View>
      </ScrollView>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity
          onPress={e => {
            handleShuffeQuestion();
          }}
          style={styles.btn}>
          <Text
            style={{
              color: 'white',
              fontSize: 14,
              fontWeight: '600',
              textAlign: 'center',
            }}>
            TRỘN
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          onPress={e => {
            onAddQuestion();
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 14,
              fontWeight: '600',
              textAlign: 'center',
            }}>
            LƯU
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ContentQuestionScreen;

const styles = ScaledSheet.create({
  container: {
    paddingVertical: '15@ms',
    paddingHorizontal: '15@ms',
  },
  btn: {
    backgroundColor: '#FF7F2D',
    borderRadius: '8@ms',
    width: '125@ms',
    marginVertical: '5@ms',
    height: '42@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    fontSize: '14@ms',
    fontWeight: '600',
  },
});
