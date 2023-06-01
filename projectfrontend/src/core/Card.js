import React from "react";
import ImageHelper from "./helper/imagehelper";
import { Navigate } from 'react-router-dom';
import { addItemToCart, removedFromCart } from "./helper/carthelper";

const isAuthenticated = false;

const Card = ({
  product,
  addtoCart = isAuthenticated, //if is ath then customer cannot add to cart
  removeFromCart = false, //if true will show the remove from cart btn
}) => {
  const cardTitle = product ? product.name : "We forgot to add a name";
  const cardDescription = product ? product.description : "no description at this time";
  const cardPrice = product ? product.price : "contact for pricing ";

  const addToCart = () => {
    if (isAuthenticated) {
      addItemToCart(product, () => {});
      console.log("Added to cart");
    } else {
      console.log("Login Please!");
    }
  };

  const getAreRedirect = (redirect) => {
    if (redirect) {
      return <Navigate to="/cart" />;
    }
  };

  const showAddtobtn = (addToCart) => {
    return (
      addToCart && (
        <button
          onClick={addToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemovebtn = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() =>{
            removedFromCart(product.id)
            console.log("Item was removed")
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{cardTitle}</div>
      <div className="card-body">
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {cardDescription}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">{`$${cardPrice}`}</p>
        <div className="row">
          <div className="col-12">{showAddtobtn(addToCart)}</div>
          <div className="col-12">{showRemovebtn(removeFromCart)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;


