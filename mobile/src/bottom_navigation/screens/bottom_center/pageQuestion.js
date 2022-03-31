import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
  useWindowDimensions,
  TextInput,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import RenderHtml from 'react-native-render-html';
import goBackHeader from '../../../assets/image/home/backblack.png';

const PageQuestion = ({navigation, route}) => {
  const {data} = route.params;
  const {width} = useWindowDimensions();

  return (
    <SafeAreaView>
      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center'}}
        onPress={e => navigation.goBack()}>
        <Image source={goBackHeader} resizeMode="contain" />
        <Text style={{fontSize: 16, fontWeight: '600'}}>Chi tiết câu hỏi</Text>
      </TouchableOpacity>

      <ScrollView>
        <View style={styles.viewContainer}>
          <View>
            <RenderHtml
              baseFontStyle={{fontSize: 20}}
              contentWidth={width}
              source={{html: data.questionName}}
              enableExperimentalMarginCollapsing={true}
            />

            <View>
              <RenderHtml
                baseFontStyle={{fontSize: 18}}
                contentWidth={width}
                source={{html: data.answer[0]}}
                enableExperimentalMarginCollapsing={true}
              />
            </View>
            <View style={{marginTop: 20}}>
              <RenderHtml
                baseFontStyle={{fontSize: 18}}
                contentWidth={width}
                source={{html: data.answer[1]}}
                enableExperimentalMarginCollapsing={true}
              />
            </View>
            <View style={{marginTop: 20}}>
              <RenderHtml
                baseFontStyle={{fontSize: 18}}
                contentWidth={width}
                source={{html: data.answer[2]}}
                enableExperimentalMarginCollapsing={true}
              />
            </View>
            <View style={{marginTop: 20}}>
              <RenderHtml
                baseFontStyle={{fontSize: 18}}
                contentWidth={width}
                source={{html: data.answer[3]}}
                enableExperimentalMarginCollapsing={true}
              />
            </View>
            <View
              style={{
                marginTop: 40,
              }}>
              <Text style={{fontSize: 20, marginBottom: 10}}>{'Đáp án :'}</Text>
              <RenderHtml
                baseFontStyle={{
                  fontSize: 18,
                  color: 'green',
                }}
                contentWidth={width}
                source={{html: data.answer[parseInt(data.correct)]}}
                enableExperimentalMarginCollapsing={true}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PageQuestion;

const styles = ScaledSheet.create({
  viewContainer: {
    flex: 1,
    paddingHorizontal: '20@ms',
  },
});
