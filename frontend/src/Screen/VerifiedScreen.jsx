import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { verfied } from './../store/verifiedAction';
import { userActions } from '../store/userSlice';
const VerifiedScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { verified } = useSelector(state => state.verified);
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);
  const token = queryParam.get('token');
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }

    if (!verified && token) {
      dispatch(verfied(token));
    }

    if (verified) {
      dispatch(userActions.userVerified());
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [token, dispatch, navigate, verified]);

  return (
    <>
      {verified && (
        <div className="verified">
          <div>
            <h1>Verified</h1>
            <img
              src="./../../images/verified.png"
              className="verified_icon"
              alt="verified_icon"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default VerifiedScreen;
