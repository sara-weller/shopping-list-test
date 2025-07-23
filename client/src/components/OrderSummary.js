import React from 'react';
import { useSelector } from 'react-redux';

const OrderSummary = () => {
  const items = useSelector((state) => state.cart.items);

  return (
    <div>
      <h1>סיכום הזמנה</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} {item.quantity > 1 ? `x${item.quantity}` : ''}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderSummary;
