import React from 'react'
import {startUserRegister} from '../actions/user'
import {connect} from 'react-redux'
import logo from '../images/logo.jpg'
import '../../App.css'

class Register extends React.Component{
    constructor(){
        super()
        this.state={
            username:'',
            email:'',
            password:''
        }
    }

    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        const formData={
            username:this.state.username,
            email:this.state.email,
            password:this.state.password
        }
        console.log(formData)
        this.props.dispatch(startUserRegister(formData,this.props))
    }

    render(){
        return (<div className='row mt-5'>
            <div className='col-md-3 offset-3 mt-5 '><img src={logo} alt='logo' style={{position:'relative',width:'220px',height:'200px',
             left:'70px',top:'20px'}}/></div>
            <div className='col-md-3 mt-5 '>
                <h2 className='text-primary'>Register Page</h2>
                <form onSubmit={this.handleSubmit}>
                <div className='form-group inputBox'>
                    <input className='form-control' placeholder='name' type='text' value={this.state.name} onChange={this.handleChange} name="username" required/>
                </div >
                <div className='form-group inputBox'>
                    <input className='form-control' placeholder='email' type='email' value={this.state.email} onChange={this.handleChange} name="email" required/>
                </div >
                <div className='form-group inputBox'>
                    <input className='form-control' placeholder='password' type='password'value={this.state.password} onChange={this.handleChange} minLength='8' name="password" required/>
                </div >
                <div >
                <input type='submit' className='btn btn-primary'/>
                </div>
                </form>
            </div>
            </div>
        )
    }
}

export default connect()(Register)