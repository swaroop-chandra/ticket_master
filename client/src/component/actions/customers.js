import axios from '../../config/axios'

export const getCustomers=(customers)=>{
    return {type:"GET_CUSTOMERS",payload:customers}
}

export const startGetCustomers=()=>{
    return (dispatch)=>{
        axios.get('/customers',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            const customers=response.data
            dispatch(getCustomers(customers))
        })
        .catch(err=>{
            alert(err)
        })
    }
}