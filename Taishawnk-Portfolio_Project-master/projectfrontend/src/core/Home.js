import React, { useState, useEffect } from 'react';
import { getProducts } from './helper/coreapicall';
import Base from './Base';
import "../styles.css";
import Card from './Card';


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
    <Base title="Home Page" description="Welcome to My ecommerce store">
      

      <div className="row">
        {products.map((product, index) => {
          return (
            <div key={index} className='col-4 mb-4'>
              <Card product={product}/>{/*injects my card from Card.js and then passing product in as a prop to render our product */}

            </div>
          );
        })}
      </div>
    </Base>//this is where children comes into play these used to be div while I was building it out
  );
}