import React from 'react'
import { View, Image } from 'react-native'
import Logo from '../assets/logo-fix.png'
const SplashScreen = () => {
    return (
        <View style={{flex:1,justifyContent:"center",alignItems:"center", backgroundColor: '#5676CF'}}>
            <Image source={Logo} resizeMode="contain" style={{width: 200, height: 100}} />
        </View>
    )
}
export default SplashScreen