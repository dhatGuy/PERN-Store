import Layout from "layout/Layout";
import React, { useState } from "react";
import AddressForm from "components/AddressForm";
import PaymentForm from "components/PaymentForm";
import Confirmation from "components/Confirmation";

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [addressData, setAddressData] = useState();

  const nextStep = () =>
    setActiveStep((prevStep) => setActiveStep(prevStep + 1));
  const previousStep = () =>
    setActiveStep((prevStep) => setActiveStep(prevStep - 1));

  const resetState = () => {
    setActiveStep(0);
    setAddressData();
  };

  const next = (data) => {
    setAddressData(data);
    nextStep();
  };
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center mt-20">
        {activeStep === 0 ? (
          <AddressForm next={next} />
        ) : activeStep === 1 ? (
          <PaymentForm
            nextStep={nextStep}
            previousStep={previousStep}
            addressData={addressData}
          />
        ) : (
          <Confirmation resetState={resetState} />
        )}
      </div>
    </Layout>
  );
};

export default Checkout;
