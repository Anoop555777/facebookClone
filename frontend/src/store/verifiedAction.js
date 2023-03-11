import { verifiedAction } from './verifiedSlice';
import { userActions } from './userSlice';
import axios from 'axios';

export const verfied = token => async dispatch => {
  try {
    const { data } = await axios({
      method: 'GET',
      url: `/api/v1/users/verified?token=${token}`,
    });

    dispatch(verifiedAction.verifiedSuccess(data));
    dispatch(userActions.userVerified());
  } catch (err) {
    dispatch(
      verifiedAction.verifiedFail(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};

export const getVerify = () => async dispatch => {
  try {
    const { data } = await axios({
      method: 'GET',
      url: `/api/v1/users/verify`,
    });

    dispatch(verifiedAction.verifiedSuccess(data));
    dispatch(userActions.userVerified());
  } catch (err) {
    dispatch(
      verifiedAction.verifiedFail(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};
