import React from 'react'
import { Link } from 'react-router-dom'
import {Table,Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {startGetEmployees} from '../actions/employees'
import employ from '../images/emp1.png'

class EmpList extends React.Component{

    componentDidMount(){
        this.props.dispatch(startGetEmployees())
    }

    render(){      
        return(
            <div className='container'>
                <div className='row'>
                <h2 className='text-secondary mt-3'>ListingEmployees-{this.props.employees.length}</h2>
                <Button className=' mt-3 col-md-2 offset-6' href='/employee/add'>Add Employee</Button></div>
                <div className='row'>
                <div className='col-md-4'>
                    <img src={employ} alt='employee list' style={{position:'relative',width:'300',height:'500px',right:'80px'}}/>
                </div>
                <div className='col-md-8 mt-4'>
                <Table striped bordered hover className=''>
                    <thead className='bg-dark text-light'>
                        <tr style={{brder:'1px solid black'}} >
                            <th>sl.no</th>
                            <th>name</th>
                            <th>department</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.props.employees.map((emp,index)=>{
                        return (
                        <tr key={emp._id}>
                            <td>{index+1}</td>
                            <td>{emp.name}</td>
                            <td>{emp.department && emp.department.name}</td>
                            <td><Link to={`/employee/${emp._id}`} className='text-decoration-none'>Show</Link></td>
                        </tr>)
                    })}
                    </tbody>
                </Table>
                </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        employees:state.employees
    }
}
export default connect(mapStateToProps)(EmpList)