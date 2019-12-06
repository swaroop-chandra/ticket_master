const ticketsInitialState=[]

const ticketsReducer=(state=ticketsInitialState,action)=>{
    switch(action.type){
        case "GET_TICKETS":{
            return [...action.payload]
        }
        case "ADD_TICKETS":{
            return [...state,action.payload]
        }
        case "DELETE_TICKET":{
            return [...state].filter(stat=>stat._id!==action.payload)
        }
        case "CHECKED_TICKET":{
            return [...state].map((stat)=>{
                if(stat._id==action.payload._id){
                    return action.payload
                }else{
                    return stat
                }
            })
        }
        default:{
            return [...state]
        }
    }
}

export default ticketsReducer