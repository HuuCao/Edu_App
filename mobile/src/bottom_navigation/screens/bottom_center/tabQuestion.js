import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
  useWindowDimensions,
  TextInput,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Toast from 'react-native-toast-message';
import RenderHtml from 'react-native-render-html';
import searchbx from '../../../assets/image/home/search.png';

//api
import axios from 'axios';
import Backend from '../../../apis/backend';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TabQuestion = ({navigation}) => {
  const [question, setQuestion] = useState([]);
  const {width} = useWindowDimensions();
  const [isSearch, setIsSearch] = useState();

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
          {question.map(item => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('PageQuestion', {
                    data: item,
                  })
                }
                style={styles.btn}>
                <RenderHtml
                  contentWidth={width}
                  source={{html: item.questionName}}
                  enableExperimentalMarginCollapsing={true}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TabQuestion;

const styles = ScaledSheet.create({
  viewContainer: {
    paddingHorizontal: '10@ms',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '50@ms',
  },
  txt: {
    paddingVertical: '5@ms',
    fontSize: '13@ms',
  },
  btn: {
    marginTop: '10@ms',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
    padding: '10@ms',
    backgroundColor: '#fff',
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
