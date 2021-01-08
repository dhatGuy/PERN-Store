import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Spinner = ({ css, size, loading }) => {
  return (
    <>
      <ClipLoader css={css} size={size} color={"#123abc"} loading={loading} />
    </>
  );
};

export default Spinner;
