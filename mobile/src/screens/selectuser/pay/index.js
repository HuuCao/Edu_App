import React from 'react';

import {
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

//image
import imglogin from '../../../assets/image/edu_mobile/bgEdu.jpg';
import goBackHeader from '../../../assets/image/home/goBackHeader.png';

const Pay = ({navigation}) => {
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
              with: 40,
              height: 15,
              marginTop: 4,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={imglogin} style={styles.image}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={20}>
          <View style={styles.viewContainer}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 25,
              }}>
              {renderHeader()}
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 20,
                  fontWeight: '500',
                  color: 'white',
                }}>
                Thanh toán
              </Text>
            </View>
            <View style={styles.viewPay}>
              <View style={styles.viewmoney}>
                <View style={styles.money}>
                  <Text
                    style={{fontSize: 22, fontWeight: '300', color: '#6254B6'}}>
                    Gói theo tháng
                  </Text>
                  <Text
                    style={{
                      fontSize: 27,
                      color: '#6254B6',
                      fontWeight: '500',
                      marginTop: 20,
                    }}>
                    100,000 VND
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate('PaySuccess')}
                style={styles.button}>
                <Text style={styles.labelButton}>THANH TOÁN</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default Pay;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    paddingTop: '20@ms',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },

  viewmoney: {
    paddingHorizontal: '20@ms',
    paddingVertical: '30@ms',
  },
  money: {
    paddingHorizontal: '20@ms',
    padding: '20@ms',
    borderRadius: '10@ms',
    backgroundColor: 'white',
  },
  button: {
    width: '60%',
    height: '49@ms',
    borderColor: '#FF7F2D',
    backgroundColor: '#FF7F2D',
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
  },
  labelButton: {
    fontSize: '20@ms',
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
  },
});
