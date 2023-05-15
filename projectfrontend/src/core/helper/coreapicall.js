// for our back end api calls API in this context is coming from our backend.js file
import React from 'react';
import {API} from '../../backend';

export const getProducts = () => {
    return fetch(`${API}product`, {method: "GET"})
    .then(response => {
        return response.json();
    }

    ).catch(err => console.log(err))
}

console.log(getProducts())



