import React from 'react'
// import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";
// import { formatCurrency } from "helpers";
import { Button } from '@windmill/react-ui';

const Confirmation = ({resetState}) => {
  return (
    <div className="w-full md:w-1/2">
      <h1>It's ordered!</h1>
        {/* <p>Thank you for your purchase!.</p>
        <p>Order No.: #{state.details.order_id}</p>
        <p>Order Date: {format(parseISO(state.details.date), "d MMM, yyyy")}</p>
        <p>No. of items: {state.details.total}</p>
        <p>Amount: {formatCurrency(state.details?.amount)}</p> */}
        <Button layout="outline" onClick={resetState}>
          <Link to="/products">Continue shopping</Link>
        </Button>
    </div>
  )
}

export default Confirmation
