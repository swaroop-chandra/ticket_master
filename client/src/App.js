import React from 'react';
import Home from './component/common/Home'
import Login from './component/users/Login'
import Register from './component/users/Register'

import DepList from './component/department/DepList'


import CustomerList from './component/customers/List'
import AddCustomer from './component/customers/AddCustomer'
import EditCustomer from './component/customers/EditCustomer';
import ShowCustomer from './component/customers/ShowCustomer'

import EmpList from './component/employee/EmpList'
import AddEmp from './component/employee/AddEmp'
import EmpShow from './component/employee/EmpShow';
import EditEmp from './component/employee/EditEmp';

import TicketList from './component/ticket/TicketList';

import axios from './config/axios'
import { BrowserRouter,Route,Link ,Switch} from 'react-router-dom';
import {Nav,Navbar} from 'react-bootstrap'
import Swal from 'sweetalert2'
import PrivateRoute from './component/PrivateRoute/PrivateRoute'

function handleClick(){
  axios.delete('/users/logout',{
    headers:{
      'x-auth':localStorage.getItem('authToken')
    }
  })
  .then(response=>{
    Swal.fire({
      icon: 'success',
      title: 'successfully logged out.!',
      showConfirmButton: false,
      timer: 1500
    })
    setTimeout(()=>{
      localStorage.removeItem('authToken')
      window.location.href='/'
    },1000)
  })
}

function App() {
  return (
    <BrowserRouter>
      <Navbar className='bg-dark'>
      <Navbar.Brand ><Link to='/customers' className='padding mr-3 text-decoration-none text-white'>Ticket Master</Link></Navbar.Brand>
      {!localStorage.getItem('authToken') ? <Nav.Item>
      <Link to='/users/register' className='padding mr-3 text-decoration-none navCol'>register</Link> 
      <Link to='/users/login' className='padding mr-3 text-decoration-none navCol'>Login</Link> 
      </Nav.Item>:<Nav.Item>
      <Link to='/customers' className='padding mr-3 text-decoration-none navCol'>customers</Link>
      <Link to='/department' className='padding mr-3 text-decoration-none navCol'>department</Link>
      <Link to='/employee' className='padding mr-3 text-decoration-none navCol'>employee</Link>
      <Link to='/ticket' className='padding mr-3 text-decoration-none navCol'>ticket</Link>
      <Link to='#' className='padding mr-3 text-decoration-none navCol' onClick={handleClick}>Logout</Link>
      </Nav.Item>}
      </Navbar>
      


      <Switch>
      <Route path='/' component={Home} exact={true}/>
      <Route path='/users/register' component={Register}/>
      <Route path='/users/login' component={Login}/>

    <PrivateRoute path='/customers' component={CustomerList} exact={true}/>
    <PrivateRoute path='/customers/add' component={AddCustomer} exact={true}/>
    <PrivateRoute path='/customers/edit/:id' component={EditCustomer}/>
    <PrivateRoute path='/customers/:id' component={ShowCustomer} />

    <PrivateRoute path='/department' component={DepList} exact={true}/>

    <PrivateRoute path='/employee' component={EmpList} exact={true}/>
    <PrivateRoute path='/employee/add' component={AddEmp}/>
    <PrivateRoute path='/employee/edit/:id' component={EditEmp}/>
    <PrivateRoute path='/employee/:id' component={EmpShow}/>

    <PrivateRoute path='/ticket' component={TicketList}/>


    </Switch>
    </BrowserRouter>    
  )
}

export default App;
