import React from 'react'
import {startGetDepartments,startAddDepartment,startEditDepartment,startDeleteDepartment} from '../actions/departments'
import {connect} from 'react-redux'
import {Button} from 'react-bootstrap'
import Swal from 'sweetalert2'
import dep from '../images/dep2.png'

class DepList extends React.Component{
    constructor(){
        super()
        this.state={
            text:"",
            isEdit:true,
            id:''
        }
    }

    handleChange=(e)=>{
        const text=e.target.value
        this.setState({text})
    }

    addHandle=()=>{
        const data={"name":this.state.text}
        this.props.dispatch(startAddDepartment(data))
        Swal.fire('Added','','success')
        this.setState({text:''})        
    }

    editHandle=(id,name)=>{
        this.setState({text:name,id, isEdit:false})
    }


    saveHandle=()=>{
        const id=this.state.id
        const data={"name":this.state.text}
        this.props.dispatch(startEditDepartment(data,id))
    }

    handleRemove=(e)=>{
        const id=e.target.value

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
            this.props.dispatch(startDeleteDepartment(id))
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
    }
    

    render(){
        return (
            <div className='col-md-8 offset-2'>
            <div className='row'><h2 className='text-primary mt-3'>Department List -{this.props.departments.length}</h2>
            <input className=' mt-4 col-md-2 offset-5' type='text' value={this.state.text} onChange={this.handleChange}/>
            {this.state.isEdit ?
            (<Button className='col-md-1  mt-4' onClick={this.addHandle} disabled={this.state.text.length!==0 ? false:true}>Add</Button>):(<Button onClick={this.saveHandle} className='bg-warning col-md-1 mt-4'>save</Button>)
            }</div>
            <div className='row'>
            <div className='col-md-6'>
                <img src={dep} alt='department' style={{position:'relative',width:'300',height:'500px',right:'80px'}}/>
            </div>
            <div className='col-md-6 mt-5'>
            <ul className='list-group'>
            {   
                this.props.departments.map(department=>{
                   return <li className='list-group-item shadow p-3 mb-3 bg-white rounded' key={department._id}>{department.name}<Button className='bg-danger float-right' value={department._id} onClick={this.handleRemove}>remove</Button><Button className='float-right' style={{position:'relative',right:'10px'}} onClick={()=>this.editHandle(department._id,department.name)}>Edit</Button></li>
                })                    
            }
            </ul>
            </div>
        </div>    
    </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        departments:state.departments
    }
}

export default connect(mapStateToProps)(DepList)