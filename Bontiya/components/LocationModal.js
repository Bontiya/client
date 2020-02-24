import React from 'react'
import {
    View,
    Modal,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import {Icon} from 'react-native-elements'
import MapsPage from './maps/MapsPage'

function LocationModal({visible, setVisible}) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
        >
            <View style={styles.modal}>
                <MapsPage/>
                <TouchableOpacity
                    onPress={() => setVisible(false)}
                    style={{position: 'absolute', bottom: 0, marginBottom: 10, alignSelf: 'center'}}
                >
                    <View style={{width: 40, backgroundColor: 'white', borderRadius: 20, elevation: 5}}>
                        <Icon
                            name='close'
                            color='#4A80E3'
                            type='material-icons'
                            size={40}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        width: "90%",
        alignSelf: 'center',
        borderRadius: 10,
        elevation: 10,
        backgroundColor: 'white',
        padding: 15,
        marginTop: 5,
        height: '90%',
        overflow: 'hidden'
    }
});

export default LocationModal