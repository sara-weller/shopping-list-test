import React, { useState } from 'react';
import './App.css';
import ProductSelection from './components/ProductSelection';
import OrderForm from './components/OrderForm';
import OrderSummary from './components/OrderSummary';

function App() {
  const [step, setStep] = useState(1);
  const [orderId, setOrderId] = useState(null);

  // Get cart items for validation
  const cartItems = JSON.parse(localStorage.getItem('reduxState'))
    ? JSON.parse(localStorage.getItem('reduxState')).cart.items
    : [];

  const handleContinue = () => {
    if (cartItems.length === 0) {
      alert('יש לבחור לפחות מוצר אחד לפני מעבר לסיכום הזמנה.');
      return;
    }
    setStep(2);
  };

  const handleOrderSuccess = (id) => {
    setOrderId(id);
    setStep(3);
  };

  return (
    <div className="app-container" dir="rtl">
      {step === 1 && (
        <>
          <ProductSelection />
          <OrderSummary />
          <button onClick={handleContinue}>המשך להזמנה</button>
        </>
      )}
      {step === 2 && <OrderForm onSuccess={handleOrderSuccess} />}
      {step === 3 && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h2>תודה על ההזמנה!</h2>
          <p>מספר ההזמנה שלך: <b>{orderId}</b></p>
        </div>
      )}
    </div>
  );
}

export default App;
