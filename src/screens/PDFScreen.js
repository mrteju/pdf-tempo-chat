import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PdfViewer from '../components/PDFViewer';
import {COLORS} from '../utils/colorUtils';

const PdfPicker = () => {
  const {params} = useRoute();
  const {goBack} = useNavigation();

  return (
    <View style={{flex: 1}}>
      <Text style={styles.backBtn} onPress={() => goBack()}>
        Back
      </Text>
      <PdfViewer url={params?.url} />
    </View>
  );
};

export default PdfPicker;

const styles = StyleSheet.create({
  backBtn: {
    color: COLORS.purple,
    paddingVertical: 10,
    paddingHorizontal: 5,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
