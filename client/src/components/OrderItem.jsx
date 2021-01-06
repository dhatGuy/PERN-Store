import { Badge, TableCell } from '@windmill/react-ui'
import React from 'react'

const OrderItem = ({order}) => {
  return (
    <>
      <TableCell>#{order.order_id}</TableCell>
      <TableCell>{order.total || "Not available"}</TableCell>
      <TableCell><Badge type="success">{order.status}</Badge> </TableCell>
      <TableCell>${order.amount}</TableCell>
      <TableCell>{order.date}</TableCell>
    </>
  )
}

export default OrderItem

