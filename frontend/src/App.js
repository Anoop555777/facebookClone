import { Routes, Route } from 'react-router-dom';
import HomeLoginComponent from './Screen/HomeLoginComponent';
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLoginComponent />} />
    </Routes>
  );
}

export default App;
