import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Appointment from "./components/Appointment";

// Stripe public key (this is your test key)
const stripePromise = loadStripe("your-public-key-here");

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/appointment"
          element={
            <Elements stripe={stripePromise}>
              <Appointment />
            </Elements>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
