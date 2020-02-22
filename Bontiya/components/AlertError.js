import React from "react";
import { useDispatch } from 'react-redux';
import {  Alert, Text } from 'react-native';

export default function  AlertError ({ type, errors, title }) {
    const dispatch = useDispatch()
    
    errors = errors.join(', ')
    Alert.alert(
        title,
        errors,
        [
            {text: 'OK', onPress: () => dispatch( { type, data: null }  )},
        ],
        {cancelable: false},
    )

    return (
        <Text />
    )
}
