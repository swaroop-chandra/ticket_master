import axios from '../../config/axios'
import Swal from 'sweetalert2'

export const getCustomer=(customer)=>{
    return {type:"GET_CUSTOMER",payload:customer}
}

export const startGetCustomer=(id)=>{
    return (dispatch)=>{
        axios.get(`/customers/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            const customer=response.data
            dispatch(getCustomer(customer[0]))
        })
    }
}


export const startDeleteCustomer=(id,props)=>{
    return (dispatch)=>{
        axios.get(`/customers/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            const customer=response.data
            if(customer[1].length!==0){
                Swal.fire('Cannot Delete','Please delete from Ticket','error')
            }else{
                axios.delete(`/customers/${id}`,{
                    headers:{
                        'x-auth':localStorage.getItem('authToken')
                    }
                })
                .then(response=>{
                    setTimeout(()=>{
                    props.history.push('/customers')
                    },1500)
                })
            }
        })
        
    }
}

export const startAddCustomer=(data,props)=>{
    return (dispatch)=>{
        axios.post('/customers',data,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            if(response.data.hasOwnProperty('errors')){
                Swal.fire('From Cannot be Blank','please fill and submit','question')
            }else{
                props.history.push('/customers')
                Swal.fire('successfully Added.!','','success')
            }
        })
        .catch(err=>{
            alert(err)
        })
    }
}

export const startEditCustomer=(data,id,props)=>{
    return (dispatch)=>{
        axios.put(`/customers/${id}`,data,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            if(response.data.hasOwnProperty('error')){
                alert(response.data.message)
            }else{
                props.history.push(`/customers/${response.data._id}`)
                Swal.fire('successfully Edited.!','','success')
            }
        })
        .catch(err=>{
            alert(err)
        })
    }
}