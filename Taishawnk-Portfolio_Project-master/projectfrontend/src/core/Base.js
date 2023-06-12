import React from "react";
import Menu from "./Menu";

// this file is or everthing that is 

const Base = ({
title = 'Taishawn Portfolio E-Commerce',
description = "A Mock ECommerce site",
className = "card-f bg-dark text-white p-4",
children //is responsable for basic templete insertion of components
}) =>{ 
    return(
        <div className="wholeProjectDiv">
            <Menu/> 
            <div className=" nav-wrapper container-fluid">{/*Nav*/}
                <div className="jubotron bg-dark text-white text-center">
                    <h2 className="page-title display-4">{title}</h2>
                    <p className="page-title-discription lead">{description}</p>
                </div>

                <div className={className}>{/*body*/}
                    {children}{/*all of my products in this case*/}
                </div>
                
                
                
                <footer className="footer bg-dark mt-auto py-3">{/*footer*/}
                    <div className="container-fluid rounded bg-success text-white text-center py-3">
                        <h4>If you have any question, reach out to us at Triforge main site </h4>
                        <button className=" btn btn-warning  btn-lg" ><a className="contact-btn" href="https://www.triforgetech.com/">Contact </a></button>
                        <div className="container">  
                            <span className="text-muted">An Amazing Site using Django and React</span>
                        </div>
                    </div>
                </footer>
            </div>

        </div>
    )
}



export default Base;



//note to self when using the {} like we are above you have ti use return if not using {} then can get away with just return