import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {ListItem, Avatar} from 'react-native-elements';
import Toast from 'react-native-toast-message';

//api
import axios from 'axios';
import Backend from '../../../apis/backend';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TabContributors = () => {
  const [contribute, setContribute] = useState([]);

  const fetchContribute = async () => {
    const getToken = await AsyncStorage.getItem('token');
    axios
      .get(Backend.api + 'contribute' + '/' + 'getallcontribute', {
        headers: {
          Authorization: getToken,
        },
      })
      .then(response => {
        console.log(response.data.data);
        setContribute(response.data.data);
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
    fetchContribute();
  }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>
        <View style={styles.viewContainer}>
          {contribute.map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                paddingTop: 20,
                paddingHorizontal: 10,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Avatar
                  size="medium"
                  activeOpacity={0.7}
                  rounded
                  source={{uri: item.idUser.avatar}}
                />
                <View style={{width: '72%', paddingLeft: 10}}>
                  <Text>{item.idUser.fullname}</Text>
                  <Text style={{color: '#848484'}}>{item.content}</Text>
                </View>
              </View>

              <View style={{}}>
                <Text>{item.amount} Câu</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TabContributors;

const styles = ScaledSheet.create({
  viewContainer: {
    paddingVertical: '10@ms',
    paddingHorizontal: '10@ms',
    marginBottom: '30@ms',
  },
});
