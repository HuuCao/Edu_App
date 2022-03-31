import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  ScrollView,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {WebView} from 'react-native-webview';
import Pdf from 'react-native-pdf';
import goBackHeader from '../../../../../assets/image/home/backblack.png';
import time from '../../../../../assets/image/home/time.png';
import playVideo from '../../../../../assets/image/subjects/videoPlay.png';

//api
import axios from 'axios';
import Backend from '../../../../../apis/backend';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailLesson = ({navigation, route}) => {
  const {data} = route.params;

  const [statusBtn, setStatusBtn] = useState(1);
  const [showVideo, setShowVideo] = useState(false);

  const [dataLesson, setDataLesson] = useState([]);
  console.log('============.,.,.,3222==============');
  console.log(dataLesson);
  console.log('====================================');
  //get lesson by chapter
  // const fetchLesson = async chapterID => {
  //   const getToken = await AsyncStorage.getItem('token');
  //   console.log(Backend.api + 'lesson?chapterID=' + chapterID);
  //   axios
  //     .get(Backend.api + 'lesson?chapterID=' + chapterID, {
  //       headers: {
  //         Authorization: getToken,
  //       },
  //     })
  //     .then(response => {
  //       setDataLesson(response.data.data);
  //       // var listLesson = [];
  //       // console.log('fetchChapter', response.data.data.lstLesson);
  //       // response.data.data.lstLesson.map(e => {
  //       //   listLesson.push({lessonName});
  //       // });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  useEffect(() => {
    // setItem(data);
    setDataLesson(data);
  }, [data]);

  const sourcepdf = {
    uri: 'https://viesoftware.s3.ap-southeast-1.amazonaws.com/1625148260048_viesoftware_0.pdf',
    cache: true,
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center'}}
        onPress={() => navigation.goBack()}>
        <Image source={goBackHeader} resizeMode="contain" />
        <Text style={{fontSize: 14, fontWeight: '600', width: '90%'}}>
          {dataLesson != undefined ? dataLesson.lessonName : ''}
        </Text>
      </TouchableOpacity>
      <ScrollView>
        <View style={styles.container}>
          <View style={{marginVertical: 10}}>
            <View style={[styles.viewTab]}>
              <TouchableOpacity
                style={[
                  styles.btnTab,
                  {
                    backgroundColor: statusBtn === 1 ? '#6254B6' : '#E5E5E5',
                  },
                ]}
                onPress={e => {
                  setStatusBtn(1);
                }}>
                <Text style={{color: statusBtn === 1 ? 'white' : 'black'}}>
                  Lý thuyết
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.btnTab,
                  {
                    backgroundColor: statusBtn === 1 ? '#E5E5E5' : '#6254B6',
                  },
                ]}
                onPress={e => {
                  setStatusBtn(2);
                }}>
                <Text style={{color: statusBtn === 1 ? 'black' : 'white'}}>
                  Luyện tập
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {statusBtn === 1 && (
            <View>
              <View>
                <Text style={{fontSize: 16}}>Video bài giảng</Text>
                <TouchableOpacity
                  onPress={e => {
                    setShowVideo(true);
                  }}
                  style={{
                    alignItems: 'center',
                    with: '100%',
                    marginTop: 10,
                  }}>
                  <Image source={playVideo} resizeMode="contain" />
                </TouchableOpacity>
                <View>
                  {showVideo && (
                    <WebView
                      onLoadStart={e => {
                        <ActivityIndicator size="large" color="#FF7F2D" />;
                      }}
                      onLoadEnd={e => {}}
                      source={{
                        uri:
                          dataLesson.linkVideo != undefined
                            ? dataLesson.linkVideo
                            : 'https://www.youtube.com/watch?v=jLajG1Bw33M',
                      }}
                      onMessage={event => {}}
                    />
                  )}
                </View>
              </View>
              <View>
                <Text>. Tóm tắt lý thuyết</Text>
                <View style={styles.viewPDF}>
                  <Pdf
                    scale={1}
                    source={
                      dataLesson != undefined
                        ? {uri: dataLesson.linkPdf}
                        : {
                            uri: 'https://storage.googleapis.com/viesoftware0710/1625486593171_viesoftware0710_0.pdf',
                          }
                    }
                    style={styles.pdf}
                  />
                </View>
              </View>
              <View style={styles.viewStart}>
                <Text style={{fontSize: 18, fontWeight: '600'}}>
                  Kết thúc phần lý thuyết
                </Text>
                <Text style={{textAlign: 'center', marginVertical: 3}}>
                  Các em nên làm bài tập tự luyện để nắm chắc kiến thức
                </Text>
                <TouchableOpacity
                  onPress={() => setStatusBtn(2)}
                  style={{
                    marginTop: 26,
                    backgroundColor: '#FF7F2D',
                    paddingVertical: 10,
                    paddingHorizontal: 30,
                    borderRadius: 10,
                  }}>
                  <Text style={{color: 'white'}}>Bắt đầu luyện tập</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {statusBtn === 2 && (
            <View style={({marginVertical: 20}, [styles.viewLearn])}>
              <Text
                style={{textAlign: 'center', fontSize: 18, fontWeight: '600'}}>
                Bắt đầu luyện tập
              </Text>
              <Text style={{textAlign: 'center', marginVertical: 3}}>
                Luyện tập để nắm chắc kiến thức đã học
              </Text>
              {/* <View
                style={{
                  marginTop: 26,
                  backgroundColor: '#C4C4C4',
                  paddingVertical: 10,
                  paddingHorizontal: 30,
                  borderRadius: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={time}
                  resizeMode="cover"
                  style={{width: 20, height: 20}}
                />
                <Text style={{fontSize: 19, marginLeft: 10}}>
                  {dataLesson.lstQuestion.length + ' câu hỏi'}
                </Text>
              </View> */}
              <TouchableOpacity
                onPress={e =>
                  navigation.navigate('Exercise', {
                    data: dataLesson,
                  })
                }
                style={{
                  marginTop: 26,
                  backgroundColor: '#FF7F2D',
                  paddingVertical: 10,
                  paddingHorizontal: 30,
                  borderRadius: 10,
                }}>
                <Text
                  style={{color: 'white', textAlign: 'center', fontSize: 19}}>
                  Bắt đầu luyện tập
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailLesson;

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: '15@ms',
  },
  viewTab: {
    flexDirection: 'row',
    height: '40@ms',
    backgroundColor: '#E5E5E5',
    borderRadius: '10@ms',
  },
  btnTab: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10@ms',
    width: '50%',
  },
  viewStart: {
    paddingHorizontal: '50@ms',
    borderRadius: '10@ms',
    backgroundColor: '#E5E5E5',
    height: '150@ms',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewPDF: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
    width: '400@ms',
    height: '550@ms',
  },
});
