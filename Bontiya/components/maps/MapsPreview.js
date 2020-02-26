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

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = (width / height);
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MapsPreview = (props) => {
    const [eventLocation, setEventLocation] = useState({});
    const [eventMember, setEventMember] = useState([]);

    console.log(props.member[0], ": member")

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

    useEffect(() => {
        setEventMember(props.member);
        setEvenLocationPosition(props.location);
    }, []);

    return (
        <>
            <MapView
                style={styles.maps}
                showsUserLocation={true}
                followUserLocation={true}
                zoomEnabled={true}
                region={
                    eventLocation.coordinates
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

                {
                    eventMember.map(marker => (
                        marker.location !== undefined
                        && marker.location !== null
                        && marker.location.lat !== null
                        && marker.location.lat !== undefined
                            ? <MapViewDirections
                                origin={{
                                    latitude: marker.location.lat,
                                    longitude: marker.location.lon
                                }}
                                destination={eventLocation.coordinates}
                                apikey="AIzaSyBfTdhXIpe03ZX8TofG_xC58Qy0k4qZrjs"
                                strokeWidth={3}
                                strokeColor="hotpink"
                            />
                            : <></>
                    ))
                }

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