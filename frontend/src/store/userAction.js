import { userActions } from './userSlice';
import axios from 'axios';

export const register = data1 => async dispatch => {
  try {
    dispatch(userActions.userRegisterRequest());

    const { data } = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: {
        first_name: data1.firstName,
        last_name: data1.surname,
        email: data1.email,
        password: data1.password,
        username: data1.email.split('@')[0],
        bYear: data1.birthYear,
        bMonth: data1.birthMonth,
        bDay: data1.birthDay,
        gender: data1.gender,
      },
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

export const login = (email, password) => async dispatch => {
  try {
    dispatch(userActions.userLoginRequest());

    const { data } = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password,
      },
    });
    console.log(data);
    dispatch(userActions.userLoginSuccess(data));
  } catch (err) {
    dispatch(
      userActions.userLoginFailure(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};
