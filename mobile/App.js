import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Platform, FlatList} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {THEME_COLOR} from './src/utils/themes/index';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import SplashScreen from 'react-native-splash-screen';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://c3ad927a010f4c6f9fab590af657eeae@o880922.ingest.sentry.io/5869200',
});
<script src="https://fred-wang.github.io/mathml.css/mspace.js"></script>;
import RootStore from './src/persist/stores/RootStore';
import {Routers} from './src/routers/index';

import auth from '@react-native-firebase/auth';

//Hiện tại React native đang dùng thư viên Navigation là : Navigation V5
//Bộ thư viện này nếu muốn dùng phải cài tổng cộng khoản 5 cái thư viện nữa
//react-native-animatable
//react-native-gesture-handler
//react-native-vector-icons
//@react-navigation/stack
//@react-navigation/native
//@react-navigation/bottom-tabs

const Stack = createStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    // Cấu hình SplashScreen phải cấu hình trên Xcode và Android Studio ( cấu hình ở lõi)
    // Splash là màn hình load file hệ thống ( mình ko để trắng màn hình mà để 1 cái ảnh)
    // Sau khi load sau thì hide nó đi
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={RootStore}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            // Đối tượng này bao chứa các navigation ( các màn hình)
            // Ví dụ muốn định nghĩa các header của các màn hình giống nhau thì định nghĩa ở đây
            // thường thì mình sẽ code riêng header( hoặc đa số ko dùng header ) trên các màn hình
            screenOptions={{
              headerTitleAlign: 'center',
              headerTintColor: THEME_COLOR,
              animationEnabled: Platform.OS == 'android' ? false : true,
              // Cơ chế chuyển đổi giữa các màn hình trên IOS và Android khác nhau
              // Cơ chế của IOS kiểu lướt còn Android kiểu chớp nháy .
              // đoạn code dưới đây làm cho Android cũng lướt giống IOS
              gestureEnabled: true,
              gestureDirection: 'horizontal',
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}>
            {Routers.map(router => {
              return (
                // Có 3 loại Navigation chính
                // Navigation Screen
                // Navigation Tab ( Bottom and Top)
                // Navigation Drawer ( Menu )
                <Stack.Screen
                  key={router.key}
                  name={router.name}
                  component={router.component}
                  options={({navigation, route}) => ({
                    ...router.options,
                    headerBackTitleVisible: false,
                  })}></Stack.Screen>
              );
            })}
          </Stack.Navigator>
        </NavigationContainer>
        <Toast ref={ref => Toast.setRef(ref)} />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
