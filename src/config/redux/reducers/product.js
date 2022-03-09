const initialProduct = {
  allProduct: []
}

const productReducer = (state = initialProduct, action) => {
  console.log("action productReducer", action.payload)
  switch(action.type){
    case 'SET_ALL_PRODUCT':
    return {
        ...state,
        allProduct: action.payload
    }
  }
  return state
} 

export default productReducer