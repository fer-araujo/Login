import './App.css';
import Register from './components/login/Register';
import Login from './components/login/Login';
function App() {
  return (
    <div className="App">
      <Login />
      <Register />
      {/* <header className="App-header">
        <h3>Hello there #FutureShaper...</h3>
        <p>
          This is a simple React app that will be used to asses your skills.
        </p>
        <p>
          Please follow the instructions in the README.md file to get started.
        </p>
        <p>
          Edit <code>src/App.js</code> and show me what you got!
        </p>
      </header> */}
    </div>
  );
}

export default App;
