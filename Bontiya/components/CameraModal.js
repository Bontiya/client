import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { 
  View, 
  Text, 
  Button, 
  Modal, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView } from 'react-native'
import { Icon } from 'react-native-elements'
import { RNCamera } from 'react-native-camera'
import { googleVision } from '../store/actions/eventAction'
import { changeStatusKey } from '../store/actions/eventAction'
import { getEventDetail } from '../store/actions/eventAction'
import Loading from '../components/Loading'

function CameraModal({visible, setVisible, spell, member_id, setReadyToGo, eventId, updateMembers }) {
  const [backCam, setBackCam] = useState(true)
  const [showAnalyze, setShowAnalyze] = useState(false)
  const [photoUri, setPhotoUri] = useState('')
  const dispatch = useDispatch()
  const { gVisResult, isReady, eventDetail } = useSelector(state => state.event)

  useEffect(() => {
    if (gVisResult) {
      readyChecker()
    }
    if ((eventDetail._id === eventId) && visible) {
      updateMembers(eventDetail.members)
    }
  }, [gVisResult, eventDetail.members])
  
  async function takePicture(camera) {
    const options = { quality: 0.1, base64: true };
    const data = await camera.takePictureAsync(options);
    //  eslint-disable-next-line
    setPhotoUri(data.uri)
    dispatch(googleVision(data.base64))
    setShowAnalyze(true)
    setReadyToGo(true)
  };

  function readyChecker() {
    if (JSON.stringify(gVisResult).toLowerCase().includes(spell)) {
      dispatch(changeStatusKey(member_id))
        .then((a) => {
          console.log(a, '!!!!')
          updateMembers(eventDetail.members)
        })
    }
  }

  function renderCamera() {
    if (showAnalyze) {
      return (
        <>
        <View style={{padding: 20, height: '100%'}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 20}}>Analyzing Your Photo</Text>
          <View style={styles.analyze_img}>
            {
              photoUri
              ? <Image style={{width: '100%', height: '100%', borderRadius: 10}} source={{uri: photoUri}} />
              : <View></View>
            }
            
          </View>
          {
            isReady && gVisResult
            ? (
              <>
                <Icon 
                  name='check'
                  color='#4A80E3'
                  type='material-icons'
                  size={60}
                />
                <Text style={{alignSelf: 'center', fontSize: 15, fontWeight: 'bold'}}>You are ready</Text>
              </>
            )
            : gVisResult
              ? (
                <>
                  <Icon 
                    name='close'
                    color='red'
                    type='material-icons'
                    size={60}
                  />
                  <Text style={{alignSelf: 'center', fontSize: 15, fontWeight: 'bold'}}>Please take a picture of a {spell}</Text>
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => setShowAnalyze(false)}
                  >
                    <Text style={{color: '#fff'}}>Retake Photo</Text>
                  </TouchableOpacity>
                </>
              )
              : <Loading />
          }
          <TouchableOpacity 
            style={{position: 'absolute', bottom: 0, marginBottom: 10, alignSelf: 'center'}}
            onPress={() => {
              setShowAnalyze(false)
              setVisible(false)
            }}>
            <View style={styles.close}>
              <Icon 
                name='close'
                color='#4A80E3'
                type='material-icons'
                size={40}
              />
            </View>
          </TouchableOpacity>
        </View>
        </>
      )
    }
    return (
      <View>
        <Text style={{fontSize: 15, fontWeight: 'bold'}}>Please Take a Picture of a {spell} </Text>
        <RNCamera
          style={styles.preview}
          type={backCam ? RNCamera.Constants.Type.back : RNCamera.Constants.Type.front}
          flashMode={RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}        
        >
          {({ camera, status, recordAudioPermissionStatus }) => {
            if (status !== 'READY') return <Text></Text>;
            return (
              <View style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                justifyContent: 'space-between',
                flexDirection: 'row', 
                alignSelf: 'baseline',
                alignItems: 'baseline',
                paddingHorizontal: 20,
                marginBottom: 0 }}>
                <TouchableOpacity onPress={() => setBackCam(!backCam)}>
                  <View style={{width: 40, backgroundColor: 'white', alignSelf: 'center', borderRadius: 20}}>
                    <Icon 
                      name='refresh'
                      color='#4A80E3'
                      type='material-icons'
                      size={40}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => takePicture(camera)}>
                  <View style={{width: 80, backgroundColor: 'white', alignSelf: 'center', borderRadius: 40}}>
                    <Icon 
                      name='camera'
                      color='#4A80E3'
                      type='material-icons'
                      size={80}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setVisible(false)}>
                  <View style={{width: 40, backgroundColor: 'white', alignSelf: 'center', borderRadius: 20}}>
                    <Icon 
                      name='close'
                      color='#4A80E3'
                      type='material-icons'
                      size={40}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        </RNCamera>
        </View>
    )
  }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      >
      <View style={styles.camera}>
        {
          renderCamera()
        }
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  camera: {
    width: 350,
    height: 520,
    alignSelf: 'center',
    borderRadius: 10,
    elevation: 10,
    backgroundColor: 'white',
    marginBottom: 20,
    padding: 10,
    top: 10
  },
  preview: {
    width: '100%',
    height: 400,
    elevation: 10,
    position: 'absolute',
    top: 50,
    alignSelf: 'center'
  },
  close: {
    width: 40, 
    backgroundColor: 'white', 
    alignSelf: 'center', 
    borderRadius: 20,
    elevation: 5,
    bottom: 0
  },
  analyze_img: {
    width: 140, 
    height: 160, 
    alignSelf: 'center', 
    elevation: 5, 
    borderRadius: 2,
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#4A80E3',
    borderRadius: 5,
    marginBottom:10,
    padding: 15,
    marginTop: 20
  },
})

export default CameraModal