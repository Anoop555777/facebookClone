import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import HomeLoginScreen from './Screen/HomeLoginScreen';
import HomePageScreen from './Screen/HomePageScreen';
import VerifiedScreen from './Screen/VerifiedScreen';
import VerifyScreen from './Screen/VerifyScreen';
import { useSelector } from 'react-redux';
function App() {
  const { user } = useSelector(state => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user.length) {
      navigate('/login');
    }
    if (user.length && user[0]?.verified) navigate('/');
  }, [user, navigate]);

  return (
    <Routes>
      <Route path="/login" element={<HomeLoginScreen />} />
      <Route path="/verified" element={<VerifiedScreen />} />
      <Route path="/" element={<HomePageScreen />} />
      <Route path="/verify" element={<VerifyScreen />} />
    </Routes>
  );
}

export default App;
