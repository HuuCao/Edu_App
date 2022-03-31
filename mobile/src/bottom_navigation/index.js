import React from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// Các màn hình này nằm trong folder screens.
import ExamScreen from './screens/exam/index';
import HomeScreen from './screens/home/index';
import PointScreen from './screens/point';
import CommentScreen from './screens/comment';
import ChatScreen from './screens/bottom_center';

import {THEME_COLOR} from '../utils/themes';
import {ScaledSheet} from 'react-native-size-matters';

const icHome = require('../assets/image/home/icHome.png');
const icDoc = require('../assets/image/home/icDoc.png');
const icTest = require('../assets/image/home/icTest.png');

const Tab = createBottomTabNavigator();
const CustomTabBar = ({children, onPress}) => (
  <TouchableOpacity
    style={{
      top: -17,
      justifyContent: 'center',
      alignItems: 'center',
      ...styles.shadow,
    }}
    onPress={onPress}>
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#6F5FCD',
      }}>
      {children}
    </View>
  </TouchableOpacity>
);

function BottomTabNavigation({route, navigation}) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerTitleAlign: 'center',
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: '',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center'}}>
              <Image
                source={icHome}
                resizeMode={'contain'}
                style={{
                  height: 25,
                  width: 25,
                  tintColor: focused ? '#6F5FCD' : '#A4A4A4',
                }}
              />
              <Text
                style={{color: focused ? '#6F5FCD' : '#A4A4A4', fontSize: 12}}>
                Trang chủ
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="ExamScreen"
        component={ExamScreen}
        options={{
          tabBarLabel: '',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center'}}>
              <Image
                source={icTest}
                resizeMode={'contain'}
                style={{
                  height: 25,
                  width: 25,
                  tintColor: focused ? '#6F5FCD' : '#A4A4A4',
                }}
              />
              <Text
                style={{color: focused ? '#6F5FCD' : '#A4A4A4', fontSize: 12}}>
                Đề thi
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          tabBarLabel: '',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/image/icons/bank.png')}
              resizeMode={'contain'}
              style={{
                height: 25,
                width: 25,
                tintColor: '#fff',
              }}
            />
          ),
          tabBarButton: props => <CustomTabBar {...props} />,
        }}
      />

      <Tab.Screen
        name="PointScreen"
        component={PointScreen}
        options={{
          tabBarLabel: '',
          headerTitle: 'Điểm',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center'}}>
              <Image
                source={icDoc}
                resizeMode={'contain'}
                style={{
                  height: 25,
                  width: 25,
                  tintColor: focused ? '#6F5FCD' : '#A4A4A4',
                }}
              />
              <Text
                style={{color: focused ? '#6F5FCD' : '#A4A4A4', fontSize: 12}}>
                Điểm
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="CommentScreen"
        component={CommentScreen}
        options={{
          tabBarLabel: '',
          headerTitle: 'Thảo luận',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../assets/image/icons/chat.png')}
                resizeMode={'contain'}
                style={{
                  height: 25,
                  width: 25,
                  tintColor: focused ? '#6F5FCD' : '#A4A4A4',
                }}
              />
              <Text
                style={{color: focused ? '#6F5FCD' : '#A4A4A4', fontSize: 12}}>
                Thảo luận
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = ScaledSheet.create({
  tab: {
    position: 'absolute',
    bottom: '25@ms',
    left: '20@ms',
    right: '20@ms',
    height: '90@ms',
    backgroundColor: 'red',
  },
});

export default BottomTabNavigation;
