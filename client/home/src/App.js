import Home from "./components/Home";
import Navbar from "./components/Navbar";
import {Routes,Route} from 'react-router-dom';
import Skins from "./components/Skins";
import Login from "./components/Login";
import Signup from "./components/Signup";
import  AfterPayment from "./components/AfterPayment"

function App() {
  return (
    <div className="App">
      <iframe src="https://space-shooter-101.netlify.app/"
      style={{"display":'none'}}></iframe>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/skins" element={<Skins />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/payment" element={<AfterPayment/> } />
      </Routes>
    </div>
  );
}

export default App;
