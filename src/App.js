import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainChat from "./components/MainChat";
import Landing from "./components/Landing";
import SelectPerson from "./components/SelectPerson";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/selectperson" element={<SelectPerson />} />
          <Route path="/mainchat" element={<MainChat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
