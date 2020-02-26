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

    console.log(eventMember, ": member")

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
                    // eventMember.map(marker => (
                    //     marker.location !== undefined
                    //     && marker.location !== null
                    //     && marker.location.lat !== null
                    //     && marker.location.lat !== undefined
                    //         ? <Marker.Animated
                    //             coordinate={{
                    //                 latitude: marker.location.lat,
                    //                 longitude: marker.location.lon
                    //             }}
                    //             title={marker.name}
                    //             description={marker.location.name}
                    //             pinColor={"blue"}
                    //         />
                    //         : <></>
                    // ))
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


const member = [
    {
        "__v": 0,
        "_id": "5e5641752c66b91f30015a9a",
        "event": "5e5641752c66b91f30015a99",
        "location": {
            "lat": -6.2609173,
            "lon": 106.7814476,
            "name": ""
        },
        "role": "host",
        "statusInvited": "received",
        "statusKey": false,
        "user": {
            "__v": 0,
            "_id": "5e562347a87cfa6d0089e988",
            "avatar": "https://img.icons8.com/wired/2x/small-smile.png",
            "created_at": "2020-02-26T07:50:32.010Z",
            "email": "dedi@test.com",
            "gender": "male",
            "name": "dedi",
            "tokenDeviceFirebase": "dQjbxTv_SZY:APA91bE0S60GX174nb7rHl3xOBmxkItQ7P7Qto5CHM5gOViAgvUlGPdNa5LFG4v_lYovSB3VUFRyLEJf_i-oPjSr7SMSjNnf_vPrZlFadwaatvZWAU05ZjgMiosbzefG4MjD7Id4Rl_5",
            "updated_at": "2020-02-26T10:04:18.951Z"
        }
    }, {
        "__v": 0,
        "_id": "5e564207d6b68c1f43bd3e3e",
        "event": "5e5641752c66b91f30015a99",
        "location": {"lat": -6.2609236, "lon": 106.7814433, "name": ""},
        "role": "guest",
        "statusInvited": "received",
        "statusKey": false,
        "user": {
            "__v": 0,
            "_id": "5e561e64b48c1e03416bd2a3",
            "avatar": "https://img.icons8.com/wired/2x/small-smile.png",
            "created_at": "2020-02-26T07:29:40.825Z",
            "email": "tes@gmail.com",
            "gender": "male",
            "name": "tes",
            "tokenDeviceFirebase": "dQjbxTv_SZY:APA91bE0S60GX174nb7rHl3xOBmxkItQ7P7Qto5CHM5gOViAgvUlGPdNa5LFG4v_lYovSB3VUFRyLEJf_i-oPjSr7SMSjNnf_vPrZlFadwaatvZWAU05ZjgMiosbzefG4MjD7Id4Rl_5",
            "updated_at": "2020-02-26T10:02:18.668Z"
        }
    }, {
        "__v": 0,
        "_id": "5e5642b7d6b68c1f43bd3e3f",
        "event": "5e5641752c66b91f30015a99",
        "location": {"lat": -6.2607723, "lon": 106.7814395, "name": ""},
        "role": "guest",
        "statusInvited": "received",
        "statusKey": false,
        "user": {
            "__v": 0,
            "_id": "5e56392f8e9e891b3fa8a55c",
            "avatar": "https://img.icons8.com/wired/2x/small-smile.png",
            "created_at": "2020-02-26T09:23:59.120Z",
            "email": "michael2@gmail.com",
            "gender": "male",
            "name": "Michael2",
            "tokenDeviceFirebase": "dQjbxTv_SZY:APA91bE0S60GX174nb7rHl3xOBmxkItQ7P7Qto5CHM5gOViAgvUlGPdNa5LFG4v_lYovSB3VUFRyLEJf_i-oPjSr7SMSjNnf_vPrZlFadwaatvZWAU05ZjgMiosbzefG4MjD7Id4Rl_5",
            "updated_at": "2020-02-26T10:05:25.582Z"
        }
    }]


export default MapsPreview;