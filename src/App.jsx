import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Payment from './components/Payment';
import Form from './components/Form';
import Error from './components/Error';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/form" element={<Form />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
