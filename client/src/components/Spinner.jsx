import React from 'react'
// import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

const Spinner = ({css, size, loading}) => {
  return (
      
<div className="sweet-loading">
  <ClipLoader
    css={css}
    size={size}
    color={"#123abc"}
    loading={loading}
  />
</div>
  )
}

export default Spinner


