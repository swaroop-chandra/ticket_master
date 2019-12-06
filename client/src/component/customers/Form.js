import React from 'react'

class CustomerForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name:props.customer ? props.customer.name : '',
            mobile:props.customer ? props.customer.mobile: '',
            email:props.customer? props.customer.email: ''
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    
    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault()
        const formData={
            name:this.state.name,
            mobile:this.state.mobile,
            email:this.state.email
        }
        // console.log(formData)
        this.props.handleSubmit(formData)
    }

    render(){
        return (
            <div className='container'>
                <form onSubmit={this.handleSubmit} >
                    <div className='form-group inputBox offset-2 mt-3'>
                    <input className='form-control' placeholder='name' type='text' value={this.state.name} onChange={this.handleChange} name='name' required/>
                    </div>
                    <div className='form-group inputBox offset-2'>
                    <input className='form-control' placeholder='email' type='email' value={this.state.email} onChange={this.handleChange} name='email' required/>
                    </div>
                    <div className='form-group inputBox offset-2'>
                    <input className='form-control' placeholder='mobile' type='number' value={this.state.mobile} onChange={this.handleChange} name='mobile' required/>
                    </div><div className='text-center'>
                    <input type="submit" className='btn btn-primary'/></div>
                </form>
            </div>
        )
    }
}

export default CustomerForm