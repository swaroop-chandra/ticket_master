const departmentsInitialState=[]

const departmentsReducer=(state=departmentsInitialState,action)=>{
    switch(action.type){
        case "GET_DEPARTMENTS":{
            return [...action.payload]
        }
        case "DELETE_DEPARTMENTS":{
            return [...state].filter(stat=>stat._id!==action.payload)
        }
        case "ADD_DEPARTMENT":{
            return [...state,action.payload]
        }
        default:{
            return [...state]
        }
    }
}

export default departmentsReducer