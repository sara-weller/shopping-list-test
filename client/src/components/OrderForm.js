import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../store/cartSlice';

const OrderForm = ({ onSuccess }) => {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const products = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('שולח...');
    try {
      const response = await fetch('http://localhost:4000/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          address,
          email,
          products: products.map(p => ({
            productId: p.id,
            name: p.name,
            quantity: p.quantity
          }))
        })
      });
      if (response.ok) {
        const data = await response.json();
        setStatus('ההזמנה נשלחה בהצלחה!');
        dispatch(clearCart());
        if (onSuccess && data.id) {
          onSuccess(data.id);
        }
      } else {
        setStatus('שגיאה בשליחת ההזמנה.');
      }
    } catch {
      setStatus('שגיאה בשליחת ההזמנה.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: 'auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>טופס הזמנה</h2>
      <input
        type="text"
        placeholder="שם מלא"
        value={fullName}
        onChange={e => setFullName(e.target.value)}
        required
        style={{ width: '100%', marginBottom: 10, padding: 8 }}
      />
      <input
        type="text"
        placeholder="כתובת"
        value={address}
        onChange={e => setAddress(e.target.value)}
        required
        style={{ width: '100%', marginBottom: 10, padding: 8 }}
      />
      <input
        type="email"
        placeholder="אימייל"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        style={{ width: '100%', marginBottom: 10, padding: 8 }}
      />
      <h3>מוצרים בהזמנה</h3>
      <ul>
        {products.map(p => (
          <li key={p.id}>{p.name} x {p.quantity}</li>
        ))}
      </ul>
      <button type="submit" style={{ padding: '10px 20px', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4 }}>אשר הזמנה</button>
      <div style={{ marginTop: 10 }}>{status}</div>
    </form>
  );
};

export default OrderForm;
