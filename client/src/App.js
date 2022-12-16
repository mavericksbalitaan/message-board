import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Board from './components/Board';
import Login from './components/Login';
import Signup from './components/Signup';
import Welcome from './components/Welcome';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/board" element={<Board />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
