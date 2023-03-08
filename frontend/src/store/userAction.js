import { userActions } from './userSlice';
import axios from 'axios';

export const register = data => async dispatch => {
  try {
    dispatch(userActions.userRegisterRequest());

    const { data } = await axios({
      method: 'POST',
      url: '/api/v1/users/signin',
      data: {},
    });

    dispatch(userActions.userRegisterSuccess(data));
  } catch (err) {
    dispatch(
      userActions.userRegisterFail(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};
