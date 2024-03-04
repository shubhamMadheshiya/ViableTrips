import React from 'react'
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ContactUs from './pages/ContactUs'
import JoinUs from "./pages/JoinUs";
import Blogs from './pages/Blogs'
import './App.css';

import Nopage from './pages/Nopage';
import AboutUs from './pages/AboutUs';
import Blog from './pages/Blog';
import MyProfile from './pages/MyProfile';
import Recent from './pages/Recent';
import More from './pages/More';
import PersonalDetail from './components/Buddy/PersonalDetail';
import Contact from './components/Buddy/Contact';
import Verification from './components/Buddy/Verification';


const App = () => {

  //  const StyledBox = styled(Box)({
  //    display: "flex",
  //    padding: "2rem",
  //    background: "#ffff",
  //    borderRadius: "1rem",
  //    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  //  });

  //This is Shubham

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="aboutus" element={<AboutUs />} />
          <Route path="contactUs" element={<ContactUs />} />
          <Route path="blogs" element={<Blog />} />
          <Route path="profile" element={<MyProfile />} />
          <Route path="history" element={<Recent />} />
          <Route path="more" element={<More />} />

          {/* buddy form */}
          <Route path="joinUs" element={<JoinUs />}>
            <Route index element={<Contact />} />
            {/* <Route path="step_1" element={<Contact />} /> */}
            <Route path="step_2" element={<PersonalDetail />} />
            <Route path="step_3" element={<Verification />} />
          </Route>

          <Route path="*" element={<Nopage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
