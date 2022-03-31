import React, {useState} from 'react';
import {
  Text,
  Image,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import ProgressCircle from 'react-native-progress-circle';
import RenderHtml from 'react-native-render-html';
import goBackHeader from '../../../../../assets/image/home/backblack.png';

const ResultExercise = ({navigation, route}) => {
  var lisQues = route.params;

  var num = route.params.number;
  var total = route.params.answerLength;

  const {width} = useWindowDimensions();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center', paddingTop: 10}}
        onPress={() => navigation.goBack()}>
        <Image source={goBackHeader} resizeMode="contain" />
        <Text style={{fontSize: 18, fontWeight: '600'}}>
          {'Hoàn thành bài'}
        </Text>
      </TouchableOpacity>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.viewResult}>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  color: '#1D2563',
                  fontSize: 15,
                  fontWeight: '600',
                  marginVertical: 10,
                }}>
                KẾT QUẢ BÀI LUYỆN TẬP
              </Text>
              <ProgressCircle
                percent={100}
                radius={60}
                borderWidth={10}
                color="#FF7F2D"
                shadowColor="#fff"
                bgColor="#1D2563">
                <View style={{padding: 5, alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: 'white',
                      fontWeight: '600',
                      paddingBottom: 10,
                    }}>
                    {((num * 10) / total).toFixed(1)}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: 'white',
                      fontWeight: '600',
                    }}>
                    {'Điểm'}
                  </Text>
                </View>
              </ProgressCircle>
            </View>
          </View>
          <View style={styles.viewPracticeResult}>
            <View style={{alignItems: 'center'}}>
              <Text>Số câu đúng</Text>
              <Text>
                <Text style={{color: '#2CAB21'}}>{num}</Text>
                {'/' + total}
              </Text>
            </View>
            <View style={{borderRightWidth: 0.5, height: '78%'}} />
            <View style={{alignItems: 'center'}}>
              <Text>Số câu sai</Text>
              <Text>
                <Text style={{color: '#AB2121'}}>{total - num}</Text>
                {' Câu sai'}
              </Text>
            </View>
          </View>
        </View>
        <View>
          {lisQues.data.map((e, index) => {
            return (
              <View style={styles.viewItem}>
                <View>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '500',
                      padding: 3,
                    }}>
                    Câu
                    {index + 1 + ': '}
                  </Text>
                  <RenderHtml
                    contentWidth={width}
                    source={{html: e.questionName}}
                    enableExperimentalMarginCollapsing={true}
                  />
                </View>

                <View>
                  <Text style={{fontSize: 17, textAlign: 'center'}}>
                    Đáp án:
                  </Text>
                  <RenderHtml
                    contentWidth={width}
                    source={{html: e.answer[parseInt(e.correct) - 1]}}
                    enableExperimentalMarginCollapsing={true}
                  />
                </View>
              </View>
            );
          })}
        </View>

        <View style={{alignItems: 'center', paddingVertical: 20}}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('DetailLesson', {
                data: lisQues,
              })
            }
            style={{
              backgroundColor: '#FF7F2D',
              width: '40%',
              paddingVertical: 10,
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <Text style={{color: 'white', fontSize: 16}}>{'Quay về'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResultExercise;

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: '15@ms',
    paddingVertical: '15@ms',
  },
  viewResult: {
    justifyContent: 'center',
    height: '240@ms',
    width: '98%',
    borderRadius: '10@ms',
    alignSelf: 'center',
    paddingVertical: '5@ms',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
  },
  viewPracticeResult: {
    marginTop: '10@ms',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '45@ms',
    flexDirection: 'row',
    height: '90@ms',
    width: '98%',
    borderRadius: '10@ms',
    alignSelf: 'center',
    paddingVertical: '5@ms',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
  },
  viewItem: {
    // height: '90@ms',
    paddingHorizontal: '20@ms',
    flexDirection: 'column',
    width: '100%',
    paddingVertical: '10@ms',
    borderBottomWidth: 1,
  },
});
