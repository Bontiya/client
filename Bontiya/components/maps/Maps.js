import React, {useState, useEffect} from 'react';
import MapView, {Marker, Polyline} from 'react-native-maps';
import {
    Dimensions,
    StyleSheet,
    ActivityIndicator,
    View
} from "react-native";
import Geolocation from '@react-native-community/geolocation';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import {
    getDirections,
    reverseGeolocation,
    searchPlace,
} from '../../store/actions/mapsAction';
import GetLocation from 'react-native-get-location'

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = (width / height);
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


const Maps = () => {
    const [currentLocation, setCurrentLocation] = useState({});
    const [locId, setLocId] = useState("");
    const [locNameStatus, setLocNameStatus] = useState(true);
    const getMapCoordDirections = useSelector(state => state.getMapCoordDirections);
    const getReverseGeoLocation = useSelector(state => state.getReverseGeoLocation);
    const getLangLong = useSelector(state => state.getLatLong);
    const [watchId, setWatchId] = useState("");
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

    // console.log(getReverseGeoLocation, "reverse");
    // console.log(getMapCoordDirections.data, "route");
    // console.log(currentLocation.name, getLangLong.data.name);
    // console.log(eventLocation.coordinates.latitude);

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
            dispatch(getDirections(currentLocation.name, getLangLong.data.name));
            setLocId(getLangLong.data.id)
        }
    }

    const memberLocation = [
        {
            title: "Stasiun Kebayoran",
            description: "Stasiun Kebayoran description",
            coordinates: {
                latitude: -6.2372422,
                longitude: 106.7803338,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            }
        }, {
            title: "Pondok Indah Mall",
            description: "Pondok Indah Mall description",
            coordinates: {
                latitude: -6.2655318,
                longitude: 106.7821503,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            }
        },
    ];

    const isSetLocName = () => {
        if (getReverseGeoLocation.data !== null) {
            dispatch(getDirections(getReverseGeoLocation.data[0], eventLocation.title));

            setCurrentLocation({
                name: getReverseGeoLocation.data[0],
                coordinates: {
                    latitude: currentLocation.coordinates.latitude,
                    longitude: currentLocation.coordinates.longitude,
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
            setCurrentLocation({
                name: "",
                coordinates: {
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                }
            });
            dispatch(reverseGeolocation(location.latitude, location.longitude));
            isSetLocName();
        }).catch(error => {
            const {code, message} = error;
            console.warn(code, message);
        })

        // Geolocation.getCurrentPosition(position => {
        //     console.log(position);
        //         setCurrentLocation({
        //             name: "",
        //             coordinates: {
        //                 latitude: position.coords.latitude,
        //                 longitude: position.coords.longitude,
        //                 latitudeDelta: LATITUDE_DELTA,
        //                 longitudeDelta: LONGITUDE_DELTA
        //             }
        //         });
        //         dispatch(reverseGeolocation(position.coords.latitude, position.coords.longitude));
        //     },
        //     error => console.log({error}),
        //     {enableHighAccuracy: false, timeout: 60000, maximumAge: 0}
        //     // {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        // );
    };

    // const watchPosition = () => {
    //     let watchId = Geolocation.watchPosition(position => {
    //             setCurrentLocation({
    //                 name: "",
    //                 coordinates: {
    //                     latitude: position.coords.latitude,
    //                     longitude: position.coords.longitude,
    //                     latitudeDelta: LATITUDE_DELTA,
    //                     longitudeDelta: LONGITUDE_DELTA
    //                 }
    //             });
    //             dispatch(reverseGeolocation(position.coords.latitude, position.coords.longitude));
    //             setWatchId(watchId)
    //         },
    //         error => console.log({error}),
    //         {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    //     );
    // };

    // const onPressMap = (position) => {
    //     const {coordinate} = position.nativeEvent;
    //     dispatch(reverseGeolocation(coordinate.latitude, coordinate.longitude));
    //     if (getReverseGeoLocation.data[0] !== undefined) {
    //         dispatch(searchPlace(getReverseGeoLocation.data.join(" ")));
    //         setEventLocation({
    //             id: "getLangLong.data.id",
    //             title: "getReverseGeoLocation.data[1]",
    //             description: "getReverseGeoLocation.data[1]",
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

    // useEffect(() => () => Geolocation.clearWatch(watchId), []);

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

                        {/*{*/}
                        {/*    memberLocation.map(marker => (*/}
                        {/*        <Marker.Animated*/}
                        {/*            coordinate={marker.coordinates}*/}
                        {/*            title={marker.title}*/}
                        {/*            description={marker.description}*/}
                        {/*        />*/}
                        {/*    ))*/}
                        {/*}*/}
                        {

                            getMapCoordDirections.data !== null
                                ? getMapCoordDirections.data.errors === undefined
                                ? <Polyline
                                    coordinates={getMapCoordDirections.data}
                                    strokeColor="blue"
                                    strokeWidth={3}
                                />
                                : <></>
                                : <></>
                        }
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