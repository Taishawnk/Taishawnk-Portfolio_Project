import React, { useState } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";

const Signin = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: false,
    success: false,
    loading: false,
    didRedirect: false,
  });

  const { name, email, password, error, success, loading, didRedirect } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div className="alert alert-success" style={{ display: success ? "" : "none" }}>
            New Account created please <Link to="/signin">login</Link>
          </div>
        </div>
      </div>
    );
  };

  const notSuccessfulMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
            please check all fields again
          </div>
        </div>
      </div>
    );
  };

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
              onClick={() => {}}
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
    <Base title="Welcome to the Sign in page" description="A Manly Ecommerce store">
      {signInForm()}
      <p className="text-white position-relative position-relative bottom-0 start-50 translate-middle-x text-center">
        Welcome to the signin page
      </p>
    </Base>
  );
};

export default Signin;



// for sign in data note: for forms I could not use Django forms beacause my program for full react frontend functionallity I so I work with form data but not in the Jason Format but in form data format