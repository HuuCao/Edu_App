import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {THEME_COLOR} from '../../utils/themes';

const Profile = ({navigation}) => {
  const button = [
    {
      key: 1,
      label: 'Lớp 12',
      onPress: () => {},
    },
    {
      key: 2,
      label: 'Lịch Sử Kiểm Tra',
      onPress: () => {},
    },
    {
      key: 3,
      label: 'Đăng Xuất',
      onPress: () => navigation.navigate('LoginScreen'),
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.body}>
          <Image
            style={styles.avata}
            source={{
              uri: 'https://reactnative.dev/img/tiny_logo.png',
            }}
          />
          <Text style={styles.labelName}>Nguyễn Văn A</Text>
          {button.map(item => {
            return (
              <TouchableOpacity
                onPress={item.onPress}
                key={item.key}
                style={[styles.button]}>
                <Text style={styles.labelButton}>{item.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
  },
  avata: {
    width: '80@ms',
    height: '80@ms',
    borderRadius: '40@ms',
    alignSelf: 'center',
    marginTop: '5%',
  },
  labelName: {
    alignSelf: 'center',
    fontSize: '16@ms',
    fontWeight: '600',
    marginVertical: '5%',
  },
  button: {
    width: '100%',
    height: '50@ms',
    backgroundColor: 'orange',
    marginTop: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelButton: {
    fontSize: '16@ms',
    color: 'white',
  },
  active: {
    backgroundColor: THEME_COLOR,
  },
});
