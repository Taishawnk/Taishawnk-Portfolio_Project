// for our back end api calls API in this context is coming from our backend.js file

import {API} from '../../backend';

export const getProducts = () => {
  console.log(`this is the API call ${API}product`)
    return fetch(`${API}product/`, {method: "GET"})// The problem was the lack of trailing slash at the end of product 
    .then(response => {
        return response.json();//this was a problem had it console.log and it was breking it have to call CL outside of the function like I did below
    }

    ).catch(err => console.log('this is the error we are seeing ' ,err))
}

console.log(getProducts())



/* 
import { API } from '../../backend';

export const getProducts = () => {
  return fetch(`${API}product`, { method: 'GET' })//added no cors for testing 
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();//this was a problem had it console.log and it was breking it have to call CL outside of the function like I did below
    })
    .catch(err => console.log(err));
};

getProducts()
  .then(data => console.log(data))
  .catch(error => console.log(error));

*/ 