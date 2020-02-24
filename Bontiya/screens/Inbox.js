import React from 'react';
import { useSelector } from "react-redux";
import { 
    StyleSheet,
    ScrollView,
    Dimensions,
    Text
} from 'react-native';
import useGetStatusInvitedPending from "../hooks/useGetStatusInvitedPending";
import Header from '../components/Header'
import InboxCard from "../components/InboxCard";
import AlertError from "../components/AlertError";
const DEVICE_WIDTH = Dimensions.get('window').width

export default function Inbox() {
    useGetStatusInvitedPending()
    const { member, general }  = useSelector(state => state)

    if (general.errors) {
        return (
            <AlertError errors={ general.errors } title={ 'Get Status Invited Pending Failed' } />
        )
    }
    return (
        <>
        <Header />
        {
            member.statusInvitedPendingOnload
                ? (<Text>Loading...</Text>)
                : !member.statusInvitedPending.length
                    ? (<Text>Inbox not yet available</Text>)
                    : (
                        <ScrollView style={styles.container}>
                            {
                                member.statusInvitedPending.map(item => {
                                    return <InboxCard item={item}  key={item._id} />
                                })
                            }
                        </ScrollView>
                    )
        }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 30,
        marginTop: 30
    },
    card: {
        height:110,
        width: 0.9 * DEVICE_WIDTH,
        alignSelf: "center",
        marginBottom: 30,
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
        height: '100%'
    },
    descContainer: {
        width: '80%',
        padding: 2,
        marginLeft: 10
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color:'#323678'
    },
    colorText: {
        color:'#323678'
    }
})