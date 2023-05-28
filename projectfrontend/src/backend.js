// this will be used so I dont have to constently touch my envirment variable
 //call to our .env file  makes it easy to use as I can just call API now when I need this url
export const API = process.env.REACT_APP_BACKEND;

console.log(`this is inside of the backemd.js ${API}`)