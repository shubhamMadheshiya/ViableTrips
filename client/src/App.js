import React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";
import JoinUs from "./pages/JoinUs";
import Blogs from "./pages/Blogs";
import "./App.css";
import Nopage from "./pages/Nopage";
import AboutUs from "./pages/AboutUs";
import Blog from "./pages/Blog";
import MyProfile from "./pages/MyProfile";
import Recent from "./pages/Recent";
import More from "./pages/More";
import PersonalDetail from "./components/Buddy/PersonalDetail";
import Contact from "./components/Buddy/Contact";
import Verification from "./components/Buddy/Verification";
import BlogsList from "./components/BlogsList";
import PhoneAuth from "./components/Auth/PhoneAuth";
import { AuthenticatedLayout, Layout, LogInLayout } from "./layout/layout"; // Corrected import statement
import PersistLogin from "./components/Auth/PersistLogin";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PersistLogin />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/contactUs" element={<ContactUs />} />
            <Route path="/blogs" element={<BlogsList />} />
            <Route path="/more" element={<More />} />
            <Route path="/logIn" element={<LogInLayout />} />{" "}
            {/* Updated to use LogInLayout */}
            <Route path="/joinUs" element={<JoinUs />}>
              <Route index element={<Contact />} />
              <Route path="step_2" element={<PersonalDetail />} />
              <Route path="step_3" element={<Verification />} />
            </Route>
            <Route path="*" element={<Nopage />} />
          </Route>
          <Route path="/" element={<AuthenticatedLayout />}>
            <Route path="/profile" element={<MyProfile />} />
            <Route path="/history" element={<Recent />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
