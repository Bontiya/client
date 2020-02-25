import React, {useState, useEffect} from 'react';
import {
    FlatList,
    View,
    StyleSheet
} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {
    searchPlace,
    searchLatLong,
} from '../../store/actions/mapsAction';
import {
    Searchbar,
} from 'react-native-paper';
import ListItemPlace from "./ListItemPlace";

const GetPlace = () => {
    const [textSearch, setTextSearch] = useState("");
    const getPlace = useSelector(state => state.getPlace);
    const dispatch = useDispatch();

    console.log(getPlace.data);

    const onChangeTextInput = (text) => {
        setTextSearch(text);
        if (text.length < 3) {
            dispatch(searchPlace(""));
        }
    };

    const onSearchPlace = () => {
        dispatch(searchPlace(textSearch))
    };

    const onPlaceSelect = (placeId) => {
        dispatch(searchLatLong(placeId));
        setTextSearch("");
        onChangeTextInput("")
    };

    return (
        <View>
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeTextInput}
                value={textSearch}
                onEndEditing={onSearchPlace}
            />

            <FlatList
                style={styles.flatList}
                data={getPlace.data}
                renderItem={({item}) =>
                    <ListItemPlace data={item} action={onPlaceSelect}/>
                }
                keyExtractor={item => item.id}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    flatList : {
        // elevation: 10
    }
});

export default GetPlace;
