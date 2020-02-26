import React from 'react';
import {useDispatch} from "react-redux";
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Image,
    TouchableOpacity,
} from 'react-native';
import {updateStatusInvited} from "../store/actions/memberAction";
import GetLocation from 'react-native-get-location';
import {updateCurrentLocation} from "../store/actions/mapsAction";

const DEVICE_WIDTH = Dimensions.get('window').width

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = (width / height);
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function InboxCard({item}) {
    const dispatch = useDispatch()

    if (!item) {
        return <Text></Text>
    }
    return (
        <>
            <View style={styles.card}>
                <View style={styles.cardBody}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={{uri: item.event.members[0].user.avatar}}/>
                    </View>
                    <View style={styles.descContainer}>
                        <Text style={styles.name}>
                            {item.event.name}
                        </Text>
                        <View style={{
                            flexDirection: "row",
                            flex: 1
                        }}>
                            <Text style={[{
                                marginRight: 5, opacity: 0.6
                            }, styles.colorText]}>
                                from:
                            </Text>
                            <Text style={[styles.colorText, {opacity: 0.6, fontWeight: 'bold'}]}>
                                {item.event.members[0].user.name}
                                Ahmad Muzakki
                            </Text>
                        </View>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row-reverse',
                            paddingLeft: 30,
                            marginTop: 10
                        }}>

                            <View>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: '#4A80E3',
                                        justifyContent: 'center',
                                        height: 30,
                                        padding: 5,
                                        borderRadius: 5,
                                    }}
                                    onPress={() => {

                                        GetLocation.getCurrentPosition({
                                            enableHighAccuracy: true,
                                            timeout: 20000,
                                        }).then(location => {
                                            dispatch(
                                                updateCurrentLocation({
                                                    name: "",
                                                    description: "",
                                                    coordinates: {
                                                        latitude: location.latitude,
                                                        longitude: location.longitude,
                                                        latitudeDelta: LATITUDE_DELTA,
                                                        longitudeDelta: LONGITUDE_DELTA
                                                    }
                                                })
                                            )

                                            dispatch(updateStatusInvited(
                                                {
                                                    statusInvited: "received",
                                                    location : {
                                                        name: "",
                                                        lat: location.latitude,
                                                        lon: location.longitude
                                                    }
                                                },
                                                item._id
                                            ))
                                        }).catch(error => {
                                            const {code, message} = error;
                                            console.warn(code, message);
                                        })
                                    }}
                                >
                                    <Text style={{color: '#fff'}}>Accept</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                marginRight: 10,
                                justifyContent: 'center',
                                height: 30,
                                padding: 5,
                            }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        dispatch(updateStatusInvited(
                                            {statusInvited: "refused"},
                                            item._id
                                        ))
                                    }}
                                >
                                    <Text>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    card: {
        height: 110,
        width: 0.9 * DEVICE_WIDTH,
        alignSelf: "center",
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: "#fff",
        elevation: 3,
    },
    cardBody: {
        flex: 1,
        flexDirection: "row",
        padding: 10
    },
    imageContainer: {
        width: '20%',
        padding: 2
    },
    image: {
        height: '100%',
        width: 70
    },
    descContainer: {
        width: '80%',
        padding: 2,
        marginLeft: 10
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#323678'
    },
    colorText: {
        color: '#323678'
    }
})