import { Routes, Route } from 'react-router-dom';
import HomeLoginScreen from './Screen/HomeLoginScreen';
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLoginScreen />} />
    </Routes>
  );
}

export default App;
