import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../utils/colorUtils';
import {useNavigation} from '@react-navigation/native';

const IntroScreen = () => {
  const {navigate} = useNavigation();
  const handleContinue = () => {
    navigate('PDFInputScreen');
  };
  return (
    <View style={styles.parentView}>
      <Text style={styles.heading}>Welcome to PDF Viewer</Text>
      <Text style={styles.authorName}>Author: Tejas Rangani</Text>
      <TouchableOpacity onPress={handleContinue} style={styles.continueBtn}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: '600',
    color: COLORS.purple,
  },
  authorName: {
    fontSize: 16,
    textAlign: 'right',
    marginTop: 10,
  },
  continueBtn: {
    backgroundColor: COLORS.purple,
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
  },
  continueText: {
    color: COLORS.white,
    fontSize: 16,
    textAlign: 'center',
  },
});
