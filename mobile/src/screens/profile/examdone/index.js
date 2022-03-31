import React from 'react';
import {
  Text,
  ScrollView,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {ListItem, LinearProgress} from 'react-native-elements';
import {ScaledSheet} from 'react-native-size-matters';
import goBackHeader from '../../../assets/image/home/backblack.png';
const ExamDone = ({navigation}) => {
  const DATA = [
    {
      id: 1,
      md: '8402',
      edu: 'Đề thi học kỳ THPT Thái Nguyên năm 2020 môn Toán',
      subtitle: 'Bộ GD&ĐT mã đề 123',
      question: '0/50',
    },
    {
      id: 2,
      md: '2134',
      edu: 'Đề thi học kỳ THPT Thái Nguyên năm 2020 môn Toán',
      subtitle: 'Bộ GD&ĐT mã đề 123',
      question: '0/50',
    },
    {
      id: 3,
      md: '5676',
      edu: 'Đề thi học kỳ THPT Thái Nguyên năm 2020 môn Toán',
      subtitle: 'Bộ GD&ĐT mã đề 123',
      question: '0/50',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.viewContainer}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => navigation.goBack()}>
            <Image source={goBackHeader} resizeMode="contain" />
            <Text style={{fontSize: 20, fontWeight: '600'}}>
              Bài thi đã làm
            </Text>
          </TouchableOpacity>
          <View>
            {DATA.map(item => {
              return (
                <View style={{alignItems: 'center'}}>
                  <View style={styles.itemExam}>
                    <Text
                      style={{
                        fontWeight: '400',
                        fontSize: 13,
                        color: '#1D2563',
                      }}>
                      MĐ:{item.md} | {item.edu}
                    </Text>
                    <Text
                      style={{
                        fontSize: 11,
                        color: 'rgba(0, 0, 0, 0.5)',
                      }}>
                      {item.subtitle}
                    </Text>
                    <Text style={{fontSize: 10, color: '#FF7F2D'}}>
                      {item.question}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                      }}>
                      <TouchableOpacity
                        onPress={item.onPress}
                        key={item.key}
                        style={{
                          backgroundColor: '#FF7F2D',
                          marginLeft: 10,
                          padding: 7,
                          paddingHorizontal: 15,
                          borderRadius: 9,
                        }}>
                        <Text style={{color: 'white'}}>Xem đề</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExamDone;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  viewContainer: {
    paddingHorizontal: '8@ms',
  },
  itemExam: {
    width: '90%',
    height: '120@ms',
    justifyContent: 'space-around',
    paddingHorizontal: '12@ms',
    paddingVertical: '10@ms',
    borderRadius: '10@ms',
    backgroundColor: '#FFFFFF',
    marginVertical: '10@ms',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 6,
  },
});
