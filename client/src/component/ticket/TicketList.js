import React from 'react'
import TicketForm from './TicketForm'
import {Table , Button,ProgressBar} from 'react-bootstrap'
import { Chart } from "react-google-charts"
import {connect} from 'react-redux'
import {startCheckHandle,startDeleteHandle} from '../actions/tickets'
import logo from  '../images/kid2.jpg'
import Modal from 'react-modal'
import Swal from 'sweetalert2'

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  }

class TicketList extends React.Component{
    constructor(){
        super()
        this.state={
            tickets:[],
            text:''
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }


    
    componentDidMount=()=>{
        setTimeout(() => {
            const tickets=this.props.tickets
            this.setState({tickets})
        }, 1000)
        
    }

searchHandle=(e)=>{
    const text=e.target.value
    const tickets=this.props.tickets.filter(ticket=>{
         ticket=ticket.code.toLowerCase()
       return ((ticket).toString().includes(text)==1)
    })
    // console.log(tickets)
    this.setState({text,tickets})
}

openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

allHandle=(e)=>{
    const tickets=this.props.tickets 
    this.setState({tickets})
}
highHandle=(e)=>{
    const tickets=this.props.tickets.filter(tic=>tic.priority=="high")
    this.setState({tickets})
}
mediumHandle=(e)=>{
    const tickets=this.props.tickets.filter(tic=>tic.priority=="medium")
    this.setState({tickets})
}
lowHandle=(e)=>{
    const tickets=this.props.tickets.filter(tic=>tic.priority=="low")
    this.setState({tickets})
}

checkHandle=(e)=>{
    const id=e.target.value
    const data={"isResolved":e.target.checked}
    this.props.dispatch(startCheckHandle(data,id))
    this.setState(prevState=>{
    const tickets=prevState.tickets.map((stat)=>{
        if(stat._id==id){
            return Object.assign({},stat,data)
        }else{
            return stat
        }
    })
    return {
        tickets
    }
})
}

removeHandle=(e)=>{
    const id=e.target.value

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
            this.props.dispatch(startDeleteHandle(id))
            this.setState({tickets:[]})
            Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
}

chartHandle=()=>{
    const ass=[],bss=[],arr=[['department', 'priority']]

    this.props.departments.forEach(dep=>{
        const arr=this.state.tickets.filter(tick=>tick.department._id==dep._id)
        ass.push(arr.length)

    })
   this.props.departments.forEach(dep=>{
        bss.push(dep.name)
   })

    for(let i=0;i<bss.length;i++){
     arr.push([bss[i],ass[i]])
    }    
return arr 
}


    render(){
        
        return (
            <div className='row'>
                <div className='container'>
                <div className='row p-3'>
                <h3>Listing Tickets-{this.state.tickets.length}</h3></div>
                <div className='row mt1 p-3'>
                
                <div className='col-md-2'>
                <Button onClick={this.openModal}>Add Ticket</Button>
                <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Ticekt Modal"
                >
                <h2 className='text-center'>Add Ticket</h2>
                <TicketForm />
                <Button className='float-right btntick' onClick={this.closeModal}>close</Button>

                </Modal>
                </div>
                <div className='col-md-4 offset-2'>
                <Button className='mr-1' onClick={this.allHandle} >all</Button>
                <Button className='mr-1' onClick={this.highHandle}>high</Button>
                <Button className='mr-1' onClick={this.mediumHandle}>medium</Button>
                <Button className='mr-1' onClick={this.lowHandle}>low</Button>
                </div>
                <div className='col-md-4'>
                    <div className='row'>
                        <div className='col-md-10'>
                        <input type='text' style={{width:'100%'}} placeholder='search by ticket.no' value={this.state.text} onChange={this.searchHandle}/>
                        </div>
                        <div className='col-md-2'>
                        <Button size='sm btnpost' >Search</Button>
                        </div>
                    </div>
                </div>
                </div>
                <div className='row'>
                <div className='col-md-4'>    
                <img src={logo} className='img-fluid ml-4 p-4' style={{width:'235px', height:'auto'}} alt='ticket detaile'/>
                </div>
                <div className='col-md-8'>
                    <Table striped bordered hover>
                    <thead className='bg-dark text-light'>
                        <tr>
                            <th>ticket.no</th>
                            <th>customer</th>
                            <th>priority</th>
                            <th>department</th>
                            <th>Message</th>
                            <th>Resolved</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        this.state.tickets.map((tick)=>{
                            return (
                                <tr key={tick._id}>
                                    <td>{tick.code}</td>
                                    <td className={tick.isResolved ? 'bg-secondary':'bg-info'}>{tick.customer.name}</td>
                                    <td>{tick.priority}</td>
                                    <td>{tick.department.name}</td>
                                    <td>{tick.message}</td>
                                    <td><input type='checkbox' onChange={(e)=>this.checkHandle(e,tick._id)}  value={tick._id} name='isResolve' checked={tick.isResolved}/></td>
                                    <td><Button value={tick._id} onClick={this.removeHandle}>Remove</Button></td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>

                    </div>
                </div>
                <div className='row p-3 mb-2'>
                    <div className='col-md-12'>
                    <ProgressBar animated now={this.state.tickets.length ? (this.state.tickets.filter(tick=>tick.isResolved).length/this.state.tickets.length)*100:0} label={this.state.tickets.length ? `${Math.round((this.state.tickets.filter(tick=>tick.isResolved).length/this.state.tickets.length)*100)}%`:0} />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                    <Chart width={'500px'}
                     height={'300px'}
                     chartType="PieChart"
                     loader={<div>Loading Chart</div>}
                     data={[
                        ['priority', 'length'],
                        ['high', this.state.tickets.filter(tic=>tic.priority=="high").length],
                        ['medium', this.state.tickets.filter(tic=>tic.priority=="medium").length],
                        ['low', this.state.tickets.filter(tic=>tic.priority=="low").length],
                      ]}
                      options={{
                        title: 'priority Chart',
                      }}/>
                    </div>
                    <div className='col-md-6'>
                    <Chart
                        width={'500px'}
                        height={'300px'}
                        chartType="Bar"
                        loader={<div>Loading Chart</div>}
                        data={this.chartHandle()}
                        options={{
                            chart: {
                            title: 'department Performance',
                            },
                        }}
                        />
                    </div>
                </div>
            </div>
        </div>
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

    
export default connect(mapStateToProps)(TicketList)
