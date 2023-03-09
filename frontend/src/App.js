import { Routes, Route } from 'react-router-dom';
import HomeLoginScreen from './Screen/HomeLoginScreen';
import HomePageScreen from './Screen/HomePageScreen';
import VerifiedScreen from './Screen/VerifiedScreen';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLoginScreen />} />
      <Route path="/verified" element={<VerifiedScreen />} />
      <Route path="/home" element={<HomePageScreen />} />
    </Routes>
  );
}

export default App;
