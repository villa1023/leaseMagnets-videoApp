import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Camera } from "expo-camera";
import { Video } from "expo-av";

//a definition of the height of the phone window
const WINDOW_HEIGHT = Dimensions.get("window").height;

const closeButtonSize = Math.floor(WINDOW_HEIGHT * 0.032);
const captureSize = Math.floor(WINDOW_HEIGHT * 0.09);

export default function App() {
  //const's that are used as booleans mainly
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isVideoRecording, setIsVideoRecording] = useState(false);
  const [videoSource, setVideoSource] = useState(null);
  //Allows us to use many useful functions
  const cameraRef = useRef();
  const [recording, processing]= useState(false);
  
  //This is the video recording snippet

  // This is the end of the video recording snippet
  useEffect(() => {
    (async () => {
      //checks if the app has permission to use the camera
      const { status } = await Camera.requestPermissionsAsync();
      //the const declared in the function App() shows that the app has permissions to use the camera
      setHasPermission(status === "granted");
    })();
  }, []);
  //checks if the camera is available for use in the return()
  const onCameraReady = () => {
    setIsCameraReady(true);
  };
  //takePicture is a function. When used it will take a picture 
  const takePicture = async () => {
    if (cameraRef.current) {
      //can alter camera image with options
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.uri;
      if (source) {
        //shows us preview
        await cameraRef.current.pausePreview();
        //tells the UI that this is now a preview
        setIsPreview(true);
        console.log("picture source", source);
      }
    }
  };
  //this is a function. If record video is called, it will record
  const recordVideo = async () => {
    //if we are able to use the camera right now
    if (cameraRef.current) {
      try {
        //Returns a Promise that resolves to an object containing video file uri property.
        const videoRecordPromise = cameraRef.current.recordAsync();
        if (videoRecordPromise) {
          //tells the ui it is recording now
          setIsVideoRecording(true);
          //tells the user it is recording i think
         <View style ={styles.recordingButton} />
          const data = await videoRecordPromise;
          const source = data.uri;
          if (source) {
            //tells the ui it is in preview mode
            setIsPreview(true);
            console.log("video source", source);
            setVideoSource(source);
          }
        }
      } catch (error) {
        console.warn(error);
      }
    }
  };
  // stops the recording if called
  const stopVideoRecording = () => {
    if (cameraRef.current) {
      //tell ui it is no longer recording
      setIsPreview(false);
      setIsVideoRecording(false);
      //stops recording
      cameraRef.current.stopRecording();
    }
  };

