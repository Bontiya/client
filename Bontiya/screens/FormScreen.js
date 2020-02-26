import React, {useState, useEffect} from 'react'
import {
    View, Text, Button,
    StyleSheet, TextInput, TouchableOpacity,
    ScrollView, Image, Dimensions
} from 'react-native'
import {Icon} from 'react-native-elements'
import DateTimePickerModal from "react-native-modal-datetime-picker"
import {useDispatch, useSelector} from 'react-redux'
import {createEvent} from '../store/actions/eventAction'
import LocationModal from '../components/LocationModal'
import KeyModal from '../components/KeyModal'
import GetLocation from 'react-native-get-location';
import {reverseGeolocation} from "../store/actions/mapsAction";

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = (width / height);
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

function Form() {
    const [eventName, setEventName] = useState('')
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [key, setKey] = useState('')
    const dispatch = useDispatch()
    const [locationModal, setLocationModal] = useState(false)
    const [keyModal, setKeyModal] = useState(false)
    const getLangLong = useSelector(state => state.getLatLong);
    const [currentLocation, setCurrentLocation] = useState({});
    let eventLocation = {};
    const getReverseGeoLocation = useSelector(state => state.getReverseGeoLocation);

    if (getLangLong.data !== null) {
        eventLocation = {
            id: getLangLong.data.id,
            title: getLangLong.data.name,
            description: getLangLong.data.description,
            coordinates: {
                latitude: getLangLong.data.lat,
                longitude: getLangLong.data.lon
            }
        };
    }

    const showDatePicker = () => {
        setDate('')
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleConfirmTime = time => {
        setTime(time)
        hideTimePicker();
    }

    const showTimePicker = () => {
        setTime('')
        setTimePickerVisibility(true);
    };


    const submitKey = () => {
        console.log('aa')
    }

    const openLocationModal = (value) => {
        setLocationModal(value)
    }

    const openKeyModal = (value) => {
        setKeyModal(value)
    }

    // IMPORTANT
    const locPreviewRender = () => {
        if (!location) { // <---- delete the exclamation mark (!) for the correct logic
            return (
                <>
                    <Text style={{paddingHorizontal: 15, paddingVertical: 10}}>Location Preview</Text>
                    <View style={styles.map}>
                        <Image source={require('../assets/map.png')}
                               style={{width: '100%', height: '100%', borderRadius: 10}}
                        />
                    </View>
                </>
            )
        }
        return <View></View>
    }


    // ***************** SUBMIT EVENT *************** //
    const submitEvent = () => {
        const event = {
            name: eventName,
            location: {
                name: eventLocation.title,
                lat: eventLocation.coordinates.latitude,
                lon: eventLocation.coordinates.longitude
            },
            time: JSON.stringify(date).slice(1, 12) + JSON.stringify(time).slice(12, 25),
            key,
            description,
            locationHost: {
                name: currentLocation.name,
                lat: currentLocation.coordinates.latitude,
                lon: currentLocation.coordinates.longitude
            },
        }
        dispatch(createEvent(event))
        setEventName('')
        setDescription('')
        setLocation('')
        setDate('')
        setTime('')
        setKey('')
        setDatePickerVisibility(false)
        setTimePickerVisibility(false)
    }

    const setCurrentLocationDetail = (lat, lon) => {
        if (getReverseGeoLocation.data[0] !== undefined) {
            console.log(getReverseGeoLocation.data[0], "lokasi host");
            setCurrentLocation({
                name: getReverseGeoLocation.data[0],
                description: getReverseGeoLocation.data.join(" "),
                coordinates: {
                    latitude: lat,
                    longitude: lon,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                }
            });
        }
    };

    const findCoordinates = () => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 20000,
        }).then(location => {
            dispatch(reverseGeolocation(location.latitude, location.longitude));
            setCurrentLocationDetail(location.latitude, location.longitude);
        }).catch(error => {
            const {code, message} = error;
            console.warn(code, message);
        })
    };

    useEffect(() => {
        findCoordinates()
    }, []);


    return (
        <ScrollView style={styles.container}>
            <LocationModal visible={locationModal} setVisible={openLocationModal}/>

            <View>
                <Text style={styles.title}>New Event</Text>
            </View>

            <View style={styles.inner_container}>
                <View style={styles.form_row}>
                    <View style={styles.icon_wrapper}>
                        <Icon
                            name='people'
                            type='ion-icon'
                            color='blue'
                        />
                    </View>
                    <TextInput
                        style={styles.text_input}
                        value={eventName}
                        onChangeText={text => setEventName(text)}
                        placeholder="Event Name"
                    />
                </View>

                <View style={styles.form_row}>
                    <View style={styles.icon_wrapper}>
                        <Icon
                            name='edit'
                            type='ion-icon'
                            color='blue'
                        />
                    </View>
                    <TextInput
                        style={styles.text_input}
                        value={description}
                        onChangeText={text => setDescription(text)}
                        placeholder="Description"
                    />
                </View>

                <View style={styles.form_row}>
                    <View style={styles.icon_wrapper}>
                        <Icon
                            name='location'
                            type='octicon'
                            color='blue'
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => openLocationModal(true)}
                        style={[styles.form_row, {
                            flex: 1,
                            borderBottomWidth: 2,
                            borderColor: 'gray',
                            height: 40,
                            marginBottom: 0
                        }]}>
                        <Text style={styles.picker_form}>
                            {eventLocation.title || "Location"}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.form_row}>
                    <View style={styles.icon_wrapper}>
                        <Icon
                            name='calendar'
                            type='octicon'
                            color='blue'
                        />
                    </View>
                    <TouchableOpacity
                        onPress={showDatePicker}
                        style={[styles.form_row, {
                            flex: 1,
                            borderBottomWidth: 2,
                            borderColor: 'gray',
                            height: 40,
                            marginBottom: 0
                        }]}>
                        <DateTimePickerModal
                            isVisible={!date && isDatePickerVisible}
                            mode="date"
                            onConfirm={date => setDate(date)}
                            onCancel={hideDatePicker}
                        />
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                            <Text style={styles.picker_form}>Date</Text>
                            <Text
                                style={[styles.picker_form, {color: 'black'}]}>{date ? date.toLocaleString().slice(0, 10) : ''}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.form_row}>
                    <View style={styles.icon_wrapper}>
                        <Icon
                            name='clock'
                            type='octicon'
                            color='blue'
                        />
                    </View>
                    <TouchableOpacity
                        onPress={showTimePicker}
                        style={[styles.form_row, {
                            flex: 1,
                            borderBottomWidth: 2,
                            borderColor: 'gray',
                            height: 40,
                            marginBottom: 0
                        }]}>
                        <DateTimePickerModal
                            isVisible={!time && isTimePickerVisible}
                            mode="time"
                            onConfirm={handleConfirmTime}
                            onCancel={hideTimePicker}
                        />
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                            <Text style={styles.picker_form}>Time</Text>
                            <Text
                                style={[styles.picker_form, {color: 'black'}]}>{time ? time.toLocaleString().slice(10, 16) : ''}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.form_row}>
                    <View style={styles.icon_wrapper}>
                        <Icon
                            name='lock'
                            type='octicon'
                            color='blue'
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => openKeyModal(true)}
                        style={[styles.form_row, {
                            flex: 1,
                            borderBottomWidth: 2,
                            borderColor: 'gray',
                            height: 40,
                            marginBottom: 0
                        }]}>
                        <KeyModal visible={keyModal} setVisible={openKeyModal} setKey={setKey}/>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                            <Text style={styles.picker_form}>Magical Entity</Text>
                            <Text style={[styles.picker_form, {color: 'black'}]}>{key}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={submitEvent}
                >
                    <Text style={{color: '#fff'}}>Create Event</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#4A80E3',
        paddingHorizontal: 10,
        height: '100%'
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'white',
        padding: 10
    },
    icon_wrapper: {
        alignSelf: 'center',
        width: 30
    },
    text_input: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderBottomWidth: 2,
        justifyContent: 'center',
        paddingHorizontal: 10

    },
    form_row: {
        flexDirection: 'row',
        marginBottom: 10
    },
    btn: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#4A80E3',
        borderRadius: 5,
        marginBottom: 10,
        padding: 15,
        marginTop: 20
    },
    inner_container: {
        backgroundColor: 'white',
        padding: 10,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        marginBottom: 10,
        height: '100%',
    },
    picker_form: {
        alignSelf: 'center',
        paddingHorizontal: 10,
        color: 'gray'
    },
    map: {
        width: 300,
        height: 200,
        alignSelf: 'center',
        borderRadius: 10,
        elevation: 10,
        backgroundColor: 'white',
        marginBottom: 20
    },
})

export default Form