import React, {useState} from "react";
import ImageHelper from "./helper/imagehelper";
import { Navigate } from 'react-router-dom';
import { addItemToCart, removedFromCart } from "./helper/carthelper";
import { isAuthenticated } from "../auth/helper";

 

const Card = ({
  product,
  addtoCart = isAuthenticated, 
  removeFromCart = false, //if true will show the remove from cart btn
  reload = undefined,

  setReload = f => f,
  //function f return f

}) => {

  const [redirect, setRedirect] = useState(false);//inital value of redirect is false state change
  const [redir, toSignUP] = useState(false);//created so if user trys to add to cart and they are not signed in the will be take to sign up page created goTOSignUP for this as well 
  const cardTitle = product ? product.name : "We forgot to add a name";
  const cardDescription = product ? product.description : "no description at this time";
  const cardPrice = product ? product.price : "contact for pricing ";

  const addToCart = () => {
    if (isAuthenticated()) {
      addItemToCart(product, () => setRedirect(true));
      console.log("Added to cart");
    } else {
      toSignUP(true)
    }
  };

  const goToSignUp = (redir) =>{
    if (redir){
      return <Navigate to="/signup"/>;
    }

  }

  const getRedirect = (redirect) => {
    if (redirect) {
      return <Navigate to="/cart" />;
    }
  };

  const showAddtobtn = (addToCart) => {
    return (
      addToCart && (
        <button
          onClick={addToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2">
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
            //one card is remove I am flippin the switch to actually remove it from the cart and not just in state and remounts state  the ! turns to into false and false into true
            setReload(!reload)
            console.log("Item was removed")
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2">
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{cardTitle}</div>
      <div className="card-body">
        { goToSignUp(redir)}
        {getRedirect(redirect)}
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


