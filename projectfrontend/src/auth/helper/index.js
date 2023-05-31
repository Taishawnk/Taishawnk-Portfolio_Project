//this section will handle Auth
//jason way to handle data 
import { json } from "react-router-dom";
import {API} from "../../backend"
import {cartEmpty} from "../../core/helper/carthelper"

export const signup = user =>{
    return fetch(`${API}user/`, {
        method : "POST",
        headers: {
            Accept: "application/json", //accept the content I am sending 

            "Content-type": "application/json" //content must be json
        },
        body: JSON.stringify(user)
    }).then(
       response => {
        return response.json();
       }
    ).catch(
        err => console.log("you have a error of",err,"Please resolve this issue")
    )
    
}

//we could just copy the above and make small twiks and would have a working sign in app but we are using form data hear so we need to make a few diffrent changes

//form data why of handeling data
export const signin = user =>{
    //https://javascript.info/formdata
    const formData = new FormData()
    for(const name in user){
        formData.append(name, user[name])
    }

    return fetch(`${API}user/login/`, {
        method: "POST",
        body: FormData
    }).then(response =>{
        return response.json
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

export const signout= next => {
    const userId = isAuthenticated() && isAuthenticated().user.userId


    if(typeof window !== undefined){
        localStorage.removeItem("customeToken")
        cartEmpty(() => {});
        //next()

        return fetch(`${API}user/logout/${userId}`, {
            method: "GET"
        }).then(response => console.log("log out was success")).catch(
            err => console.log("looks like there was a error of", err)

        )
    }
}