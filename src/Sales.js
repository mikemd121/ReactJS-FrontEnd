import React from "react";
import { Variables } from "./Variables";
import { useState } from "react";
import { useEffect } from "react";

function Sales() {

    const [propertyList, setPropertyList] = useState([]);
    const [customerList,setCustomerList] = useState([]);
    const [CustomerId, setCustomer] = useState('');
    const [propertyId,setPropertyId] = useState(0);

    useEffect(()=>{
        fetch('https://localhost:44303/api/CustomerApi/customer-ids').then((response)=>{
    return response.json();
        }).then(responseData=>{
            setCustomerList((nameList)=>[...customerList,...responseData])    
        })
    },[]);


    const loadProperty=(e)=>{
        setCustomer(e);
        setPropertyList( propertyList => propertyList.length = 0);
        setPropertyList([]);
        console.log(propertyList);
        fetch(Variables.PROPERTY_GETAVAILABLEPROPERTY_URL+e).then((response)=>{
            return response.json();
                }).then(responseData=>{
                    setPropertyList((nameList)=>[...propertyList,...responseData])    
                })
      }


    function createClick(){}

    return(<div>
        <button type="button" className="btn btn-primary m-2 float-end" 
       data-toggle="modal"
        data-target="#exampleModal">Sell property</button>

<div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <div className="modal-body">
            <div className="input-group mb-3">

      <span className="input-group-text">Customer
            <select className="form-control valid" 
               onChange={(e) => loadProperty(e.target.value)}    >  
            {customerList.map((caldata, index) =>
                                <option 
                                key={index}
                                value= {caldata.id}
                                > {caldata.name} </option>
                              )}
            </select></span>

            <span className="input-group-text">Property
            <select className="form-control valid" 
               onChange={(e) => setPropertyId(e.target.value)}    >  
            {propertyList.map((caldata, index) =>
                                <option 
                                key={index}
                                value= {caldata.propertyId}
                                > {caldata.name} </option>
                              )}
            </select></span>

            </div>
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>

  
        <button type="button" className="btn btn-primary" onClick={()=>createClick()}>Create</button>

        
      </div>
    </div>
  </div>
</div>
</div>)
}

export default Sales;