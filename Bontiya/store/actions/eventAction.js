import axios from 'axios';
import { ISLOGIN, GENERAL_ONLOAD, SUCCESS, ERRORS, CREATE_EVENT } from '../actionTypes';
import { apiUrl } from '../urlTypes';
import { AsyncStorage } from 'react-native';
import { configureFonts } from 'react-native-paper';

export const createEvent = (event) => async (dispatch, state) => {
  try {
    console.log(event, await AsyncStorage.getItem('token') , '??????')
    const { name, location, time, key, description, locationHost } = event
    const { data } = await axios({
      method: 'post',
      url: `${apiUrl}/events`,
      data: { name, location, time, key, description, locationHost },
      headers: { Authorization: await AsyncStorage.getItem('token') }

    }
      // `${apiUrl}/events`,
      // { name, location, time, key, description, locationHost }, 
      // { 
      //   headers: { 
      //     Authorization: await AsyncStorage.getItem('token') 
      //   }
      // }
    )
    console.log(data, '<<<')
  } catch (err) {
    if (err.response) {
      console.log(response.data.errors, '{{{')
      dispatch({
          type: ERRORS,
          data: response.data.errors
      })
    } else {
      console.log(err)
    }
  }
}