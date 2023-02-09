import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./components/auth/Auth";
import {GoogleOAuthProvider} from '@react-oauth/google'

const App = () => {
  return (
    <GoogleOAuthProvider clientId="362554887217-k0bctu8qargkcb0fi7qj5tl6d4b84o8k.apps.googleusercontent.com">
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth/>} />
        </Routes>
      </Container>
    </BrowserRouter>
    </GoogleOAuthProvider>
  );
};
// 362554887217-k0bctu8qargkcb0fi7qj5tl6d4b84o8k.apps.googleusercontent.com 
export default App;
