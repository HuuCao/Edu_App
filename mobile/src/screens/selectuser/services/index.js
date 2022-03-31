import React, {useRef} from 'react';

import {
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Image,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

//image
import imglogin from '../../../assets/image/edu_mobile/login.png';
import goBackHeader from '../../../assets/image/home/goBackHeader.png';
import momo from '../../../assets/image/service/momo.png';
import zalopay from '../../../assets/image/service/zalopay.png';
import credit from '../../../assets/image/service/credit.png';
import atm from '../../../assets/image/service/atm.png';

const Service = ({navigation}) => {
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
                Chọn phương thức thanh toán
              </Text>
            </View>
            <View style={styles.hr}></View>
            <View style={styles.viewServices}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Dashboard')}
                style={styles.button}>
                <Image source={momo} resizeMode="contain" />
                <Text style={styles.labelButton}>MoMo e-wallet</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.hr}></View>
            <View style={styles.viewServices}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Dashboard')}
                style={styles.button}>
                <Image source={zalopay} resizeMode="contain" />
                <Text style={styles.labelButton}>ZaloPay e-wallet</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.hr}></View>
            <View style={styles.viewServices}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Dashboard')}
                style={styles.button}>
                <Image source={credit} resizeMode="contain" />
                <Text style={styles.labelButton}>Credit hoặc Debit card</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.hr}></View>
            <View style={styles.viewServices}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Dashboard')}
                style={styles.button}>
                <Image source={atm} resizeMode="contain" />
                <Text style={styles.labelButton}>ATM card</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.hr}></View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default Service;

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
  viewServices: {
    marginTop: '15@ms',
    paddingHorizontal: '20@ms',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelButton: {
    color: 'white',
    marginLeft: '8@ms',
    fontSize: '15@ms',
    fontWeight: '500',
  },
  hr: {
    marginTop: '30@ms',
    height: 1,
    alignSelf: 'center',
    width: '94%',
    backgroundColor: '#DDDDDD',
  },
});
