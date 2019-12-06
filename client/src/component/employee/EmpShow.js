import React from 'react'
import { connect } from 'react-redux'
import {startGetEmployee,startDeleteEmployee} from '../actions/employee'
import employ from '../images/emp2.png'
import {Card ,Button} from 'react-bootstrap'
import Swal from 'sweetalert2'

class EmpShow extends React.Component{

    removeHandle=()=>{
        const id=this.props.match.params.id
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
            this.props.dispatch(startDeleteEmployee(id,this.props))
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
    }

    componentDidMount(){
        const id=this.props.match.params.id
        this.props.dispatch(startGetEmployee(id))
    }
    render(){
        return (
            <div className='container mr-3'>
            <div className='row mt-3'>
            <h1 className='text-secondary' style={{position:'relative',left:'80px'}}>Employee Info</h1>
            </div>
            <div className='row'>
                <div className='col-md-6'>
                <img src={employ} alt='Employee detail' style={{position:'relative',width:'300',height:'450px',top:'20px',left:'30px'}}/>
                </div>
                <div className='col-md-6 mt-5'>
                <Card style={{height:'auto',width:'300px' }}>
                    <Card.Header as='h1' className='text-center' style={{height:'80px'}}>Details</Card.Header>
                <Card.Body>
                    <Card.Title as='h3' className='mt-1'>Name: {this.props.employee.name}</Card.Title>
                    <Card.Text>Email:{this.props.employee.email}</Card.Text>
                    <Card.Text>Department:{this.props.employee.department && this.props.employee.department.name}</Card.Text>
                    <Card.Footer>
                    <Button className='w-40' href={`/employee/edit/${this.props.match.params.id}`}>Edit</Button>
                    <Button className='float-right bg-danger' onClick={this.removeHandle}>Delete</Button>
                    </Card.Footer>
                </Card.Body>
                </Card>
                </div>
            </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        employee:state.employee
    }
}

export default connect(mapStateToProps)(EmpShow)