import Axios from 'axios'

const axios=Axios.create({
    baseURL:'https://ticket-master-swaroop666.herokuapp.com/api'
})

export default axios