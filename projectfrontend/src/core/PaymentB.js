import React, { useState, useEffect } from "react";
import Base from "./Base";
import { Navigate } from "react-router-dom";
import { cartEmpty } from "./helper/carthelper";
import { getmeToken, processPayment } from "./helper/paymenthelper";
import { creatOrder } from "./helper/orderhelper";
import { isAuthenticated, signout } from "../auth/helper";
import DropIn from "braintree-web-drop-in-react";

const PaymentB = ({
  products,
  reload = undefined,
  setReload = (f) => f,
}) => {
  const [info, setInfo] = useState({
    loading: false,
    successs: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const userId = isAuthenticated && isAuthenticated().user.id;
  const token = isAuthenticated && isAuthenticated().token;

  const getToken = (userId, token) => {
    getmeToken(userId, token).then((info) => {
      if (info.error) {
        //if there is a error reciving token retrive the error info and signout users and redirect them to home page
        setInfo({
          ...info, //spread because there might be multiple errors and we want them seperated instead of just one huge running error
          error: info.error,
        });
        signout(() => {
          return <Navigate to="/" />;
        });
      } else {
        //if no error do the following grab the client token and set the client token value form null above to the client token
        const clientToken = info.clientToken;
        console.log(info);
        setInfo({ clientToken });
      }
    });
    //dont need catch because we handle error in the getmeToken method
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const total = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + parseInt(p.price);
    });
    return amount;
  };


  const showBtnDropIn = () => {
    return(
        <div>
            {
                info.clientToken !== null && products.length > 0 ? (
                    <div>
                         <DropIn options={{authorization: info.clientToken}} 
                            onInstance={instance => (info.instance = instance)}>
                                <button className="btn btn-block button-success">
                                    
                                </button>
                         </DropIn>
                    </div>
                ) : (
                    <h1>please login first or add something to cart </h1>
                 )
            
            
            }
        </div>
    )
  }

  return (
    <Base>
      <div>
        <h1>Payment</h1>
        <h3>Your bill is {total()}</h3>
        {showBtnDropIn()}
      </div>
    </Base>
  );
};

export default PaymentB;
