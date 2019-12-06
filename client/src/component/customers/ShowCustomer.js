import React from 'react'
import { Card ,Button} from 'react-bootstrap'
import { connect } from 'react-redux'
import {startGetCustomer,startDeleteCustomer} from '../actions/customer'
import customer from '../images/tmppage2.png'
import Swal from 'sweetalert2'

class ShowCustomer extends React.Component{
    componentDidMount(){
        const id=this.props.match.params.id
        this.props.dispatch(startGetCustomer(id))

    }

    removeHandle=()=>{
        const id=this.props.match.params.id
        this.props.dispatch(startDeleteCustomer(id,this.props))
        Swal.fire('Deleted!','','error')
    }
    render(){
        console.log(this.props.customer)
        return (<div className='container mr-3'>
            <div className='row mt-3'>
                <h1 className='text-secondary' style={{position:'relative',left:'80px'}}>Customer Information</h1>
            </div>
            <div className='row'>
                <div className='col-md-6'>
                <img src={customer} alt='customer detail' style={{position:'relative',width:'300',height:'500px',bottom:'30px',left:'20px'}}/>
                </div>
                <div className='col-md-6 mt-5'>
                <Card style={{height:'auto',width:'300px' }}>
                    <Card.Header as='h1' className='text-center' style={{height:'80px'}}>Details</Card.Header>
                <Card.Body>
                    <Card.Title as='h3' className='mt-1'>Name: {this.props.customer.name}</Card.Title>
                    <Card.Text>Email:{this.props.customer.email}</Card.Text>
                    <Card.Text>Mobile:{this.props.customer.mobile}</Card.Text>
                    <Card.Footer>
                    <Button className='w-40' href={`/customers/edit/${this.props.match.params.id}`}>Edit</Button>
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
        customer:state.customer
    }
}

export default connect(mapStateToProps)(ShowCustomer)