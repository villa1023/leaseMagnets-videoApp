import React, { Component, useState, useRef, useEffect } from  "react";
import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
  } from "react-native";

  class EditScreen extends React.Component {
    render() {
      return (
        <View style={styles.container}>
          <Text>Welcome to the Editing Page!</Text>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  export default EditScreen;
    
