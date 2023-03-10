import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { verfied } from './../store/verifiedAction';
const VerifiedScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { verified } = useSelector(state => state.verified);
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);
  const token = queryParam.get('token');
  useEffect(() => {
    if (!token) {
      navigate('/');
    }

    if (!verified && token) {
      dispatch(verfied(token));
    }

    if (verified) {
      setTimeout(() => {
        navigate('/home');
      }, 3000);
    }
  }, [token, dispatch, navigate, verified]);

  return (
    <>
      {verified && (
        <div className="verified">
          <div>
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
