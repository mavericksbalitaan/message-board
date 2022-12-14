import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Board from './components/Board';
import Welcome from './components/Welcome';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/board" element={<Board />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
