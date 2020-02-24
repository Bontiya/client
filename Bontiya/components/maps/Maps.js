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
    reverseGeolocation
} from '../../store/actions/mapsAction';

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
    const dispatch = useDispatch();
    let eventLocation = {};

    if (getMapCoordDirections.data !== null) {
        console.log(getMapCoordDirections.data.errors === undefined);
    }

    if (getLangLong.data !== null) {
        eventLocation = {
            id: getLangLong.data.id,
            title: getLangLong.data.name,
            description: getLangLong.data.description,
            coordinates: {
                latitude: getLangLong.data.lat,
                longitude: getLangLong.data.lon,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            }
        };

        if (getLangLong.data.id !== locId) {
            dispatch(getDirections(getReverseGeoLocation.data[1], getLangLong.data.name));
            setLocId(getLangLong.data.id)
        }
    } else {
        eventLocation = {
            id: "1234",
            title: "Hacktiv8",
            description: "Hacktiv8",
            coordinates: {
                latitude: -6.2607134,
                longitude: 106.7794275,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            }
        };
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

    const findCoordinates = () => {
        Geolocation.getCurrentPosition(position => {
                setCurrentLocation({
                    coordinates: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA
                    }
                })
            },
            error => console.log({error}),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
    };

    const isSetLocName = () => {
        if (getReverseGeoLocation.data !== null && locNameStatus === true) {
            dispatch(getDirections(getReverseGeoLocation.data[1], eventLocation.title));
            setLocNameStatus(false);
        }
    };

    useEffect(() => {
        findCoordinates();
        dispatch(reverseGeolocation(-6.2372422, 106.7803338));
    }, [isSetLocName()]);

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
                            eventLocation.coordinates
                        }
                    >
                        <Marker
                            coordinate={
                                currentLocation.coordinates
                            }
                            title={eventLocation.title}
                            description={eventLocation.description}
                        />

                        <Marker
                            coordinate={
                                eventLocation.coordinates
                            }
                            title={eventLocation.title}
                            description={eventLocation.description}
                        />

                        {
                            memberLocation.map(marker => (
                                <Marker
                                    coordinate={marker.coordinates}
                                    title={marker.title}
                                    description={marker.description}
                                />
                            ))
                        }
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