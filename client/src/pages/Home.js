import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

export default function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    api.get('/products').then(res => setProducts(res.data)).catch(console.error);
  }, []);
  return (
    <div>
      <h1>Products</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
        {products.map(p => (
          <div key={p._id} style={{ border: '1px solid #ddd', padding: 12 }}>
            <Link to={`/product/${p._id}`}>  
              <h3>{p.title}</h3>
            </Link>
            <p>${p.price.toFixed(2)}</p>
            <p>Stock: {p.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
}