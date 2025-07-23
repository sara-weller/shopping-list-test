import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/cartSlice';

const ShoppingList = () => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  return (
    <div>
      <h1>Shopping List</h1>
      <button onClick={() => handleAddToCart({ id: 1, name: 'Product 1' })}>
        Add Product 1 to Cart
      </button>
    </div>
  );
};

export default ShoppingList;
