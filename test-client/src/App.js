import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState("Old Data");

  const getData = () => {
    fetch('http://localhost:5000/api/invoices')
      .then(response => response.json())
      .then(data => {
        console.log(data.id)
        setData(data.id)
      })
  }
  const postData = () => {
    fetch('http://localhost:5000/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: ''
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.value)
        setData(data.value)
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        <form>
          <input type='text' />
          <button type='submit'>submit</button>
        </form>
        <p>{data}</p>
        <button onClick={getData}>Get Data</button>
      </header>
    </div>
  );
}

export default App;




