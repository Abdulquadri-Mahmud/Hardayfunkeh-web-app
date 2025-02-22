import React, { useContext } from "react";
import moment from "moment";
import { OrderContext } from "../../pages/dashboard_pages/Order";

export default function Order_lists() {
  const orders = useContext(OrderContext);

  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => total + item.productPrice * item.quantity, 0);
  };

  return (
    <>
        {
            orders.map((order) => (
                <tr key={order._id} className="border-b border-b-gray-200 font-medium text-gray-600">
                    <td className="px-2 lg:py-4 py-2 border border-gray-300 text-sm text-start text-gray-700 font-medium">{order.orderId}</td>
                    <td className="px-2 lg:py-4 py-2 border border-gray-300 text-sm text-start text-gray-700 font-medium truncate">{order.firstname} {order.lastname}</td>
                    <td className="px-2 lg:py-4 py-2 border border-gray-300 text-sm text-start text-gray-700 font-medium">+234{order.phone}</td>
                    <td className="px-2 lg:py-4 py-2 border border-gray-300 text-sm text-start text-gray-700 font-medium truncate">{order.state}</td>
                    <td className="px-2 lg:py-4 py-2 border border-gray-300 text-sm text-start text-gray-700 font-medium truncate">{order.city}</td>
                    <td className="px-2 lg:py-4 py-2 border border-gray-300 text-sm text-start text-gray-700 font-medium truncate">{order.address}</td>
                    <td className="px-2 lg:py-4 py-2 border border-gray-300 text-sm text-start text-gray-700 font-medium">
                    {moment(order.createdAt).format("MMMM Do, YYYY")}
                    </td>
                    <td className="px-2 lg:py-4 py-2 border border-gray-300 text-sm text-start text-gray-700 font-medium">
                        ₦{calculateTotalPrice(order.items).toLocaleString()}
                    </td>
                    <td className="px-2 lg:py-4 py-2 border border-gray-300 text-sm text-start text-gray-700 font-medium">{order.items.length}</td>
                </tr>
            ))
        }
    </>
  );
}
