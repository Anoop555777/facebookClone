import { useEffect, useState } from 'react';
import DotLoader from 'react-spinners/DotLoader';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../store/userAction';
import { useNavigate } from 'react-router-dom';
import './Register.css';
const Register = props => {
  const navigate = useNavigate();
  const { loading, success, error } = useSelector(state => state.user);
  const { verified } = useSelector(state => state.verified);

  useEffect(() => {
    if (success) {
    }
    if (verified) {
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }
  }, [verified]);

  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [gender, setGender] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [firstNameTouched, setFirstNameTouched] = useState(false);
  const [lastNameTouched, setLastNameTouched] = useState(false);
  const [birthdateTouched, setBirthdateTouched] = useState(false);
  const [genderTouched, setGenderTouched] = useState(false);
  const [birthYear, setBirthYear] = useState(
    new Date(Date.now()).getFullYear()
  );
  const [birthMonth, setBirthMonth] = useState(
    new Date(Date.now()).getMonth() + 1
  );

  const [birthDay, setBirthDay] = useState(new Date(Date.now()).getDate());

  const year = Array.from(
    { length: new Date(Date.now()).getFullYear() - 1915 + 1 },
    (_, i) => new Date(Date.now()).getFullYear() - i
  );

  const month = Array.from({ length: 12 }, (_, i) => i + 1);

  const getDays = () => new Date(birthYear, birthMonth, 0).getDate();

  const days = Array.from({ length: getDays() }, (_, i) => i + 1);

  const firstNameIsValid = firstName.toLocaleLowerCase().length > 2;
  const enteredFirstNameIsValid = !firstNameIsValid && firstNameTouched;

  const lastNameIsValid = surname.toLocaleLowerCase().length > 2;
  const enteredSurNameIsValid = !lastNameIsValid && lastNameTouched;

  const emailIsValid = email
    .toLowerCase()
    .match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,15})?$/);

  const enteredEmailIsValid = !emailIsValid && emailTouched;

  const passwordIsValid = password.length > 7;
  const enteredPasswordIsValid = !passwordIsValid && passwordTouched;

  const birthdayIsValid = new Date(new Date().getFullYear()) - birthYear > 17;
  const enderedBirthdayIsValid = !birthdayIsValid && birthdateTouched;

  const genderIsValid = ['male', 'female', 'custom'].includes(gender);
  const enderedGenderIsValid = !genderIsValid && genderTouched;

  const emailTouchedHandler = () => {
    setEmailTouched(true);
  };

  const passwordTouchedHandler = () => {
    setPasswordTouched(true);
  };

  const firstNameTouchedHandler = () => {
    setFirstNameTouched(true);
  };

  const surnameTouchedHandler = () => {
    setLastNameTouched(true);
  };

  const birthDateTouchedHandler = () => {
    setBirthdateTouched(true);
  };

  const genderTouchedHandler = () => {
    setGenderTouched(true);
  };

  const emailHandler = e => {
    setEmail(e.target.value);
  };
  const passwordHandler = e => {
    setPassword(e.target.value);
  };

  const firstNameHandler = e => {
    setFirstName(e.target.value);
  };
  const surnameHandler = e => {
    setSurname(e.target.value);
  };

  const closeHandler = () => {
    props.onCloseHandler();
  };

  const yearChangeHandler = e => {
    setBirthYear(e.target.value);
  };

  const monthChangeHandler = e => {
    setBirthMonth(e.target.value);
  };

  const dayChangeHandler = e => {
    setBirthDay(e.target.value);
  };

  const genderHandler = e => {
    setGender(e.target.id);
  };

  const onSubmitHandler = e => {
    e.preventDefault();

    setGenderTouched(true);
    setFirstNameTouched(true);
    setLastNameTouched(true);
    setEmailTouched(true);
    setPasswordTouched(true);
    setBirthdateTouched(true);

    console.log(
      enteredEmailIsValid,
      enderedBirthdayIsValid,
      enteredFirstNameIsValid,
      enteredSurNameIsValid,
      enteredPasswordIsValid,
      enderedGenderIsValid
    );

    if (
      !emailIsValid ||
      !birthdayIsValid ||
      !firstNameIsValid ||
      !lastNameIsValid ||
      !passwordIsValid ||
      !genderIsValid
    )
      return;

    dispatch(
      register({
        firstName,
        surname,
        email,
        password,
        gender,
        birthYear,
        birthMonth,
        birthDay,
      })
    );

    setEmail('');
    setFirstName('');
    setSurname('');
    setPassword('');
    setGender('');
    setBirthYear(new Date(Date.now()).getFullYear());
    setBirthMonth(new Date(Date.now()).getMonth() + 1);
    setBirthDay(new Date(Date.now()).getDate());

    setGenderTouched(false);
    setFirstNameTouched(false);
    setLastNameTouched(false);
    setEmailTouched(false);
    setPasswordTouched(false);
    setBirthdateTouched(false);
  };

  return (
    <div className="model">
      <div className="register__login-box">
        <h2 className="heading__primary">Sign Up</h2>
        <i className="exit_icon" onClick={closeHandler}></i>
        <p className="register_description">it's quick and easy.</p>

        <form className="form__register" onSubmit={onSubmitHandler}>
          <div className="div__box">
            <div className="register__form-group">
              {enteredFirstNameIsValid && (
                <div className="error__input">Firstname invalid</div>
              )}
              {enteredFirstNameIsValid && (
                <i className="error_icon error__icon-register "></i>
              )}
              {enteredFirstNameIsValid && (
                <span className="error_arrow-top"></span>
              )}
              <input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={firstNameHandler}
                onBlur={firstNameTouchedHandler}
                className={enteredFirstNameIsValid ? 'error__border' : ''}
              />
            </div>
            <div className="register__form-group">
              {enteredSurNameIsValid && (
                <div className="error__input">Lastname invalid</div>
              )}
              {enteredSurNameIsValid && (
                <i className="error_icon error__icon-register "></i>
              )}
              {enteredSurNameIsValid && (
                <span className="error_arrow-top"></span>
              )}
              <input
                type="text"
                placeholder="Surname"
                value={surname}
                onChange={surnameHandler}
                onBlur={surnameTouchedHandler}
                className={enteredSurNameIsValid ? 'error__border' : ''}
              />
            </div>
          </div>
          <div className="register__form-group">
            {enteredEmailIsValid && (
              <div className="error__input">Email invalid</div>
            )}
            {enteredEmailIsValid && (
              <i className="error_icon error__icon-register "></i>
            )}
            {enteredEmailIsValid && <span className="error_arrow-top"></span>}
            <input
              type="email"
              placeholder=" Email address or Phone number"
              value={email}
              onChange={emailHandler}
              onBlur={emailTouchedHandler}
              className={enteredEmailIsValid ? 'error__border' : ''}
            />
          </div>
          <div className="register__form-group">
            {enteredPasswordIsValid && (
              <i className="error_icon error__icon-register error__icon-login-1 error__icon-register-1"></i>
            )}
            {enteredPasswordIsValid && (
              <span className="error_arrow-down"></span>
            )}
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={passwordHandler}
              onBlur={passwordTouchedHandler}
              className={enteredPasswordIsValid ? 'error__border' : ''}
            />
            {enteredPasswordIsValid && (
              <div className="error__input"> Password Invalid</div>
            )}
          </div>

          <div className="register__form-group">
            <div className="register__input-heading">
              Date of birth <i className="info_icon"></i>
            </div>

            {enderedBirthdayIsValid && (
              <i className="error_icon error__icon-register "></i>
            )}
            {enderedBirthdayIsValid && (
              <span className="error_arrow-down"></span>
            )}

            <div className="DOB_grid">
              <select name="bDay" onChange={dayChangeHandler} value={birthDay}>
                {days.map(el => (
                  <option value={el} key={el}>
                    {el}
                  </option>
                ))}
              </select>
              <select
                onChange={monthChangeHandler}
                name="bMonth"
                value={birthMonth}
              >
                {month.map(el => (
                  <option value={el} key={el}>
                    {el}
                  </option>
                ))}
              </select>
              <select
                name="bYear"
                onChange={yearChangeHandler}
                value={birthYear}
                onBlur={birthDateTouchedHandler}
              >
                {year.map(el => (
                  <option value={el} key={el}>
                    {el}
                  </option>
                ))}
              </select>
            </div>
            {enderedBirthdayIsValid && (
              <div className="error__input">You must be above 18</div>
            )}
          </div>

          <div className="register__form-group">
            <div className="register__input-heading">
              Date of birth <i className="info_icon"></i>
            </div>
            {enderedGenderIsValid && (
              <i className="error_icon error__icon-register "></i>
            )}

            {enderedGenderIsValid && <span className="error_arrow-down"></span>}
            <div className="gender_grid">
              <label htmlFor="male">
                Male
                <input
                  type="radio"
                  name="gender"
                  id="male"
                  value={gender}
                  onChange={genderHandler}
                  onBlur={genderTouchedHandler}
                />
              </label>
              <label htmlFor="female">
                Female
                <input
                  type="radio"
                  name="gender"
                  id="female"
                  value={gender}
                  onChange={genderHandler}
                  onBlur={genderTouchedHandler}
                />
              </label>
              <label htmlFor="custom">
                Custom
                <input
                  type="radio"
                  name="gender"
                  id="custom"
                  value={gender}
                  onChange={genderHandler}
                  onBlur={genderTouchedHandler}
                />
              </label>
            </div>
            {enderedGenderIsValid && (
              <div className="error__input">Gender Invalid</div>
            )}
          </div>
          <div className="register_infos">
            By clicking Sign Up, you agree to our{' '}
            <span>Terms, Data Policy &nbsp;</span>
            and <span>Cookie Policy.</span> You may receive SMS notifications
            from us and can opt out at any time.
          </div>
          <div className="register_btn">
            <button className="btn btn--green">Sign Up</button>
          </div>
        </form>
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
        {success && <div className="success_text">{success}</div>}
      </div>
    </div>
  );
};

export default Register;
