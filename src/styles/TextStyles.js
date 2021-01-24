import React from 'react';
import {StyleSheet, Text} from 'react-native';

const TextRegular = (props) => {
  return <Text {...props} style={[styles.textRegular, props.style]} />;
};

const TextSemiBold = (props) => {
  return <Text {...props} style={[styles.textSemiBold, props.style]} />;
};

const TextBold = (props) => {
  return <Text {...props} style={[styles.textBold, props.style]} />;
};

const TextExtraBold = (props) => {
  return <Text {...props} style={[styles.textExtraBold, props.style]} />;
};

const TextBoldItalic = (props) => {
  return <Text {...props} style={[styles.textBoldItalic, props.style]} />;
};

export {TextRegular, TextSemiBold, TextBold, TextExtraBold, TextBoldItalic};

const styles = StyleSheet.create({
  textRegular: {
    fontFamily: 'Montserrat-Regular',
  },
  textSemiBold: {
    fontFamily: 'Montserrat-SemiBold',
  },
  textBold: {
    fontFamily: 'Montserrat-Bold',
  },
  textExtraBold: {
    fontFamily: 'Montserrat-ExtraBold',
  },
  textBoldItalic: {
    fontFamily: 'Montserrat-BoldItalic',
  },
});
