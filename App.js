import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <div>
      <View style={styles.container}>
        <Text>Welcome to someones Native Project</Text>
        <StatusBar style="auto" />
      </View>
        <View style={styles.newContainer}>
          <button>Click here to Record</button>
      </View>
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  newContainer: {
    flex: 1,
    alignItems: 'center',
   justifyContent: 'center',
  }

});
