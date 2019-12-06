import React from 'react'
import EmpForm from './EmpForm'
import {startAddEmployee} from '../actions/employee'
import addEmpl from '../images/emp3.png'
import {Card} from 'react-bootstrap'
import {connect} from 'react-redux'

class AddEmp extends React.Component{
    constructor(){
        super()
        this.submitHandle=this.submitHandle.bind(this)
    }

    submitHandle=(formData)=>{
        this.props.dispatch(startAddEmployee(formData,this.props))
    }
    render(){
        return (
            <div className='container'>
            <div className='row mt-3'>
            <h1 className='text-secondary' style={{position:'relative',left:'220px'}}>Add Employee</h1>
            </div>
            <div className='row'>
                <div className='col-md-6'>
                <img src={addEmpl} alt='customer add' style={{position:'relative',width:'300',height:'450px',top:'20px',left:'200px'}}/>
                </div>
                <div className='col-md-6 mt-5'>
                <Card style={{height:'auto',width:'340px'}}>
                <Card.Header as='h1' className='text-center' style={{height:'80px'}}>Details</Card.Header>
                <EmpForm submitHandle={this.submitHandle}/></Card>
            </div></div></div>
        )
    }
}

export default connect()(AddEmp)