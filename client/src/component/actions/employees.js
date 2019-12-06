import axios from '../../config/axios'

export const getEmployees=(emp)=>{
    return {type:"GET_EMPLOYEES",payload:emp}
}

export const startGetEmployees=()=>{
    return (dispatch)=>{
        axios.get('/employees',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            dispatch(getEmployees(response.data))
        })
    }
}