import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Toast from 'react-native-toast-message';
import RenderHtml from 'react-native-render-html';
import RNPickerSelect from 'react-native-picker-select';
import searchbx from '../../../../assets/image/home/search.png';
//api
import axios from 'axios';
import Backend from '../../../../apis/backend';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BankQuestion = ({navigation, route}) => {
  var {data} = route.params;
  const {width} = useWindowDimensions();
  const [isSearch, setIsSearch] = useState();
  const [subjectName, setSubjectName] = useState([]);

  const [itemClass, setItemClass] = useState(null);
  const [dataClass, setDataClass] = useState([]);

  const [question, setQuestion] = useState([]);
  const [questID, setQuestID] = useState([]);

  const onCheckbox = (isCheck, state, value) => {
    if (isCheck) {
      return [...state, value];
    } else {
      let tmp = [...state];
      tmp.splice(tmp.indexOf(value), 1);
      return tmp;
    }
  };

  //add lisQuestion
  const onAddQuestion = async () => {
    if (questID.length == data.amount) {
      const getToken = await AsyncStorage.getItem('token');
      axios
        .post(
          Backend.exam + 'addquestion?examID=' + data.examID,
          {lstQuestion: questID},
          {
            headers: {
              Authorization: getToken,
            },
          },
        )
        .then(response => {
          navigation.navigate('ContentQuestionScreen', {
            data: response.data.data,
          });
          Toast.show({
            type: 'success',
            text1: 'Tạo câu hỏi thành công',
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
    } else {
      Toast.show({
        type: 'error',
        text1: 'Chưa đủ số câu quy định',
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  };

  // Tìm kiếm
  const onSearch = async () => {
    const getToken = await AsyncStorage.getItem('token');
    var query = '';

    // defaul = null
    if (isSearch != null) {
      query += 'keyword=' + isSearch;
    }

    console.log(Backend.api + 'question?' + query);

    axios
      .get(Backend.api + 'question?' + query, {
        headers: {
          Authorization: getToken,
        },
      })
      .then(response => {
        console.log(response.data.data);
        setQuestion(response.data.data);
      })
      .catch(e => {
        Toast.show({
          type: 'error',
          text1: 'Lỗi hệ thống, thử lại sau!',
          visibilityTime: 2000,
          autoHide: true,
        });
      });
  };

  const fetchQuestion = async () => {
    const getToken = await AsyncStorage.getItem('token');
    axios
      .get(Backend.api + 'question', {
        headers: {
          Authorization: getToken,
        },
      })
      .then(response => {
        setQuestion(response.data.data);
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
  useEffect(() => {
    fetchQuestion();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 10,
          paddingHorizontal: 20,
        }}>
        <Text style={{fontSize: 20, fontWeight: 'bold', paddingVertical: 10}}>
          Ngân hàng câu hỏi
        </Text>
        <Text>
          Số câu: {questID.length}/ {data.amount}
        </Text>
      </View>
      <View style={{alignItems: 'center', paddingVertical: 10}}>
        <View style={styles.viewBxSearch}>
          <TextInput
            placeholder={'Tìm kiếm câu hỏi'}
            style={styles.input}
            placeholderTextColor="#6F5FCD"
            autoCapitalize="none"
            onChangeText={text => {
              setIsSearch(text);
            }}
            value={isSearch}
          />
          <TouchableOpacity
            onPress={e => {
              onSearch();
            }}>
            <Image
              source={searchbx}
              resizeMode={'contain'}
              style={styles.iconTextInput}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        <View style={styles.viewContainer}>
          {question.map((item, index) => (
            <View
              style={{
                paddingVertical: 10,
                flexDirection: 'row',
                alignItems: 'center',
                width: '90%',
              }}>
              <BouncyCheckbox
                style={styles.btnCheckbox}
                size={20}
                fillColor="#6254B6"
                unfillColor="#FFFFFF"
                // isChecked={true}
                iconStyle={styles.btnIconCheckBox}
                onPress={isCheck =>
                  setQuestID(state =>
                    onCheckbox(isCheck, state, item.questionID),
                  )
                }
              />
              <RenderHtml
                contentWidth={width}
                source={{html: item.questionName}}
                enableExperimentalMarginCollapsing={true}
              />
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={{alignItems: 'center'}}>
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
            XÁC NHẬN
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BankQuestion;
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
  viewContainer: {
    paddingHorizontal: '20@ms',
    paddingVertical: '10@ms',
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
  btnCheckbox: {
    width: '27@ms',
  },
  selectClass: {
    color: '#FFFFFF',
    backgroundColor: '#6F5FCD',
    borderRadius: '5@ms',
    width: '150@ms',
  },
  viewBxSearch: {
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#6F5FCD',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: '5@ms',
    width: '95%',
    paddingHorizontal: '15@ms',
  },
  input: {
    color: '#6F5FCD',
    flex: 1,
    fontSize: '14@ms',
    height: '38@ms',
    width: '90%',
    fontFamily: 'Helvetica',
  },
});
