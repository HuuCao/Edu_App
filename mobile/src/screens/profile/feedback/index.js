import React, {useState} from 'react';
import {
  Text,
  ScrollView,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import goBackHeader from '../../../assets/image/home/backblack.png';
const FeedBack = ({navigation}) => {
  const [value, onChangeText] = useState('');
  //go_back
  function renderHeader() {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{
            width: 20,
            justifyContent: 'center',
          }}
          onPress={() => navigation.goBack()}>
          <Image
            source={goBackHeader}
            resizeMode="contain"
            style={{
              with: 10,
              height: 30,
              marginTop: 4,
              marginLeft: -8,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.viewContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {renderHeader()}
            <Text
              style={{
                marginLeft: 10,
                fontSize: 20,
                fontWeight: '500',
              }}>
              Góp ý
            </Text>
          </View>
          <View style={{marginVertical: 20}}>
            <TextInput
              style={styles.input}
              maxLength={40}
              placeholderTextColor="#9098B1"
              autoCapitalize="none"
              placeholder="Viết góp ý"
              textAlignVertical="top"
              multiline
              // editable
              numberOfLines={4}
              onChangeText={text => onChangeText(text)}
              value={value}
            />

            <View style={{marginTop: 10}}>
              <TouchableOpacity style={styles.addPic}>
                <Text style={{color: 'white'}}>{'+ Thêm ảnh'}</Text>
              </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center', marginTop: 180}}>
              <TouchableOpacity style={styles.btnfeed}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 15,
                  }}>
                  GỬI GÓP Ý
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FeedBack;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  viewContainer: {
    paddingHorizontal: '15@ms',
  },
  input: {
    borderWidth: 1,
    borderColor: '1@ms solid rgba(0, 0, 0, 0.3)',
    borderRadius: '5@ms',
    height: '100@ms',
    padding: '10@ms',
  },
  addPic: {
    backgroundColor: '#11A73B',
    width: '30%',
    padding: '5@ms',
    alignItems: 'center',
    borderRadius: '7@ms',
  },
  btnfeed: {
    backgroundColor: '#FF7F2D',
    width: '200@ms',
    alignItems: 'center',
    paddingHorizontal: '60@ms',
    paddingVertical: '10@ms',
    borderRadius: '7@ms',
  },
});
