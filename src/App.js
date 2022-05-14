import logo from './logo.svg';
import './App.css';
import Navbar from './Nav';
import {BrowserRouter ,Route, Routes } from 'react-router-dom';
import   Customer from './Customer';
import  Sales  from './Sales';
import  Property  from './Property';
import  Home from './Home';
import { GetRequestHooks } from './Sample';

function App() {
  return (
    <div className="App container">
   <h3 className='d-flex justify-content-center m-3'>
   </h3>  
<BrowserRouter>
<Navbar /> 
      <Routes>
      <Route exact path="/customer" element={<Customer/>}/>
      <Route exact path="/property" element={<Property/>}/>
      <Route exact path="/sales" element={<Sales/>}/>
      <Route exact path="/sample" element={<GetRequestHooks/>}/>
      <Route exact path="/" element={<Home/>}/>
</Routes>
</BrowserRouter>
      </div>
  );
}

export default App;
