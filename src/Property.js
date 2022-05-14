import React from "react";
import { Variables } from "./Variables";
import { useEffect } from "react";
import { useState } from "react";

function Property() {
    const [propertyList,setPropertyList] = useState([]);
    const [customerList,setCustomerList] = useState([]);
    const [Name,setName] = useState("");
    const [No,setNo] = useState("");
    const [Street,setStreet] = useState("");
    const [City,setCity] = useState("");
    const [Type,setType] = useState("");
    const [propertyId,setPropertyId] = useState(0);
    const [CustomerId, setCustomer] = useState(0);
    const [count, setCount] = useState(0);


    useEffect(()=>{
        setPropertyList( propertyList => propertyList.length = 0);
        setPropertyList([]);
        fetch(Variables.PROPERTY_URL).then((response)=>{
    return response.json();
        }).then(responseData=>{
            setPropertyList((nameList)=>[...propertyList,...responseData])    
            console.log(responseData);
        })
    },[count]);


    useEffect(()=>{
        fetch('https://localhost:44303/api/CustomerApi/customer-ids')
            .then((res) => {
                return res.json();
            }).then((json) => {
                setCustomerList((nameList)=>[...customerList,...json])    
                console.log(json);
            });
        },[]);


    function createClick(){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                name: Name,
                no: No,
                street: Street,
                city: City,
                type: Type,
                customerId:CustomerId
            })
        };
        const response =  fetch(Variables.PROPERTY_POST_URL, requestOptions).then((response)=>{
            return response.json();
                }).then(responseData=>{
                    console.log(responseData);
                    setCount(count=>count+1);
                })
    }
    
    function editClick(property){
        setPropertyId(property.propertyId);
        setName(property.name);
    }

    function deleteClick(customer){

        if(window.confirm('Are you sure want to delete customer?')){
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        };
        const response =  fetch(Variables.CUSTOMER_DELETE_URL+customer.id, requestOptions);
        const data =  response.json();
        this.setState({ postId: data.id });
    }
    }

    function updateClick(property){
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                Name: Name,
                No: No,
                Street:Street,
                City:City,
                Type:Type})
        };
        const response =  fetch(Variables.CUSTOMER_UPDATE_URL, requestOptions);
        const data =  response.json();
        this.setState({ postId: data.id });
    }

    return(<div>
        <button type="button" className="btn btn-primary m-2 float-end" 
       data-toggle="modal"
        data-target="#exampleModal">Add Property</button>
<table className="table table-striped">
<thead>
    <tr>
        <th>
            Property Name
        </th>
        <th>
            Property No
        </th>
        <th>
            Street
        </th>
        <th>
            City
        </th>
        <th>
            Property Type
        </th>
        <th>
           Buyer Name
        </th>
        <th>
            Operation
        </th>
    </tr>
</thead>
<tbody>
    {
        propertyList.map(property=>
            <tr key={property.propertyId}>
            <td>{property.name}</td>
            <td>{property.no}</td>
            <td>{property.street}</td>
            <td>{property.city}</td>
            <td>{property.type}</td>
            <td>{property.buyerName}</td>
            <td>

                <button type="button" className="btn btn-light mr-1"
                                      data-toggle="modal"
                                      data-target="#exampleModal"            
                                      onClick={()=>editClick(property)} >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg>
                </button>
                
                <button type="button" className="btn btn-light mr-1"
                 onClick={()=>deleteClick(property)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
  <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg>
                </button>
            </td>
            </tr>
        )
    }
</tbody>
</table>


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
           <span className="input-group-text">Name
      <input type="text" className="form-control" value={Name} onChange={e => setName(e.target.value)}></input></span>
      <span className="input-group-text">No
      <input type="text" className="form-control" value={No} onChange={e => setNo(e.target.value)}></input></span>
      <span className="input-group-text">Street
      <input type="text" className="form-control" value={Street} onChange={e => setStreet(e.target.value)}></input></span>
      <span className="input-group-text">City
      <input type="text" className="form-control" value={City} onChange={e => setCity(e.target.value)}></input></span>
      <span className="input-group-text">Type
      <input type="text" className="form-control" value={Type} onChange={e => setType(e.target.value)}></input></span>
      <span className="input-group-text">Customer
            <select className="form-control valid" 
               onChange={(e) => setCustomer(e.target.value)}    defaultValue={{ label: "Mumbai", value: "Mumbai" }}>  
            {customerList.map((caldata, index) =>
                                <option 
                                key={index}
                                value= {caldata.id}
                                > {caldata.name} </option>
                              )}

            </select></span>


            </div>
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>

        {propertyId==0?
        <button type="button" className="btn btn-primary" onClick={()=>createClick()}>Create</button>
        :null}

         {propertyId!=0?
        <button type="button" className="btn btn-primary" onClick={()=>updateClick()}>Update</button>
        :null}
      </div>
    </div>
  </div>
</div>

    </div>)
}

export default Property;
