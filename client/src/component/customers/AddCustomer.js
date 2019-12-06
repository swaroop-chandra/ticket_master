import React from 'react'
import CustomerForm from './Form'
import { connect } from 'react-redux'
import {startAddCustomer} from '../actions/customer'
import addCustom from '../images/customer.png'
import {Card} from 'react-bootstrap'

class AddCustomer extends React.Component{
    handleSubmit=(formData)=>{
        this.props.dispatch(startAddCustomer(formData,this.props))
    }
    render(){
        return (<div>
            <div className='row mt-3'>
            <h1 className='text-secondary' style={{position:'relative',left:'290px'}}>Add Customer</h1>
            </div>
            <div className='row'>
                <div className='col-md-6'>
                <img src={addCustom} alt='customer add' style={{position:'relative',width:'300',height:'500px',left:'150px'}}/>
                </div>
                <div className='col-md-6 mt-5'>
                <Card style={{height:'325px',width:'310px'}}>
                <Card.Header as='h1' className='text-center' style={{height:'80px'}}>Details</Card.Header>
                <CustomerForm handleSubmit={this.handleSubmit}/></Card>
            </div></div></div>
        )
    }
}

export default connect()(AddCustomer)