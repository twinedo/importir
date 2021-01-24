import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {PURPLE, WHITE} from '../styles/Colors';

const {height} = Dimensions.get('screen');
const MainBackground = () => {
  return (
    <View style={styles.container}>
      <View style={styles.background} />
    </View>
  );
};

export default MainBackground;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: WHITE},
  background: {
    backgroundColor: PURPLE,
    height: height / 4.5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});
