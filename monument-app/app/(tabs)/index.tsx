import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, View, StatusBar, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      <View style={styles.webviewWrapper}>
        <WebView 
          source={{ uri: 'https://vyshu02-monuments-identification.hf.space/' }}
          style={styles.webview}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          scalesPageToFit={true}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  webviewWrapper: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
