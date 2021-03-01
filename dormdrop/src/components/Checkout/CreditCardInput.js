import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    const paymentRequest = stripe.paymentRequest({
      country: "US",
      currency: "usd",
      total: {
        label: "Order Total",
        amount: 1000, // FIX THIS
      },
      requestPayerName: true,
      requestPayerPhone: true,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
    </form>
  );
}

export default CheckoutForm;
