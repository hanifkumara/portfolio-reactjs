const initialInventory = {
  allInventory: []
}

const inventoryReducer = (state = initialInventory, action) => {
  console.log("action inventoryReducer", action.payload)
  switch(action.type){
    case 'SET_ALL_INVENTORY':
    return {
        ...state,
        allInventory: action.payload
    }
  }
  return state
} 

export default inventoryReducer