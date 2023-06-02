//this section will handle Auth
//jason way to handle data 
import { Navigate, json } from "react-router-dom";
import {API} from "../../backend"
import {cartEmpty} from "../../core/helper/carthelper"

export const signup = user => {
    return fetch(`${API}user/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        // Include the password field in the response
        data.password = user.password;
        return data;
      })
      .catch(err => console.log("you have an error of", err, "Please resolve this issue"));
  };
  

//we could just copy the above and make small twiks and would have a working sign in app but we are using form data hear so we need to make a few diffrent changes

//form data why of handeling data
export const signin = user =>{
    //https://javascript.info/formdata
    const formData = new FormData()

    //this loop is responsable for creating the form data
    for(const name in user){
        formData.append(name, user[name])
    }

    for(let key of formData.keys()){
        console.log("theKey: ",  key);
    }

    return fetch(`${API}user/login/`, {
        method: "POST",
        body: formData,
    }).then(response =>{
        console.log("Success", response)
        return response.json();
    }
    ).catch(err => console.log("The error",err," must be fixed befor continuing"))
}

// both of these are two seprate way to accomplish the same task I could use json way to do signin and could use formdata way to do sign up


export const authenticate = (data, next) => {
    if (typeof window !== undefined ){
        localStorage.setItem("customeToken", JSON.stringify(data));
        next();

    }
}

export const isAuthenticated = () => {
     if (typeof window == undefined){
         return false
     }
     if(localStorage.getItem("customeToken")){
         return JSON.parse(localStorage.getItem("customeToken"))
        
     }else{
         return false
    }
}

export const signout = (next) => {
    const auth = isAuthenticated();
    const userId = auth && auth.user ? auth.user.userId : null;
  
    if (typeof window !== 'undefined') {
      localStorage.removeItem('customeToken');
      cartEmpty(() => {});
  
      return fetch(`${API}user/logout/${userId}`, {
        method: 'GET',
      })
        .then((response) => {
          console.log('Logout was successful');
          return <Navigate to="/" />;
        })
        .catch((err) => {
          console.log('Looks like there was an error:', err);
        });
    }
  };