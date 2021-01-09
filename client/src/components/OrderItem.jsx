import { Badge, TableCell } from '@windmill/react-ui'
import {format, parseISO} from "date-fns"
import React from 'react'

const OrderItem = ({order}) => {
  return (
    <>
      <TableCell>#{order.order_id}</TableCell>
      <TableCell>{order.total || "Not available"}</TableCell>
      <TableCell><Badge type="success">{order.status}</Badge> </TableCell>
      <TableCell>₦{order.amount}</TableCell>
      <TableCell>{format(parseISO(order.date),'dd/MM/yy')}</TableCell>
    </>
  )
}

export default OrderItem

