import { API } from "../../backend";
//this is all comming from the payment section of the back end url routes can be found in payment urls file
export const getmeToken = (userId, token) => {
    
    return fetch(`${API}payment/gettoken/${userId}/${token}/`, {
      method: "GET",
      
    })
      .then(response => response.json())

      .catch(error => console.log("Oops, an error occurred:", error));
  };

export const processPayment = (userId, token, paymentInfo) => {
    const formData = new FormData();
    for(const key in paymentInfo){
        formData.append(key, paymentInfo[key])
    }

    return fetch(`${API}payment/transaction/${userId}/${token}/`, {
        method: "POST",
        body: formData,
    }).then(response => {
        return response.json();
    }).catch(error => console.log("hmmm looks like there has been a error", error))
}