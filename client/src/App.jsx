import logo from './logo.svg';
import axios from 'axios';
import './App.less';

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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hey</p>
        <button onClick={apiCall}>Call the API!</button>
      </header>
    </div>
  );
}

export default App;
