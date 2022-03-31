import React from 'react';
import {
  Text,
  ScrollView,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
import {ScaledSheet} from 'react-native-size-matters';
import goBackHeader from '../../../assets/image/home/backblack.png';
const Notify = ({navigation}) => {
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
              with: 10,
              height: 30,
              marginTop: 4,
              marginLeft: -8,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
  const list = [
    {
      name: 'Chưa có thông báo',
      // avatar_url:
      //   'https://reactnativeelements.com/img/avatar/avatar--photo.jpg',
      // subtitle: '1 phút trước',
    },
    // {
    //   name: 'Thầy Trần Dần đang phát online “ Điện trường"',
    //   avatar_url:
    //     'https://reactnativeelements.com/img/avatar/avatar--photo.jpg',
    //   subtitle: '1 phút trước',
    // },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.viewContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {renderHeader()}
            <Text
              style={{
                marginLeft: 10,
                fontSize: 20,
                fontWeight: '500',
              }}>
              Thông báo
            </Text>
          </View>
        </View>

        <View style={{marginTop: 20}}>
          {list.map((l, i) => (
            <ListItem key={i}>
              <Avatar rounded source={{uri: l.avatar_url}} />
              <ListItem.Content>
                <ListItem.Title
                  style={{fontWeight: '500', fontSize: 12, lineHeight: 23}}>
                  {l.name}
                </ListItem.Title>
                <ListItem.Subtitle style={{fontSize: 10}}>
                  {l.subtitle}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notify;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  viewContainer: {
    paddingHorizontal: '15@ms',
  },
});
