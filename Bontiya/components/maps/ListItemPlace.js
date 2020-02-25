import React, {useState, useEffect} from 'react';
import {
    List
} from 'react-native-paper';
import {StyleSheet} from "react-native";

const ListItemPlace = (props) => {

    const onPress = () => {
        props.action(props.data.id)
    };

    return (
        <>
            <List.Item
                onPress={onPress}
                style={styles.listItem}
                title={props.data.name}
                description={props.data.description}
                left={props => <List.Icon color="red" icon="pin"/>}
            />
        </>
    )
};

const styles = StyleSheet.create({
    listItem: {
        borderColor: 'gray',
        borderWidth: 0.2,
    }
});

export default ListItemPlace;