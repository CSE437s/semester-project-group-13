//App.js

import axios from 'axios';
import './App.css';

//data will be the string we send from our server
const apiCall = () => {
  axios.get('http://localhost:8080').then((response) => {
    const data = response.data;
    console.log(data);
  }).catch((error) => {
    console.error('Error making API call:', error);
  });
};

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <button onClick={apiCall}>Make API Call</button>

      </header>
    </div>
  );
}

export default App;