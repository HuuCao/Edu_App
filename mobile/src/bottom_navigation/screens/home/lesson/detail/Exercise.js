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
  useWindowDimensions,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import goBackHeader from '../../../../../assets/image/home/backblack.png';
import RenderHtml from 'react-native-render-html';
import _ from 'lodash';

const Exercise = ({navigation, route}) => {
  const {data} = route.params;
  console.log('Exercise123321', data);
  const {width} = useWindowDimensions();
  const [dataQuestion, setDataQuestion] = useState([]);
  console.log('dataQuestion', dataQuestion);
  const [number, setNumberCorrect] = useState(0);
  const [numberchoose, setNumberChoosed] = useState(0);

  const fetchQuestion = () => {
    setDataQuestion(data.lstQuestion);
    for (var i = 0; i < data.lstQuestion.length; i++) {
      data.lstQuestion[i].check = -1;
    }
  };

  const handleSetCheck = (value, index) => {
    setNumberChoosed(numberchoose + 1);
    var dataNew = Object.assign([], dataQuestion);
    dataNew[index].check = value;
    setDataQuestion(dataNew);
  };

  useEffect(() => {
    console.log(dataQuestion.length);
    if (data.lstQuestion.length != 0) {
      if (numberchoose == data.lstQuestion.length)
        navigation.navigate('ResultExercise', {
          number: number,
          answerLength: data.lstQuestion.length,
          data: data.lstQuestion,
        });
    }
  }, [numberchoose]);

  useEffect(() => {
    fetchQuestion();
  }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center', paddingTop: 10}}
        onPress={() => navigation.goBack()}>
        <Image source={goBackHeader} resizeMode="contain" />
        <Text style={{fontSize: 18, fontWeight: '600'}}>{data.lessonName}</Text>
      </TouchableOpacity>
      <View
        style={{
          justifyContent: 'flex-end',
          paddingHorizontal: 17,
          flexDirection: 'row',
          paddingVertical: 10,
          alignItems: 'center',
        }}>
        {/* <Text style={{fontSize: 20}}>
          {number + '/' + data.lstQuestion.length}
        </Text> */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ResultExercise', {
              number: number,
              answerLength: data.lstQuestion.length,
              data: data.lstQuestion,
            })
          }
          style={{
            backgroundColor: '#FF7F2D',
            alignItems: 'center',
            paddingVertical: 7,
            borderRadius: 6,
            width: '40%',
          }}>
          <Text style={{color: 'white', fontSize: 18}}>Xem kết quả</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.container}>
          {dataQuestion.map((e, index) => {
            var _background = 'white';
            if (e.check != -1 && e.check + '' != e.correct - 1) {
              _background = '#fff';
            }

            if (e.check + '' == e.correct - 1) {
              _background = '#fff';
            }

            return (
              <View
                style={[styles.viewQuestion, {backgroundColor: _background}]}>
                <View
                  style={{
                    paddingHorizontal: 10,
                    width: '96%',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}>
                  <Text
                    style={{
                      fontWeight: '500',
                      fontSize: 15,
                    }}>
                    {'Câu hỏi: '}
                  </Text>
                  <RenderHtml
                    contentWidth={width}
                    baseFontStyle={{fontSize: 15}}
                    source={{html: e.questionName}}
                    enableExperimentalMarginCollapsing={true}
                  />
                </View>
                <View style={styles.btnRadio}>
                  <BouncyCheckbox
                    disabled={_background + '' != 'white' ? true : false}
                    status={e.check + '' == '0' ? 'checked' : 'unchecked'}
                    onPress={() => {
                      handleSetCheck('0', index);
                      setNumberCorrect(
                        e.check + '' == e.correct - 1 ? number + 1 : number + 0,
                      );
                    }}
                  />
                  <RenderHtml
                    contentWidth={width}
                    source={{html: e.answer[0]}}
                    enableExperimentalMarginCollapsing={true}
                  />
                </View>

                <View style={styles.btnRadio}>
                  <BouncyCheckbox
                    disabled={_background + '' != 'white' ? true : false}
                    status={e.check + '' == '1' ? 'checked' : 'unchecked'}
                    onPress={() => {
                      handleSetCheck('1', index);
                      setNumberCorrect(
                        e.check + '' == e.correct - 1 ? number + 1 : number + 0,
                      );
                    }}
                  />

                  <RenderHtml
                    contentWidth={width}
                    source={{html: e.answer[1]}}
                    enableExperimentalMarginCollapsing={true}
                  />
                </View>

                <View style={styles.btnRadio}>
                  <BouncyCheckbox
                    disabled={_background + '' != 'white' ? true : false}
                    status={e.check + '' == '2' ? 'checked' : 'unchecked'}
                    onPress={() => {
                      handleSetCheck('2', index);
                      setNumberCorrect(
                        e.check + '' == e.correct - 1 ? number + 1 : number + 0,
                      );
                    }}
                  />
                  <RenderHtml
                    contentWidth={width}
                    source={{html: e.answer[2]}}
                    enableExperimentalMarginCollapsing={true}
                  />
                </View>
                <View style={styles.btnRadio}>
                  <BouncyCheckbox
                    disabled={_background + '' != 'white' ? true : false}
                    status={e.check + '' == '3' ? 'checked' : 'unchecked'}
                    onPress={() => {
                      handleSetCheck('3', index);
                      setNumberCorrect(
                        e.check + '' == e.correct - 1 ? number + 1 : number + 0,
                      );
                    }}
                  />
                  <RenderHtml
                    contentWidth={width}
                    source={{html: e.answer[3]}}
                    enableExperimentalMarginCollapsing={true}
                  />
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Exercise;

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: '10@ms',
  },
  btnRadio: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '88%',
    // height: '40@ms',
    paddingHorizontal: '10@ms',
    paddingVertical: '10@ms',
  },
  viewQuestion: {
    marginTop: '10@ms',
    width: '98%',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: '5@ms',
    borderRadius: '10@ms',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
});
