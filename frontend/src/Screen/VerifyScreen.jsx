import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getVerify } from '../store/verifiedAction';
import './VerifyScreen.css';
const VerifyScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.user);
  const { error } = useSelector(state => state.verified);

  const [email, setEmail] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [sendSuccess, setsendSuccess] = useState(false);
  const emailIsValid = email
    .toLowerCase()
    .match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,15})?$/);

  const enteredEmailIsValid = !emailIsValid && emailTouched;

  const emailTouchedHandler = () => {
    setEmailTouched(true);
  };

  const emailHandler = e => {
    setEmail(e.target.value);
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    setEmailTouched(true);

    if (!emailIsValid) return;

    dispatch(getVerify(email));

    setsendSuccess(true);
    setEmailTouched(false);
    setEmail('');
  };

  useEffect(() => {
    if (!user.length) {
      navigate('/login');
    }
    if (user[0]?.verified) {
      navigate('/');
    }
  }, [navigate, dispatch, user]);
  return (
    <div className="verify">
      <div className="verify-box">
        <h1 className="heading__primary">Verify your account</h1>
        <form className="form__login" onSubmit={onSubmitHandler}>
          <div className="login__form-group">
            {enteredEmailIsValid && (
              <div className="error__input verified_input">Email invalid</div>
            )}
            {enteredEmailIsValid && (
              <i className="error_icon error__icon-login verified_error "></i>
            )}
            {enteredEmailIsValid && <span className="verify_arrow"></span>}
            <input
              type="email"
              placeholder="Email address or phone number"
              value={email}
              onChange={emailHandler}
              onBlur={emailTouchedHandler}
              className={enteredEmailIsValid ? 'error__border' : ''}
            />
          </div>

          <button type="submit" className="btn btn--blue verify_button">
            Send Email
          </button>
        </form>
        {error === '' && sendSuccess && (
          <div className="success_text">
            Email is send to respected email id
          </div>
        )}
        {error && <div className="error_text">{error}</div>}
      </div>
    </div>
  );
};

export default VerifyScreen;
