import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect, Component } from "react";
import { Button, 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Camera } from "expo-camera";
import { Video } from "expo-av";
import Details from './Details';


const WINDOW_HEIGHT = Dimensions.get("window").height;
const closeButtonSize = Math.floor(WINDOW_HEIGHT * 0.032);
const captureSize = Math.floor(WINDOW_HEIGHT * 0.09);


function HomeScreen({ navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome to Oscar and Khaled's Video Editing App</Text>
      <Button 
      title="Record or Take a Picture"
      onPress={()=> navigation.navigate('Details')}
      />
    </View>
  );
}

// function DetailsScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Details Screen</Text>
//     </View>
//   );
// }

// function StackScreen() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{ title: 'My home' }}
//       />
//       <Stack.Screen
//         name="Profile"
//         component={ProfileScreen}
//         options={({ route }) => ({ title: route.params.name })}
//       />
//     </Stack.Navigator>
//   );
// }
const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{title: 'My Home',  headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }, }} 
        
        />
        
        <Stack.Screen name="Details" component={Details} options={{title: 'Snap a Picture or Record a Video', headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});