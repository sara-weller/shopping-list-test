
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./store";
import ShoppingList from "./components/ShoppingList";
import OrderSummary from "./components/OrderSummary";

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<ShoppingList />} />
          <Route path="/summary" element={<OrderSummary />} />
        </Routes>
      </Router>
    </Provider>
  );
}
