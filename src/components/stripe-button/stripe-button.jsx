import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51Gu2DXAeW4SghGpCshSJeunuJYkCA7OK60gAh75ss2bYFX5oCyWpgELzRGhYlb06dCxAolYuLLLkKBnjXMgkABrz002hOxt0k1";
  const onToken = (token) => console.log(token);

  return (
    <StripeCheckout
      label="Pay Now"
      name="Ecom"
      shippingAddress
      billingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your Total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
