import React, {useEffect} from 'react';
import {View, ActivityIndicator, ImageBackground, Image} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

//image
import bgLoading from '../../assets/image/edu_mobile/bgEdu.jpg';
import logoEdu from '../../assets/image/edu_mobile/logoEdu.png';

const LoadingScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('LoginScreen');
      // navigation.replace('Dashboard');
      // onCheckLogin();
    }, 1000);
  }, []);
  const onCheckLogin = async function () {
    const getUserName = await AsyncStorage.getItem('username');
    const getPassword = await AsyncStorage.getItem('password');
    if (getUserName !== '' && getPassword !== '') {
      axios
        .post(Backend.host + 'login', {
          mail: getUserName,
          password: getPassword,
        })
        .then(response => {
          response.data.accessToken !== undefined
            ? navigation.replace('BottomNavigation')
            : navigation.replace('SaverScreen');
          AddToken(response.data.accessToken);
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      navigation.replace('LoginScreen');
    }
  };

  const AddToken = async value => {
    try {
      await AsyncStorage.setItem('token', value);
    } catch (e) {}
  };
  return (
    <ImageBackground source={bgLoading} style={styles.backgruond}>
      <View style={[styles.container, styles.horizontal]}>
        <Image source={logoEdu} resizeMode={'contain'} style={styles.imgLogo} />
        <ActivityIndicator size="large" color="#FF7F2D" />
      </View>
    </ImageBackground>
  );
};

export default LoadingScreen;

const styles = ScaledSheet.create({
  backgruond: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgLogo: {
    width: '30%',
    height: '20%',
  },
});
