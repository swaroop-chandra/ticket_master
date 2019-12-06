import axios from '../../config/axios'
import Swal from 'sweetalert2'

export const getDepartments=(dep)=>{
    return {type:"GET_DEPARTMENTS",payload:dep}
}

export const startGetDepartments=()=>{
    return (dispatch)=>{
        axios.get('/departments',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            const departments=response.data
            dispatch(getDepartments(departments))
        })
        .catch(err=>{
            alert(err)
        })
    }
}

export const addDepartment=(dep)=>{
    return {type:"ADD_DEPARTMENT",payload:dep}
}

export const startAddDepartment=(data)=>{
    return (dispatch)=>{
        axios.post('/departments',data,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            dispatch(addDepartment(response.data))
        })
        .catch(err=>{
            alert(err)
        })
    }
}

export const startEditDepartment=(data,id)=>{
    return (dispatch)=>{
        axios.put(`/departments/${id}`,data,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
        window.location.reload()  
        })
    }
}

export const deleteDepartment=(id)=>{
    return {type:"DELETE_DEPARTMENTS",
            payload:id}
}

export const startDeleteDepartment=(id)=>{
    return (dispatch)=>{
        axios.get('/tickets',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            const tickets=response.data
            const dep=tickets.find(tick=>tick.department._id==id)
            if(dep){
                Swal.fire('Cannot Delete','Please delete from Ticket','error')

            }else{

                    axios.get('/employees',{
                        headers:{
                            'x-auth':localStorage.getItem('authToken')
                        }
                    })
                    .then(response=>{
                        const employees=response.data
                        const dep=employees.find(empl=>empl.department._id==id)
                        if(dep){
                            Swal.fire('Cannot Delete','Please delete from Department','error')
            
                        }else{
                            axios.delete(`/departments/${id}`,{
                                headers:{
                                    'x-auth':localStorage.getItem('authToken')
                                }
                            })
                            .then(response=>{
                                dispatch(deleteDepartment(response.data._id))
                    
                            })
                        }
            
                    })        
            }

        })
        
    }
}