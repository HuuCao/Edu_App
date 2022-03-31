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
import bglogin from '../../assets/image/edu_mobile/bgEdu.jpg';
import logoSuccess from '../../assets/image/edu_mobile/imgsuccess.png';

const ForgotPasswordSuccessScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={bglogin} style={styles.image}>
        <KeyboardAvoidingView
          style={{flex: 1, height: '90%'}}
          keyboardVerticalOffset={60}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Text style={styles.txtLogin}>ĐỔI MẬT KHẨU THÀNH CÔNG</Text>
          <View style={styles.viewImg}>
            <Image source={logoSuccess} style={styles.viewLogoSuccess} />
            <TouchableOpacity
              style={styles.btnForgotSuccsess}
              onPress={e => {
                navigation.navigate('LoginScreen');
              }}>
              <Text style={styles.txtSignIn}>ĐĂNG NHẬP</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ForgotPasswordSuccessScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  viewImg: {
    marginBottom: '20%',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  viewLogoSuccess: {
    alignSelf: 'center',
    width: '67%',
    height: '60%',
    alignItems: 'center',
  },
  txtLogin: {
    marginTop: '30%',
    marginBottom: '10%',
    textAlign: 'center',
    fontSize: '18@ms',
    color: '#FFFFFF',
  },
  txtSignIn: {
    fontSize: '20@ms',
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
  },
  btnForgotSuccsess: {
    marginTop: '10@ms',
    width: '50%',
    height: '49@ms',
    borderColor: '#FF7F2D',
    backgroundColor: '#FF7F2D',
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
  },
});
