import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/helper";
import DropIn from "braintree-web-drop-in-react";
import { cartEmpty } from "./helper/carthelper";
import { getmeToken, processPayment} from "./helper/paymenthelper";
import { creatOrder } from "./helper/orderhelper";

const PaymentB = ({
  products,
  reload = undefined,
  setReload = (f) => f,
}) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const userId = isAuthenticated && isAuthenticated().user.id;
  const token = isAuthenticated && isAuthenticated().token;

  const getToken = (userId, token) => {
    getmeToken(userId, token)
      .then((info) => {
        if (info.error) {
          setInfo({
            ...info,
            error: info.error,
          });
          signout(() => {
            return <Navigate to="/" />;
          });
        } else {
          const clientToken = info.clientToken;
          setInfo({ clientToken });
        }
      });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const getAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + parseInt(p.price);
    });
    return amount;
  };
  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then((data) => {
      console.log("MYDATA", data);
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount(),
      };
      processPayment(userId, token, paymentData)
        .then((response) => {
          console.log("Response:", response);
          if (response.error) {
            if (response.error.code === "1") { // Adjust the property name if needed
              console.log("Payment Failed!");
              signout(() => {
                return <Navigate to="/" />;
              });
            }
          } else {
            setInfo({ ...info, success: response.success, loading: false });
            console.log("Payment Success");
  
            let product_names = "";
            products.forEach(function (item) {
              product_names += item.name + ", ";
            });
  
            const orderData = {
              products: product_names,
              transaction_id: response.transaction.id, // Adjust the property name if needed
              amount: response.transaction.amount, // Adjust the property name if needed
            };
            creatOrder(userId, token, orderData)
              .then((response) => {
                if (response.error) {
                  if (response.error.code === "1") { // Adjust the property name if needed
                    console.log("Order Failed!");
                    signout(() => {
                      return <Navigate to="/" />;
                    });
                  }
                } else {
                  if (response.success === true) { // Adjust the property name if needed
                    console.log("Order Placed!!");
                  }
                }
              })
              .catch((error) => {
                setInfo({ loading: false, success: false });
                console.log("Order FAILED", error);
              });
            cartEmpty(() => {
              console.log("Did we get a crash?");
            });
  
            setReload(!reload);
          }
        })
        .catch((error) => {
          setInfo({ loading: false, success: false });
          console.log("Payment FAILED", error);
        });
    });
};
 
  const showbtnDropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0
          ? (
            <div>
              <DropIn
                options={{ authorization: info.clientToken }}
                onInstance={(instance) => (info.instance = instance)}
              >
              </DropIn>
              <button
                onClick={onPurchase}
                className="btn btn-block btn-success"
              >
                Buy Now
              </button>
            </div>
          )
          : (
            <h3>Please login first or add something in cart</h3>
          )}
      </div>
    );
  };

  return (
    <div>
      <h3>Your bill is $ {getAmount()}</h3>
      {showbtnDropIn()}
    </div>
  );
};

export default PaymentB;


//https://developer.paypal.com/braintree/docs/guides/credit-cards/testing-go-live/python   test cards 