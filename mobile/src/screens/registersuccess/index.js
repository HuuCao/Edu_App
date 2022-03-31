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

const RegisterSuccessScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={bglogin} style={styles.image}>
        <KeyboardAvoidingView
          style={{flex: 1, height: '90%'}}
          keyboardVerticalOffset={60}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Text style={styles.txtLogin}>ĐĂNG KÝ TÀI KHOẢN THÀNH CÔNG</Text>
          <View style={styles.viewImg}>
            <Image source={logoSuccess} style={styles.viewLogoSuccess} />
            <TouchableOpacity
              style={styles.btnRegisterSuccsess}
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

export default RegisterSuccessScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  viewImg: {
    marginBottom: '20%',
  },
  viewLogoSuccess: {
    alignSelf: 'center',
    width: '67%',
    height: '60%',
    alignItems: 'center',
  },
  txtLogin: {
    marginTop: '20%',
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
  btnRegisterSuccsess: {
    marginTop: '10@ms',
    width: '50%',
    height: '40@ms',
    borderColor: '#FF7F2D',
    backgroundColor: '#FF7F2D',
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
  },
});
