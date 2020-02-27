import React, {useState, useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {
    Dimensions,
    StyleSheet,
    ActivityIndicator,
    Text
} from "react-native";
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import MapViewDirections from 'react-native-maps-directions';
import GetLocation from 'react-native-get-location'
import {updateCurrentLocation} from "../../store/actions/mapsAction";
import {updateMemberCurrentLocation} from "../../store/actions/memberAction";

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = (width / height);
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MapsPreview = (props) => {
    const [eventLocation, setEventLocation] = useState({});
    const [eventMember, setEventMember] = useState([]);
    const [currentLocation, setCurrentLocation] = useState({});
    const {getCurrentLocationPos} = useSelector(state => state.getCurrentLocationPos);
    const {getUpdateCurrentLocationPos} = useSelector(state => state.getUpdateCurrentLocationPos);
    const dispatch = useDispatch();

    const setEvenLocationPosition = (location) => {
        setEventLocation({
            name: location.name,
            coordinates: {
                latitude: location.lat,
                longitude: location.lon,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            }
        });
    };

    const findCoordinates = () => {
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
                );

                setCurrentLocation({
                    name: "",
                    description: "",
                    coordinates: {
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA
                    }
                });

            dispatch(updateMemberCurrentLocation(location.latitude, location.longitude))
        }).catch(error => {
            const {code, message} = error;
            console.warn(code, message);
        })
    };

    useEffect(() => {
        setEventMember(props.member);
        setEvenLocationPosition(props.location);
        findCoordinates()
    }, []);

    return (
        <>
            <MapView
                style={styles.maps}
                showsUserLocation={true}
                followUserLocation={true}
                zoomEnabled={true}
                region={
                    currentLocation.coordinates
                }
            >
                <Marker.Animated
                    coordinate={eventLocation.coordinates}
                    title={eventLocation.name}
                    description={eventLocation.name}
                    pinColor={"red"}
                />

                {
                    eventMember.map((marker, index) => (
                        marker.location !== undefined
                        && marker.location !== null
                        && marker.location.lat !== null
                        && marker.location.lat !== undefined
                            ? <Marker.Animated
                                coordinate={{
                                    latitude: marker.location.lat,
                                    longitude: marker.location.lon
                                }}
                                title={props.member[index].user.name}
                                description={props.member[index].user.email}
                                pinColor={"blue"}
                            />
                            : <></>
                    ))
                }

                {/*{*/}
                {/*    eventMember.map(marker => (*/}
                {/*        marker.location !== undefined*/}
                {/*        && marker.location !== null*/}
                {/*        && marker.location.lat !== null*/}
                {/*        && marker.location.lat !== undefined*/}
                {/*            ? <MapViewDirections*/}
                {/*                origin={{*/}
                {/*                    latitude: marker.location.lat,*/}
                {/*                    longitude: marker.location.lon*/}
                {/*                }}*/}
                {/*                destination={eventLocation.coordinates}*/}
                {/*                apikey="AIzaSyBfTdhXIpe03ZX8TofG_xC58Qy0k4qZrjs"*/}
                {/*                strokeWidth={3}*/}
                {/*                strokeColor="hotpink"*/}
                {/*            />*/}
                {/*            : <></>*/}
                {/*    ))*/}
                {/*}*/}

                <MapViewDirections
                    origin={currentLocation.coordinates}
                    destination={eventLocation.coordinates}
                    apikey="AIzaSyBfTdhXIpe03ZX8TofG_xC58Qy0k4qZrjs"
                    strokeWidth={3}
                    strokeColor="hotpink"
                />
            </MapView>
        </>
    )
};

const styles = StyleSheet.create({
    maps: {
        height: "100%",
    },
});

export default MapsPreview;