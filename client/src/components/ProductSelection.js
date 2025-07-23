import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../store/categoriesSlice';
import { addToCart } from '../store/cartSlice';

const ProductSelection = () => {
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector((state) => state.categories);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  const handleAddToCart = () => {
    if (!selectedCategory || !selectedProduct || quantity < 1) return;
    const category = categories.find(c => c.id === selectedCategory);
    const product = category.products.find(p => p.id === selectedProduct);
    dispatch(addToCart({ id: product.id, name: product.name, quantity: Number(quantity) }));
    setQuantity(1);
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>רשימת קניות</h2>
      {status === 'loading' && <div>טוען...</div>}
      {error && <div style={{ color: 'red' }}>שגיאה: {error}</div>}
      <div>
        <label>קטגוריה:</label>
        <select
          value={selectedCategory}
          onChange={e => {
            setSelectedCategory(e.target.value);
            setSelectedProduct('');
          }}
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        >
          <option value="">בחר קטגוריה</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>
      {selectedCategory && (
        <div>
          <label>מוצר:</label>
          <select
            value={selectedProduct}
            onChange={e => setSelectedProduct(e.target.value)}
            style={{ width: '100%', marginBottom: 10, padding: 8 }}
          >
            <option value="">בחר מוצר</option>
            {categories
              .find(cat => cat.id === selectedCategory)
              .products.map(prod => (
                <option key={prod.id} value={prod.id}>{prod.name}</option>
              ))}
          </select>
        </div>
      )}
      {selectedProduct && (
        <div>
          <label>כמות:</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            style={{ width: '100%', marginBottom: 10, padding: 8 }}
          />
        </div>
      )}
      <button
        onClick={handleAddToCart}
        disabled={!selectedCategory || !selectedProduct || quantity < 1}
        style={{ padding: '10px 20px', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4 }}
      >
        הוסף לסל
      </button>
    </div>
  );
};

export default ProductSelection;
