import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';

import {ScaledSheet} from 'react-native-size-matters';

//image
import bglogin from '../../../assets/image/edu_mobile/bgEdu.jpg';

const PaySuccess = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={bglogin} style={styles.image}>
        <KeyboardAvoidingView
          style={{flex: 1, height: '90%'}}
          keyboardVerticalOffset={60}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Text style={styles.txtSuccess}>THANH TOÁN THÀNH CÔNG</Text>
          <View>
            <Text style={styles.txtinfo}>
              Bạn vui lòng đợi xét duyệt thanh toán trong vòng 24 giờ. Xin cảm
              ơn
            </Text>
            <TouchableOpacity
              style={styles.btnSignInSuccsess}
              onPress={e => {
                navigation.navigate('LoginScreen');
              }}>
              <Text style={styles.txtSignIn}>TRUY CẬP ỨNG DỤNG</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default PaySuccess;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  txtinfo: {
    fontSize: '17@ms',
    textAlign: 'center',
    color: 'white',
    paddingHorizontal: '25@ms',
    paddingVertical: '50@ms',
    fontWeight: '500',
  },
  txtSuccess: {
    marginTop: '30%',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: '22@ms',
    color: '#FFFFFF',
  },
  txtSignIn: {
    fontSize: '20@ms',
    color: 'white',
    textAlign: 'center',
  },
  btnSignInSuccsess: {
    marginTop: '10@ms',
    width: '60%',
    height: '40@ms',
    borderColor: '#FF7F2D',
    backgroundColor: '#FF7F2D',
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
  },
});
