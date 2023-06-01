import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Base from "../core/Base";
import {signin, authenticate, isAuthenticated} from "../auth/helper/index"

// form data is a complex object not a reguler object 
const Signin = () => {
  const [values, setValues] = useState({
    name: "",
    email: "test1@yahoo.com",
    password: "Zululike1@",
    error: false,
    success: false,
    loading: false,
    didRedirect: false,
    //will take the defaults out before deploying
  });

  const { name, email, password, error, success, loading, didRedirect } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    // on click will be our event for this one in my buttom below
    event.preventDefault()// Prevent default form submission
    setValues({...values, error:false, loading:true})//error false will remmove any existing errors populated from a previouse step
    
    signin({email,password}).then((data) => {
        console.log("DATA", data);
        if (data.token){
          let sessionToken = data.token;
          authenticate(sessionToken, () => {
            console.log("Token ADDED!!!")
            setValues({
            ...values,
            didRedirect: true,
             
            });
          })

        }else{
          setValues({
            ...values, 
            loading: false
          });
        }
      }).catch(
      (err) => console.log("you have a error of", err)
    )//destructuiong
  }

  const Redirecting = () => {
    if (isAuthenticated()){
      return <Navigate to="/"/>
    }
  }
  

  const loadingMessage = () =>{
    return (
      loading &&(
        <div className=" alert alert-info">
          <h2>
            ...Loading
          </h2>
        </div>
      )
    )
  }

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                value={email}
                onChange={handleChange("email")}
                type="text"
              ></input>
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                className="form-control"
                value={password}
                onChange={handleChange("password")}
                type="password"
              ></input>
            </div>

            <button
              onClick={onSubmit}
              className="btn btn-success btn-block position-relative bottom-0 start-50 translate-middle-x"
            >
              Submit
              {/* submit in the onclick is in reference to the above method submit, not the submit button */}
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Welcome to the Sign in page" description="A Manly Ecommerce store">\
      {loadingMessage()}
      
      {signInForm()}
      <p className="text-white position-relative position-relative bottom-0 start-50 translate-middle-x text-center">
        Welcome to the signin page
      </p>
      {Redirecting()}
    </Base>
  );
};

export default Signin;



// for sign in data note: for forms I could not use Django forms beacause my program for full react frontend functionallity I so I work with form data but not in the Jason Format but in form data format

 //can add and customiz these later when I have more time
  // const successMessage = () => {
  //   return (
  //     <div className="row">
  //       <div className="col-md-6 offset-sm-3 text-left">
  //         <div className="alert alert-success" style={{ display: success ? "" : "none" }}>
  //           New Account created please <Link to="/signin">login</Link>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  // const notSuccessfulMessage = () => {
  //   return (
  //     <div className="row">
  //       <div className="col-md-6 offset-sm-3 text-left">
  //         <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
  //           please check all fields again
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };