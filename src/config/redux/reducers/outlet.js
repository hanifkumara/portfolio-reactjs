const initialOutlet = {
  allOutlet: []
}

const outletReducer = (state = initialOutlet, action) => {
  console.log("action outletReducer", action.payload)
  switch(action.type){
    case 'SET_ALL_OUTLET':
    return {
        ...state,
        allOutlet: action.payload
    }
  }
  return state
} 

export default outletReducer