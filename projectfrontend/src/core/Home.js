import React, { useState, useEffect } from 'react';
import { getProducts } from './helper/coreapicall';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProducts = () => {
    getProducts()
      .then((data) => {
        console.log(data); // remove after testing
        if (data.error) {
          setError(data.error);
        } else {
          setProducts(data);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <br/>
      <div className="row">
        {products.map((product, index) => {
          return (
            <div key={index}>
              <h1>{product.name}</h1>
              <p>{product.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}