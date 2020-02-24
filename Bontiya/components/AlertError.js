import React from "react";
import { useDispatch } from 'react-redux';
import {  Alert, Text } from 'react-native';
import { ERRORS } from "../store/actionTypes";

export default function  AlertError ({ type, errors, title }) {
    const dispatch = useDispatch()
    type = type || ERRORS
    errors = Array.isArray(errors) ? errors.join(', ') : errors
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
