import { useOrders } from 'context/OrderContext'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import orderService from 'services/order.service'

const Orders = () => {
  const {orders, setOrders} = useOrders()
  const history = useHistory()
  useEffect(()=>{
    orderService.getAllOrders().then(res=> setOrders(res.data))
  },[setOrders])
  const goToDetails = (order) =>{

      history.push({
        pathname: `orders/${order.order_id}`,
        state: {order}
      })
  }
  return (
    <div>
      {orders?.map(order=>{
        return (
          <div onClick={()=> goToDetails(order)} key={order.order_id}>
              <p>Order id: #{order.order_id}</p>
              <p>No. of Item: {order.total || "Not available"}</p>
              <p>Order Status: {order.status}</p>
              <p>Total amount: ${order.amount}</p>
              <p>Order Date: {order.date}</p>
            </div>
        )
      })}
    </div>
  )
}

export default Orders

