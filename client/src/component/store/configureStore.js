import {combineReducers,createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import customersReducer from "../reducers/customers"
import customerReducer from "../reducers/customer"
import userReducer from "../reducers/user"
import departmentsReducer from '../reducers/departments'
import employeesReducer from '../reducers/employees'
import employeeReducer from '../reducers/employee'
import ticketsReducer from '../reducers/tickets'

const configureStore=()=>{
    const store=createStore(combineReducers({
        customers:customersReducer,
        customer:customerReducer,
        user:userReducer,
        departments:departmentsReducer,
        employees:employeesReducer,
        employee:employeeReducer,
        tickets:ticketsReducer
    }),applyMiddleware(thunk))
    return store
}

export default configureStore