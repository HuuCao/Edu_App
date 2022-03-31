import React, {useState, useEffect, useRef} from 'react';
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
import RenderHtml from 'react-native-render-html';
import goBackHeader from '../../../../assets/image/home/backblack.png';
import _ from 'lodash';

const PracticeScreen = ({navigation, route}) => {
  const {data} = route.params;
  const {width} = useWindowDimensions();
  const [dataQuestion, setDataQuestion] = useState([]);
  const [number, setNumberCorrect] = useState(0);
  const [numberchoose, setNumberChoosed] = useState(0);
  const checkbox1Refs = useRef([]);
  const checkbox2Refs = useRef([]);
  const checkbox3Refs = useRef([]);
  const checkbox4Refs = useRef([]);

  const fetchQuestion = () => {
    setDataQuestion(data.lstQuestion);
    for (var i = 0; i < data.lstQuestion.length; i++) {
      data.lstQuestion[i].check = -1;
    }
  };
  const handleSetCheck = (value, index) => {
    var dataNew = Object.assign([], dataQuestion);
    dataNew[index].check = value;

    console.log(dataNew);
    setDataQuestion(dataNew);
  };

  // useEffect(() => {
  //   console.log(dataQuestion.length);
  //   if (data.lstQuestion.length != 0) {
  //     if (numberchoose == data.lstQuestion.length)
  //       navigation.navigate('ResultPracticeScreen', {
  //         number: number,
  //         answerLength: data.lstQuestion.length,
  //         data: data.lstQuestion,
  //       });
  //   }
  // }, [numberchoose]);
  useEffect(() => {
    fetchQuestion();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center', paddingTop: 10}}
        onPress={() => navigation.goBack()}>
        <Image source={goBackHeader} resizeMode="contain" />
        <Text style={{fontSize: 20, fontWeight: '600'}}>
          {'Bộ câu hỏi mới'}
        </Text>
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
            navigation.navigate('ResultPracticeScreen', {
              number: number,
              answerLength: data.lstQuestion.length,
              data: data.lstQuestion,
              // category:
            })
          }
          style={{
            backgroundColor: '#FF7F2D',
            alignItems: 'center',
            paddingVertical: 7,
            borderRadius: 6,
            width: '40%',
          }}>
          <Text style={{color: 'white', fontSize: 18}}>Nộp Bài</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={styles.container}>
          <View style={{marginTop: 10}}>
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
                      paddingBottom: 5,
                      paddingHorizontal: 15,
                      width: '96%',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        marginRight: 5,
                        fontSize: 13,
                      }}>
                      {'Câu hỏi:'}
                    </Text>
                    <RenderHtml
                      contentWidth={width}
                      source={{html: e.questionName}}
                      enableExperimentalMarginCollapsing={true}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={e => {
                      checkbox1Refs.current[index]?.onPress(e);
                    }}
                    style={styles.btnRadio}>
                    <BouncyCheckbox
                      ref={el => (checkbox1Refs.current[index] = el)}
                      status={'checked'}
                      onPress={() => {
                        handleSetCheck('0', index);
                        setNumberCorrect(
                          e.check + '' == e.correct - 1
                            ? number + 1
                            : number + 0,
                        );
                      }}
                    />
                    <RenderHtml
                      contentWidth={width}
                      source={{html: e.answer[0]}}
                      enableExperimentalMarginCollapsing={true}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={e => {
                      checkbox2Refs.current[index]?.onPress(e);
                    }}
                    style={styles.btnRadio}>
                    <BouncyCheckbox
                      ref={el => (checkbox2Refs.current[index] = el)}
                      disabled={_background + '' != 'white' ? true : false}
                      status={e.check + '' === '1' ? 'checked' : 'unchecked'}
                      onPress={() => {
                        handleSetCheck('1', index);
                        setNumberCorrect(
                          e.check + '' == e.correct - 1
                            ? number + 1
                            : number + 0,
                        );
                      }}
                    />

                    <RenderHtml
                      contentWidth={width}
                      source={{html: e.answer[1]}}
                      enableExperimentalMarginCollapsing={true}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={e => {
                      checkbox3Refs.current[index]?.onPress(e);
                    }}
                    style={styles.btnRadio}>
                    <BouncyCheckbox
                      ref={el => (checkbox3Refs.current[index] = el)}
                      disabled={_background + '' != 'white' ? true : false}
                      status={e.check + '' === '2' ? 'checked' : 'unchecked'}
                      onPress={() => {
                        handleSetCheck('2', index);
                        setNumberCorrect(
                          e.check + '' == e.correct - 1
                            ? number + 1
                            : number + 0,
                        );
                      }}
                    />
                    <RenderHtml
                      contentWidth={width}
                      source={{html: e.answer[2]}}
                      enableExperimentalMarginCollapsing={true}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={e => {
                      checkbox4Refs.current[index]?.onPress(e);
                    }}
                    style={styles.btnRadio}>
                    <BouncyCheckbox
                      ref={el => (checkbox4Refs.current[index] = el)}
                      disabled={_background + '' != 'white' ? true : false}
                      status={e.check + '' == '3' ? 'checked' : 'unchecked'}
                      onPress={() => {
                        handleSetCheck('3', index);
                        setNumberCorrect(
                          e.check + '' == e.correct - 1
                            ? number + 1
                            : number + 0,
                        );
                      }}
                    />
                    <RenderHtml
                      contentWidth={width}
                      source={{html: e.answer[3]}}
                      enableExperimentalMarginCollapsing={true}
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PracticeScreen;

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: '15@ms',
    // paddingVertical: '15@ms',
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
  btnRadio: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '88%',
    // height: '40@ms',
    paddingHorizontal: '10@ms',
    paddingVertical: '7@ms',
  },
  btnCheck: {
    marginTop: '10@ms',
    height: '90@ms',
    width: '98%',
    backgroundColor: '#FFFFFF',
    borderRadius: '10@ms',
    alignSelf: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
  },
});
