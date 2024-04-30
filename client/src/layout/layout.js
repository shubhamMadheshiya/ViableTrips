import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../components/Auth/authSlice";
import { Stack } from "@mui/material";
import PhoneAuth from "../components/Auth/PhoneAuth";

const Layout = () => {
  return (
    <Stack minHeight="100vh">
      <Navbar />
      <Outlet />
      <Footer />
    </Stack>
  );
};

const AuthenticatedLayout = () => {
  const token = useSelector(selectCurrentToken);

  return (
    <Stack minHeight="100vh">
      <Navbar />
      {token ? <Outlet /> : <Navigate to="/logIn" />}
      <Footer />
    </Stack>
  );
};
const LogInLayout = () => { // Changed from logInLayout to LogInLayout
  const token = useSelector(selectCurrentToken);

  return (
    <Stack minHeight="100vh">
     
      {token ? <Navigate to="/" /> : <PhoneAuth />} 
   
    </Stack>
  );
};


export { Layout, AuthenticatedLayout, LogInLayout };
