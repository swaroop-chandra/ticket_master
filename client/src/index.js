import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import '../node_modules/bootstrap/dist/css/bootstrap.css'

import {startGetCustomers} from './component/actions/customers'
import {startGetDepartments} from './component/actions/departments'
import {startGetEmployees} from './component/actions/employees'
import {startGetTickets} from './component/actions/tickets'
import configureStore from './component/store/configureStore'


const store=configureStore()

// store.subscribe(()=>{
//     console.log(store.getState())
// })

if(localStorage.getItem('authToken')){
    store.dispatch(startGetTickets())
    store.dispatch(startGetCustomers())
    store.dispatch(startGetDepartments())
    store.dispatch(startGetEmployees())    
}

const ele=(
    <Provider store={store}>
        <App />
    </Provider>
)
ReactDOM.render(ele, document.getElementById('root'));