//***************************************/
//Toggles the camera from front to back
  const switchCamera = () => {
    if (isPreview) {
      return;
    }
    setCameraType((prevCameraType) =>
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };
  //If cancel preview is called it will exit the preview it was on and returns to current camera view
  const cancelPreview = async () => {
    await cameraRef.current.resumePreview();
    setIsPreview(false);
    setVideoSource(null);
  };
  //creates a button that when pressed calls the cancelpreview function
  const renderCancelPreviewButton = () => (
    //creates button. function is cancelpreview when pressed
    <TouchableOpacity onPress={cancelPreview} style={styles.closeButton}>
      <View style={[styles.closeCross, { transform: [{ rotate: "45deg" }] }]} />
      <View
        style={[styles.closeCross, { transform: [{ rotate: "-45deg" }] }]}
      />
    </TouchableOpacity>
  );
  //not sure
  const renderVideoPlayer = () => (
    <Video
      source={{ uri: videoSource }}
      shouldPlay={true}
      style={styles.media}
    />
  );
  //the recording text the user sees if they are currently recording
  const renderVideoRecordIndicator = () => (
    <View style={styles.recordIndicatorContainer}>
      <View style={styles.recordDot} />
      <Text style={styles.recordTitle}>{"Recording..."}</Text>
    </View>
  );
  //flips camera when button is pressed
  const renderCaptureControl = () => (
    <View style={styles.control}>
      <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
        {/* <Text style={styles.text}>{"Flip"}</Text> */}
        <Ionicons name={ Platform.OS === 'ios' ? "ios-reverse-camera" : 'md-reverse-camera'} size={40} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        disabled={!isCameraReady}
        onLongPress={recordVideo}
        onPressOut={stopVideoRecording}
        onPress={takePicture}
        style={styles.capture}
       // style={styles.captureBorder}
      />
    </View>
  );
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text style={styles.text}>No access to camera</Text>;
  }

  // async startRecording() {
  //   this.setState({ recording: true });
  //   // default to mp4 for android as codec is not set
  //   const { uri, codec = "mp4" } = await this.camera.recordAsync();
  //   this.setState({ recording: false, processing: true });
  //   const type = `video/${codec}`;
  
  //   const data = new FormData();
  //   data.append("video", {
  //     name: "mobile-video-upload",
  //     type,
  //     uri
  //   });
  
  //   try {
  //     await fetch(ENDPOINT, {
  //       method: "post",
  //       body: data
  //     });
  //   } catch (e) {
  //     console.error(e);
  //   }
  
  //   this.setState({ processing: false });
  // }

  //the app/ui runs through here
  return (
    //the camera
    <SafeAreaView style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.container}
        type={cameraType}
        flashMode={Camera.Constants.FlashMode.on}
        onCameraReady={onCameraReady}
        onMountError={(error) => {
          console.log("camera error", error);
        }}
      />
      <View style={styles.container}>
        {isVideoRecording && renderVideoRecordIndicator()}
        {videoSource && renderVideoPlayer()}
        {isPreview && renderCancelPreviewButton()}
        {!videoSource && !isPreview && renderCaptureControl()}
      </View>
    </SafeAreaView>
    /*<div>
      <View style={styles.container}>
        <Text>Welcome to someones Native Project</Text>
        <StatusBar style="auto" />
      </View>
      
        <View style={styles.ContainerOne}>
          <button>Click here to Record</button>
      </View>
      <View style={styles.ContainerTwo}>
          <button>Choose videos to merge</button>
      </View>
    </div>*/
  );
}

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ContainerOne: {
    flex: 1,
    alignItems: 'center',
   justifyContent: 'center',
  },
  ContainerTwo: {
    flex: 1,
    alignItems: 'center',
   justifyContent: 'center',
  }*/

  
  const styles = StyleSheet.create({
    //******************************************************/
    //Styles the whole camera app??
    container: {
       ...StyleSheet.absoluteFillObject,
      // flex: 1,

    },
    //******************************************************/
    //Positions close button
    closeButton: {
      position: "absolute",
      top: 35,
      left: 15,
      height: closeButtonSize,
      width: closeButtonSize,
      borderRadius: Math.floor(closeButtonSize / 2),
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#c4c5c4",
      opacity: 0.7,
      zIndex: 2,
    },
    //******************************************************/
    //not too sure, but seems to display the recorded video
    media: {
      ...StyleSheet.absoluteFillObject,
    },
    //******************************************************/
    //Creates the x for the cancel button on top left corner
    closeCross: {
      width: "68%",
      height: 1,
      backgroundColor: "black",
    },
    //******************************************************/
    //Placement for recording and flip buttons
    control: {
      position: "absolute",
      flexDirection: "row",
      bottom: 38,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    //******************************************************/
    //Styling for the recording button
    capture: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
       backgroundColor: "#f5f6f5",
       borderRadius: 5,
       height: captureSize,
       width: captureSize,
       //borderWidth: 10,
       //borderRadius:25,
       borderRadius: Math.floor(captureSize / 2),
      //borderRadius:25,
       marginHorizontal: 31,
    },
     recordingButton: {
      justifyContent: 'space-evenly',
       backgroundColor: 'red',
       borderRadius: 5,
       height: captureSize,
       width: captureSize,
       //borderWidth: 10,
       //borderRadius:25,
       borderRadius: Math.floor(captureSize / 2),
      //borderRadius:25,
       marginHorizontal: 31,
     },
    //******************************************************/
    //Positions red dot when recording in progress
    recordIndicatorContainer: {
      flexDirection: "row",
      position: "absolute",
      top: 25,
      alignSelf: "center",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "transparent",
      opacity: 0.7,
    },
    //******************************************************/
    //Displays text saying "recording" when recording in progress
    recordTitle: {
      fontSize: 14,
      color: "#ffffff",
      textAlign: "center",
    },
    //***************************************************/
    //Shows a red dot when recording is enabled
    recordDot: {
      borderRadius: 3,
      height: 6,
      width: 6,
      backgroundColor: "#ff0000",
      marginHorizontal: 5,
    },
    //********************************************* */
    text: {
      color: "#fff",
    },
  
});
