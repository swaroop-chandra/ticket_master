import React from 'react'
import {startGetDepartments} from '../actions/departments'
import {connect} from 'react-redux'

class EmpForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name:props.employee ? props.employee.name:'',
            email:props.employee ? props.employee.email:'',
            mobile:props.employee ? props.employee.mobile:'',
            department:props.employee?props.employee.department._id:'',
        }
        this.submitHandle=this.submitHandle.bind(this)
    }
    componentDidMount(){
        this.props.dispatch(startGetDepartments())
    }


    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    submitHandle(e){
        e.preventDefault()
        const formData={
            name:this.state.name,
            email:this.state.email,
            mobile:this.state.mobile,
            department:this.state.department
        }
        this.props.submitHandle(formData)
}

    render(){
        return (
            <form onSubmit={this.submitHandle}>
                <div className='form-group inputBox offset-2 mt-3'>
                    <input className='form-control' placeholder='name' type='text' value={this.state.name} onChange={this.handleChange} name='name' required/>
                </div>
                <div className='form-group inputBox offset-2'>
                    <input className='form-control' placeholder='email' type='email' value={this.state.email} onChange={this.handleChange} name='email' required/>
                </div>
                <div className='form-group inputBox offset-2'>
                    <input className='form-control' placeholder='mobile' type='number' value={this.state.mobile} onChange={this.handleChange} name='mobile' required/>
                </div> <div className='form-group inputBox offset-2'>
                <select className='form-control'  value={this.state.department} onChange={this.handleChange} name='department'>
                    <option>-----select----</option>
                    {this.props.departments.map(dep=>{
                        return <option key={dep._id} value={dep._id}>{dep.name}</option>
                    })}
                </select></div><div className='text-center'>
                <input type='submit' className='btn btn-primary mb-3'/>
                </div>
            </form>
        )
    }
}
const mapStateToProps=(state)=>{
    return {
        departments:state.departments
    }
}

export default connect(mapStateToProps)(EmpForm)