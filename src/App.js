import { ThemeProvider } from "./Components/Helpers/ThemeContext";
import Panel from "./Components/Login/Panel";
import Recover from "./Components/Login/Recover";
import Home from "./Components/Home/Home";
import Error from "./Components/Error/Error";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Panel />} />
            <Route path="/login" element={<Panel />} />
            <Route path="/register" element={<Panel />} />
            <Route path="/home" element={<Home />} />
            <Route path="/recover" element={<Recover />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
