import React from 'react'
import {startAddTickets} from '../actions/tickets'
import { connect } from 'react-redux';


class TicketForm extends React.Component{
    constructor(){
        super()
        this.state={
            department:'',
            customer:'',
            priority:'',
            message:'',
            code:'DCT'+Math.round(Math.random()*100),
            isResolve:false,
        }
    }

handleChange=(e)=>{
    this.setState({[e.target.name]:e.target.value})
}

    submitHandle=(e)=>{
        e.preventDefault()
        const formData={
            customer:this.state.customer,
            department:this.state.department,
            priority:this.state.priority,
            code:this.state.code,
            message:this.state.message  
        }
        // console.log(formData)
        this.props.dispatch(startAddTickets(formData))
    }

    render(){
        return (
            <form onSubmit={this.submitHandle}>
                    <div className='form-group p-3 '>
                    <select className='form-control'value={this.state.customer} onChange={this.handleChange} name='customer'>
                        <option>---select customer---</option>
                        {this.props.customers.map(cust=>{
                            return <option key={cust._id} value={cust._id}>{cust.name}</option>
                        })}
                    </select>
                    </div>
                    <div className='form-group'>
                    <select className='form-control' value={this.state.department} onChange={this.handleChange} name='department'>
                    <option>---select department---</option>
                        {this.props.departments.map(dep=>{
                            return <option key={dep._id} value={dep._id}>{dep.name}</option>
                        })}
                    </select>
                    </div>
                    <div className='form-group text-center'>
                        <input type='radio' name='priority' id='high' value='high' onChange={this.handleChange}/><label htmlFor='high'>high</label>
                        <input type='radio' name='priority' id='medium' value='medium' onChange={this.handleChange}/><label htmlFor='medium'>medium</label>
                        <input type='radio' name='priority' id='low' value='low'onChange={this.handleChange}/><label htmlFor='low'>low</label>
                    </div>
                    <div className='form-group'>
                    <textarea className='form-control' placeholder='Some text' value={this.state.message} onChange={this.handleChange} name='message'></textarea>
                    </div>
                    <input type='submit' className='btn btn-primary'/>
                </form>
        )
    }
}
const mapStateToProps=(state)=>{
    return {
    tickets:state.tickets,
    customers:state.customers,
    departments:state.departments
}
}

export default connect(mapStateToProps)(TicketForm)