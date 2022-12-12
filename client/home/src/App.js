import Home from "./components/Home";
import Navbar from "./components/Navbar";
import {Routes,Route} from 'react-router-dom';
import Skins from "./components/Skins";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/skins" element={<Skins />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
