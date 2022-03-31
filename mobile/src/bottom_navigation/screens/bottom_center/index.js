import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
  Modal,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TabQuestion from './tabQuestion';
import TabContributors from './tabContributors';
const Tab = createMaterialTopTabNavigator();
const ChatScreen = ({route, navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Tab.Navigator
        tabBarOptions={{
          labelStyle: {fontSize: 15},
          style: {backgroundColor: '#6F5FCD'},
        }}>
        <Tab.Screen
          name="TabQuestion"
          component={TabQuestion}
          options={{
            tabBarLabel: ({focused}) => (
              <Text style={{color: 'white', fontSize: 18}}>
                Ngân hàng câu hỏi
              </Text>
            ),
          }}
        />
        {/* <Tab.Screen
          name="TabContributors"
          component={TabContributors}
          options={{
            tabBarLabel: ({focused}) => (
              <Text style={{color: 'white', fontSize: 18}}>Người đóng góp</Text>
            ),
          }}
        /> */}
      </Tab.Navigator>
    </SafeAreaView>
  );
};
export default ChatScreen;
const styles = ScaledSheet.create({});
