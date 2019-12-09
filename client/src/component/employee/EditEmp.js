import React from 'react'
import EmpForm from './EmpForm'
import {Card} from 'react-bootstrap'
import editEmpl from '../images/emp4.png'
import { connect } from 'react-redux'
import {startGetEmployee,startEditEmployee} from '../actions/employee'

class EditEmp extends React.Component{

    componentDidMount(){
        const id=this.props.match.params.id
        this.props.dispatch(startGetEmployee(id))
    }

    submitHandle=(formData)=>{
        const id=this.props.match.params.id
        this.props.dispatch(startEditEmployee(id,formData,this.props))
    }
    render(){
            // console.log(this.props.employee)

        return (
            <div className='container'>
            <div className='row mt-3'>
            <h1 className='text-secondary' style={{position:'relative',left:'220px'}}>Edit Employee</h1>
            </div>
            <div className='row'>
                <div className='col-md-6'>
                <img src={editEmpl} alt='customer Edit' style={{position:'relative',width:'300',height:'450px',top:'20px',left:'80px'}}/>
                </div>
                <div className='col-md-6 mt-5'>
                <Card style={{height:'auto',width:'340px'}}>
                <Card.Header as='h1' className='text-center' style={{height:'80px'}}>Details</Card.Header>
                {Object.keys(this.props.employee).length!==0 && <EmpForm 
                employee={this.props.employee} submitHandle={this.submitHandle}/>}</Card>
            </div></div></div>
        )
    }
}
const mapStateToProps=(state)=>{
    return {
        employee:state.employee
    }
}
export default connect(mapStateToProps)(EditEmp)