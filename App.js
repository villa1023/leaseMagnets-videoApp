import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect, Component } from "react";
import { Button, 
  StyleSheet, 
  Text, 
  View,
  ScrollView, 
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Dimensions,
  Image, 
  Platform
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Camera } from "expo-camera";
import { Video } from "expo-av";
import Details from './Details';
import Edit from './Edit';
import VideoPlayer from 'expo-video-player'
import * as ScreenOrientation from 'expo-screen-orientation';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
//import { VideoEditorModal } from "react-native-videoeditorsdk";

const WINDOW_HEIGHT = Dimensions.get("window").height;
const closeButtonSize = Math.floor(WINDOW_HEIGHT * 0.032);
const captureSize = Math.floor(WINDOW_HEIGHT * 0.09);


function HomeScreen({ navigation}) {
  const [videos, setVideos] = React.useState([
    {
    "name": "Welcome to Your Apt",
    'url' : 'https://storage.googleapis.com/leasemagnets-cloud-storage/sample-intro.mp4',
    "id": "c1r342c2",
    },
    {
    "name": "2 Bedroom",
    'url' : 'https://storage.googleapis.com/leasemagnets-cloud-storage/2bedroom-sample.mp4',
    "id": "c1r342d2",
    },
 
    {
      "name": "Awesome Pool",
      'url' : 'https://storage.googleapis.com/leasemagnets-cloud-storage/sample-intro.mp4',
      "id": "c1r342e2",
      },
 
])
 
 
  const [video, setVideo] = React.useState({
    "name": "Welcome to Your Apt",
    'url' : 'https://storage.googleapis.com/leasemagnets-cloud-storage/sample-intro.mp4',
    "id": "c1r342c2",
  })
 
  const [search, setSearch] = React.useState("")
 
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
       const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
       if (status !== 'granted') {
         alert('Sorry, we need camera roll permissions to make this work!');
       }
     }
   })();
 }, []);
 const pickVideo = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
 
  console.log(result);
 
  if (!result.cancelled) {
    setVideo({ ...video, "url": result.uri });
  }
};
  return (
    /*<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome to Oscar and Khaled's Video Editing App</Text>
      <Button 
      title="Record or Take a Picture"
      onPress={()=> navigation.navigate('Details')}
      />
      <Button
      title="Edit Your Videos"
      onPress={()=> navigation.navigate('Edit')}
      />
    </View>*/
<SafeAreaView>
    <ScrollView style={styles.WebViewContainer}>
      <TextInput value={search} 
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={(text)=> {
              setSearch(text)
            }} 
            placeholder="Search for floor plan or amenity"
            />
      <Text style={{ color: "#fff" }}>Hi Everyone 212</Text>
 
        {videos.filter((video) => {
          return video.name.toLowerCase().includes(search.toLowerCase());
        }).map((video, idx) => {
          return (
            <>
            <View style={styles.buttonTitle}>
              <Button title={video.name} onPress={() => {
                setVideo(video)
              }} />
            </View>
            </>
          )
        }) }
 
 
            <TextInput value={video.name} 
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={(title)=> {
              setVideo({...video, "name": title })
            }} 
            defaultValue="New Video"
            />
            <VideoPlayer
              videoProps={{
                shouldPlay: false,
                resizeMode: Video.RESIZE_MODE_CONTAIN,
                source: {
                  uri: `${video.url}`,
                },
 
              }}
              // switchToLandscape={async () => 
              //   await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT)
              // }
              // switchToPortrait={async () => 
              //   await ScreenOrientation.unlockAsync()
              // }
              inFullscreen={false}
              height={300}
            />
 
            <Button title="Pick an video from camera roll" onPress={pickVideo} />
            <Button title="Create new video"  onPress={()=> navigation.navigate('Details')} />
 
      <StatusBar style="auto" />
 
    </ScrollView>
    </SafeAreaView>
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

        <Stack.Screen name="Edit" component={Edit} options={{title: 'Edit your videos', headerStyle: {
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
  WebViewContainer: {
    marginTop: (Platform.OS == 'android') ? 20 : 0,
  },
  buttonTitle: {
    width: 100,
    height: 100,
    backgroundColor: "#000",
  }
});