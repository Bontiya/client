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
    TouchableWithoutFeedback,
    AsyncStorage,
} from 'react-native'
import {  useDispatch, useSelector } from 'react-redux';
import { registerAction, loginAction, checkIsLogged } from '../store/actions/authAction';
import { ERRORS, ISLOGIN } from '../store/actionTypes';

import Google from '../assets/googleIcon.png'
import Password from '../assets/password.png'
import NameTag from '../assets/nametag.png'
import Email from '../assets/email.png'
import AlertError from '../components/AlertError';
import Logo from '../assets/logo-fix.png'


const DEVICE_WIDTH = Dimensions.get('window').width
const DEVICE_HEIGHT = Dimensions.get('window').height

const loginReg = () => {

    const disptach = useDispatch()
    const general = useSelector(state => state.general);

    const [ form, setForm ] =  useState('signin')
    const [ email, setEmail ] = useState('')
    const [ name, setName ] = useState('')
    const [ password, setPassword ] =  useState('')
    const [ gender, setGender ] = useState('male')


    useEffect(() => {
        disptach(checkIsLogged())
    }, [])

    const switchFormHandler = (e,payload) => {
        setForm(payload)
        setEmail('')
        setName('')
        setPassword('')
        setGender('male')
    }

    const login = () => {
        const form = { email, password }
        disptach(loginAction(form))
        setEmail('')
        setPassword('')
    }
    const register = () => {
        const form = { email, name, password, gender }
        disptach(registerAction(form))
        setEmail('')
        setName('')
        setPassword('')
        setGender('male')
    }
    console.log(general.isLogged)

    return (
        <>
            <View style={styles.container}>
                { 
                    general.errors
                        ? <AlertError type={ERRORS} errors={general.errors} title={ form } />
                        : null
                }
                <View style={styles.titleContainer}>
                    <Image source={Logo} resizeMode="contain" style={{width: 0.5 * DEVICE_WIDTH, height: 0.1 * DEVICE_HEIGHT, alignSelf:"center", marginBottom: 0.08 * DEVICE_HEIGHT}} />
                    {
                        form === 'signin'
                            ? <Text style={styles.formTitle}>Sign In</Text>
                            : <Text style={styles.formTitle}>Sign Up</Text>
                    }
                </View>
                <View style={styles.formContainer}>
                    <View style={styles.switchFormContainer}>
                        <TouchableWithoutFeedback onPress={ e => switchFormHandler(e,'signin')}>
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
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={ e => switchFormHandler(e,'signup')}>
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
                        </TouchableWithoutFeedback>
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
                                value={name} 
                                onChangeText={ val => setName(val) }
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
                            value={email} 
                            onChangeText={ val => setEmail(val) }
                            placeholder={"Input email"}
                        />
                    </View>
                    <View style={styles.input}>
                        <Image source={Password} style={styles.inputImage} />
                        <TextInput 
                            style={styles.inputText} 
                            value={password}
                            onChangeText={ val => setPassword(val) }
                            placeholder={"Input password"}
                            secureTextEntry={true}
                        />
                    </View>
                    {
                        form === 'signin'
                        ?   null
                        :   <Picker
                                selectedValue={gender}
                                style={styles.picker}
                                onValueChange={(itemValue, itemIndex) => setGender(itemValue)
                            }>
                            <Picker.Item label="Male" value="male" />
                            <Picker.Item label="Female" value="female" />
                    </Picker>
                    }
                    {
                        form==='signin'
                        ? <TouchableWithoutFeedback onPress={login}>
                              <View style={[styles.submitButton,{
                                  marginTop:156,padding:19.5
                              }]}>
                                  <Text style={{color: '#fff'}}>Signin</Text>
                              </View>
                          </TouchableWithoutFeedback>
                        : <TouchableWithoutFeedback onPress={register}>
                              <View style={[styles.submitButton,{
                                  padding:20
                              }]}>
                                  <Text style={{color: '#fff'}}>Signup</Text>
                              </View>
                          </TouchableWithoutFeedback>
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
        color: '#FFF'
    },
    titleContainer: {
        height: 0.4 * DEVICE_HEIGHT,
        backgroundColor: '#5676CF',
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