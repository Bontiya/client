import React, { useState, useEffect } from 'react'
import { 
    View, 
    Text, 
    TextInput, 
    StyleSheet, 
    Dimensions, 
    StatusBar, 
    Picker, 
    Image,
    Animated
} from 'react-native'
import { TapGestureHandler } from 'react-native-gesture-handler'
import Google from '../assets/googleIcon.png'
import Password from '../assets/password.png'
import NameTag from '../assets/nametag.png'
import Email from '../assets/email.png'

const DEVICE_WIDTH = Dimensions.get('window').width
const DEVICE_HEIGHT = Dimensions.get('window').height

const loginReg = () => {

    const [ fadeAnim, setFadeAnim ] = useState(new Animated.Value(0))
    const [ form, setForm ] =  useState('signin')
    const [ input, setInput ] = useState({
        name: '',
        email: '',
        password: '',
        gender: ''
    })

    const switchFormHandler = (e,payload) => {
        setForm(payload)
    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    {
                        form === 'signin'
                            ? <Text style={styles.formTitle}>Sign In</Text>
                            : <Text style={styles.formTitle}>Sign Up</Text>
                    }
                </View>
                <View style={styles.formContainer}>
                    <View style={styles.switchFormContainer}>
                        <TapGestureHandler onHandlerStateChange={ e => switchFormHandler(e,'signin')}>
                            <View style={[styles.switchFormButton,
                                form === 'signin'
                                    ? { 
                                        backgroundColor: '#525C67',
                                        borderTopLeftRadius: 5,
                                        borderBottomLeftRadius: 5,
                                        borderRightWidth: 0.5
                                      }
                                    : { backgroundColor: '#fff',
                                        borderTopLeftRadius: 5,
                                        borderBottomLeftRadius: 5,
                                        borderRightWidth: 0.5
                                      }
                            ]}>
                                <Text style={[styles.switchFormText,
                                    form === 'signin'
                                        ? { color: '#fff' }
                                        : { color: '#525C67' }
                                ]} >Sign In</Text>
                            </View>
                        </TapGestureHandler>
                        <TapGestureHandler onHandlerStateChange={ e => switchFormHandler(e,'signup')}>
                            <View style={[styles.switchFormButton,
                                form === 'signin'
                                    ? { 
                                        backgroundColor: '#fff',
                                        borderTopRightRadius: 5,
                                        borderBottomRightRadius: 5,
                                        borderLeftWidth: 0.5
                                    }
                                    : { backgroundColor: '#525C67',
                                        borderTopRightRadius: 5,
                                        borderBottomRightRadius: 5,
                                        borderLeftWidth: 0.5
                                    }
                            ]}>
                                <Text style={[styles.switchFormText,
                                    form === 'signin'
                                    ? { color: '#525C67' }
                                    : { color: '#fff' }
                                ]} >Sign Up</Text>
                            </View>
                        </TapGestureHandler>
                    </View>
                    {
                        form == 'signin'
                        ? null
                        : <View style={styles.input}>
                            <Image source={NameTag} style={
                                [
                                    styles.inputImage,
                                    {
                                        width: 24,
                                        height: 25
                                    }
                                ]
                            } />
                            <TextInput 
                                style={styles.inputText} 
                                value={input.name} 
                                placeholder={"Input name"}
                            />
                          </View>  
                    }
                    <View style={styles.input}>
                        <Image source={Email} style={
                            [
                                styles.inputImage,
                                {
                                    width: 24,
                                    height: 25}
                                ]
                            } 
                        />
                        <TextInput 
                            style={styles.inputText} 
                            value={input.email} 
                            placeholder={"Input email"}
                        />
                    </View>
                    <View style={styles.input}>
                        <Image source={Password} style={styles.inputImage} />
                        <TextInput 
                            style={styles.inputText} 
                            value={input.password} 
                            placeholder={"Input password"}
                        />
                    </View>
                    {
                        form === 'signin'
                        ?   null
                        :   <Picker
                                selectedValue={input.gender}
                                style={styles.picker}
                                onValueChange={(itemValue, itemIndex) => setInput(input.gender=itemValue)
                            }>
                            <Picker.Item label="Male" value="male" />
                            <Picker.Item label="Female" value="female" />
                    </Picker>
                    }
                    <TapGestureHandler>
                        <View style={styles.submitButton}>
                            <Text style={{color: '#fff'}}>Submit</Text>
                        </View>
                    </TapGestureHandler>
                    {
                        form == 'signin'
                            ? <Text style={{
                                alignSelf: "center",
                                opacity:0.5,
                                marginVertical: 30
                            }}>
                                Or use
                            </Text>
                            : null
                    }
                    {
                        form == 'signin'
                        ? <Image source={Google} style={styles.image} /> 
                        : null
                    }
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight-25
    },
    formTitle: {
        marginBottom: 20,
        fontSize:32,
        fontWeight: 'bold',
        color: '#394652'
    },
    titleContainer: {
        height: 0.4 * DEVICE_HEIGHT,
        backgroundColor: '#F8F8F8',
        flex: 1,
        justifyContent:"flex-end",
        paddingHorizontal: 40
    },
    formContainer: {
        width: DEVICE_WIDTH,
        height: 0.6 * DEVICE_HEIGHT,
        paddingHorizontal:40,
        backgroundColor: '#fff',
    },
    switchFormContainer: {
        flexDirection: 'row',
        marginVertical: 15,
    },
    switchFormButton: {
        borderWidth:1,
        borderColor: '#D9DCDE',
        height:40,
        width: 165,
        textAlign: "center",
        justifyContent: "center",
    },
    switchFormText: {
        alignSelf: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: '#D9DCDE',
        marginVertical: 10,
        borderRadius: 5,
        flexDirection: "row"
    },
    submitButton: {
        flex: 0.22,
        marginTop: 15,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#4A80E3',
        borderRadius: 5,
        marginBottom:10,
        padding: 20
    },
    picker: {
        height: 50,
        width: 100, 
        alignSelf: "center", 
        color: 'rgba(0,0,0,0.3)',
        borderWidth:1,
        margin: 10
    },
    image: {
        width: 50,
        height: 50,
        alignSelf: "center",
        marginTop: 10,
        borderRadius: 5,
        borderWidth: 1,
        padding: 20,
        borderColor: '#D9DCDE'
    },
    inputImage: {
        alignSelf:"center",
        marginHorizontal:15
    },
    inputText: {
        width: 0.6 * DEVICE_WIDTH,
        borderLeftColor: '#D9DCDE',
        borderLeftWidth: 1,
        paddingHorizontal: 20
    }
})

export default loginReg