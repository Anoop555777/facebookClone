import { verifiedAction } from './verifiedSlice';
import axios from 'axios';

export const verfied = token => async dispatch => {
  try {
    const { data } = await axios({
      method: 'GET',
      url: `/api/v1/users/verified?token=${token}`,
    });

    console.log(data);
    dispatch(verifiedAction.verifiedSuccess(data));
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
