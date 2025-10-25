import logo from './logo.svg';
import axios from 'axios';
import HomePage from './pages/HomePage/HomePage';
import Login from './pages/Authentication/Login';
import Signup from './pages/Authentication/Signup';
import './App.less';
import { Routes, Route } from 'react-router-dom';

//data will be the string we send from our server
const apiCall = () => {
  // Axios first makes a 'GET' Request to the root route ('/') and retrieves the data that it's sent to it, then console.logs the data.
  axios.get('http://localhost:8080').then((data) => {
    //this console.log will be in our frontend console
    console.log(data);
  });
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
