import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {useNavigation} from '@react-navigation/native';
import AWS from 'aws-sdk';
import RNFS from 'react-native-fs';
import {Buffer} from 'buffer';
import {isValidPdfUrl} from '../utils/helper';
import {COLORS} from '../utils/colorUtils';
import {ACCESS_KEY, BUCKET_NAME, SECRET_KEY} from '../utils/constance';

// Add you env keys here
const s3 = new AWS.S3({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY,
});

// Polyfill Buffer
global.Buffer = Buffer;

const PDFInputScreen = () => {
  const [textUrl, setTextUrl] = useState('');
  const [pdfUri, setPdfUri] = useState(null);
  const [loading, setLoading] = useState(false);
  const {navigate} = useNavigation();

  const handleUrlText = () => {
    if (textUrl === '' && !pdfUri) {
      Alert.alert('PDF Error', 'Please select any one option!');
    }
    if (textUrl) {
      if (isValidPdfUrl(textUrl)) {
        navigate('PDF', {url: textUrl});
      } else {
        Alert.alert(
          'PDF URL Error',
          'Invalid URL or it does not end with .pdf. Eg format: https://pdf-domain.pdf',
        );
      }
    }
    if (pdfUri) {
      navigate('PDF', {url: pdfUri});
      setPdfUri(null);
    }
  };

  const uploadPDF = async () => {
    try {
      setLoading(true);
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
        copyTo: 'cachesDirectory',
      });

      const fileUri = res[0].uri;
      const fileName = res[0].name;

      const fileContent = await RNFS.readFile(fileUri, 'base64');
      const fileSize = res[0].size;

      const fileBuffer = Buffer.from(fileContent, 'base64');
      const params = {
        Bucket: BUCKET_NAME,
        Key: `uploads/${Date.now() + fileName}`,
        Body: fileBuffer,
        ContentType: 'application/pdf',
        ACL: 'public-read',
      };

      const options = {
        partSize: 10 * 1024 * 1024, // 10 MB chunks
        queueSize: 1, // Limit concurrency
      };

      // Upload the file to S3
      s3.upload(params, options)
        .on('httpUploadProgress', evt => {
          const progressVal = Math.round((evt.loaded / fileSize) * 100);
          console.log(`Upload Progress: ${progressVal}%`);
        })
        .send((err, data) => {
          if (err) {
            console.error('Upload error:', err);
            Alert.alert('Upload Failed', 'Failed to upload the PDF.');
            return;
          }
          setPdfUri(data?.Location);
          setLoading(false);
        });
    } catch (err) {
      setLoading(false);
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled the file picker');
      } else {
        console.error('Error uploading file:', err);
        Alert.alert('Upload Failed', 'Something went wrong');
      }
    }
  };

  return (
    <View style={styles.parentView}>
      <Text>Welcome to PDF Viewer</Text>
      <Text>Enter PDF Url:</Text>
      <TextInput style={styles.pdfInput} onChangeText={t => setTextUrl(t)} />
      <Text style={styles.noteText}>
        Note: url should contain .pdf extension
      </Text>
      <Text style={styles.OrText}>OR</Text>
      <TouchableOpacity style={styles.uploadBtn} onPress={uploadPDF}>
        {loading ? (
          <ActivityIndicator color={COLORS.white} />
        ) : (
          <Text style={styles.uploadText}>Upload PDF</Text>
        )}
      </TouchableOpacity>
      <View style={styles.divider} />
      <TouchableOpacity
        onPress={handleUrlText}
        disabled={loading}
        style={styles.uploadBtn}>
        <Text style={styles.uploadText}>Open PDF</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PDFInputScreen;

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    justifyContent: 'center',
  },
  pdfInput: {
    borderWidth: 0.5,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  noteText: {
    color: '#f00',
    fontSize: 12,
  },
  OrText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 20,
  },
  uploadBtn: {
    backgroundColor: '#6a0dad',
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
  },
  uploadText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  divider: {
    marginTop: 15,
    borderBottomWidth: 1,
  },
});
