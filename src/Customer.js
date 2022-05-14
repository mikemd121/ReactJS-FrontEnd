import { Variables } from "./Variables";
import { React,useEffect, useState } from "react";

function Customer() {
    const [customerList,setCustomerList] = useState([]);
    const [Name,setName] = useState("");
    const [Address,setAddress] = useState("");
    const [Email,setEmail] = useState("");
    const [CustomerId,setCustomerId] = useState(0);
    const [count, setCount] = useState(0);

useEffect(()=>{

    setCustomerList( customerList => customerList.length = 0);
    setCustomerList([]);

    fetch('https://localhost:44303/api/CustomerApi/customer-ids').then((response)=>{
return response.json();
    }).then(responseData=>{
        setCustomerList((nameList)=>[...customerList,...responseData])    
        console.log(customerList);
    })
},[count]);

function createClick(){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            Name: Name,
            Address: Address,
            Email:Email})
    };
    const response =  fetch(Variables.CUSTOMER_POST_URL, requestOptions).then((response)=>{
        return response.json();
            }).then(responseData=>{
                console.log(responseData);
                setCount(count=>count+1);
            })

}

function editClick(customer){
    setCustomerId(customer.id);
    setName(customer.name);
}

function updateClick(customer){
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                CustomerId : CustomerId,
                Name: Name,
                Address: Address,
                Email:Email})
        };
        const response =  fetch(Variables.CUSTOMER_UPDATE_URL, requestOptions).then(responseData=>{
            console.log(responseData);
            setCount(count=>count+1);
        })
    }

    function deleteClick(customer){

        if(window.confirm('Are you sure want to delete customer?')){
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        };
        const response =  fetch(Variables.CUSTOMER_DELETE_URL+customer.id, requestOptions).then(responseData=>{
                    console.log(responseData);
                    setCount(count=>count+1);
                })
    }
    }

    return(
    <div>
        <button type="button" className="btn btn-primary m-2 float-end" 
       data-toggle="modal"
        data-target="#exampleModal">Add Department</button>
<table className="table table-striped">
<thead>
    <tr>
        <th>
            Name
        </th>
        <th>
            Address
        </th>
        <th>
            Email
        </th>
        <th>
            Operation
        </th>
    </tr>
</thead>
<tbody>
    {
        customerList.map(customer=>
            <tr key={customer.id}>
            <td>{customer.name}</td>
            <td>{customer.address}</td>
            <td>{customer.email}</td>
            <td>

                <button type="button" className="btn btn-light mr-1"
                       data-toggle="modal"
                       data-target="#exampleModal"            
                       onClick={()=>editClick(customer)}
                >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg>
                </button>
                
                <button type="button" className="btn btn-light mr-1"      
                                  onClick={()=>deleteClick(customer)}
                >
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
      <span className="input-group-text">Address
      <input type="text" className="form-control" value={Address} onChange={e => setAddress(e.target.value)}></input></span>
      <span className="input-group-text">Email
      <input type="text" className="form-control" value={Email} onChange={e => setEmail(e.target.value)}></input></span>
            </div>
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>

        {CustomerId==0?
        <button type="button" className="btn btn-primary" onClick={()=>createClick()}>Create</button>
        :null}

         {CustomerId!=0?
        <button type="button" className="btn btn-primary" onClick={()=>updateClick()}>Update</button>
        :null}
      </div>
    </div>
  </div>
</div>
    </div>
    
    )
}

export default Customer;