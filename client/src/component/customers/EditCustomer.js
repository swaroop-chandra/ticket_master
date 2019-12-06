import React from 'react'
import {Card} from 'react-bootstrap'
import CustomerForm from './Form'
import editCustom from '../images/man6.png'
import { connect } from 'react-redux'
import {startGetCustomer,startEditCustomer} from '../actions/customer'

class EditCustomer extends React.Component{

    componentDidMount(){
        const id=this.props.match.params.id
        this.props.dispatch(startGetCustomer(id))
    }

    handleSubmit=(formData)=>{
        const id=this.props.match.params.id
        this.props.dispatch(startEditCustomer(formData,id,this.props))
    }
    render(){
        return (<div>
            <div className='row mt-3'>
            <h1 className='text-secondary' style={{position:'relative',left:'290px'}}>Edit Customer</h1>
            </div>
            <div className='row'>
                <div className='col-md-6'>
                <img src={editCustom} alt='customer edit' style={{position:'relative',width:'300',height:'500px',left:'150px'}}/>
                </div>
                <div className='col-md-6 mt-5'>
                <Card style={{height:'325px',width:'310px'}}>
                <Card.Header as='h1' className='text-center' style={{height:'80px'}}>Details</Card.Header>
                {Object.keys(this.props.customer).length!==0 && <CustomerForm 
                customer={this.props.customer} handleSubmit={this.handleSubmit}
                />}</Card>
            </div></div></div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        customer:state.customer
    }
}
export default connect(mapStateToProps)(EditCustomer)