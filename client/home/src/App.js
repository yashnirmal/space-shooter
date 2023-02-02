import Home from "./components/Home";
import Navbar from "./components/Navbar";
import {Routes,Route} from 'react-router-dom';
import Skins from "./components/Skins";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AfterPayment from "./components/AfterPayment"
import TermsAndCondition from "./components/legal/Termsandcondition"
import PrivacyPolicy from "./components/legal/Privacypolicy"
import Refund from "./components/legal/Refund"
import ContactUs from "./components/legal/Contact"
import NotFound from "./components/notfound/NotFound"
import Footer from "./components/Footer"


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/skins" element={<Skins />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/payment" element={<AfterPayment/> } />
        <Route path="/termsandcondition" element={<TermsAndCondition />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy" element={<Refund />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
