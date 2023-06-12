import React, {useState} from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";


const Signup = () => {

    const [values, setValues] =useState({ //signup box can add to it later
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
        
    })

    
//to use normaly I would have to do value.name value.email so on I am try to keep code clean so instead I will destructure my signup box 
    const {name, email, password, error, success} = values 

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
    }//higher order function https://www.freecodecamp.org/news/higher-order-functions-in-javascript-examples/
    /*
    This defines a function named handleChange. 
    It is a higher-order function that takes the name parameter and returns an inner function. 
    This inner function is an event handler that receives an event parameter. 
    When called, it updates the values state by spreading the existing values and updating the error property to false.
    It also updates the property specified by name with the new value from the event object.
    the [] is the magic part as it is where our value will auto set as the are being handled by the program 
    */

    const onsubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false });
        const user = {
          name,
          email,
          password
        };
        signup(user)
          .then((data) => {
            console.log("DATA", data);
            if (data.email === email) {
              setValues({
                ...values,
                name: "",
                email: "",
                password: password,
                error: "",
                success: true
              });
            } else {
              setValues({
                ...values,
                error: true,
                success: false
              });
            }
          })
          .catch((e) => console.log("you have an error of", e));
      };

    const successMessage = () =>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-success" style={{display: success ? "" : "none"}}> 
                        New Account created please  <Link to="/signin">login</Link>
                    </div>
                </div>
            </div>
        )
    }
    const notSuccessfulMessage = () =>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-danger" style={{display: error ? "" : "none"}}> 
                        please check all feilds again
                    </div>
                </div>
            </div>
        )
    }
    

    const signUpForm = () =>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form >
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input className="form-control"
                            value={name}//our higher order func is expecting this
                            onChange={handleChange("name")}
                            type="text"
                            ></input>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input className="form-control"
                            value={email}//our higher order func is expecting this
                            onChange={handleChange("email")}
                            type="text"
                            ></input>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input className="form-control"
                            value={password}//our higher order func is expecting this
                            onChange={handleChange("password")}
                            type="password"
                            ></input>
                        </div>
                        <button onClick={onsubmit} className="btn btn-success btn-block position-relative bottom-0 start-50 translate-middle-x">Submit
                            {/*submit in the onclick is in reffrence to above method submit not the submit button*/}
                        </button>
                    </form>
                </div>
            </div>
        );
    };

    return(
        <Base title="Sign Up Page" description="A sign up for my Portfolio Ecommerce">
            {successMessage()}
            {notSuccessfulMessage()}
            {signUpForm()}{/*injecting sign up form */}
            <p className="text-white text-center">{JSON.stringify(values)}</p>{/*remove or set as inactive before deployment just for testing  */}
        
        </Base>
    )
}

export default Signup