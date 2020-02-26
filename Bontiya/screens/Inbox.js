import React, { useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { 
    StyleSheet,
    ScrollView,
    Dimensions,
    Text,
    View,
    Image,
    RefreshControl
} from 'react-native';
import useGetStatusInvitedPending from "../hooks/useGetStatusInvitedPending";
import Header from '../components/Header'
import InboxCard from "../components/InboxCard";
import AlertError from "../components/AlertError";
import Loading from "../components/Loading";
import MailBox from '../assets/mailbox.jpg'
import { getStatusInvitedPending } from "../store/actions/memberAction";
const DEVICE_WIDTH = Dimensions.get('window').width

export default function Inbox() {
    useGetStatusInvitedPending()
    const dispatch = useDispatch()
    const { member, general }  = useSelector(state => state)

    const onRefresh = useCallback(() => {  
        dispatch(getStatusInvitedPending())
      }, [member.statusInvitedPendingOnload])

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
                ? ( <Loading /> )
                    : !member.statusInvitedPending.length
                        ? (
                            <View style={{ 
                                flex: 1, 
                                justifyContent: 'center', 
                                alignItems: 'center',
                                backgroundColor: '#FFF'
                            }}>
                                <Image source={MailBox} resizeMode="contain"  style={{height: 350,width:500}}/>
                                <Text style={{marginTop:10,fontSize:24,color:'#323678',fontWeight:'bold'}}>Hi, you don't have any invitation!!</Text>
                            </View>
                        )
                        : (
                            <ScrollView
                                style={styles.container}
                                refreshControl={
                                    <RefreshControl refreshing={member.statusInvitedPendingOnload} onRefresh={onRefresh} />}>
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
        marginTop: 10
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