import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const AppointmentCard = ({ ...props }) => {
  const [clientSecret, setClientSecret] = useState(null);
  const location = useLocation();
  const appointmentId = location.state?.appointmentId;
  const stripePromise = loadStripe(
    "pk_test_51QtMxqFsGQXLFypabMPPs1Odpvfq2VXL5mivQNISsXzE8sdVdZdegxxvMvtb29KAq9P8PResi4djcRMLzBSZYenv00uUc0uz6y"
  );


  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ appointmentId }),
        });
        const data = await response.json();
        setClientSecret(data.clientSecret); 
      } catch (error) {
        console.error("Error fetching client secret:", error);
      }
    };
    fetchClientSecret();
  }, [appointmentId]);

 
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!clientSecret) {
      console.error("No client secret available");
      return;
    }

    const stripe = await stripePromise;
    const elements = stripe.elements();

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href, 
      },
    });

    if (error) {
      console.error(error.message);
    } else if (paymentIntent.status === 'succeeded') {
      console.log("Payment successful!");
      
    }
  };


  if (!clientSecret) {
    return <div>Loading...</div>;
  }

  const options = {
    clientSecret,
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: "170px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
          backgroundColor: "white",
          boxShadow: "0px 2px 2px rgba(255,255,255,0.2)",
          borderRadius: "20px",
          padding: "140px",
        }}
      >
        <h2 style={{ fontSize: "1.8rem", color: "orange" }}>Appointment's Charge</h2>
        <h2 style={{ fontSize: "1rem", textAlign: "center" }}>RS 700</h2>
      </div>

      <div
        style={{
          backgroundColor: "white",
          padding: "50px",
          boxShadow: "0px 2px 2px rgba(255,255,255,0.2)",
          borderRadius: "30px",
        }}
      >
        <h1>Payment Page</h1>
        <Elements stripe={stripePromise} options={options}>
          <form onSubmit={handleSubmit}>
            <PaymentElement />
            <button
              type="submit"
              style={{
                width: "90%",
                backgroundColor: "blue",
                marginTop: "10px",
                marginLeft: "20px",
                padding: "10px",
                color: "white",
                fontWeight: "600",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              Submit
            </button>
          </form>
        </Elements>
      </div>
    </div>
  );
};

export default AppointmentCard;
