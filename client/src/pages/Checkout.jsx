import Layout from "layout/Layout";
import React, { useState } from "react";
import AddressForm from "components/AddressForm";
import PaymentForm from "components/PaymentForm";
import Confirmation from "components/Confirmation";
import { useHistory, useLocation } from "react-router";

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [addressData, setAddressData] = useState();
  const {state} = useLocation()
  const {goBack} = useHistory()
  
    if(!state?.fromCartPage) {
      return goBack()
    }

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
