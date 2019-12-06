import axios from '../../config/axios'
import Swal from 'sweetalert2'

export const getEmployee=(emp)=>{
    return {type:"GET_EMPLOYEE",payload:emp}
}

export const startGetEmployee=(id)=>{
    return (dispatch)=>{
        axios.get(`/employees/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            dispatch(getEmployee(response.data))
        })
    }
}




export const startDeleteEmployee=(id,props)=>{
    return (dispatch)=>{
        axios.delete(`/employees/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            setTimeout(()=>{
            props.history.push('/employee')
            },1500)
        })
        
    }
}

export const startAddEmployee=(data,props)=>{
    return (dispatch)=>{
        axios.post('/employees',data,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            if(response.data.hasOwnProperty('errors')){
                Swal.fire(response.data.message)
            }else{
                props.history.push('/employee')
                Swal.fire('successfully Added.!','','success')
            }
        })
        .catch(err=>{
            alert(err)
        })
    }
}

export const startEditEmployee=(id,data,props)=>{
    return (dispatch)=>{
        axios.put(`/employees/${id}`,data,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            if(response.data.hasOwnProperty('error')){
                Swal.fire(response.data.message)
            }else{
                props.history.push(`/employee`)
                Swal.fire('successfully Edited.!','','success')
            }
        })
        .catch(err=>{
            alert(err)
        })
    }
}