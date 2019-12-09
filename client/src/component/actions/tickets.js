import axios from '../../config/axios'
import Swal from 'sweetalert2'

export const getTickets=(tickets)=>{
    return {type:"GET_TICKETS",payload:tickets}
}

export const startGetTickets=()=>{
    return (dispatch)=>{
        axios.get('/tickets',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            dispatch(getTickets(response.data))

        })
    }
}

export const addTickets=(data)=>{
    return {type:"ADD_TICKETS",payload:data}
}

export const startAddTickets=(data)=>{
    return (dispatch)=>{
    axios.post('/tickets',data,{
        headers:{
            'x-auth':localStorage.getItem('authToken')
        }
    })
    .then(response=>{
        if(response.data.hasOwnProperty('errors')){
            Swal.fire(response.data.message,'','error')
        }else{
            // dispatch(addTickets())
            window.location.reload()

        }
    })
    .catch(err=>{
        alert(err)
    })
}
}

export const checkHandle=(data)=>{
    return {type:"CHECKED_TICKET",payload:data}
}

export const startCheckHandle=(data,id)=>{
    return (dispatch)=>{
        axios.put(`/tickets/${id}`,data,{headers:{
            'x-auth':localStorage.getItem('authToken')
        }})
        .then(response=>{
            dispatch(checkHandle(response.data))
            // window.location.reload()

        })
    }
}

export const deleteTickst=(data)=>{
    return {type:"DELETE_TICKET",payload:data}
}
export const startDeleteHandle=(id)=>{
    return (dispatch)=>{
        axios.delete(`/tickets/${id}`,{headers:{
            'x-auth':localStorage.getItem('authToken')
        }})
        .then(response=>{
            dispatch(deleteTickst(response.data._id))
        })
    }
}