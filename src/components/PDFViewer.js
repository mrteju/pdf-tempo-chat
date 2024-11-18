import React from 'react';
import {View} from 'react-native';
import WebView from 'react-native-webview';
import {MOZILLA_PDF_JS} from '../utils/constance';

const PdfViewer = props => {
  const {url} = props;
  const fileUri = MOZILLA_PDF_JS + url;

  return (
    <View style={{flex: 1}}>
      <WebView
        source={{
          uri: fileUri,
        }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        thirdPartyCookiesEnabled={true}
        originWhitelist={['*']}
        style={{flex: 1}}
        onError={e => console.log('WebView error:', e.nativeEvent)}
        onHttpError={e => console.log('HTTP error:', e.nativeEvent)}
        startInLoadingState={true}
      />
    </View>
  );
};

export default PdfViewer;
