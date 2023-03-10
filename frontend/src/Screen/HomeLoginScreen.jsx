import { useState, useEffect } from 'react';
import './HomeLoginScreen.css';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './../Component/Footer';
import Register from '../Component/Register';
import { login } from './../store/userAction';
import { useDispatch, useSelector } from 'react-redux';
import DotLoader from 'react-spinners/DotLoader';
const HomeLoginComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const [registerForm, setRegisterForm] = useState(false);

  const { user, loading, success, error } = useSelector(state => state.user);
  useEffect(() => {
    if (user.length && !user[0].verified)
      setTimeout(() => {
        navigate('/verify');
      }, 3000);

    if (user.length && user[0].verified)
      setTimeout(() => {
        navigate('/');
      }, 1000);
  }, [user.length, navigate]);

  const emailIsValid = email
    .toLowerCase()
    .match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,15})?$/);

  const enteredEmailIsValid = !emailIsValid && emailTouched;

  const passwordIsValid = password.length > 7;
  const enteredPasswordIsValid = !passwordIsValid && passwordTouched;

  const emailTouchedHandler = () => {
    setEmailTouched(true);
  };

  const passwordTouchedHandler = () => {
    setPasswordTouched(true);
  };

  const emailHandler = e => {
    setEmail(e.target.value);
  };
  const passwordHandler = e => {
    setPassword(e.target.value);
  };

  const openRegisterForm = () => {
    setRegisterForm(true);
  };

  const closeRegisterForm = () => {
    setRegisterForm(false);
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    setEmailTouched(true);
    setPasswordTouched(true);

    if (!emailIsValid || !passwordIsValid) return;
    dispatch(login(email, password));

    setEmailTouched(false);
    setPasswordTouched(false);
    setEmail('');
    setPassword('');
  };

  return (
    <>
      <div className="login">
        <div className="login__details-box">
          <div className="login__details">
            <img
              src="./../../icons/facebook.svg"
              className="login__logo-img"
              alt="facebook icon"
            />
            <h3 className="heading__secondary">
              Facebook helps you connect and share with the people in your life.
            </h3>
          </div>
          <div>
            <div className="login__form">
              <form className="form__login" onSubmit={onSubmitHandler}>
                <div className="login__form-group">
                  {enteredEmailIsValid && (
                    <div className="error__input">Email invalid</div>
                  )}
                  {enteredEmailIsValid && (
                    <i className="error_icon error__icon-login "></i>
                  )}
                  {enteredEmailIsValid && (
                    <span className="error_arrow-top"></span>
                  )}
                  <input
                    type="email"
                    placeholder="Email address or phone number"
                    value={email}
                    onChange={emailHandler}
                    onBlur={emailTouchedHandler}
                    className={enteredEmailIsValid ? 'error__border' : ''}
                  />
                </div>
                <div className="login__form-group">
                  {enteredPasswordIsValid && (
                    <i className="error_icon error__icon-login error__icon-login-1"></i>
                  )}
                  {enteredPasswordIsValid && (
                    <span className="error_arrow-down"></span>
                  )}
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={passwordHandler}
                    onBlur={passwordTouchedHandler}
                    className={enteredPasswordIsValid ? 'error__border' : ''}
                  />
                  {enteredPasswordIsValid && (
                    <div className="error__input"> Password Invalid</div>
                  )}
                </div>

                <button type="submit" className="btn btn--blue">
                  Log in
                </button>
              </form>
              <div className="forget__password">
                <Link to="/forgot">Forgotten password ?</Link>
              </div>

              <button className="btn btn--green" onClick={openRegisterForm}>
                Create Account
              </button>
              <div className="dotLoader">
                <DotLoader
                  color="#1876f2"
                  loading={loading}
                  size={30}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
              {error && <div className="error_text">{error}</div>}
              {success && (
                <div className="success_text">login successfully</div>
              )}
            </div>
            <div className="sign_extra">
              <Link to="/">
                <b>Create a Page</b>&nbsp; for a celebrity, brand or business.
              </Link>
            </div>
          </div>
        </div>
      </div>
      {registerForm && <Register onCloseHandler={closeRegisterForm} />}
      <Footer />
    </>
  );
};

export default HomeLoginComponent;
