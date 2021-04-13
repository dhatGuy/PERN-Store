import Layout from "layout/Layout";
import React, { useEffect, useState } from "react";
import AddressForm from "components/AddressForm";
import PaymentForm from "components/PaymentForm";
import Confirmation from "components/Confirmation";
import { useHistory, useLocation } from "react-router";
import { useCart } from "context/CartContext";

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [addressData, setAddressData] = useState();
  const { state } = useLocation();
  const history = useHistory();
  const { cartData } = useCart();

  useEffect(() => {
    if (!state?.fromCartPage) {
      return history.push('/cart');
    }

    if (cartData.items.length === 0) {
      return history.push("/cart");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nextStep = () =>
    setActiveStep((prevStep) => setActiveStep(prevStep + 1));
  const previousStep = () =>
    setActiveStep((prevStep) => setActiveStep(prevStep - 1));

  const next = (data) => {
    setAddressData(data);
    nextStep();
  };
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center mt-10">
        {activeStep === 0 ? (
          <AddressForm next={next} />
        ) : activeStep === 1 ? (
          <PaymentForm
            nextStep={nextStep}
            previousStep={previousStep}
            addressData={addressData}
          />
        ) : (
          <Confirmation />
        )}
      </div>
    </Layout>
  );
};

export default Checkout;
