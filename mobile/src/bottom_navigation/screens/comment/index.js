import React, {useState, useEffect,useRef} from 'react';
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
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Toast from 'react-native-toast-message';
import {ListItem, Avatar} from 'react-native-elements';
// import {FontAwesomeIcon} from 'fortawesome/react-native-fontawesome';

import send from '../../../assets/image/icons/paper.svg';
//api
import axios from 'axios';
import Backend from '../../../apis/backend';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CommentScreen = ({route, navigation}) => {
  const [feedBack, setFeedback] = useState([]);
  const [content, setContent] = useState();

  //get Feedback
  const fetchFeedback = async () => {
    const getToken = await AsyncStorage.getItem('token');
    axios
      .get(Backend.feedback + 'getallfeedback', {
        headers: {
          Authorization: getToken,
        },
      })
      .then(response => {
        setFeedback(response.data.data);
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

  const scrollRef = useRef(null);

  const onSend = async () => {
    if (content !== '') {
      const getToken = await AsyncStorage.getItem('token');
      axios
        .post(
          Backend.feedback + 'createfeeback',
          {
            content: content,
          },
          {
            headers: {
              Authorization: getToken,
            },
          },
        )
        .then(response => {
          fetchFeedback();
          setContent('');
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
    } else {
      fetchFeedback();
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <KeyboardAvoidingView
        style={{flex: 1, height: '90%'}}
        keyboardVerticalOffset={60}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView>
          <View style={styles.container}>
            <Text 
            style={{fontSize: 20, fontWeight: '600'}}>Thảo luận</Text>

            <View style={[styles.viewChat]}>
              <ScrollView
              ref={scrollRef}
              >
                <View
                  style={{
                    // flex: 1,
                    flexDirection: 'column',
                    paddingBottom:90
                    // height: 450,
                  }}>
                  {feedBack.map((item, index) => (
                    <ListItem>
                      <Avatar
                        size="small"
                        activeOpacity={0.7}
                        rounded
                        source={{uri: item.avatar}}
                      />
                      <ListItem.Content>
                        <Text style={{fontSize: 10, color: '#848484'}}>
                          {item.fullname}
                        </Text>
                        <View style={styles.cmt}>
                          <Text style={{color: '#848484'}}>{item.content}</Text>
                        </View>
                      </ListItem.Content>
                    </ListItem>
                  ))}
                </View>
              </ScrollView>
            </View>
            <View style={styles.viewInput}>
              <TextInput
                keyboardType="twitter"
                style={styles.input}
                placeholder="Nội dung ....."
                placeholderTextColor="#9098B1"
                autoCapitalize="none"
                value={content}
                onChangeText={text => setContent(text)}
              />
              <TouchableOpacity
                onPress={e => {
                  onSend();
                  if(scrollRef != undefined)
                  {
                    scrollRef.current.scrollToEnd({animated: true})
                  }
                }}
                style={{width: 45, alignItems: 'center'}}>
                <Text style={{color: '#81BEF7'}}>Gửi</Text>
                {/* <Image source={send} /> */}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CommentScreen;

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: '15@ms',
    paddingVertical: '15@ms',
    paddingBottom: '30@ms',
    alignItems: 'center',
  },
  viewChat: {
    padding: '10@ms',
    marginTop: '10@ms',
    width: '100%',
    height: '400@ms',
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
  viewInput: {
    // marginTop: '5@ms',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: '10@ms',
    width: '100%',
    height: '48@ms',
    marginVertical: '8@ms',
    marginBottom: '15@ms',
    paddingHorizontal: '15@ms',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    flex: 1,
    width: '80%',
    height: '39@ms',
    borderRightWidth: '0.5@ms',
    paddingRight: '10@ms',
    fontSize: '14@ms',
    color: '#000000',
    fontFamily: 'Helvetica',
  },
  cmt: {
    marginTop: '5@ms',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: '10@ms',
    width: '100%',
    padding: '10@ms',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
