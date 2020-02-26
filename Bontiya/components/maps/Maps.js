import React, {useState, useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {
    Dimensions,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import {
    reverseGeolocation,
    searchPlace,
} from '../../store/actions/mapsAction';
import GetLocation from 'react-native-get-location'
import MapViewDirections from 'react-native-maps-directions';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = (width / height);
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


const Maps = () => {
    const getReverseGeoLocation = useSelector(state => state.getReverseGeoLocation);
    const [currentLocation, setCurrentLocation] = useState({});
    const [locId, setLocId] = useState("");
    const getMapCoordDirections = useSelector(state => state.getMapCoordDirections);
    const getLangLong = useSelector(state => state.getLatLong);
    const dispatch = useDispatch();
    const [eventLocation, setEventLocation] = useState(
        {
            id: "",
            title: "",
            description: "",
            coordinates: {
                latitude: "",
                longitude: "",
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            }
        }
    );

    if (getLangLong.data !== null) {
        if (getLangLong.data.id !== locId) {
            setEventLocation({
                id: getLangLong.data.id,
                title: getLangLong.data.name,
                description: getLangLong.data.description,
                coordinates: {
                    latitude: getLangLong.data.lat,
                    longitude: getLangLong.data.lon,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                }
            });
            setLocId(getLangLong.data.id)
        }
    }

    const setCurrentLocationDetail = (lat, lon) => {
        if (getReverseGeoLocation.data[0] !== undefined) {
            console.log(getReverseGeoLocation.data[0]);
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

    // const onPressMap = (position) => {
    //     const {coordinate} = position.nativeEvent;
    //     dispatch(reverseGeolocation(coordinate.latitude, coordinate.longitude));
    //     if (getReverseGeoLocation.data[0] !== undefined) {
    //         dispatch(searchPlace(getReverseGeoLocation.data.join(" ")));
    //         setEventLocation({
    //             id: getLangLong.data.id,
    //             title: getReverseGeoLocation.data[0],
    //             description: getReverseGeoLocation.data.join(" "),
    //             coordinates: {
    //                 latitude: coordinate.latitude,
    //                 longitude: coordinate.longitude,
    //                 latitudeDelta: LATITUDE_DELTA,
    //                 longitudeDelta: LONGITUDE_DELTA
    //             }
    //         });
    //     }
    // };

    useEffect(() => {
        findCoordinates();
    }, []);

    return (
        <>
            {
                getMapCoordDirections.loading
                    ? <ActivityIndicator size="large" color="#0000ff"/>
                    : <MapView
                        style={styles.maps}
                        showsUserLocation={true}
                        followUserLocation={true}
                        zoomEnabled={true}
                        region={
                            currentLocation.coordinates
                        }
                        // onPress={onPressMap}
                    >
                        {
                            currentLocation.coordinates !== undefined
                                ? <Marker.Animated
                                    coordinate={
                                        currentLocation.coordinates
                                    }
                                    title={currentLocation.name}
                                    description={currentLocation.name}
                                    pinColor={"blue"}
                                />
                                : <></>
                        }

                        {
                            eventLocation.coordinates.latitude !== ""
                                ? <Marker.Animated
                                    coordinate={
                                        eventLocation.coordinates
                                    }
                                    title={eventLocation.title}
                                    description={eventLocation.description}
                                />
                                : <></>
                        }

                        <MapViewDirections
                            origin={currentLocation.coordinates}
                            destination={eventLocation.coordinates}
                            apikey="AIzaSyBfTdhXIpe03ZX8TofG_xC58Qy0k4qZrjs"
                            strokeWidth={3}
                            strokeColor="hotpink"
                        />
                    </MapView>
            }
        </>
    )
};

const styles = StyleSheet.create({
    maps: {
        height: "90%",
    },
});

export default Maps