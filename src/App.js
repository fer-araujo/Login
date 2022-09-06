import Panel from "./components/login/Panel";
import Home from "./components/Home/Home";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Panel />} />
          <Route path="/login" element={<Panel />} />
          <Route path="/register" element={<Panel />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
