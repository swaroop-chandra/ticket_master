import React from 'react'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import {Button} from 'react-bootstrap'
import customer from '../images/man.png'
import {startGetCustomers} from '../actions/customers'

class CustomerList extends React.Component{

    componentDidMount(){
        this.props.dispatch(startGetCustomers())
    }

    render(){
        return (
            <div className='col-md-8 offset-2'>
              <div className='row'>
                <h2 className='text-secondary mt-3'>ListingCustomers-{this.props.customers.length}</h2>
                <Button className=' mt-4 col-md-2 offset-5' href='/customers/add'>Add Customer</Button></div>
                <div className='row'>
                <div className='col-md-6'>
                    <img src={customer} alt='customers List' style={{position:'relative',width:'300',height:'500px',right:'70px'}}/>
                </div>
                <div className='col-md-6'>
                    <ul className='list-group mt-3'>
                {this.props.customers.map(customer=>{
                    return (
                        <li className='list-group-item shadow p-3 mb-3 bg-white rounded' key={customer._id}><Link to={`/customers/${customer._id}`} className='text-decoration-none'>{customer.name}</Link></li>
                    )})}
                </ul>
                </div></div>
            </div>
        )
    }

}

const mapStateToProps=(state)=>{
    return {
        customers:state.customers
    }
}

export default connect(mapStateToProps)(CustomerList)