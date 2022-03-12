const initialOutcomingStock = {
  allOutcomingStock: []
}

const outcomingStockReducer = (state = initialOutcomingStock, action) => {
  console.log("action outcoming Stock Reducer", action.payload)
  switch(action.type){
    case 'SET_ALL_OUTCOMING_STOCK':
    return {
        ...state,
        allOutcomingStock: action.payload
    }
  }
  return state
} 

export default outcomingStockReducer