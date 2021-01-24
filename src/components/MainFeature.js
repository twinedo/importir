import React from 'react';
import {Dimensions, StyleSheet, Image, View} from 'react-native';
import {TextSemiBold} from '../styles/TextStyles';

const MainFeature = ({sourceImage, textMenu}) => {
  const {width} = Dimensions.get('screen');
  return (
    <View style={styles.viewSubSection1}>
      <Image
        resizeMode="cover"
        style={styles.imgSection1(width)}
        source={sourceImage}
      />
      <TextSemiBold>{textMenu}</TextSemiBold>
    </View>
  );
};

export default MainFeature;

const styles = StyleSheet.create({
  viewSubSection1: {flex: 1, alignItems: 'center'},
  imgSection1: (width) => ({width: width / 6, height: width / 6}),
});
