import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const stripePromise = loadStripe(
  "pk_test_51QtMxqFsGQXLFypabMPPs1Odpvfq2VXL5mivQNISsXzE8sdVdZdegxxvMvtb29KAq9P8PResi4djcRMLzBSZYenv00uUc0uz6y"
);

const PaymentForm = ({ clientSecret, appointmentId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe not loaded");
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.href },
    });

    if (error) {
      console.error("Payment failed", error);
      alert("Payment failed: " + error.message);
    } else if (paymentIntent?.status === "succeeded") {
      setSuccessMessage("Payment successful! Your appointment has been booked.");
      setTimeout(() => navigate("/appointments"), 2000);

      try {
        await axios.put(
          `http://localhost:8080/api/appoint/${appointmentId}`,
          { status: "paid" },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error("Error updating appointment status:", error);
      }
    }
  };

  return (
    <div>
      {successMessage && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            backgroundColor: "green",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          {successMessage}
        </div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "50px",
            boxShadow: "0px 2px 2px rgba(255,255,255,0.2)",
            borderRadius: "30px",
          }}
        >
          <h1>Payment Page</h1>
          <form onSubmit={handleSubmit}>
            <PaymentElement />
            <button
              type="submit"
              style={{
                width: "100%",
                backgroundColor: "blue",
                marginTop: "10px",
                padding: "10px",
                color: "white",
                fontWeight: "600",
                borderRadius: "10px",
                cursor: "pointer",
              }}
              disabled={!stripe}
            >
              Pay Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const AppointmentCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const clientSecret = location.state?.clientSecret;
  const appointmentId = location.state?.appointmentId;

  if (!clientSecret) {
    setTimeout(() => {
      navigate("/appointment");
    }, 1000);
    return <div>Payment Success</div>;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <PaymentForm clientSecret={clientSecret} appointmentId={appointmentId} />
    </Elements>
  );
};

export default AppointmentCard;
