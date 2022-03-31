import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import goBackHeader from '../../../../assets/image/home/backblack.png';
import Pdf from 'react-native-pdf';

const BlogDetailScreen = ({route, navigation}) => {
  const {data} = route.params;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={20}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            marginTop: 10,
          }}
          onPress={() => navigation.goBack()}>
          <Image source={goBackHeader} resizeMode="contain" />
          <Text style={{fontSize: 25, fontWeight: '600'}}>{'Tin Tức'}</Text>
        </TouchableOpacity>
        <ScrollView>
          <View style={styles.viewContainer}>
            <View style={styles.title}>
              <Text style={{fontSize: 25}}>{data.title}</Text>
            </View>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingVertical: 10,
              }}>
              <Text style={{}}>Ngày tạo: {data.createAt}</Text>
              <Text style={{}}>Tác giả: {data.author}</Text>
            </View>
            <View>
              <Image
                source={{uri: data.image}}
                resizeMode="contain"
                style={styles.imageStyle}
              />
            </View>
            <View style={styles.viewPDF}>
              <Pdf
                scale={1}
                source={{uri: data.description}}
                style={styles.pdf}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default BlogDetailScreen;
const styles = ScaledSheet.create({
  viewContainer: {
    paddingHorizontal: '20@ms',
    marginVertical: '10@ms',
  },
  title: {
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  imageStyle: {
    width: '330@ms',
    alignSelf: 'center',
    height: '200@ms',
    borderRadius: '20@ms',
  },
  viewPDF: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // marginTop: 25,
  },
  pdf: {
    flex: 1,
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
    width: '500@ms',
    height: '580@ms',
  },
});
