
import React from "react";

import AppBar from "./layout/AppBar"; // Ensure this is the correct path
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme"; // Ensure this file exports a valid MUI theme
import CssBaseline from "@mui/material/CssBaseline";

import { useSelector, useDispatch } from "react-redux";
import { toggleTheme, selectThemeMode } from "./theme/themeSlice";

import Dash from "./pages/dashboard/Dash";

import NoPage from "./pages/Nopage/NoPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./layout/Layout";
import Users from "./pages/users/Users";
import Mail from "./pages/mail/Mail";
import Booking from './pages/booking/Booking'
import Create from "./pages/users/Create";
import EditUser from "./pages/users/Edit";
import TripsList from "./pages/trips/TripsList";
import CreateTrip from "./pages/trips/CreateTrip";
import EditTrip from "./pages/trips/EditTrip";

const App = () => {
  const themeMode = useSelector(selectThemeMode);
  return (
    <ThemeProvider theme={() => theme(themeMode)}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dash />} />
            <Route path="/users">
              <Route index element={<Users />} />
              <Route path="createUser" element={<Create />} />
              <Route path="editUser" element={<EditUser />} />
            </Route>

            <Route path="/trips">
              <Route index element={<TripsList/>} />
              <Route path="createTrip" element={<CreateTrip/>} />
              <Route path="editTrip" element={<EditTrip/>} />
            </Route>
            <Route path="/mail" element={<Mail />} />
            <Route path="/booking" element={<Booking />} />

            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
