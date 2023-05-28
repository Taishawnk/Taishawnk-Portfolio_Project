import React from "react";



 const ImageHelper = ({product}) => {
    const imgurl = product 
    ? product.image : ``
    return(
        <div className="rounded border border-sucess p-2">
            <img className="mb-3 rounded" 
                src={imgurl} 
                style={{maxHeight: "100% " , maxWidth: "100%"  }} 
                alt="pic of a handsom deer"
            />
            
        </div>

    )
}

export default ImageHelper;
