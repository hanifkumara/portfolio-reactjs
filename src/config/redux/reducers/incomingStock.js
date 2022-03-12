const initialIncomingStock = {
  allIncomingStock: []
}

const incomingStockReducer = (state = initialIncomingStock, action) => {
  console.log("action incoming Stock Reducer", action.payload)
  switch(action.type){
    case 'SET_ALL_INCOMING_STOCK':
    return {
        ...state,
        allIncomingStock: action.payload
    }
  }
  return state
} 

export default incomingStockReducer